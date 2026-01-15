import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIversion, BaseURL } from "@/utils/config";
import { oauthBaseQuery } from "@/utils/oauthBaseQuery";

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
        url: "visa/meta/home/content",
        method: "GET",
        params: { language },
      }),
    }),
  }),
});

export const { useFetchStaticContentQuery } = visaStaticContentApi;