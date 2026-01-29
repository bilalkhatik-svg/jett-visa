"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "@/utils/i18nStub";
import { useAppSelector } from "@/store/hooks";
import { getApiLanguageCode } from "@/utils/helper";
import SearchIcon from "@/assets/images/icons/search.png";
import TopDestinationSection, {
  type PendingAction,
} from "@/components-library/home-screen/top-destination-section/TopDestinationSection";
import { useFetchTopDestinationQuery } from "@/store/visaTopDestinationApi";
import { ICountry } from "@/utils/types/nationality-residency/Country";
import TopBar from "../navbar/TopBar";
import Image from "next/image";
import { useDesktopDestinationSearch } from "@/utils/hooks/useDestinationSearch";
import SearchIcon2 from "@/assets/images/icons/search.png";
import curveDownLeftIcon from "@/assets/images/icons/curveDownLeftIcon.webp";

const AllDestinationsPage = () => {
  const { t, i18n } = useTranslation();

  const nationality = useAppSelector(
    (state) => state.locationSlice.nationality,
  );
  const residency = useAppSelector(
    (state) => state.locationSlice.residency,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] =
    useState<PendingAction | null>(null);

  // Language
  const currentLanguage = i18n.language || "en";
  const apiLanguage = getApiLanguageCode(currentLanguage);

  // API
  const { data: topDestinationResponse, isLoading } =
    useFetchTopDestinationQuery({
      count: 20,
      language: "en-US",
    });

  // Map API response
  const topDestinations = useMemo(() => {
    const list = topDestinationResponse?.Response || [];
    return list.map((dest: any) => ({
      VisaType: dest.VisaType || "E-Visa",
      imageUrl: dest.Images?.[0]?.Filename || "",
      name: dest.Name || "",
      GetVisaDays: Number(dest.GetVisaDays) || 0,
      order: dest.Order || 0,
      unit: dest.Unit || "days",
      currencyCode: "",
      CountryCode: dest.IsoCode2 || "",
      StartingPrice: dest.StartingPrice || "0",
    }));
  }, [topDestinationResponse]);

  // 🔍 Search hook (SINGLE SOURCE OF TRUTH)
  const {
    search,
    setSearch,
    isOpen,
    setIsOpen,
    containerRef,
    results,
    hasMatchingCountry,
    saveRecent,
  } = useDesktopDestinationSearch(topDestinations);

  // 🔍 Filtered destinations
  const filteredDestinations = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return topDestinations;

    return topDestinations.filter((item: any) =>
      item.name.toLowerCase().includes(term),
    );
  }, [topDestinations, search]);

  const destinationCount = filteredDestinations.length;

  const handlePreFlowNavigation = useCallback(
    (action: PendingAction): boolean => {
      const currentNationality = nationality as ICountry | null;
      const currentResidency = residency as ICountry | null;

      if (!currentNationality?.isoCode || !currentResidency?.isoCode) {
        setPendingAction(action);
        setIsDialogOpen(true);
        return false;
      }
      return true;
    },
    [nationality, residency],
  );

  const searchIconSrc =
    typeof SearchIcon === "string"
      ? SearchIcon
      : (SearchIcon as any)?.src || SearchIcon;

  return (
    <div className="w-full bg-white min-h-screen">
      <TopBar
        variant="home"
        flagIcon={(residency as ICountry | null)?.flag}
        isLoggedIn={false}
        onFlagClick={() => setIsDialogOpen(true)}
        onLogoClick={() => {}}
        onSearchClick={() => {}}
        nationality={nationality}
        residency={residency}
        onMenuClick={() => {}}
        isFixed
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-24 pb-12">
        {/* Title */}
        <h1 className="text-center text-[32px] font-semibold text-[#003669] mb-6">
          All destinations
        </h1>
        
        {/* 🔍 Search Field */}
        <div className="flex justify-center mb-8">
          <div ref={containerRef} className="relative w-full max-w-[520px]">
            <input
              value={search}
              placeholder={t("Search by country or city")}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearch(e.target.value);
                setIsOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results.length === 1) {
                  saveRecent(results[0]);
                  setIsOpen(false);
                }
              }}
              className="
                w-full h-[52px] rounded-xl border border-gray-200
                bg-white px-4 pr-12 text-sm sm:text-base
                focus:border-blue-500 focus:outline-none
                focus:ring-2 focus:ring-blue-100
                transition
              "
            />

            {/* Right icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {search ? (
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="hidden sm:inline">
                    {t("press_enter_to_search")}
                  </span>
                  <Image
                    src={curveDownLeftIcon}
                    alt="hint"
                    width={16}
                    height={16}
                  />
                </div>
              ) : (
                <Image
                  src={SearchIcon2}
                  width={14}
                  height={14}
                  alt="searchIcon"
                />
              )}
            </div>

            
          </div>
        </div>

        {/* Empty State */}
        {!isLoading && filteredDestinations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 mb-4 rounded-full bg-[#F2F4F7] flex items-center justify-center">
              <img
                src={searchIconSrc}
                alt="No results"
                className="w-6 h-6 opacity-50"
              />
            </div>

            <p className="text-base font-medium text-[#101828]">
              No destinations found
            </p>

            <p className="text-sm text-[#667085] mt-1 text-center max-w-[320px]">
              Try searching with a different country name or clear the search to
              see all destinations.
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-sm font-medium text-[#003669] hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Count */}
        <span className="block text-start text-[14px] text-[#00366B] ps-28">
          Based on your nationality & residency:&nbsp;
          <span className="text-[#707478]">
            {destinationCount} destinations
          </span>
        </span>

        {/* Destinations */}
        {filteredDestinations.length > 0 && (
          <TopDestinationSection
            title=""
            destinations={filteredDestinations}
            isLoading={isLoading}
            enableHorizontalScroll={false}
            onPreFlowNavigation={handlePreFlowNavigation}
          />
        )}
      </div>
    </div>
  );
};

export default AllDestinationsPage;
