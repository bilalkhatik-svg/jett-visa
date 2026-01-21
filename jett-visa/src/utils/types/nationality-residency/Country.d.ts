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
    }
export type Nationality = ICountry;
export type Residency = ICountry;
