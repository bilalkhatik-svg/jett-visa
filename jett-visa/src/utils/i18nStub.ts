export type I18nStub = {
  language: string;
  dir: () => "ltr" | "rtl";
  changeLanguage: (lang: string) => void;
};

let currentLanguage = "en-US";

export const i18n: I18nStub = {
  get language() {
    return currentLanguage;
  },
  dir() {
    return currentLanguage.startsWith("ar") ? "rtl" : "ltr";
  },
  changeLanguage(lang: string) {
    currentLanguage = lang;
  },
};

export const useTranslation = () => {
  return {
    t: (key: string) => key,
    i18n,
  };
};
