'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import leftArrowIcon from '@/assets/images/icons/Polygon2.webp';
import rightArrowIcon from '@/assets/images/icons/Polygon1.webp';
import { useTranslation } from '@/utils/i18nStub';

// Mock data
const continents = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];
const continentLanguageMap: Record<string, string> = {
  'Asia': 'آسيا',
  'Europe': 'أوروبا',
  'Africa': 'أفريقيا',
  'North America': 'أمريكا الشمالية',
  'South America': 'أمريكا الجنوبية',
  'Oceania': 'أوقيانوسيا',
};

interface ContinentSelectorProps {
  selected: string;
  onChange: (continent: string) => void;
}

const ContinentSelector: React.FC<ContinentSelectorProps> = React.memo(
  ({ selected, onChange }) => {
    const { i18n } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 600);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const englishToArabic = useMemo(() => {
      const reverse: Record<string, string> = {};
      Object.entries(continentLanguageMap).forEach(([en, ar]) => {
        reverse[en] = ar;
      });
      return reverse;
    }, []);

    useEffect(() => {
      const index = continents.findIndex((c: string) => c === selected);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }, [selected]);

    const handlePrevious = () => {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : continents.length - 1;
      setCurrentIndex(newIndex);
      onChange(continents[newIndex]);
    };

    const handleNext = () => {
      const newIndex = currentIndex < continents.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(newIndex);
      onChange(continents[newIndex]);
    };

    const currentContinentEn = continents[currentIndex];
    const currentContinentDisplay = i18n.language.startsWith('ar')
      ? englishToArabic[currentContinentEn] || currentContinentEn
      : currentContinentEn;

    const formatContinentName = (name: string) => {
      if (name.includes(' ')) return name.split(' ');
      return [name];
    };

    const continentLines = formatContinentName(currentContinentDisplay);
    const isArabic = i18n.language.startsWith('ar');

    const getImageSrc = (img: any) => typeof img === 'string' ? img : (img as any)?.src || img;
    const leftArrowSrc = getImageSrc(leftArrowIcon);
    const rightArrowSrc = getImageSrc(rightArrowIcon);

    return (
      <div className={`flex items-center justify-center ${isMobile ? 'py-2' : 'py-0'}`}>
        <div className="w-[111px] h-9 flex items-center justify-between relative">
          <Image
            src={isArabic ? rightArrowSrc : leftArrowSrc}
            alt="Previous continent"
            onClick={handlePrevious}
            width={17}
            height={17}
            className="cursor-pointer my-[9.5px]"
          />

          <div
            className="w-[65px] h-9 rounded-full border-2 border-white bg-[#0080FF] flex items-center justify-center px-2 py-1 absolute left-1/2 -translate-x-1/2 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center gap-0">
              {continentLines?.map((line, index) => (
                <span
                  key={index}
                  className="font-bold text-white whitespace-nowrap text-center"
                  style={{
                    fontSize: continentLines.length > 1 ? '9px' : '12px',
                    lineHeight: continentLines.length > 1 ? '10px' : '16px',
                    fontFamily: 'Google Sans, sans-serif',
                  }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>

          <Image
            src={isArabic ? leftArrowSrc : rightArrowSrc}
            alt="Next continent"
            onClick={handleNext}
            width={17}
            height={17}
            className="cursor-pointer my-[9.5px]"
          />
        </div>
      </div>
    );
  }
);

ContinentSelector.displayName = 'ContinentSelector';

export default ContinentSelector;