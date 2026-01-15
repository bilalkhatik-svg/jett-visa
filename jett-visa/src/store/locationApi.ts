<<<<<<< HEAD
import { IPFetchURL } from "@/utils/config";
import { oauthBaseQuery } from "@/utils/oauthBaseQuery";
=======
import { oauthBaseQuery } from "@/utility/oauthBaseQuery";
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
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
<<<<<<< HEAD
    // In development, use the local Next dev server URL explicitly.
    if (process.env.NODE_ENV === "development") {
        return "/ip-api";
    }

    if (!IPFetchURL) {
        console.warn("IPFetchURL is not defined",);
=======
    // In development, use relative path to leverage Next.js proxy
    if (process.env.NODE_ENV === 'development') {
        return '/ip-api';
    }

    // Use environment variable or fallback to default IP service
    const IPFetchURL = process.env.NEXT_PUBLIC_IP_FETCH_URL || 'https://api.ipify.org';
    
    if (!IPFetchURL) {
        console.warn("IPFetchURL is not defined");
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
        return '';
    }

    try {
        const url = new URL(IPFetchURL);
        return url.origin;
    } catch (error) {
<<<<<<< HEAD
        console.error("Invalid IPFetchURL:",);
=======
        console.error("Invalid IPFetchURL:", error);
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
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
<<<<<<< HEAD
                url: "/json",
=======
                url: "/json/",
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
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