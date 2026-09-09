import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const careersPath = path.join(root, 'src', 'data', 'careers.json');
const careers = JSON.parse(fs.readFileSync(careersPath, 'utf8'));

const genericTools = new Set(['industry-standard software','communication tools','project management platforms','professional platforms']);
const genericPatterns = {
  education: [/^Bachelor'?s degree typically preferred, though relevant experience and skills often valued equally/i,/^Relevant degree or equivalent experience typically required/i,/^Education requirements vary by role/i,/^Relevant education and experience requirements vary by role/i],
  entry: [/^Entry-level .* positions$/i,/^Internships and apprenticeships$/i,/^Professional development programs$/i,/^Building relevant skills through projects and coursework$/i],
  alternative: [/^Transition from related .* roles$/i,/^Professional development and upskilling programs$/i,/^Industry certifications and training$/i,/^Cross-functional experience and internal mobility$/i],
  growth: [/^Senior .+$/i,/^Lead .+$/i,/^.+ Manager\/Director$/i,/^Specialized consulting or freelance work$/i,/^Independent consulting and specialized practice$/i],
};

const matches = (value, patterns) => patterns.some((p) => p.test(String(value || '').trim()));
const repeated = (field) => {
  const counts = new Map();
  for (const career of careers) for (const item of career[field] || []) counts.set(item, (counts.get(item) || 0) + 1);
  return [...counts.entries()].filter(([, count]) => count >= 8).sort((a,b)=>b[1]-a[1]);
};

const audits = careers.map((career) => {
  const flags = [];
  if ((career.summary || '').trim().length < 90) flags.push('thin-summary');
  if ((career.whatTheyDo || '').trim().length < 220) flags.push('thin-role-description');
  if ((career.tools || []).length && career.tools.every((tool) => genericTools.has(tool.trim().toLowerCase()))) flags.push('generic-tools');
  if ((career.beginnerEntryStrategies || []).length && career.beginnerEntryStrategies.every((item) => matches(item, genericPatterns.entry))) flags.push('generic-entry-routes');
  if ((career.alternativePaths || []).length && career.alternativePaths.every((item) => matches(item, genericPatterns.alternative))) flags.push('generic-alternative-routes');
  if ((career.growthOpportunities || []).length && career.growthOpportunities.every((item) => matches(item, genericPatterns.growth))) flags.push('generic-growth');
  if (!career.educationNotes || matches(career.educationNotes, genericPatterns.education)) flags.push('generic-education');
  if ((career.coreSkills || []).length < 3 || (career.secondarySkills || []).length < 2) flags.push('weak-skill-map');
  if ((career.relatedCareers || []).length < 2) flags.push('weak-related-careers');
  const score = Math.max(0, 100 - flags.length * 12);
  return { slug: career.slug, title: career.title, score, flags };
}).sort((a,b)=>a.score-b.score || b.flags.length-a.flags.length || a.title.localeCompare(b.title));

const priority = audits.filter((item) => item.flags.length >= 3);
const report = {
  generatedAt: new Date().toISOString(),
  totalCareers: careers.length,
  careersNeedingMajorRewrite: priority.length,
  flagCounts: audits.flatMap((item)=>item.flags).reduce((acc,flag)=>{acc[flag]=(acc[flag]||0)+1;return acc;},{}),
  repeatedValues: {
    tools: repeated('tools').slice(0,20),
    growthOpportunities: repeated('growthOpportunities').slice(0,20),
    alternativePaths: repeated('alternativePaths').slice(0,20),
    beginnerEntryStrategies: repeated('beginnerEntryStrategies').slice(0,20),
  },
  priorities: priority,
};

const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'career-content-audit.json'), JSON.stringify(report, null, 2) + '\n');

console.log(`Career audit: ${careers.length} careers; ${priority.length} need major rewrite.`);
for (const [flag,count] of Object.entries(report.flagCounts).sort((a,b)=>b[1]-a[1])) console.log(`- ${flag}: ${count}`);
console.log('Top priority careers:');
for (const item of priority.slice(0,20)) console.log(`- ${item.title}: ${item.flags.join(', ')}`);
