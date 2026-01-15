import { oauthBaseQuery } from "@/utils/oauthBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

interface VisaMode {
  Code: string;
  Name: string;
  Description: string;
  Icon: string;
  Url: string;
  Priority: number;
}

interface VisaModeApiResponse {
  context?: Record<string, any>;
  response: VisaMode[];
  error?: any;
}

export const visaModesApi = createApi({
  reducerPath: "visaModesApi",
  baseQuery: oauthBaseQuery,
  endpoints: (builder) => ({
    fetchModesList: builder.query<VisaModeApiResponse, string | void>({
      query: (language = "en-US") => ({
        url: "modes",
        method: "GET",
        params: { language },
      }),
    }),
  }),
});

export const { useFetchModesListQuery } = visaModesApi;
