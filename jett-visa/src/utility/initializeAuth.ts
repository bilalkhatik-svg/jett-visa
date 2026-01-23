import { store } from "@/store/store";
import { setAuthorizationTokens } from "@/store/slice/loginSlice";
import type { AuthTokens } from "@/utils/authStorage";

/**
 * Initialize OAuth credentials from environment variables
 * and store them in Redux store
 */
export function initializeAuthFromEnv(): void {
  if (typeof window === "undefined") {
    return;
  }

  const consumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY;
  const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  // Only initialize if all required tokens are present
  if (consumerKey && consumerSecret && accessToken) {
    const authTokens: AuthTokens = {
      ConsumerKey: consumerKey,
      ConsumerSecret: consumerSecret,
      AccessToken: accessToken,
    };

    // Dispatch to Redux store
    store.dispatch(setAuthorizationTokens(authTokens));
  }
}

