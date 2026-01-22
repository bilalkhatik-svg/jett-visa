import React from 'react';
import { useTranslation } from 'react-i18next';
import ArrowTopRightIcon from '@/assets/images/icons/arrow-top-right.png';
import type { ICountry, ExtendedCountry } from '@/utils/types/nationality-residency/Country';
import Image from 'next/image';

interface DestinationListItemProps {
  country: ExtendedCountry;
  handleClick: (country: ICountry) => void;
}

const DestinationListItem = React.memo(
  ({ country, handleClick }: DestinationListItemProps) => {
    const { i18n } = useTranslation();
    const isArabic = ['ar', 'ar-AE'].includes(i18n.language);

    return (
      <div
        role="button"
        onClick={() => handleClick(country)}
        className="
          flex items-center gap-3
          py-3 px-0
          cursor-pointer
          hover:bg-black/5
          active:bg-black/10
          transition-colors
        "
      >
        {/* Flag */}
        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          <Image
            src={country?.flag}
            alt={country?.isoCode}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Country Name */}
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-normal text-[rgba(63,107,150,1)] truncate">
            {country?.displayName ?? country?.residency}
          </p>
        </div>

        {/* Arrow */}
        <Image
          src={ArrowTopRightIcon}
          alt="arrow"
          className={`w-[14px] h-[14px] flex-shrink-0 ${
            isArabic ? 'scale-x-[-1]' : ''
          }`}
        />
      </div>
    );
  }
);

export default DestinationListItem;
