"use client";

import React from "react";
import Image from "next/image";
import SearchIcon2 from "@/assets/images/icons/search.png";
import curveDownLeftIcon from "@/assets/images/icons/curveDownLeftIcon.webp";

import { useDesktopDestinationSearch } from "@/utils/hooks/useDestinationSearch";
import type {
  ICountry,
  PendingAction,
  ExtendedCountry,
} from "@/utils/types/nationality-residency/Country";

interface Props {
  countryList?: ICountry[];
  isMobile?: boolean;
  t: (key: string) => string;
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const DesktopSearchDropdown: React.FC<Props> = ({
  countryList,
  isMobile,
  t,
  onPreFlowNavigation,
}) => {
  const {
    search,
    setSearch,
    isOpen,
    setIsOpen,
    containerRef,
    results,
    hasMatchingCountry,
    saveRecent,
  } = useDesktopDestinationSearch(countryList);

  const handleSelect = (item: ExtendedCountry) => {
    saveRecent(item);
    setSearch("");
    setIsOpen(false);
    onPreFlowNavigation({ type: "search", destination: item });
  };

  /* ------------------------- Mobile (disabled input) ------------------------- */
  if (isMobile) {
    return (
      <div className="relative">
        <input
          className="w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 pr-10"
          disabled
          value={t("search_by_country_or_city")}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Image src={SearchIcon2} width={14} height={14} alt="searchIcon" />
        </div>
      </div>
    );
  }

  /* ------------------------------ Desktop view ------------------------------ */
  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        value={search}
        placeholder={t("search_by_country_or_city")}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && results.length === 1) {
            handleSelect(results[0]);
          }
        }}
        className="
          w-full h-[52px] rounded-xl border border-gray-200
          bg-white px-4 pr-12 text-sm sm:text-base
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
          transition
        "
        style={{ width: "505px" }}
      />

      {/* Right icon */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {hasMatchingCountry ? (
          <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-400">
            <span className="hidden sm:inline">
              {t("press_enter_to_search")}
            </span>
            <Image
              src={curveDownLeftIcon}
              alt="hint"
              width={16}
              height={16}
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
          </div>
        ) : (
          <Image
            src={SearchIcon2}
            width={14}
            height={14}
            alt="searchIcon"
            className="w-3 h-3 sm:w-[14px] sm:h-[14px]"
          />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-md border border-[#F2F2F8] bg-white shadow-2xl">
          {results.length > 0 ? (
            <div className="max-h-60 overflow-y-auto p-2 scrollbar-hide">
              {results.map((c, idx) => (
                <div
                  key={`${c.isoCode}-${idx}`}
                  onClick={() => handleSelect(c)}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 sm:py-2.5 hover:bg-gray-100 transition-colors"
                >
                  {c.flag && (
                    <img
                      src={c.flag}
                      alt=""
                      className="h-4 w-4 sm:h-[18px] sm:w-[18px] rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="truncate text-xs sm:text-sm text-[#003669]">
                    {c.displayName || c.residency || c.nationality || ""}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-gray-400">
              {t("no_results")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(DesktopSearchDropdown);
