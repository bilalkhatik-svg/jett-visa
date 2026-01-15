import { useAuthorizeMutation } from '@/store/authorizationApi';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setAuthorizationTokens } from '@/store/slice/loginSlice';
import { saveAuthTokens } from '@/utils/authStorage';

/**
 * Custom hook to handle authorization
 * @returns Object with authorize function and loading/error states
 */
export const useAuthorization = () => {
  // debugger;
  const dispatch = useDispatch();
  const [authorize, { isLoading, error }] = useAuthorizeMutation();

  const handleAuthorize = useCallback(async (encryptedRequest: string, ipAddress?: string) => {
    try {
      const result = await authorize({ encryptedRequest, ipAddress }).unwrap();
     
      
      // Store the tokens in Redux
      if (result?.Response?.Auth1dot0) {
        const tokens = {
          ConsumerKey: result.Response.Auth1dot0.ConsumerKey,
          ConsumerSecret: result.Response.Auth1dot0.ConsumerSecret,
          AccessToken: result.Response.Auth1dot0.AccessToken,
        };

        dispatch(setAuthorizationTokens(tokens));
        saveAuthTokens(tokens);
      }
       console.log("Authorization Result:", result);
      return result;
    } catch (err) {
      console.error('Authorization failed:', err);
      throw err;
    }
  }, [authorize, dispatch]);

  return {
    authorize: handleAuthorize,
    isLoading,
    error,
  };
};
