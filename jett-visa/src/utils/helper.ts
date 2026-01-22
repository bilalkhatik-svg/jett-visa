/**
 * Convert i18n language codes to API-compatible language codes
 * @param languageCode - i18n language code (e.g., "en", "ar", "en-US", "ar-AE")
 * @returns API language code (e.g., "en-US", "ar-AE")
 */
export const getApiLanguageCode = (languageCode: string): string => {
  // If already in full format (e.g., "en-US", "ar-AE"), return as is
  if (languageCode && languageCode.includes('-')) {
    return languageCode;
  }

  // Map short codes to API format
  const languageMap: Record<string, string> = {
    'en': 'en-US',
    'ar': 'ar-AE',
    'english': 'en-US',
    'arabic': 'ar-AE',
  };

  // Convert to lowercase for case-insensitive matching
  const normalizedCode = (languageCode || 'en').toLowerCase();
  
  return languageMap[normalizedCode] || 'en-US';
};

/**
 * Get the short language code from a full language code
 * @param languageCode - Full language code (e.g., "en-US", "ar-AE")
 * @returns Short language code (e.g., "en", "ar")
 */
export const getShortLanguageCode = (languageCode: string): string => {
  if (!languageCode) return 'en';
  
  // If it contains a hyphen, get the part before it
  if (languageCode.includes('-')) {
    return languageCode.split('-')[0];
  }
  
  return languageCode;
};

