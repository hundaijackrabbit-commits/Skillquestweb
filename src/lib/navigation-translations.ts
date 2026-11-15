import type { LearningLocale } from './internationalization';

/** Reviewed short navigation strings. Educational content remains English until translated. */
export const NAVIGATION_TRANSLATIONS: Record<LearningLocale, Record<string, string>> = {
  en: { Skills:'Skills', Careers:'Careers', 'Learning Paths':'Learning Paths', Practice:'Practice', Community:'Community' },
  'zh-CN': { Skills:'技能', Careers:'职业', 'Learning Paths':'学习路径', Practice:'练习', Community:'社区' },
  es: { Skills:'Habilidades', Careers:'Carreras', 'Learning Paths':'Rutas de aprendizaje', Practice:'Práctica', Community:'Comunidad' },
  fr: { Skills:'Compétences', Careers:'Métiers', 'Learning Paths':"Parcours d’apprentissage", Practice:'Pratique', Community:'Communauté' },
  hi: { Skills:'कौशल', Careers:'करियर', 'Learning Paths':'सीखने के रास्ते', Practice:'अभ्यास', Community:'समुदाय' },
  ar: { Skills:'المهارات', Careers:'المهن', 'Learning Paths':'مسارات التعلم', Practice:'التدريب', Community:'المجتمع' },
};

export function navigationLabel(locale: LearningLocale, name: string): string {
  return NAVIGATION_TRANSLATIONS[locale][name] ?? name;
}
