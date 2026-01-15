import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { RootState } from "@/store/store";
import { DEFAULT_OAUTH_CREDENTIALS } from "./oauthCredentials";

// Get base URL from environment or use default
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use relative path or environment variable
    return process.env.NEXT_PUBLIC_API_GATEWAY_URL || '/api/v1';
  }
  // Server-side: use environment variable or default
  return process.env.API_BASE_URL || 'https://saas.dev.api.musafirbiz.com/api/v1';
};

// Base query with OAuth headers
const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    let consumerKey: string | null = null;
    let consumerSecret: string | null = null;
    let accessToken: string | null = null;
    let authSource = 'default';
    
    try {
      const state = getState() as RootState;
      
      // Try to get OAuth tokens from authorizationApi first
      const authState = state?.authorizationApi as any;
      const authQuery = authState?.queries?.['authorize'];
      let auth = authQuery?.data?.Response?.Auth1dot0;
      
      // If not found in authorizationApi, try loginSlice
      if (!auth && state?.loginSlice?.authorizationTokens) {
        const loginAuth = state.loginSlice.authorizationTokens;
        if (loginAuth?.ConsumerKey && loginAuth?.ConsumerSecret && loginAuth?.AccessToken) {
          auth = {
            ConsumerKey: loginAuth.ConsumerKey,
            ConsumerSecret: loginAuth.ConsumerSecret,
            AccessToken: loginAuth.AccessToken,
          };
          authSource = 'redux-loginSlice';
        }
      } else if (auth) {
        authSource = 'redux-authorizationApi';
      }
      
      // Use auth from Redux if available
      if (auth?.ConsumerKey && auth?.ConsumerSecret && auth?.AccessToken) {
        consumerKey = auth.ConsumerKey;
        consumerSecret = auth.ConsumerSecret;
        accessToken = auth.AccessToken;
      }
    } catch (error) {
      // If Redux state is not available, continue to fallbacks
      console.warn('[OAuth] Error accessing Redux state, using fallback credentials');
    }
    
    // Fallback to environment variables if Redux state not available
    if (!consumerKey || !consumerSecret || !accessToken) {
      const envConsumerKey = process.env.NEXT_PUBLIC_CONSUMER_KEY || process.env.CONSUMER_KEY;
      const envConsumerSecret = process.env.NEXT_PUBLIC_CONSUMER_SECRET || process.env.CONSUMER_SECRET;
      const envAccessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || process.env.ACCESS_TOKEN;
      
      if (envConsumerKey && envConsumerSecret && envAccessToken) {
        consumerKey = envConsumerKey;
        consumerSecret = envConsumerSecret;
        accessToken = envAccessToken;
        authSource = 'environment';
      }
    }
    
    // Final fallback: use default credentials (always available)
    if (!consumerKey || !consumerSecret || !accessToken) {
      consumerKey = DEFAULT_OAUTH_CREDENTIALS.ConsumerKey;
      consumerSecret = DEFAULT_OAUTH_CREDENTIALS.ConsumerSecret;
      accessToken = DEFAULT_OAUTH_CREDENTIALS.AccessToken;
      authSource = 'default';
    }
    
    // Always set the headers
    headers.set('ConsumerKey', consumerKey);
    headers.set('ConsumerSecret', consumerSecret);
    headers.set('AccessToken', accessToken);
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[OAuth] Using ${authSource} credentials for authentication`);
      console.log('[OAuth] Headers set:', {
        ConsumerKey: consumerKey.substring(0, 20) + '...',
        ConsumerSecret: consumerSecret.substring(0, 20) + '...',
        AccessToken: accessToken.substring(0, 20) + '...',
      });
    }
    
    
    // Add language header from cookies or i18n
    if (typeof window !== 'undefined') {
      try {
        const Cookies = require('js-cookie');
        const language = Cookies.get('i18n-storage') || 'en-US';
        headers.set('Accept-Language', language);
      } catch (e) {
        // Cookies not available, use default
        headers.set('Accept-Language', 'en-US');
      }
    }
    
    headers.set('Content-Type', 'application/json');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return headers;
  },
});

// OAuth base query wrapper
export const oauthBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    
    // Log the full result for debugging
    console.log('[OAuth Base Query] Full result:', {
      hasError: 'error' in result,
      hasData: 'data' in result,
      result: result,
    });
    
    // Log errors for debugging
    if ('error' in result) {
      const error = result.error as any;
      const url = typeof args === 'string' ? args : (args as FetchArgs)?.url;
      const status = error?.status || error?.originalStatus;
      
      console.error('[OAuth Base Query] Request failed:', {
        status,
        statusText: error?.statusText,
        data: error?.data,
        error: error,
        fullError: JSON.stringify(error, null, 2),
        url,
        args: typeof args === 'string' ? args : args,
      });
      
      // Check if it's a network error
      if (error?.status === 'FETCH_ERROR' || error?.error === 'TypeError: Failed to fetch') {
        console.error('[OAuth Base Query] Network error - Check if API proxy is running and accessible');
        console.error('[OAuth Base Query] Base URL:', getBaseUrl());
        console.error('[OAuth Base Query] Full URL:', typeof args === 'string' ? `${getBaseUrl()}/${args}` : `${getBaseUrl()}/${args.url}`);
      }
      
      if (status === 401) {
        console.error('[OAuth Base Query] 401 Unauthorized - Check if OAuth credentials are being sent correctly');
        console.error('[OAuth Base Query] Request URL:', url);
        console.error('[OAuth Base Query] Error data:', error?.data);
      }
    } else if ('data' in result) {
      console.log('[OAuth Base Query] Request successful:', {
        url: typeof args === 'string' ? args : (args as FetchArgs)?.url,
        hasData: !!result.data,
      });
    }
    
    return result;
  } catch (error: any) {
    console.error('[OAuth Base Query] Unexpected error:', error);
    console.error('[OAuth Base Query] Error stack:', error?.stack);
    throw error;
  }
};

