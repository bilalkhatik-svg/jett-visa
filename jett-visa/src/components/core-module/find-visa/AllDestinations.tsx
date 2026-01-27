"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/utils/i18nStub";
import { useFetchDestinationsQuery, type Destination as ApiDestination } from "@/store/visaDestinationsApi";
import { useAppSelector } from "@/store/hooks";
import { getApiLanguageCode } from "@/utils/helper";
import SearchIcon from "@/assets/images/icons/search.png";

const AllDestinationsPage = () => {
  const { t, i18n } = useTranslation();
  const nationality = useAppSelector((state) => state.locationSlice.nationality);
  const residency = useAppSelector((state) => state.locationSlice.residency);
  const [searchTerm, setSearchTerm] = useState("");

  const nationalityIsoCode = (nationality as any)?.isoCode || "";
  const currentLanguage = i18n.language || "en";
  const apiLanguage = getApiLanguageCode(currentLanguage);

  const { data: destinationsResponse, isLoading, isError } = useFetchDestinationsQuery(
    {
      continent: "",
      isoCode2: nationalityIsoCode,
      language: apiLanguage,
    },
    {
      skip: !nationalityIsoCode,
    }
  );

  const destinations = destinationsResponse?.response ?? [];
  const filteredDestinations = useMemo(() => {
    if (!searchTerm) return destinations;
    return destinations.filter((item: ApiDestination) =>
      item.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [destinations, searchTerm]);

  const searchIconSrc =
    typeof SearchIcon === "string" ? SearchIcon : (SearchIcon as any)?.src || SearchIcon;

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-24 pb-12">
        <h1 className="text-center text-[#003669] text-3xl font-semibold mb-6">
          {t("all_destinations") || "All destinations"}
        </h1>

        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-[600px]">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={t("search_by_country_or_city") || "Search by country or city"}
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

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <div className="text-center text-sm text-gray-500 py-10">
            {t("error_loading_destinations") || "Error loading destinations"}
          </div>
        )}

        {!isLoading && !isError && filteredDestinations.length === 0 && (
          <div className="text-center text-sm text-gray-500 py-10">
            {t("no_results") || "No results found"}
          </div>
        )}

        {!isLoading && !isError && filteredDestinations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {filteredDestinations.map((item) => (
              <div
                key={item.id}
                className="relative h-64 rounded-2xl overflow-hidden shadow-lg bg-gray-100"
              >
                <img
                  src={item.images?.[0]?.filename || "/assets/images/germany-card-img.webp"}
                  alt={item.countryName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-0 left-0 bg-white/25 backdrop-blur-sm border border-white/40 text-[#3F6B96] text-[10px] font-medium rounded-tl-[20px] rounded-br-[9px] pt-[6px] pr-[16px] pb-[6px] pl-[20px] inline-flex items-center whitespace-nowrap min-h-[33px]">
                  {item.visaModeName || item.visaMode || "Visa"}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-base mb-1">{item.countryName}</h3>
                  <div className="flex items-center justify-between text-xs">
                    <span>
                      {item.startsPrefix || "Starts"} {item.symbol}
                      {item.startingPrice}
                    </span>
                    <span className="bg-white/20 border border-white/30 rounded-full px-3 py-1">
                      {item.getVisaDays} {item.getVisaDays === 1 ? "day" : "days"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDestinationsPage;
