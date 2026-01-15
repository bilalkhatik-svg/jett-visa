<<<<<<< HEAD
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
=======
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useI18nStore } from "./store/i18n-store";

// Import our translation files
import translationEN from "@/locales/en/translation.json";
import translationAR from "@/locales/ar/translation.json";
import translationHI from "@/locales/hi/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
  hi:{
    translation: translationHI,
  }
};

// This function will initialize i18next and link it to our Zustand store.
// It uses a dynamic import for the browser language detector so the module
// is safe to import on the server (Next.js app router).
export async function initializeI18n() {
  let LanguageDetector: any = undefined;
  if (typeof window !== "undefined") {
    const mod = await import("i18next-browser-languagedetector");
    LanguageDetector = mod.default || mod;
  }

  const i18nInstance = i18n.use(initReactI18next);

  if (LanguageDetector) {
    i18nInstance.use(LanguageDetector);
  }

  await i18nInstance.init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

  // Subscribe to Zustand store changes to keep i18n in sync
  useI18nStore.subscribe((state, prevState) => {
    if (state.language !== prevState.language) {
      i18n.changeLanguage(state.language);
    }
  });

  return i18n;
}

export default i18n;
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
