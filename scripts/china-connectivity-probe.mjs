#!/usr/bin/env node
/**
 * Consent-free synthetic connectivity probe. Run from a machine *physically on*
 * a mainland-China network to measure that network's path to the public site.
 *
 * Usage:
 *   node scripts/china-connectivity-probe.mjs
 *   node scripts/china-connectivity-probe.mjs --runs=5
 *
 * This does not collect visitor IPs, install trackers, crawl search engines, or
 * establish China reachability from a North American Vercel build server.
 */
import { performance } from 'node:perf_hooks';

const origin = 'https://modernskilllab.space';
const paths = [
  '/zh-CN',
  '/zh-CN/skills/ai-literacy',
  '/zh-CN/skills/data-analysis',
  '/zh-CN/careers/data-analyst',
  '/zh-CN/blog/ai-skills-2024-guide',
  '/sitemap-zh.xml',
];
const option = process.argv.slice(2).find(arg => arg.startsWith('--runs='));
const runs = option ? Number(option.split('=')[1]) : 3;
if (!Number.isInteger(runs) || runs < 1 || runs > 12) {
  process.stderr.write('Choose --runs=1..12\n');
  process.exitCode = 2;
} else {
  const readings = [];
  for (let i = 0; i < runs; i++) {
    for (const path of paths) {
      const start = performance.now();
      try {
        const response = await fetch(origin + path, {
          redirect: 'follow',
          signal: AbortSignal.timeout(15000),
          headers: { 'User-Agent': 'ModernSkillLab-China-Network-QA/1.0' },
        });
        const headerMs = Math.round(performance.now() - start);
        const body = await response.arrayBuffer();
        readings.push({
          path, run: i + 1, status: response.status,
          ttfbMs: headerMs, totalMs: Math.round(performance.now() - start),
          kilobytes: Math.round(body.byteLength / 1024),
          language: response.headers.get('content-language') ?? 'not-set',
          ok: response.ok,
        });
      } catch (error) {
        readings.push({ path, run: i + 1, ok: false,
          error: error instanceof Error ? error.name : 'UnknownError',
          totalMs: Math.round(performance.now() - start) });
      }
    }
  }

  const median = (values) => {
    const sorted = [...values].sort((a, b) => a - b);
    if (!sorted.length) return null;
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : Math.round((sorted[middle-1] + sorted[middle]) / 2);
  };
  const summary = paths.map(path => {
    const rows = readings.filter(row => row.path === path);
    const successful = rows.filter(row => row.ok);
    return {
      path, successes: successful.length, attempts: rows.length,
      statusCodes: [...new Set(rows.map(row => row.status ?? row.error))],
      medianTtfbMs: median(successful.map(row => row.ttfbMs)),
      medianTotalMs: median(successful.map(row => row.totalMs)),
      medianKilobytes: median(successful.map(row => row.kilobytes)),
      contentLanguage: [...new Set(successful.map(row => row.language))],
    };
  });
  process.stdout.write(JSON.stringify({ description: 'Synthetic test only; network location is not verified by this script',
    executedAt: new Date().toISOString(), networkLocation: 'not-verified',
    origin, runs, summary, raw: readings }, null, 2) + '\n');
  if (readings.some(row => !row.ok)) process.exitCode = 1;
}
