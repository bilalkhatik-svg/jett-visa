'use client';

import { useFetchCountryListQuery } from '@/store/visaCountryListApi';
import { useDebounce } from '@/utils/hooks/useDebounce';
import type { ICountry } from "@/utils/types/nationality-residency/Country";
import { useEffect, useMemo, useRef, useState } from 'react';

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

  const [isNationalityOpen, setIsNationalityOpen] = useState(false);
  const [isResidencyOpen, setIsResidencyOpen] = useState(false);
  const [nationalitySearch, setNationalitySearch] = useState('');
  const [residencySearch, setResidencySearch] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const debouncedNationalitySearch = useDebounce(nationalitySearch, 300);
  const debouncedResidencySearch = useDebounce(residencySearch, 300);

  const countryList: ICountry[] = data?.response ?? [];

  const filteredNationalityList = useMemo(() => {
    if (!debouncedNationalitySearch) return countryList;

    return countryList.filter((item) =>
      item?.nationality?.toLowerCase().includes(debouncedNationalitySearch.toLowerCase())
    );
  }, [countryList, debouncedNationalitySearch]);

  const filteredResidencyList = useMemo(() => {
    if (!debouncedResidencySearch) return countryList;

    return countryList.filter((item) =>
      item?.residency?.toLowerCase().includes(debouncedResidencySearch.toLowerCase())
    );
  }, [countryList, debouncedResidencySearch]);

  const handleSelect = (type: 'nationality' | 'residency', item: ICountry) => {
    if (type === 'nationality') {
      onNationalityChange?.(item);
      setIsNationalityOpen(false);
      setNationalitySearch('');
      return;
    }

    onResidencyChange?.(item);
    setIsResidencyOpen(false);
    setResidencySearch('');
  };

  useEffect(() => {
    if (!isNationalityOpen && !isResidencyOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsNationalityOpen(false);
        setIsResidencyOpen(false);
        setNationalitySearch('');
        setResidencySearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNationalityOpen, isResidencyOpen]);

  return (
    <div className="relative z-50 w-[505px]" ref={containerRef}>

      {/* ================= Trigger Bar ================= */}
      <div
        className={`flex items-center rounded-[14px] bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md shadow-sm ${
          isMobile ? 'px-3 py-2.5' : 'px-4 py-3'
        }`}
      >
        {/* ===== Nationality ===== */}
        <div className="relative flex-1 min-w-0">
          <div
            className="flex items-center gap-3 cursor-pointer min-w-0"
            onClick={() => {
              setIsNationalityOpen((prev) => {
                if (prev) {
                  setNationalitySearch('');
                }
                return !prev;
              });
              setIsResidencyOpen(false);
            }}
          >
          {nationality?.flag && (
            <img
              src={nationality.flag}
              alt={nationality?.nationality || 'Nationality flag'}
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
                isNationalityOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isNationalityOpen && (
            <div className="absolute mt-3 w-[250px] rounded-2xl bg-white shadow-xl border z-[9999]">
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-semibold text-[#0B3C6F] text-lg">Search nationality</h3>
              </div>

              <div className="px-4 pb-3">
                <input
                  value={nationalitySearch}
                  onChange={(e) => setNationalitySearch(e.target.value)}
                  placeholder="Search nationality"
                  className="w-full h-10 rounded-full border px-4 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="max-h-[260px] overflow-y-auto">
                {isLoading && (
                  <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>
                )}

                {!isLoading &&
                  filteredNationalityList.map((item) => (
                    <div
                      key={`${item.id}-${item.isoCode}-nationality`}
                      onClick={() => handleSelect('nationality', item)}
                      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-50"
                    >
                      {item?.flag && (
                        <img
                          src={item.flag}
                          alt={item?.nationality || ''}
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <span className="text-blue-700 font-medium">
                        {item?.nationality}
                      </span>
                    </div>
                  ))}

                {!isLoading && !filteredNationalityList.length && (
                  <div className="px-4 py-3 text-gray-400 text-sm">
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-4 h-8 w-px bg-gray-200" />

        {/* ===== Residency ===== */}
        <div className="relative flex-1 min-w-0">
          <div
            className="flex items-center gap-3 cursor-pointer min-w-0"
            onClick={() => {
              setIsResidencyOpen((prev) => {
                if (prev) {
                  setResidencySearch('');
                }
                return !prev;
              });
              setIsNationalityOpen(false);
            }}
          >
          {residency?.flag && (
            <img
              src={residency.flag}
              alt={residency?.residency || 'Residency flag'}
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
                isResidencyOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isResidencyOpen && (
            <div className="absolute mt-3 w-full rounded-2xl bg-white shadow-xl border z-[9999]">
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-semibold text-[#0B3C6F] text-lg">Search residency</h3>
              </div>

              <div className="px-4 pb-3">
                <input
                  value={residencySearch}
                  onChange={(e) => setResidencySearch(e.target.value)}
                  placeholder="Search residency"
                  className="w-full h-10 rounded-full border px-4 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="max-h-[260px] overflow-y-auto">
                {isLoading && (
                  <div className="px-4 py-3 text-sm text-gray-400">Loading...</div>
                )}

                {!isLoading &&
                  filteredResidencyList.map((item) => (
                    <div
                      key={`${item.id}-${item.isoCode}-residency`}
                      onClick={() => handleSelect('residency', item)}
                      className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-50"
                    >
                      {item?.flag && (
                        <img
                          src={item.flag}
                          alt={item?.residency || ''}
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <span className="text-blue-700 font-medium">
                        {item?.residency}
                      </span>
                    </div>
                  ))}

                {!isLoading && !filteredResidencyList.length && (
                  <div className="px-4 py-3 text-gray-400 text-sm">
                    No results found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default NationalityResidencySelector;
