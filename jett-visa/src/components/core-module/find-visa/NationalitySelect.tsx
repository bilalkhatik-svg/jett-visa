"use client";

import React from 'react';
import DownArrowIcon from '@/assets/images/icons/Vector.webp';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';
import { useFetchCountryListQuery } from '@/store/visaCountryListApi';
import { getApiLanguageCode } from '@/utils/helper';
import type { ICountry } from '@/utils/types/nationality-residency/Country';

interface NationalitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const NationalitySelect: React.FC<NationalitySelectProps> = React.memo(
  ({ value, onChange }) => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const isMobileView = useMediaQuery("(max-width: 640px)");
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Get API language
    const currentLanguage = i18n.language || "en";
    const apiLanguage = getApiLanguageCode(currentLanguage);

    // Fetch countries
    const { data: countryListData, isLoading } = useFetchCountryListQuery({
      language: apiLanguage,
    });

    const nationalities = React.useMemo(() => {
      const list = countryListData?.response?.map((c: ICountry) => ({
        ...c,
        name: c.nationality,
      })) || [];

      return list.sort((a: ICountry, b: ICountry) =>
        a?.nationality?.localeCompare(b?.nationality)
      );
    }, [countryListData]);

    const filteredNationalities = React.useMemo(() => {
      if (!search) return nationalities;
      return nationalities.filter((n: ICountry) =>
        n?.nationality?.toLowerCase().includes(search.toLowerCase())
      );
    }, [nationalities, search]);

    const handleChange = (selectedId: string) => {
      onChange(selectedId);
      setIsOpen(false);
      setSearch('');
    };

    const handleSelectClick = (event: React.MouseEvent) => {
      setIsOpen(!isOpen);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearch('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [isOpen]);

    if (isLoading) {
      return (
        <div className="w-full">
          <div
            className={`${
              isMobileView ? 'w-[275px] h-[42px]' : 'w-[448px] h-[56px]'
            } bg-white rounded-[14px] border-2 border-[#E9EDEF] flex items-center justify-center`}
          >
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
          </div>
        </div>
      );
    }

    const selectedNationality = nationalities?.find((n: ICountry) => n.id === value);

    return (
      <div className="w-full relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={handleSelectClick}
          aria-label={t("Select nationality") || "Select nationality"}
          className={`${
            isMobileView ? 'w-[275px] h-[42px]' : 'w-[448px] h-[56px]'
          } bg-white rounded-[14px] border-2 border-[#E9EDEF] hover:border-[#D0D0D0] focus:border-[#B0B0B0] px-4 py-2.5 flex items-center justify-between transition-colors`}
        >
          {!value || !selectedNationality ? (
            <span className="text-sm font-medium font-[Poppins,sans-serif] leading-[22px] text-[#999]">
              {t("select_nationality")}
            </span>
          ) : (
            <div className="flex items-center gap-1.5 h-[22px]">
              {selectedNationality?.flag && (
                <img
                  src={selectedNationality.flag}
                  alt={selectedNationality?.nationality || 'flag'}
                  className="w-[18px] h-[18px] object-cover rounded-[10px]"
                />
              )}
              <span className="text-sm font-medium font-[Poppins,sans-serif] leading-[22px] text-[#141416] flex items-center">
                {selectedNationality?.nationality}
              </span>
            </div>
          )}
          
          <img
            src={typeof DownArrowIcon === 'string' ? DownArrowIcon : (DownArrowIcon as any)?.src}
            alt="down arrow"
            className="pointer-events-none"
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            {isMobileView && (
              <div
                className="fixed inset-0 bg-black/20 z-40"
                onClick={() => {
                  setIsOpen(false);
                  setSearch('');
                }}
              />
            )}
            
            <div className={`absolute top-full left-0 ${
              isMobileView ? 'left-1/2 -translate-x-1/2 w-[90vw] max-w-md' : 'right-0'
            } mt-2 bg-white rounded-[14px] border-2 border-[#E9EDEF] shadow-lg z-50 max-h-80 overflow-hidden flex flex-col`}>
              {/* Search Input */}
              <div className="p-3 border-b border-gray-200">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t("search_nationality") || "Search nationality..."}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0080FF]"
                  autoFocus
                />
              </div>

              {/* Country List */}
              <div className="overflow-y-auto flex-1">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {t('loading') || 'Loading...'}
                  </div>
                ) : filteredNationalities.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {t('no_results') || 'No results found'}
                  </div>
                ) : (
                  <div className="py-1">
                    {filteredNationalities?.map((nationality: ICountry) => (
                      <button
                        key={nationality?.id}
                        onClick={() => handleChange(nationality?.id)}
                        className={`w-full flex items-center gap-1.5 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                          nationality?.id === value ? 'bg-blue-50' : ''
                        }`}
                      >
                        {nationality?.flag && (
                          <img
                            src={nationality.flag}
                            alt={nationality?.nationality || 'flag'}
                            className="w-[18px] h-[18px] object-cover rounded-[2px]"
                          />
                        )}
                        <span className="text-sm font-medium font-[Poppins,sans-serif] leading-[22px] text-[#141416]">
                          {nationality?.nationality}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

NationalitySelect.displayName = 'NationalitySelect';

export default NationalitySelect;