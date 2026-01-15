import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { APIversion, BaseGatewayURL } from "@/utils/config";
import type { RootState } from "@/store/store";
import CryptoJS from "crypto-js";
import OAuth from "oauth-1.0a";
import { loadAuthTokens } from "@/utils/authStorage";
import { setAuthorizationTokens } from "@/store/slice/loginSlice";

export const oauthBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;

  let authTokens = state.loginSlice?.authorizationTokens;

  if (!authTokens?.AccessToken) {
    const storedTokens = loadAuthTokens();
    if (storedTokens?.AccessToken) {
      authTokens = storedTokens;
      api.dispatch(setAuthorizationTokens(storedTokens));
    }
  }



  /** -----------------------------------------------------
   *  Build URL + Method (same structure RTK Query expects)
   * ----------------------------------------------------- */
  const endpoint = typeof args === "string" ? args : args.url;
  const method =
    (typeof args === "string" ? "GET" : args.method || "GET").toUpperCase();

  /** -----------------------------------------------------
   *  Build Query Params (RTK Query style)
   * ----------------------------------------------------- */
  const urlParams =
    typeof args === "string" ? undefined : (args.params as Record<string, unknown>);

  // For fetchBaseQuery: use full URL to call dev API directly
  // Equivalent to import.meta.env.DEV in Vite
  let baseUrl: string;
  baseUrl = `${BaseGatewayURL}${APIversion}`;

  // For OAuth signature: always use full absolute URL
  const fullBaseUrl = `${BaseGatewayURL}${APIversion}`;
  const requestData = {
    url: `${fullBaseUrl}${endpoint}`,
    method,
    data: urlParams ?? undefined,
  };

  let rawBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>;
  if (
    !authTokens?.ConsumerKey ||
    !authTokens?.ConsumerSecret ||
    !authTokens?.AccessToken
  ) {
    rawBaseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        return headers;
      },
    });
  } else {
    /** -----------------------------------------------------
   *  OAuth 1.0a Signature (same as your fetch version)
   * ----------------------------------------------------- */
    const oauth = new OAuth({
      consumer: {
        key: authTokens.ConsumerKey,
        secret: authTokens.ConsumerSecret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(baseString: string, key: string) {
        return CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64);
      },
    });

    const token = { key: authTokens.AccessToken, secret: "" };

    // signature always computed on base URL without query params

    const oauthData = oauth.authorize(requestData, token);
    const oauthHeader = oauth.toHeader(oauthData);

    /** -----------------------------------------------------
     *  Use fetchBaseQuery but override its headers
    //  * ----------------------------------------------------- */
    rawBaseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");

        // Add OAuth signature header
        Object.entries(oauthHeader).forEach(([key, value]) =>
          headers.set(key, value as string)
        );

        return headers;
      },
    });

  }

  /** -----------------------------------------------------
   *  Pass through to fetchBaseQuery
   * ----------------------------------------------------- */
  const result = await rawBaseQuery(
    {
      url: endpoint,
      method,
      params: urlParams,
      body: typeof args === "string" ? undefined : args.body,
    },
    api,
    extraOptions
  );

  return result;
};
