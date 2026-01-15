<<<<<<< HEAD
import { oauthBaseQuery } from "@/utils/oauthBaseQuery";
=======
import { oauthBaseQuery } from "@/utility/oauthBaseQuery";
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
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
