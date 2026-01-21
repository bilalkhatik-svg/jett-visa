'use client';

import { useFetchCountryListQuery } from '@/store/visaCountryListApi';
import { useDebounce } from '@/utils/hooks/useDebounce';
import type { ICountry } from "@/utils/types/nationality-residency/Country";
import { useMemo, useState } from 'react';

interface Props {
  countryList?: ICountry[];
  nationality?: ICountry | null;
  residency?: ICountry | null;
  onNationalityChange?: (country: ICountry) => void;
  onResidencyChange?: (country: ICountry) => void;
  isMobile?: boolean;
}

const NationalityResidencySelector = ({
  nationality,
  residency,
  onNationalityChange,
  onResidencyChange,
  isMobile = false,
}: Props) => {
  const { data, isLoading } = useFetchCountryListQuery('en-US');

  const [openType, setOpenType] = useState<'nationality' | 'residency' | null>(null);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 300);

  const countryList: ICountry[] = data?.response ?? [];

  const filteredList = useMemo(() => {
    if (!debouncedSearch) return countryList;

    return countryList.filter((item) =>
      item.nationality.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [countryList, debouncedSearch]);

  const handleSelect = (item: ICountry) => {
    if (openType === 'nationality') {
      onNationalityChange?.(item);
    } else if (openType === 'residency') {
      onResidencyChange?.(item);
    }
    setOpenType(null);
    setSearch('');
  };

  return (
    <div className="relative w-full max-w-full sm:max-w-md mx-auto z-50">
      {/* ================= Trigger Bar ================= */}
      <div
        className={`flex items-center rounded-[14px] bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md shadow-sm ${
          isMobile ? 'px-3 py-2.5' : 'px-4 py-3'
        }`}
      >
        {/* ===== Nationality ===== */}
        <div
          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          onClick={() => setOpenType(openType === 'nationality' ? null : 'nationality')}
        >
          {nationality && (
            <img
              src={nationality.flag}
              alt={nationality.nationality}
              className="w-6 h-6 rounded-full"
            />
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-gray-400 text-xs">Nationality</span>
            <span className="font-semibold text-blue-900 truncate">
              {nationality?.nationality ?? 'Select'}
            </span>
          </div>
          <svg
            className={`w-4 h-4 ml-auto transition-transform ${
              openType === 'nationality' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Divider */}
        <div className="mx-4 h-8 w-px bg-gray-200" />

        {/* ===== Residency ===== */}
        <div
          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
          onClick={() => setOpenType(openType === 'residency' ? null : 'residency')}
        >
          {residency && (
            <img
              src={residency.flag}
              alt={residency.residency}
              className="w-6 h-6 rounded-full"
            />
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-gray-400 text-xs">Residency</span>
            <span className="font-semibold text-blue-900 truncate">
              {residency?.residency ?? 'Select'}
            </span>
          </div>
          <svg
            className={`w-4 h-4 ml-auto transition-transform ${
              openType === 'residency' ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* ================= Dropdown ================= */}
      {openType && (
        <div className="absolute mt-3 w-full sm:w-[340px] rounded-2xl bg-white shadow-xl border z-[9999]">
          {/* Header */}
          <div className="px-4 pt-4 pb-2">
            <h3 className="font-semibold text-[#0B3C6F] text-lg">
              Search {openType}
            </h3>
          </div>

          {/* Search */}
          <div className="px-4 pb-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${openType}`}
              className="w-full h-10 rounded-full border px-4 focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* List */}
          <div className="max-h-[260px] overflow-y-auto">
            {isLoading && (
              <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>
            )}

            {!isLoading &&
              filteredList.map((item) => (
                <div
                  key={`${item.id}-${item.isoCode}`}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-50"
                >
                  <img
                    src={item.flag}
                    alt={item.nationality}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-blue-700 font-medium">
                    {openType === 'nationality'
                      ? item.nationality
                      : item.residency}
                  </span>
                </div>
              ))}

            {!isLoading && !filteredList.length && (
              <div className="px-4 py-3 text-gray-400 text-sm">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalityResidencySelector;
