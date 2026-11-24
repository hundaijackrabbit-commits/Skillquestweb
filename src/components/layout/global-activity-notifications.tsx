'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Globe2, X } from 'lucide-react';
import { useLearningLanguage } from '@/components/providers/learning-language-provider';
import type { LearningLocale } from '@/lib/internationalization';

const KEY = 'msl-global-activity-off';
const CHANGE = 'msl-global-activity-changed';
const LAST = 'msl-global-activity-last';
type Activity = { available: boolean; sessions: number; minutes: 30 | 1440; countries: { code: string; sessions: number }[] };
const copy: Record<LearningLocale, { title: string; recent: string; day: string; page: string; from: string; off: string; on: string; close: string; note: string }> = {
 en: { title: 'Learning around the world', recent: 'Past 30 minutes', day: 'Past 24 hours', page: 'browsing sessions explored this page', from: 'Recent visits from', off: 'Turn off activity popups', on: 'Turn on activity popups', close: 'Dismiss activity notification', note: 'Aggregated visits, not people online now.' },
 'zh-CN': { title: '全球学习动态', recent: '过去30分钟', day: '过去24小时', page: '个独立浏览会话访问了此页面', from: '近期访问来自', off: '关闭动态弹窗', on: '开启动态弹窗', close: '关闭通知', note: '汇总访问量，并非实时在线人数。' },
 es: { title: 'Aprendizaje en todo el mundo', recent: 'Últimos 30 minutos', day: 'Últimas 24 horas', page: 'sesiones de navegación exploraron esta página', from: 'Visitas recientes desde', off: 'Desactivar avisos de actividad', on: 'Activar avisos de actividad', close: 'Cerrar aviso', note: 'Visitas agregadas, no usuarios en línea.' },
 fr: { title: 'Apprendre partout dans le monde', recent: '30 dernières minutes', day: '24 dernières heures', page: 'sessions de navigation ont exploré cette page', from: 'Visites récentes depuis', off: 'Désactiver les notifications', on: 'Activer les notifications', close: 'Fermer la notification', note: 'Visites agrégées, pas utilisateurs en ligne.' },
 hi: { title: 'दुनिया भर में सीखना', recent: 'पिछले 30 मिनट', day: 'पिछले 24 घंटे', page: 'ब्राउज़िंग सत्रों में यह पृष्ठ देखा गया', from: 'हाल की यात्राएँ इन देशों से', off: 'गतिविधि सूचनाएँ बंद करें', on: 'गतिविधि सूचनाएँ चालू करें', close: 'सूचना बंद करें', note: 'कुल विज़िट, अभी ऑनलाइन लोगों की संख्या नहीं।' },
 ar: { title: 'التعلم حول العالم', recent: 'آخر 30 دقيقة', day: 'آخر 24 ساعة', page: 'جلسة تصفح استكشفت هذه الصفحة', from: 'زيارات حديثة من', off: 'إيقاف إشعارات النشاط', on: 'تشغيل إشعارات النشاط', close: 'إغلاق الإشعار', note: 'زيارات مجمعة وليست عدد المتصلين الآن.' },
};
function scope(path: string | null) {
 if (path === '/') return {kind:'home',slug:'home'};
 const match = path?.match(/^\/(skills|careers|blog)\/([a-z0-9][a-z0-9-]{0,158})$/);
 if (!match) return null;
 return {kind:match[1] === 'skills' ? 'skill' : match[1] === 'careers' ? 'career' : 'blog',slug:match[2]};
}
export function GlobalActivityNotifications() {
 const pathname = usePathname();
 const { locale } = useLearningLanguage();
 const t = copy[locale];
 const [off,setOff] = useState(false);
 const [ready,setReady] = useState(false);
 const [notice,setNotice] = useState<{path:string;data:Activity}|null>(null);
 useEffect(() => {
   const sync = () => { try { setOff(localStorage.getItem(KEY) === '1'); } catch { /* optional storage */ } };
   sync(); setReady(true);
   window.addEventListener('storage', sync);
   window.addEventListener(CHANGE, sync);
   return () => { window.removeEventListener('storage',sync); window.removeEventListener(CHANGE,sync); };
 },[]);
 useEffect(() => {
   if (!ready || off || !pathname) return;
   const current = scope(pathname);
   if (!current) return;
   const controller = new AbortController();
   let dismiss: ReturnType<typeof setTimeout> | undefined;
   const delay = setTimeout(async () => {
     if (document.visibilityState !== 'visible') return;
     // Avoid competing with the analytics consent prompt.
     if (document.querySelector('[aria-label="Optional behaviour analytics"]')) return;
     try {
       const last = Number(sessionStorage.getItem(LAST) || 0);
       if (Date.now() - last < 120000 || sessionStorage.getItem('msl-activity-seen:' + pathname)) return;
     } catch { /* optional storage */ }
     try {
       const response = await fetch('/api/public-learning-activity?' + new URLSearchParams(current), {signal:controller.signal});
       if (!response.ok) return;
       const data = await response.json() as Activity;
       if (controller.signal.aborted || document.visibilityState !== 'visible' || !data.available || !Number.isFinite(data.sessions) || data.sessions < 5) return;
       try { sessionStorage.setItem(LAST,String(Date.now())); sessionStorage.setItem('msl-activity-seen:' + pathname,'1'); } catch { /* optional storage */ }
       setNotice({path:pathname,data});
       dismiss = setTimeout(() => setNotice(null),14000);
     } catch { /* no fabricated or fallback counts */ }
   },10000);
   return () => { controller.abort(); clearTimeout(delay); if (dismiss) clearTimeout(dismiss); setNotice(null); };
 },[pathname,ready,off]);
 function toggle(next:boolean) {
   setOff(next); setNotice(null);
   try { localStorage.setItem(KEY,next?'1':'0'); } catch { /* optional storage */ }
 }
 const activity = notice?.path === pathname ? notice.data : null;
 const names = new Intl.DisplayNames([locale],{type:'region'});
 const countries = activity?.countries?.filter(c => /^[A-Z]{2}$/.test(c.code) && c.sessions >= 3).slice(0,4).map(c=>names.of(c.code) ?? c.code) ?? [];
 return (
   <>
     {ready && <button type="button" lang={locale} onClick={()=>toggle(!off)} className="text-xs text-slate-600 underline underline-offset-2 hover:text-slate-900">{off?t.on:t.off}</button>}
     {!off && activity && (
       <aside lang={locale} dir={locale==='ar'?'rtl':'ltr'} className="fixed top-24 inset-x-3 z-40 max-w-sm rounded-2xl border border-indigo-100 bg-white p-4 shadow-xl sm:left-auto sm:right-5" aria-label={t.title}>
         <div className="flex items-start gap-3">
           <Globe2 className="mt-1 h-5 w-5 shrink-0 text-indigo-700" aria-hidden="true"/>
           <div className="min-w-0 flex-1" role="status">
             <p className="text-xs font-bold text-indigo-700">{t.title} · {activity.minutes===30?t.recent:t.day}</p>
             <p className="mt-1 text-sm font-semibold text-slate-900">{activity.sessions.toLocaleString(locale)} {t.page}</p>
             {countries.length>0 && <p className="mt-1 text-xs text-slate-600">{t.from}: {new Intl.ListFormat(locale).format(countries)}</p>}
             <p className="mt-1 text-xs text-slate-500">{t.note}</p>
           </div>
           <button type="button" aria-label={t.close} onClick={()=>setNotice(null)} className="rounded-md p-1 text-slate-600 hover:bg-slate-100"><X className="h-4 w-4" aria-hidden="true"/></button>
         </div>
         <button type="button" onClick={()=>toggle(true)} className="mt-2 text-xs font-medium text-indigo-700 underline">{t.off}</button>
       </aside>
     )}
   </>
 );
}
