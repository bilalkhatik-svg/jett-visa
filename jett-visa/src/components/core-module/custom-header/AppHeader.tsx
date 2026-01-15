"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@/assets/images/arrow-left.png';

interface AppHeaderProps {
  title?: string;
  titleKey?: string;
  onBackClick?: () => void;
}

export const AppHeader = React.memo<AppHeaderProps>(
  ({ title, titleKey, onBackClick }) => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const isRTL = i18n.dir() === 'rtl';

    const handleBack = () => {
      if (onBackClick) {
        onBackClick();
      } else {
        router.push('/accounts');
      }
    };

    // Convert StaticImageData to string
    const arrowBackIconSrc = typeof ArrowBackIcon === 'string' ? ArrowBackIcon : (ArrowBackIcon as any)?.src || ArrowBackIcon;

    return (
      <header
        className="w-full flex justify-center h-[60px] relative items-center bg-gradient-to-b from-blue-50 to-white"
        style={{ direction: i18n.dir() }}
      >
        <div className="w-[315px] mx-auto flex items-center justify-between px-0">
          {!isRTL && (
            <button
              onClick={handleBack}
              className="p-0 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Go back"
            >
              <img
                src={arrowBackIconSrc}
                alt="Back"
                className="w-[21px] h-[21px] object-contain"
              />
            </button>
          )}

          <div className="flex-1" />

          {isRTL && (
            <button
              onClick={handleBack}
              className="p-0 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Go back"
            >
              <img
                src={arrowBackIconSrc}
                alt="Back"
                className="w-[21px] h-[21px] object-contain scale-x-[-1]"
              />
            </button>
          )}
        </div>

        <h1
          className="absolute left-1/2 -translate-x-1/2 text-center font-poppins font-medium text-[#00366B] text-base pointer-events-none"
        >
          {titleKey ? t(titleKey) : title}
        </h1>
      </header>
    );
  }
);

AppHeader.displayName = 'AppHeader';
export default AppHeader;
