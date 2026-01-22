import { useEffect, useMemo, useRef, useState } from "react";
import type { PendingAction, ICountry, ExtendedCountry } from "@/utils/types/nationality-residency/Country";


const RECENT_STORAGE_KEY = "recentSearches";
const MAX_RECENT = 8;

const storage = {
  get<T>(key: string): T | null {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
};

interface UseDestinationSearchOptions {
  minChars?: number;
  mode?: "desktop" | "mobile";

}

export function useDesktopDestinationSearch(countryList?: ICountry[], options: UseDestinationSearchOptions = {}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<ExtendedCountry[]>([]);
  const [recent, setRecent] = useState<ExtendedCountry[]>([]);
    const { minChars = 0, mode = "desktop" } = options;
  const containerRef = useRef<HTMLDivElement>(null);

  // load recent
  useEffect(() => {
    const saved = storage.get<ExtendedCountry[]>(RECENT_STORAGE_KEY);
    if (Array.isArray(saved)) {
      setRecent(saved.slice(0, MAX_RECENT));
    }
  }, []);

  const saveRecent = (item: ExtendedCountry) => {
    const withoutDupes = [item, ...recent.filter(r => r.isoCode !== item.isoCode)].slice(0, MAX_RECENT);
    setRecent(withoutDupes);
    storage.set(RECENT_STORAGE_KEY, withoutDupes);
  };

  const toExtended = (country: ICountry, matchedCity: string | null = null): ExtendedCountry => ({
    ...country,
    matchedCity,
    displayName: matchedCity ? `${matchedCity}, ${country.residency}` : country.residency,
  });

  // filter logic (EXACT MATCH)
  useEffect(() => {
    const term = search.toLowerCase().trim();
    if (!countryList) return setFiltered([]);
     if (term.length > 0 && term.length < minChars) {
      setFiltered([]);
      return;
    }
    const updated = countryList
      .map(country => {
        const matchCity = country.popularCities?.find(city => city.toLowerCase().includes(term));

        const matchCountry =
          country.residency?.toLowerCase().includes(term) ||
          country.nationality?.toLowerCase().includes(term) ||
          country.isoCode?.toLowerCase().includes(term) ||
          country.IsoCode2?.toLowerCase().includes(term) ||
          country.acronyms?.some(a => a.toLowerCase().includes(term));

        if (matchCity) return toExtended(country, matchCity);
        if (matchCountry) return toExtended(country, null);
        return null;
      })
      .filter(Boolean) as ExtendedCountry[];

    setFiltered(updated.sort((a, b) => (a.residency || "").localeCompare(b.residency || "")));
  }, [search, countryList, minChars]);

  // outside click
  useEffect(() => {
  if (mode !== "desktop") return;

  const handler = (e: MouseEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handler);
  return () => document.removeEventListener("mousedown", handler);
}, [mode]);

  const resultsToShow = useMemo(() => {
    if (!search.trim()) {
      const all = (countryList || []).map(c => toExtended(c));
      const seen = new Set<string>();
      const ordered: ExtendedCountry[] = [];

      for (const r of recent) {
        const key = r.isoCode || r.IsoCode2 || "";
        if (key && !seen.has(key)) {
          seen.add(key);
          ordered.push(r);
        }
      }

      const sortedAll = all.sort((a, b) => (a.residency || "").localeCompare(b.residency || ""));
      for (const c of sortedAll) {
        const key = c.isoCode || c.IsoCode2 || "";
        if (key && !seen.has(key)) {
          seen.add(key);
          ordered.push(c);
        }
      }

      return ordered;
    }
    return filtered;
  }, [search, filtered, recent, countryList]);

  const hasMatchingCountry = search.trim().length > 0 && filtered.length > 0;

  return {
    search,
    setSearch,
    isOpen,
    setIsOpen,
    containerRef,
    results: resultsToShow,
    filtered,
    recent,
    hasMatchingCountry,
    saveRecent,
  };
}
