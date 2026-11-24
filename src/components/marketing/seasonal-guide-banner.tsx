'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Gift, X } from 'lucide-react';
import { useLearningLanguage } from '@/components/providers/learning-language-provider';
import type { LearningLocale } from '@/lib/internationalization';

type Season = 'welcome' | 'christmas' | 'newyear' | 'lunar' | 'eid';
const copy: Record<LearningLocale, { greetings: Record<Season, string>; message: string; action: string; close: string }> = {
  en: { greetings: { welcome: 'A little gift for your next chapter', christmas: 'Merry Christmas & happy holidays', newyear: 'Happy New Year!', lunar: 'Happy Lunar New Year!', eid: 'Eid Mubarak to everyone celebrating!' }, message: 'Wherever you are, take your next step with our free Career & Life Map.', action: 'Get the free guide', close: 'Dismiss seasonal banner' },
  'zh-CN': { greetings: { welcome: '送给开启新篇章的你一份礼物', christmas: '圣诞快乐，节日愉快', newyear: '新年快乐！', lunar: '春节快乐！', eid: '祝庆祝开斋节或宰牲节的朋友节日快乐！' }, message: '无论身在何处，都可以通过免费的职业与人生规划指南迈出下一步（英文版）。', action: '获取免费指南', close: '关闭节日横幅' },
  es: { greetings: { welcome: 'Un regalo para tu próxima etapa', christmas: 'Feliz Navidad y felices fiestas', newyear: '¡Feliz Año Nuevo!', lunar: '¡Feliz Año Nuevo Lunar!', eid: '¡Eid Mubarak a quienes lo celebran!' }, message: 'Estés donde estés, da el siguiente paso con nuestra guía gratuita de carrera y vida (en inglés).', action: 'Obtener la guía gratuita', close: 'Cerrar el banner' },
  fr: { greetings: { welcome: 'Un cadeau pour votre prochain chapitre', christmas: 'Joyeux Noël et bonnes fêtes', newyear: 'Bonne année !', lunar: 'Bonne année lunaire !', eid: 'Aïd Moubarak à celles et ceux qui le célèbrent !' }, message: 'Où que vous soyez, avancez avec notre guide gratuit de carrière et de vie (en anglais).', action: 'Obtenir le guide gratuit', close: 'Fermer la bannière' },
  hi: { greetings: { welcome: 'आपके अगले अध्याय के लिए एक छोटा उपहार', christmas: 'क्रिसमस और त्योहारों की शुभकामनाएँ', newyear: 'नव वर्ष की शुभकामनाएँ!', lunar: 'चंद्र नव वर्ष की शुभकामनाएँ!', eid: 'ईद मनाने वाले सभी लोगों को ईद मुबारक!' }, message: 'आप जहाँ भी हों, हमारी मुफ्त करियर और जीवन मार्गदर्शिका (अंग्रेज़ी में) के साथ अगला कदम बढ़ाएँ।', action: 'मुफ्त गाइड पाएँ', close: 'बैनर बंद करें' },
  ar: { greetings: { welcome: 'هدية صغيرة لفصلك القادم', christmas: 'ميلاد مجيد وأعياد سعيدة', newyear: 'عام جديد سعيد!', lunar: 'سنة قمرية جديدة سعيدة!', eid: 'عيد مبارك لكل من يحتفل!' }, message: 'أينما كنت، اتخذ خطوتك التالية مع دليلنا المجاني للمسار المهني والحياة (بالإنجليزية).', action: 'احصل على الدليل المجاني', close: 'إغلاق اللافتة' },
};

// Calendar windows are deliberately broad greetings, not official holiday dates.
// Eid dates vary by local moon sighting; the civil calendar is only a seasonal cue.
function seasonFor(date: Date): Season {
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-civil-nu-latn', { month: 'numeric', day: 'numeric' }).formatToParts(date);
    const m = Number(parts.find(p => p.type === 'month')?.value);
    const d = Number(parts.find(p => p.type === 'day')?.value);
    if ((m === 10 && d <= 5) || (m === 12 && d >= 9 && d <= 14)) return 'eid';
  } catch { /* fall back to Gregorian season */ }
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-chinese-nu-latn', { month: 'numeric', day: 'numeric' }).formatToParts(date);
    if (parts.find(p => p.type === 'month')?.value === '1' && Number(parts.find(p => p.type === 'day')?.value) <= 15) return 'lunar';
  } catch { /* fall back */ }
  const m = date.getMonth() + 1;
  const d = date.getDate();
  if (m === 12 && d >= 27 || m === 1 && d <= 10) return 'newyear';
  if (m === 12 || m === 11 && d >= 20) return 'christmas';
  return 'welcome';
}

export function SeasonalGuideBanner() {
  const { locale } = useLearningLanguage();
  const [season, setSeason] = useState<Season>('welcome');
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const current = seasonFor(new Date());
    setSeason(current);
    try { setHidden(sessionStorage.getItem('msl-seasonal-guide-' + current) === 'hidden'); } catch { /* optional storage */ }
  }, []);
  const t = copy[locale];
  if (hidden) return null;
  return (
    <aside lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} aria-label={t.greetings[season]} className="relative border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-amber-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-3 sm:px-8">
        <Gift aria-hidden="true" className="h-5 w-5 shrink-0 text-indigo-700" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900">{t.greetings[season]}</p>
          <p className="text-xs leading-5 text-slate-600">{t.message}</p>
        </div>
        <Link href="/free-career-guide" className="inline-flex min-h-10 items-center rounded-xl bg-indigo-700 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">{t.action}</Link>
        <button type="button" aria-label={t.close} className="rounded-lg p-2 text-slate-600 hover:bg-indigo-100" onClick={() => { setHidden(true); try { sessionStorage.setItem('msl-seasonal-guide-' + season, 'hidden'); } catch { /* optional storage */ } }}><X aria-hidden="true" className="h-4 w-4" /></button>
      </div>
    </aside>
  );
}
