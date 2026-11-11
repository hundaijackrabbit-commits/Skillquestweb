'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

type Section = { id: string; label: string };

export function LearningPageNavigator({ containerId }: { containerId: string }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState('');
  useEffect(() => {
    const root = document.getElementById(containerId);
    if (!root) return;
    const headings = Array.from(root.querySelectorAll<HTMLElement>('h2')).filter((heading) => heading.textContent?.trim() && !heading.closest('nav'));
    const used = new Set<string>();
    const entries = headings.map((heading, index) => {
      const label = heading.textContent?.replace(/\s+/g, ' ').trim() || 'Section';
      let id = heading.id || `section-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
      if (!id || id === 'section-') id = `section-${index + 1}`;
      const base = id;
      let suffix = 2;
      while (used.has(id) || (document.getElementById(id) && document.getElementById(id) !== heading)) id = `${base}-${suffix++}`;
      used.add(id);
      heading.id = id;
      heading.classList.add('scroll-mt-32');
      return { id, label };
    });
    setSections(entries);
    if (entries.length) setActive(entries[0].id);
    const update = () => {
      let current = entries[0]?.id || '';
      for (const entry of entries) {
        const el = document.getElementById(entry.id);
        if (el && el.getBoundingClientRect().top <= 170) current = entry.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [containerId]);
  if (sections.length < 3) return null;
  return <nav aria-label="On this page" className="mb-8 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm lg:sticky lg:top-20 lg:z-20">
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900"><List className="h-4 w-4 text-indigo-700" aria-hidden="true" /> On this page</div>
    <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap">
      {sections.map((section) => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? 'location' : undefined} className={`shrink-0 rounded-full border px-3 py-2 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${active === section.id ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50'}`}>{section.label}</a>)}
    </div>
  </nav>;
}
