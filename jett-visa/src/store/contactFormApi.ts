import { createApi } from "@reduxjs/toolkit/query/react";
import { oauthBaseQuery } from "@/utility/oauthBaseQuery";

interface CreateVisaTicketPayload {
  [key: string]: any;
}

export const visaTicketApi = createApi({
    reducerPath: "visaTicketApi",
    baseQuery: oauthBaseQuery,
     endpoints: (builder) => ({
    createVisaTicket: builder.mutation<any, CreateVisaTicketPayload>({
      query: (payload: CreateVisaTicketPayload) => ({
        url: "tickets/create-ticket",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateVisaTicketMutation } = visaTicketApi;