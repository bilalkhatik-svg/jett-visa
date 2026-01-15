import Cookies from "js-cookie";
import type { PersistStorage, StorageValue } from "zustand/middleware";

export const cookieStorage: PersistStorage<any> = {
  getItem: (name: string): StorageValue<any | string> | null => {
    // Read the cookie as a string
    const value = Cookies.get(name);
    if (!value) {
      return null;
    }
    try {
      // We must return a parsed object, not a string
      //   return JSON.parse(decodeURIComponent(value));
      if (["en", "ar", "hi"].includes(value)) return value as any;
      return JSON.parse(decodeURIComponent(value));
    } catch (e) {
      console.error("Failed to parse i18n cookie:", e);
      return null;
    }
  },
  setItem: (name: string, value: StorageValue<any>): void => {
    console.log("setItem Cookie: ", value?.state?.language);
    // const stringifiedValue = JSON.stringify(value);
    // Store the value as a URI-encoded string
    Cookies.set(name, encodeURIComponent(value?.state?.language), {
      expires: 365,
      secure: true,
      sameSite: "Strict",
    });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};