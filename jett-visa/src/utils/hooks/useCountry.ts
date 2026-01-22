import { getApiLanguageCode } from "@/utils/helper";
import i18n from "i18next";
import { useFetchCountryListQuery } from "@/store/visaCountryListApi";

export const useCountry = () => {
  const currentLanguage = i18n.language || "en";
  const apiLanguage = getApiLanguageCode(currentLanguage);
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch
  } = useFetchCountryListQuery(apiLanguage, {
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
});

  return {
    refetchCountryList: refetch,
    countryListData: data,
    isCountryListPending: isLoading,
    isError,
    isSuccess,
  };
};
