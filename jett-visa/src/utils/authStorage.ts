export interface AuthTokens {
  ConsumerKey?: string;
  ConsumerSecret?: string;
  AccessToken?: string;
  ExpiryAt?: string;
}

const AUTH_STORAGE_KEY = "authorizationTokens";

export const loadAuthTokens = (): AuthTokens | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AuthTokens) : null;
  } catch (error) {
    return null;
  }
};

export const saveAuthTokens = (tokens: AuthTokens) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
  } catch (error) {
    // Failed to save tokens to storage
  }
};

export const clearAuthTokens = () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    // Failed to clear tokens from storage
  }
};
