import { getApiLanguageCode } from "@/utils/helper";
import i18n from "i18next";
import { useFetchModesListQuery } from "@/store/visaModesListApi";

export const useVisaModes = () => {

  const currentLanguage = i18n.language || "en";
  const apiLanguage = getApiLanguageCode(currentLanguage);

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch
  } = useFetchModesListQuery(apiLanguage, {
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
});
console.log(data,'data**')
  return {
    refetchVisaModesList: refetch,
    visaModesList: data,
    isVisaModesListPending: isLoading,
    isError,
    isSuccess,
  };
};
