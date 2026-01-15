/**
 * Initialize OAuth credentials from environment variables
 * This should be called on app startup to set default credentials
 */
import { store } from '@/store/store';
import { setAuthorizationTokens } from '@/store/slice/loginSlice';
import { DEFAULT_OAUTH_CREDENTIALS } from './oauthCredentials';

export const initializeAuthFromEnv = () => {
  // Check for environment variables first, then fallback to defaults
  const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY || process.env.CONSUMER_KEY || DEFAULT_OAUTH_CREDENTIALS.ConsumerKey;
  const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET || process.env.CONSUMER_SECRET || DEFAULT_OAUTH_CREDENTIALS.ConsumerSecret;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || process.env.ACCESS_TOKEN || DEFAULT_OAUTH_CREDENTIALS.AccessToken;
  
  if (consumerKey && consumerSecret && accessToken) {
    // Store in Redux so oauthBaseQuery can use them
    store.dispatch(setAuthorizationTokens({
      ConsumerKey: consumerKey,
      ConsumerSecret: consumerSecret,
      AccessToken: accessToken,
      ExpiryAt: undefined, // Environment tokens don't have expiry
    }));
    
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth] Initialized OAuth credentials');
    }
    
    return true;
  }
  
  return false;
};


