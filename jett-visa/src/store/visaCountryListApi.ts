import { createApi } from "@reduxjs/toolkit/query/react";
<<<<<<< HEAD
import { oauthBaseQuery } from "@/utils/oauthBaseQuery";
=======
import { oauthBaseQuery } from "@/utility/oauthBaseQuery";
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54

export const visaCountryListApi = createApi({
  reducerPath: "visaCountryListApi",
  baseQuery: oauthBaseQuery,
  endpoints: (builder) => ({
    fetchCountryList: builder.query({
      query: (language = "en-US") => ({
<<<<<<< HEAD
        url: "visa/countries/all",
=======
        url: "countries/all",
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
        method: "GET",
        params: { language },
      }),
    }),
  }),
});


export const {
  useFetchCountryListQuery,
} = visaCountryListApi;
