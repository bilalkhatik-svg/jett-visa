import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
<<<<<<< HEAD
import { APIversion, BaseURL } from "@/utils/config";
import { oauthBaseQuery } from "@/utils/oauthBaseQuery";
=======
import { oauthBaseQuery } from "@/utility/oauthBaseQuery";
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54

export interface HowToApplyStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

export interface UniqueValueProposition {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  order: number;
  question: string;
  answer: string;
}

export interface StaticContentResponse {
  howToApply: HowToApplyStep[];
  uniqueValuePropositions: UniqueValueProposition[];
  faqs: FAQ[];
}

export interface ApiResponse {
  context: {
    statusCode: number;
    trackingId: string;
    message: string;
    tte: string | null;
    transactionId: string;
  };
  response: StaticContentResponse[];
  error: null | string;
}

export const visaStaticContentApi = createApi({
  reducerPath: "visaStaticContentApi",
  baseQuery: oauthBaseQuery,
  endpoints: (builder) => ({
    fetchStaticContent: builder.query<ApiResponse, { language: string; }>({
      query: ({ language } ) => ({
<<<<<<< HEAD
        url: "visa/meta/home/content",
=======
        url: "meta/home/content",
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
        method: "GET",
        params: { language },
      }),
    }),
  }),
});

export const { useFetchStaticContentQuery } = visaStaticContentApi;