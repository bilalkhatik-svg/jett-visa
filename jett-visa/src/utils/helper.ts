export const getCountryVisaUrl = (nationality: string, residency: string) => {
  return `${window.location.origin}/explore/${encodeURIComponent(nationality)}/${encodeURIComponent(residency)}`;
};

export const LANGUAGE_MAP: Record<string, string> = {
  en: "en-US",
  ar: "ar-AE",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  it: "it-IT",
  ru: "ru-RU",
  zh: "zh-CN",
  ja: "ja-JP",
  hi: "hi-IN",
  "en-US": "en-US",
  "ar-AE": "ar-AE",
  "fr-FR": "fr-FR",
  "de-DE": "de-DE",
  "es-ES": "es-ES",
  "it-IT": "it-IT",
  "ru-RU": "ru-RU",
  "zh-CN": "zh-CN",
  "ja-JP": "ja-JP",
  "hi-IN": "hi-IN",
};

/**
 * Helper function to get API-compatible language code.
 * Fallbacks to English if not found.
 */
export const getApiLanguageCode = (lang?: string): string => {
  if (!lang) return "en-US";
  return LANGUAGE_MAP[lang] || "en-US";
};

export const getTravelDateVisaUrl = () => {
  return `${window.location.origin}/explore/travel-date`;
};

export const formatDate = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;


export const goToDocuments = () => {
  const uiBaseUrl = process.env.NEXT_PUBLIC_AUTHORIZATION_API_URL;
  if (uiBaseUrl) {
    window.location.href = `${uiBaseUrl}/dashboard/documents`;
  } else {
    window.location.href = 'https://devvisa.musafirbiz.com/dashboard/documents';
  }
};

export const goToWishlist = () => {
  const uiBaseUrl = process.env.NEXT_PUBLIC_AUTHORIZATION_API_URL;
  if (uiBaseUrl) {
    window.location.href = `${uiBaseUrl}/dashboard/wishlist`;
  } else {
    window.location.href = 'https://devvisa.musafirbiz.com/dashboard/wishlist';
  }
};

export const getEntityId = () => {
  return "690d9de767ed2fd1dad34243";
};

export const returnToAccounts = () => {
  const uiBaseUrl = process.env.NEXT_PUBLIC_AUTHORIZATION_API_URL;
  if (uiBaseUrl) {
    window.location.href = `${uiBaseUrl}/accounts`;
  } else {
    window.location.href = 'https://devvisa.musafirbiz.com/accounts';
  }
};

export const goToMyApplications = () => {
  const uiBaseUrl = process.env.NEXT_PUBLIC_AUTHORIZATION_API_URL;
  if (uiBaseUrl) {
    window.location.href = `${uiBaseUrl}/dashboard/my-application`;
  } else {
    window.location.href = 'https://devvisa.musafirbiz.com/dashboard/my-application';
  }
};
