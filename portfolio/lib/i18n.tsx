'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import es from '@/messages/es.json';
import en from '@/messages/en.json';

export type Locale = 'es' | 'en';
type Messages = typeof es;

const dictionaries: Record<Locale, Messages> = { es, en };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    const saved = window.localStorage.getItem('locale');
    if (saved === 'es' || saved === 'en') {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem('locale', nextLocale);
  };

  const messages = dictionaries[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = messages.metadata.title;

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', messages.metadata.description);
  }, [locale, messages]);

  const value = useMemo(
    () => ({ locale, setLocale, messages }),
    [locale, messages]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return context;
}
