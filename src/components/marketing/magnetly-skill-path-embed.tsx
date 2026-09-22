'use client';

import Script from 'next/script';

const MAGNETLY_TOOL_ID = 'ebe7d503-9d99-463f-a749-be0eff83bcef';

export function MagnetlySkillPathEmbed() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.45)]">
      <div
        id="smart-wraap-container"
        data-uuid={MAGNETLY_TOOL_ID}
        data-border-radius="16"
        style={{ width: '100%', minHeight: '820px' }}
        aria-label="Modern Skill Lab skill-path diagnostic"
      />
      <Script
        id="magnetly-skill-path-embed"
        type="module"
        src="https://app.magnetly.co/embed-script/index.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
