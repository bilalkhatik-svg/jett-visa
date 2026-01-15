import { useEffect } from 'react';
import { useAuthorizeMutation } from '@/store/authorizationApi';
import { useAppDispatch } from '@/store/hooks';
import { setAuthorizationTokens } from '@/store/slice/loginSlice';

/**
 * Hook to handle authorization
 * 
 * Usage:
 * ```tsx
 * const { authorize, isLoading, error } = useAuthorization();
 * 
 * // Call authorize when needed
 * await authorize({ encryptedRequest: 'your-encrypted-request' });
 * ```
 */
export const useAuthorization = () => {
  const dispatch = useAppDispatch();
  const [authorizeMutation, { isLoading, error }] = useAuthorizeMutation();

  const authorize = async (encryptedRequest: string, ipAddress?: string) => {
    try {
      const result = await authorizeMutation({ encryptedRequest, ipAddress }).unwrap();
      
      // Store tokens in loginSlice for easier access
      if (result?.Response?.Auth1dot0) {
        dispatch(setAuthorizationTokens({
          ConsumerKey: result.Response.Auth1dot0.ConsumerKey,
          ConsumerSecret: result.Response.Auth1dot0.ConsumerSecret,
          AccessToken: result.Response.Auth1dot0.AccessToken,
          ExpiryAt: result.Response.Auth1dot0.ExpiryAt,
        }));
      }
      
      return result;
    } catch (err) {
      console.error('[Authorization] Failed:', err);
      throw err;
    }
  };

  return {
    authorize,
    isLoading,
    error,
  };
};


