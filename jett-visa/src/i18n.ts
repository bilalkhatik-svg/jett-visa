import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import ar from '@/locales/ar/translation.json';
import en from '@/locales/en/translation.json';

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';
const storedLang = isBrowser ? (localStorage.getItem("appLanguage") || "en-US") : "en-US";

// Set initial direction before i18n initialization (only in browser)
if (isBrowser) {
  const initialDir = storedLang.startsWith('ar') ? 'rtl' : 'ltr';
  document.documentElement.dir = initialDir;
  document.documentElement.lang = storedLang;
}


if (!i18n.isInitialized) {
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': { translation: en },
      'ar-AE': { translation: ar },
    },
    supportedLngs: ['en-US', 'ar-AE'],
    lng: storedLang,
    fallbackLng: 'en-US',
    detection: {
      order: ['localStorage', 'querystring', 'navigator'],
      caches: [], 
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: true,
    },
  });
}

i18n.on('languageChanged', (lang) => {
  localStorage.setItem('appLanguage', lang);
  document.documentElement.dir = lang.startsWith('ar') ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
});

// Only run in browser environment
if (isBrowser) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const hasSavedLang = localStorage.getItem('appLanguage');

  if (!hasSavedLang && id === '2') {
    // only apply on first load if no previous language saved
    i18n.changeLanguage('ar-AE');
    localStorage.setItem('appLanguage', 'ar-AE');
  } else if (!hasSavedLang) {
    i18n.changeLanguage('en-US');
    localStorage.setItem('appLanguage', 'en-US');
  }
}

export default i18n;
