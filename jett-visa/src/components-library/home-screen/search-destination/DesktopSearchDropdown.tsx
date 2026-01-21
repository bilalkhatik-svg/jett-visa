import React, { useEffect, useMemo, useRef, useState } from "react";
import SearchIcon2 from "@/assets/images/icons/search.png";
// import type { PendingAction } from "@pages/home-screen/HomeScreen";
// import type { Country as DestinationCountry, ExtendedCountry } from "@utility/types/country/Country";
import curveDownLeftIcon from "@/assets/images/icons/curveDownLeftIcon.webp";
// import { storage } from "@utility/storage";

// Define types locally
export type PendingAction = {
  type: string;
  destination?: any;
  [key: string]: any;
};

interface DestinationCountry {
  isoCode?: string;
  IsoCode2?: string;
  name?: string;
  residency?: string;
  nationality?: string;
  popularCities?: string[];
  acronyms?: string[];
  flag?: string;
}

interface ExtendedCountry extends DestinationCountry {
  matchedCity?: string | null;
  displayName?: string;
}

// Simple localStorage wrapper
const storage = {
  get: (key: string, type: "localStorage" | "sessionStorage" = "localStorage"): any => {
    try {
      const storageObj = type === "localStorage" ? window.localStorage : window.sessionStorage;
      const item = storageObj.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: any, type: "localStorage" | "sessionStorage" = "localStorage"): void => {
    try {
      const storageObj = type === "localStorage" ? window.localStorage : window.sessionStorage;
      storageObj.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage errors
    }
  },
};

interface DesktopSearchDropdownProps {
  isMobile: boolean;
  t: (key: string) => string;
  onPreFlowNavigation: (action: PendingAction) => boolean;
  countryList: DestinationCountry[] | undefined;
  widthByBreakpoint?: { md: string; lg: string; xl: string };
  dropdownWidth?: string;
}

const RECENT_STORAGE_KEY = "recentSearches";
const MAX_RECENT = 8;

const DesktopSearchDropdown: React.FC<DesktopSearchDropdownProps> = ({
  isMobile,
  t,
  onPreFlowNavigation,
  countryList,
  widthByBreakpoint = { md: "400px", lg: "500px", xl: "590px" },
  dropdownWidth,
}) => {
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<ExtendedCountry[]>([]);
  const [recent, setRecent] = useState<ExtendedCountry[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent on mount
  useEffect(() => {
    if (isMobile) return;
    try {
      const saved = storage.get(RECENT_STORAGE_KEY, "localStorage") as ExtendedCountry[];
      if (Array.isArray(saved)) {
        setRecent(saved.slice(0, MAX_RECENT));
      }
    } catch {
      // ignore parse errors
    }
  }, [isMobile]);

  const saveRecent = (item: ExtendedCountry) => {
    try {
      const withoutDupes = [item, ...recent.filter((r) => r.isoCode !== item.isoCode)].slice(0, MAX_RECENT);
      setRecent(withoutDupes);
      storage.set(RECENT_STORAGE_KEY, withoutDupes, "localStorage");
    } catch {
      // ignore storage errors
    }
  };

  const toExtended = (country: DestinationCountry, matchedCity: string | null = null): ExtendedCountry => {
    return {
      ...(country as any),
      matchedCity,
      displayName: matchedCity ? `${matchedCity}, ${country.residency}` : (country as any).residency,
    } as ExtendedCountry;
  };

  // Filter logic
  useEffect(() => {
    if (isMobile) return;
    const searchTerm = search.toLocaleLowerCase().trim();
    if (!countryList) {
      setFiltered([]);
      return;
    }

    const updated: ExtendedCountry[] = (countryList || [])
      .map((country: DestinationCountry) => {
        const matchCity = country?.popularCities?.find((city: string) =>
          city?.toLocaleLowerCase().includes(searchTerm)
        );

        const matchCountry =
          country?.residency?.toLocaleLowerCase().includes(searchTerm) ||
          country?.nationality?.toLocaleLowerCase().includes(searchTerm) ||
          country?.isoCode?.toLocaleLowerCase().includes(searchTerm) ||
          country?.IsoCode2?.toLocaleLowerCase().includes(searchTerm) ||
          country?.acronyms?.some((a: string) => a?.toLocaleLowerCase().includes(searchTerm));

        if (matchCity) {
          return toExtended(country, matchCity);
        } else if (matchCountry) {
          return toExtended(country, null);
        }
        return null;
      })
      .filter(Boolean) as ExtendedCountry[];

    const sorted = updated.sort((a, b) => ((a as any)?.residency || "").localeCompare(((b as any)?.residency || "")));
    setFiltered(sorted);
  }, [search, countryList, isMobile]);

  // Close on outside click
  useEffect(() => {
    if (isMobile) return;
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isMobile]);

  const resultsToShow = useMemo(() => {
    const term = search.trim();
    if (term.length === 0) {
      const all: ExtendedCountry[] = (countryList || []).map((c) => toExtended(c));
      const byIso = new Set<string>();
      const ordered: ExtendedCountry[] = [];
      for (const r of recent) {
        const key = (r as any).isoCode || (r as any).IsoCode2 || "";
        if (key && !byIso.has(key)) {
          byIso.add(key);
          ordered.push(r);
        }
      }
      const sortedAll = all.sort((a, b) => ((a as any)?.residency || "").localeCompare(((b as any)?.residency || "")));
      for (const c of sortedAll) {
        const key = (c as any).isoCode || (c as any).IsoCode2 || "";
        if (key && !byIso.has(key)) {
          byIso.add(key);
          ordered.push(c);
        }
      }
      return ordered;
    }
    return filtered;
  }, [recent, filtered, search, countryList]);

  const hasMatchingCountry = !isMobile && search.trim().length > 0 && filtered.length > 0;

  const handleSelect = (item: ExtendedCountry | null) => {
    if (!item) return;
    setIsOpen(false);
    setSearch("");
    saveRecent(item);
    onPreFlowNavigation({ type: "search", destination: item as any });
  };

  // Convert StaticImageData to string for img src
  const searchIcon2Src = typeof SearchIcon2 === 'string' ? SearchIcon2 : (SearchIcon2 as any)?.src || SearchIcon2;
  const curveDownLeftIconSrc = typeof curveDownLeftIcon === 'string' ? curveDownLeftIcon : (curveDownLeftIcon as any)?.src || curveDownLeftIcon;

  if (isMobile) {
    return (
      <div className="relative">
        <input className="w-full rounded-md border border-gray-200 h-10 px-3 pr-10 bg-gray-50" disabled value={t("search_by_country_or_city")} />
        <img src={searchIcon2Src} width={14} height={14} alt="searchIcon" className="absolute right-3 top-1/2 -translate-y-1/2" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-full" style={{ width: dropdownWidth || widthByBreakpoint.md }}>
      <input
        placeholder={t("search_by_country_or_city")}
        className="w-full rounded-[12px] border border-gray-200 px-4 pr-12 text-sm sm:text-base"
        style={{ height: '72px',width:'590px' }}
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && hasMatchingCountry) {
            event.preventDefault();
            handleSelect(filtered[0]);
          }
        }}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {hasMatchingCountry ? (
          <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-400">
            <span className="hidden sm:inline">Press Enter to search</span>
            <img src={curveDownLeftIconSrc} alt="hint" width={16} height={16} className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        ) : (
          <img src={searchIcon2Src} width={14} height={14} alt="searchIcon" className="w-3 h-3 sm:w-[14px] sm:h-[14px]" />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-2xl z-50 border border-[#F2F2F8] w-full max-w-full" style={{ width: dropdownWidth || widthByBreakpoint.md }}>
          {resultsToShow.length > 0 ? (
            <div className="p-2 max-h-60 overflow-y-auto scrollbar-hide">
              {resultsToShow.map((c: ExtendedCountry, idx: number) => (
                <div
                  key={`${c?.isoCode}-${idx}`}
                  className="flex items-center gap-2 px-2 py-2 sm:py-2.5 cursor-pointer rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => handleSelect(c)}
                >
                  {!!(c as any)?.flag && (
                    <img src={(c as any).flag} alt="" width={18} height={18} className="w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full object-cover flex-shrink-0" />
                  )}
                  <div className="text-xs sm:text-sm text-[#003669] truncate">{((c as any).displayName as string) || (c as any).residency || (c as any).nationality || ""}</div>
                </div>
              ))}
            </div>
          ) : (
            search.trim().length > 0 && (
              <div className="p-3 sm:p-4">
                <div className="italic text-[#00366B] text-xs sm:text-sm md:text-base">{t("cant_find_your_destination")}</div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(DesktopSearchDropdown);
