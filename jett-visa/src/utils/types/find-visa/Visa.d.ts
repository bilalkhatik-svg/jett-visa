export interface VisaChip {
  type: 'price' | 'processing' | 'mode';
  label: string;
  value: string;
}

export interface Destination {
  id: string;
  country: string;
  countryCode: string;
  image: string;
  chips: VisaChip[];
  active: boolean;
  continent: string;
}

export interface VisaApiResponse {
  destinations: Destination[];
}

export interface Nationality {
  "id": string;
  "nationality": string;
  "residency": string,
  "flag": string,
  "isoCode": string,
  "currencyCode": string,
  "continent": string,
  "popularCities": string[],
  "acronyms": string[]
}

export interface VisaApiParams {
  entity: string;
  nationality: string;
  continent?: string;
}