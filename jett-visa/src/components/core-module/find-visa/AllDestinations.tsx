"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/utils/i18nStub";
import { useFetchDestinationsQuery, type Destination as ApiDestination } from "@/store/visaDestinationsApi";
import { useAppSelector } from "@/store/hooks";
import { getApiLanguageCode } from "@/utils/helper";
import SearchIcon from "@/assets/images/icons/search.png";
import TopDestinationSection, { type PendingAction } from "@/components-library/home-screen/top-destination-section/TopDestinationSection";
import { useRouter } from "next/navigation";

const AllDestinationsPage = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const nationality = useAppSelector((state) => state.locationSlice.nationality);
  const residency = useAppSelector((state) => state.locationSlice.residency);
  const [searchTerm, setSearchTerm] = useState("");

  const nationalityIsoCode = (nationality as any)?.isoCode || "";
 

  const [selectedContinent, setSelectedContinent] = useState<string>("Asia");
    
    // Get API language
    const currentLanguage = i18n.language || "en";
    const apiLanguage = getApiLanguageCode(currentLanguage);
  
    // Fetch destinations from API
    const { data: destinationsResponse, isLoading, isError } = useFetchDestinationsQuery(
      {
        continent: selectedContinent,
        isoCode2: nationalityIsoCode || (nationality as any)?.isoCode || "",
        language: apiLanguage,
      },
      {
        skip: !nationalityIsoCode && !(nationality as any)?.isoCode,
      });

  const destinations = destinationsResponse?.response ?? [];
  const filteredDestinations = useMemo(() => {
    if (!searchTerm) return destinations;
    return destinations.filter((item: ApiDestination) =>
      item.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [destinations, searchTerm]);

  // Map Destination to TopDestinationItem format
  const mappedDestinations = useMemo(() => {
    return filteredDestinations.map((item: ApiDestination) => ({
      VisaType: item.visaModeName || item.visaMode || "E-Visa",
      imageUrl: item.images?.[0]?.filename || "",
      name: item.countryName || "",
      GetVisaDays: item.getVisaDays || 0,
      order: 0,
      unit: "days",
      currencyCode: item.currencyCode || "",
      CountryCode: item.isoCode2 || "",
      StartingPrice: item.startingPrice || 0,
    }));
  }, [filteredDestinations]);

  const handlePreFlowNavigation = (action: PendingAction): boolean => {
    if (action.type === "navigate" && action.url) {
      router.push(action.url);
      return true;
    }
    return false;
  };

  const searchIconSrc =
    typeof SearchIcon === "string" ? SearchIcon : (SearchIcon as any)?.src || SearchIcon;

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-24 pb-12">

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-[600px]">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={t("Search by country or city") || "Search by country or city"}
              className="w-full h-[46px] rounded-full border border-[#E7ECF2] bg-white px-5 pr-12 text-sm text-[#667085] focus:outline-none focus:border-[#003669]"
            />
            <img
              src={searchIconSrc}
              alt=""
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70"
            />
          </div>
        </div>

        <div className="mb-6 text-sm text-[#003669] font-medium">
          {t("based_on_nationality_and_residency") || "Based on your nationality & residency"}
          <span className="text-[#6B7280] font-normal">
            {" "}
            • {filteredDestinations.length}{" "}
            {filteredDestinations.length === 1 ? "destination" : "destinations"}
          </span>
        </div>

        {isError && (
          <div className="text-center text-sm text-gray-500 py-10">
            {t("error_loading_destinations") || "Error loading destinations"}
          </div>
        )}

        {!isError && !isLoading && filteredDestinations.length === 0 && (
          <div className="text-center text-sm text-gray-500 py-10">
            {t("no_results") || "No results found"}
          </div>
        )}

        {!isError && (
          <div className="w-full">
            <TopDestinationSection
              onPreFlowNavigation={handlePreFlowNavigation}
              destinations={mappedDestinations}
              isLoading={isLoading}
              hideViewAll={true}
              title={t("all_destinations") || "All destinations"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDestinationsPage;
