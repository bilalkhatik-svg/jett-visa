export type Country = {
    "id": string,
    "nationality": string,
    "residency": string,
    "flag": string,
    "isoCode": string,
    "currencyCode": string,
    "continent": string,
    "popularCities": string[],
    "acronyms": string[]
}

export interface ExtendedCountry extends Country {
    matchedCity?: string | null;
    displayName?: string;
}