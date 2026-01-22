"use client";

import React from "react";
import { useDesktopDestinationSearch } from "@/utils/hooks/useDestinationSearch";
import type { ICountry, PendingAction, ExtendedCountry } from "@/utils/types/nationality-residency/Country";

interface Props {
  countryList?: ICountry[];
  t: (key: string) => string;
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const DesktopSearchDropdown: React.FC<Props> = ({
  countryList,
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
  filtered,
  hasMatchingCountry,
  saveRecent,
} = useDesktopDestinationSearch(countryList);

  const handleSelect = (item: ExtendedCountry) => {
    saveRecent(item);
    setSearch("");
    setIsOpen(false);
    onPreFlowNavigation({ type: "search", destination: item });
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        value={search}
        placeholder={t("search_by_country_or_city")}
        onFocus={() => setIsOpen(true)}
        onChange={e => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={e => {
          if (e.key === "Enter" && results.length === 1) {
            handleSelect(results[0]);
          }
        }}
        className="
          w-full rounded-xl border border-gray-200
          bg-white px-4 py-3 text-sm
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
          transition
        "
      />

      {isOpen && (
        <div
          className="
            absolute z-[1000] mt-2 w-full
            rounded-xl border border-gray-200
            bg-white shadow-lg
            max-h-60 overflow-y-auto scrollbar-hide
          "
        >
          {results.length === 0 && (
            <div className="p-4 text-sm text-gray-400">
              {t("no_results")}
            </div>
          )}

         {results.map((c, idx) => (
  <div
    key={`${c.isoCode}-${idx}`}
    className="flex items-center gap-2 px-2 py-2 hover:bg-gray-100"
    onClick={() => handleSelect(c)}
  >
    {c.flag && (
      <img
        src={c.flag}
        className="w-4 h-4 rounded-full object-cover"
        alt=""
      />
    )}
    <div className="text-sm truncate text-[#003669]">
      {c.displayName || c.residency}
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default React.memo(DesktopSearchDropdown);
