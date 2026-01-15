import { createApi } from "@reduxjs/toolkit/query/react";
import { oauthBaseQuery } from "@/utility/oauthBaseQuery";

export const visaCountryListApi = createApi({
  reducerPath: "visaCountryListApi",
  baseQuery: oauthBaseQuery,
  endpoints: (builder) => ({
    fetchCountryList: builder.query({
      query: (language = "en-US") => ({
        url: "countries/all",
        method: "GET",
        params: { language },
      }),
    }),
  }),
});


export const {
  useFetchCountryListQuery,
} = visaCountryListApi;
