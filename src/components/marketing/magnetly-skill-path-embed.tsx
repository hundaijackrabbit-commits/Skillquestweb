'use client';

import Script from 'next/script';

const MAGNETLY_TOOL_ID = 'ebe7d503-9d99-463f-a749-be0eff83bcef';

export function MagnetlySkillPathEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_-32px_rgba(15,23,42,0.38)]">
      <div
        id="smart-wraap-container"
        data-uuid={MAGNETLY_TOOL_ID}
        data-border-radius="14"
        className="h-[820px] w-full sm:h-[760px] lg:h-[calc(100vh-7rem)] lg:min-h-[620px] lg:max-h-[720px]"
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
