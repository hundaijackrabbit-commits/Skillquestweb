'use client';

import { useEffect, useRef } from 'react';
import { useLearningLanguage } from '@/components/providers/learning-language-provider';

/** Selecting a Chinese editorial route also makes the site's shared menu Chinese. */
export function ChineseRouteLanguage() {
  const { setLanguage } = useLearningLanguage();
  const initialized = useRef(false);

  useEffect(() => {
    // setLanguage is recreated when locale changes; only set preference once.
    if (initialized.current) return;
    initialized.current = true;
    setLanguage('zh-CN');
  }, [setLanguage]);

  return null;
}
