import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cookieStorage } from "./cookie-storage";
// import Cookies from "js-cookie";
import Cookies from "js-cookie"

export type I18nState = {
  language: string;
  changeLanguage: (lang: string) => void;
};

const name = "i18n-storage";
const value = Cookies.get("i18n-storage");
const language = value ? value : "en";
export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      language,
      changeLanguage: (lang: string) => set({ language: lang }),
    }),
    {
      name,
      storage: cookieStorage,
      // You can remove the serialize and deserialize options now
    }
  )
);