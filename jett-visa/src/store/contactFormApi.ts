import { createApi } from "@reduxjs/toolkit/query/react";
<<<<<<< HEAD
import { oauthBaseQuery } from "@/utils/oauthBaseQuery";
=======
import { oauthBaseQuery } from "@/utility/oauthBaseQuery";

interface CreateVisaTicketPayload {
  [key: string]: any;
}
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54

export const visaTicketApi = createApi({
    reducerPath: "visaTicketApi",
    baseQuery: oauthBaseQuery,
     endpoints: (builder) => ({
<<<<<<< HEAD
    createVisaTicket: builder.mutation({
      query: (payload) => ({
=======
    createVisaTicket: builder.mutation<any, CreateVisaTicketPayload>({
      query: (payload: CreateVisaTicketPayload) => ({
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
        url: "tickets/create-ticket",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateVisaTicketMutation } = visaTicketApi;