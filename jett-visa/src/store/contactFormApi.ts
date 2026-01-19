import { createApi } from "@reduxjs/toolkit/query/react";
import { oauthBaseQuery } from "@/utils/oauthBaseQuery";

export const visaTicketApi = createApi({
    reducerPath: "visaTicketApi",
    baseQuery: oauthBaseQuery,
     endpoints: (builder) => ({
    createVisaTicket: builder.mutation({
      query: (payload) => ({
        url: "tickets/create-ticket",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateVisaTicketMutation } = visaTicketApi;
