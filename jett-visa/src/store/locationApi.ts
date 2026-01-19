import { IPFetchURL } from "@/utils/config";
import { oauthBaseQuery } from "@/utils/oauthBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LocationResponse {
    ip: string;
    countryIsoCode: string;
    residency: string;
    nationality?: string;
}

interface IPResponse {
    ip: string;
}

interface GeoIPApiResponse {
    response?: {
        countryIsoCode?: string;
        residency?: string;
    };
}

const getIPBaseUrl = () => {
    // In development, use the local Next dev server URL explicitly.
    if (process.env.NODE_ENV === "development") {
        return "/ip-api";
    }

    if (!IPFetchURL) {
        console.warn("IPFetchURL is not defined",);
        return '';
    }

    try {
        const url = new URL(IPFetchURL);
        return url.origin;
    } catch (error) {
        console.error("Invalid IPFetchURL:",);
        return '';
    }
};

export const ipApi = createApi({
    reducerPath: "ipApi",
    baseQuery: fetchBaseQuery({
        baseUrl: getIPBaseUrl(),
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchIP: builder.query<IPResponse, void>({
            query: () => ({
                url: "/json",
                method: "GET",
            }),
        }),
    }),
});

export const locationApi = createApi({
    reducerPath: "locationApi",
    baseQuery: oauthBaseQuery,
    endpoints: (builder) => ({
        fetchGeoIP: builder.query<GeoIPApiResponse, string>({
            query: (ip) => ({
                url: "geoip",
                method: "GET",
                params: { ip },
            }),
        }),
    }),
});

export const { useFetchIPQuery } = ipApi;
export const { useFetchGeoIPQuery} = locationApi;
