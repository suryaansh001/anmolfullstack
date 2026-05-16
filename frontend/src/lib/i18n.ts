import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import taTranslations from '../locales/ta.json';
import bnTranslations from '../locales/bn.json';
import guTranslations from '../locales/gu.json';

export const resources = {
  en: { translation: enTranslations },
  hi: { translation: hiTranslations },
  ta: { translation: taTranslations },
  bn: { translation: bnTranslations },
  gu: { translation: guTranslations },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
