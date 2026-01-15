import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Authorization API
 * 
 * This API handles the authorization flow to get ConsumerKey, ConsumerSecret, and AccessToken.
 * 
 * Usage example:
 * ```tsx
 * import { useAuthorization } from '@/utility/hooks/useAuthorization';
 * 
 * const { authorize, isLoading, error } = useAuthorization();
 * 
 * const handleAuth = async () => {
 *   try {
 *     const encryptedRequest = "your-encrypted-request-string";
 *     const result = await authorize(encryptedRequest, "192.168.1.1"); // IP is optional
 *     // Tokens are automatically stored in Redux and will be included in all API calls
 *   } catch (err) {
 *     console.error('Authorization failed:', err);
 *   }
 * };
 * ```
 * 
 * After authorization, ConsumerKey, ConsumerSecret, and AccessToken are automatically
 * included as headers in all API requests via the prepareHeaders function.
 */

// Helper function to generate UUID v4
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Helper function to get IP address (fallback to default if not available)
const getIpAddress = (): string => {
  // In a real scenario, you might fetch this from an IP service
  // For now, we'll use a default or try to get from localStorage if available
  return '192.168.1.1';
};

// Helper function to get User Agent
const getUserAgent = (): string => {
  return navigator.userAgent || 'Mozilla/5.0';
};

export interface AuthorizationRequest {
  Context: {
    UserAgent: string;
    TrackingId: string;
    TransactionId: string;
    IpAddress: string;
  };
  Request: string;
}

export interface AuthorizationResponse {
  Context: {
    StatusCode: number;
    Message: string;
    TransactionId: string;
  };
  Response: {
    Auth1dot0: {
      ConsumerKey: string;
      ConsumerSecret: string;
      AccessToken: string;
      ExpiryAt: string;
    };
    RefreshToken: string;
    RefreshTokenExpiryAt: string;
  };
}

// Use environment variable or fallback to hardcoded URL
// In development, this will use the proxy configured in next.config.ts
const getAuthorizationBaseUrl = () => {
  // In development, use relative path to leverage Next.js proxy
  if (process.env.NODE_ENV === 'development') {
    return '/api/v1';
  }
  // In production, use environment variable or fallback
  return process.env.NEXT_PUBLIC_AUTHORIZATION_API_URL 
    ? `${process.env.NEXT_PUBLIC_AUTHORIZATION_API_URL}/api/v1`
    : 'https://saas.dev.api.musafirbiz.com/api/v1';
};

export const authorizationApi = createApi({
  reducerPath: "authorizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getAuthorizationBaseUrl(),
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authorize: builder.mutation<AuthorizationResponse, { encryptedRequest: string; ipAddress?: string }>({
      query: ({ encryptedRequest, ipAddress }) => {
        const requestBody: AuthorizationRequest = {
          Context: {
            UserAgent: getUserAgent(),
            TrackingId: generateUUID(),
            TransactionId: generateUUID(),
            IpAddress: ipAddress || getIpAddress(),
          },
          Request: encryptedRequest,
        };

        return {
          url: "/token/authorize",
          method: "POST",
          body: requestBody,
        };
      },
    }),
  }),
});

export const { useAuthorizeMutation } = authorizationApi;

