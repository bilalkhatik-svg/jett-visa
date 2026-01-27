'use client';

import React, { useEffect, useState, useRef } from 'react';
import { storage } from '@/utils/storage';
import type { ICountry, ExtendedCountry } from '@/utils/types/nationality-residency/Country';
import DestinationListItem from '@/components-library/destination-list/DestinationListItem';
import { useTranslation } from 'react-i18next';
import { useCountry } from '@/utils/hooks/useCountry';
import type { PendingAction } from '@/components-library/home-screen/HomeScreen';

interface DestinationListProps {
  search: string;
  countries: ExtendedCountry[];
  onCantFindClick?: () => void;
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const DestinationList = React.memo(({
  search,
  countries,
  onCantFindClick,
  onPreFlowNavigation
}: DestinationListProps) => {
  const [recentSearches, setRecentSearches] = useState<ICountry[]>([]);
  const { t, i18n } = useTranslation();
  const { countryListData, refetchCountryList } = useCountry();
  const previousLanguageRef = useRef(i18n.language);

  useEffect(() => {
    const saved = storage.get<ICountry[]>('recentSearches', 'localStorage');
    if (saved) setRecentSearches(saved);
  }, []);

  useEffect(() => {
    if (previousLanguageRef.current !== i18n.language) {
      previousLanguageRef.current = i18n.language;
      refetchCountryList();
    }
  }, [i18n.language, refetchCountryList]);

  useEffect(() => {
    if (!countryListData?.response) return;

    setRecentSearches(prev => {
      if (!prev.length) return prev;

      const updated = prev.map(saved => {
        const current = countryListData.response.find(
          c => c.isoCode === saved.isoCode
        );
        return current ?? saved;
      });

      const changed = updated.some(
        (u, i) =>
          u.residency !== prev[i].residency ||
          u.nationality !== prev[i].nationality
      );

      return changed ? updated : prev;
    });
  }, [countryListData]);

  useEffect(() => {
    if (recentSearches.length) {
      storage.set('recentSearches', recentSearches, 'localStorage');
    }
  }, [recentSearches]);

  const handleCountryClick = (country: ICountry) => {
    onPreFlowNavigation({ type: 'search', destination: country });

    setRecentSearches(prev => {
      const filtered = prev.filter(c => c.isoCode !== country.isoCode);
      const updated = [country, ...filtered].slice(0, 5);
      storage.set('recentSearches', updated, 'localStorage');
      return updated;
    });
  };

  const showCantFindOption = search.trim().length >= 3 && !!onCantFindClick;

  return (
    <ul className="flex-1 max-h-[70vh] overflow-y-auto scrollbar-hide">
      {recentSearches.length > 0 && search.trim() === '' && (
        <>
          <li className="py-1.5 text-xs text-[rgba(189,191,193,1)]">
            {t('recent_searches')}
          </li>

          {recentSearches.map(country => (
            <DestinationListItem
              key={country.isoCode}
              country={country}
              handleClick={handleCountryClick}
            />
          ))}
        </>
      )}

      {countries.length > 0 && (
        <li className="py-1.5 text-xs text-[rgba(189,191,193,1)]">
          {t('all_destinations')}
        </li>
      )}

      {countries.map(country => (
        <DestinationListItem
          key={country.id}
          country={country}
          handleClick={handleCountryClick}
        />
      ))}

      {showCantFindOption && (
        <li className="mt-2">
          <button
            type="button"
            onClick={onCantFindClick}
            className="w-full py-2 text-center italic text-[#00366B]
                       text-xs sm:text-sm md:text-base
                       bg-[rgba(246,242,242,0.04)]
                       hover:underline"
          >
            {t('cant_find_your_destination')}
          </button>
        </li>
      )}
    </ul>
  );
});

export default DestinationList;
