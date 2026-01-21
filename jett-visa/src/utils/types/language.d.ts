export interface Language {
  code: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

export interface LanguageState {
  currentLanguage: Language;
  availableLanguages: Language[];
  loading: boolean;
  error: string | null;
}

export interface SaveLanguagePayload {
  userId?: string;
  languageCode: string;
}
