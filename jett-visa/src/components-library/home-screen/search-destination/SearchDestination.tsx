"use client";

import React from "react";
import { useDesktopDestinationSearch } from "@/utils/hooks/useDestinationSearch";
import type {
  ICountry,
  PendingAction,
  ExtendedCountry,
} from "@/utils/types/nationality-residency/Country";
import { useTranslation } from "react-i18next";

interface Props {
  countryList?: ICountry[];
  initialNationality?:string;
  initialResidency?:string;
  label: string | React.ReactNode;
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const SearchDestination: React.FC<Props> = ({
  countryList,
  label,
  onPreFlowNavigation,
}) => {
  const { t } = useTranslation();

  const {
    search,
    setSearch,
    results,
    recent,
    saveRecent,
  } = useDesktopDestinationSearch(countryList, {
    mode: "mobile",
    minChars: 2,
  });

  const handleSelect = (item: ExtendedCountry) => {
    saveRecent(item);
    onPreFlowNavigation({ type: "search", destination: item });
  };

  const showRecent = !search.trim() && recent.length > 0;

  return (
    <div
      className="flex h-full flex-col bg-white"
      onClick={e => e.stopPropagation()}
      onMouseDown={e => e.stopPropagation()}
    >
      {/* Search bar */}
      <div>{label ? label : "Search Destination"}</div>
      <div className="sticky top-0 z-10 bg-white p-2">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t("search_by_country")}
          className="
            w-full rounded-xl border border-gray-200
            px-4 py-3 text-sm
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100
          "
        />
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {showRecent && (
          <div className="py-3 text-xs font-medium text-gray-400">
            {t("Recent Searches")}
          </div>
        )}

        {results.map((item, idx) => {
          const isFirstAll =
            showRecent &&
            idx === recent.length;

          return (
            <React.Fragment key={`${item.isoCode}-${idx}`}>
              {isFirstAll && (
                <div className="py-3 text-xs font-medium text-gray-400">
                  {t("All Destinations")}
                </div>
              )}

              <div
                className="flex items-center justify-between py-3 hover:bg-gray-50"
                onClick={() => handleSelect(item)}
              >
                <div className="flex items-center gap-3">
                  {item.flag && (
                    <img
                      src={item.flag}
                      className="h-5 w-5 rounded-full object-cover"
                      alt=""
                    />
                  )}
                  <span className="text-sm text-[#003669] truncate">
                    {item.displayName || item.residency}
                  </span>
                </div>

                <span className="text-[#003669]">↗</span>
              </div>
            </React.Fragment>
          );
        })}

        {results.length === 0 && search.length >= 2 && (
          <div className="p-6 text-center text-sm text-gray-400">
            {t("no_results")}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchDestination);
