export interface Country {
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
export type Nationality = Country;
export type Residency = Country;
