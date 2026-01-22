export interface ICountry {
      "id": string;
      "nationality": string;
      "residency": string,
      "flag": string,
      "isoCode": string,
      "currencyCode":string,
      "continent": string,
      "popularCities": string[],
      "acronyms":string []
      "name":string
      "IsoCode2":string
    }
export type Nationality = ICountry;
export type Residency = ICountry;
export interface ExtendedCountry extends ICountry {
    matchedCity?: string | null;
    displayName?: string;
}

export type PendingAction = {
  type: string;
  destination?: any;
  [key: string]: any;
};