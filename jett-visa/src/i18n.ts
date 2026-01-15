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