import { oauthBaseQuery } from "@/utils/oauthBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


export interface DestinationImage {
  Filename: string;
}

export interface TopDestination {
  IsoCode2: string;
  Name: string;
  Type: "CITY" | "COUNTRY";
  Order: number;
  Status: "ACTIVE" | string;
  Images: DestinationImage[];
  Description: string;
  GetVisaDays: number;
  Unit: "DAY" | string;
  ApplyTo: any[];
}

export interface VisaTopDestinationResponse {
  Context: {
    StatusCode: number;
    TrackingId: string;
    Message: string;
    TransactionId: string;
  };
  Response: TopDestination[];
  error?: any | null;
}

export const visaTopDestinationApi = createApi({

  reducerPath: "visaTopDestinationApi",
  baseQuery: oauthBaseQuery,
  endpoints: (builder) => ({
    fetchTopDestination: builder.query({
      query: ({ language, count }) => ({
        url: "visa/destination/topdestinations",
        method: "GET",
        params: {
          language,
          count,
        },
      }),
    }),
  }),
})

export const { useFetchTopDestinationQuery } = visaTopDestinationApi