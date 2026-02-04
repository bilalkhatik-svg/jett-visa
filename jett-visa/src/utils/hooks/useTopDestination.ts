import { getApiLanguageCode } from "@/utils/helper";
import i18n from "i18next";
import { useFetchTopDestinationQuery } from "@/store/visaTopDestinationApi";

export interface DestinationImage {
  Filename: string;
}

export interface TopDestination {
  IsoCode2: string;
  Name: string;
  Type: "CITY" | "COUNTRY";
  Order: number;
  Status: "ACTIVE" | string;
  Images: DestinationImage[];
  Description: string;
  VisaMode?: string;
  VisaType?: string;
  StartingPrice: number;
  StartsPrefix?: string;
  Url?: string;
  GetVisaDays: number;
  Unit: "DAY" | string;
  ApplyTo: any[];
}

export const useTopDestination = () => {
  const currentLanguage = i18n.language || "en";
  const apiLanguage = getApiLanguageCode(currentLanguage);
  const count = 20; 
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useFetchTopDestinationQuery({language: apiLanguage, count}, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });

  return {
    refetchTopDestinations: refetch,
    topDestinationList: data?.Response ?? [] as TopDestination[],
    isTopDestinationListPending: isLoading,
    isError,
    isSuccess,
  };
};
