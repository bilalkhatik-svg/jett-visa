"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from '@/utils/i18nStub';
import offerImage from "@/assets/images/offerImage.webp";
import arrowLeftIcon from "@/assets/images/icons/arrowLeft.webp";
import arrowRightIcon from "@/assets/images/icons/arrowrighticon.webp";
import { i18n } from "@/utils/i18nStub";

// Convert StaticImageData to string for img src
const offerImageSrc = typeof offerImage === 'string' ? offerImage : (offerImage as any)?.src || offerImage;

const offerImages = [
    {
        image: offerImageSrc,
    },
    {
        image: offerImageSrc,
    },
    {
        image: offerImageSrc,
    },
    {
        image: offerImageSrc,
    },
];

const OfferSection = () => {
  const { t } = useTranslation();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 600 : false;
  const baseSlides = offerImages;
  const enhancedSlides = useMemo(() => {
    if (baseSlides.length <= 1) {
      return baseSlides;
    }
    return [baseSlides[baseSlides.length - 1], ...baseSlides, baseSlides[0]];
  }, [baseSlides]);
  const [currentIndex, setCurrentIndex] = useState(enhancedSlides.length > 1 ? 1 : 0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === "ar" || i18n.language === "ar-AE";
  const totalSlides = baseSlides.length;
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  useEffect(() => {
    setCurrentIndex(enhancedSlides.length > 1 ? 1 : 0);
  }, [enhancedSlides.length]);

  useEffect(() => {
    if (isAutoScrolling && totalSlides > 1) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, totalSlides]);

  // Pause auto-scroll on hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoScrolling(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoScrolling(true);
  }, []);

  // Navigate to slide
  const goToSlide = useCallback((index: number) => {
    if (totalSlides <= 1) return;
    setCurrentIndex(index + 1);
    setIsAutoScrolling(false);
    // Resume auto-scroll after 3 seconds
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  }, []);

  const goToPrevious = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setIsAutoScrolling(false);
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  }, [totalSlides]);

  const goToNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setIsAutoScrolling(false);
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 2000);
  }, [totalSlides]);

  const handleTransitionEnd = useCallback(() => {
    if (totalSlides <= 1) return;
    if (currentIndex === enhancedSlides.length - 1) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(enhancedSlides.length - 2);
    }
  }, [currentIndex, enhancedSlides.length, totalSlides]);

  useEffect(() => {
    if (!isTransitionEnabled) {
      const raf = requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(raf);
    }
    return undefined;
  }, [isTransitionEnabled]);

  const visibleIndex = totalSlides > 0 ? (currentIndex - 1 + totalSlides) % totalSlides : 0;

  // Convert StaticImageData to string for img src
  const arrowLeftIconSrc = typeof arrowLeftIcon === 'string' ? arrowLeftIcon : (arrowLeftIcon as any)?.src || arrowLeftIcon;
  const arrowRightIconSrc = typeof arrowRightIcon === 'string' ? arrowRightIcon : (arrowRightIcon as any)?.src || arrowRightIcon;

  return (
    <section className="px-8 py-5 bg-white max-w-[1120px] mx-auto md:px-8 md:py-5 sm:px-4 sm:py-5">
      <h3 className="font-poppins font-semibold text-[#00366B] text-2xl mb-3 md:text-2xl md:mb-3 sm:text-lg">{t('offers') || 'Offers'}</h3>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[250px] rounded-[20px] overflow-hidden shadow-md md:h-[250px] sm:h-[180px]"
      >
        <div className="relative w-full h-full overflow-hidden">
          <div
            ref={carouselRef}
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ width: `${enhancedSlides.length * 100}%`, transform: `translateX(-${currentIndex * (100 / enhancedSlides.length)}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {enhancedSlides.map((item, index) => (
              <div key={index} className="flex-shrink-0" style={{ width: `${100 / enhancedSlides.length}%`, height: '100%' }}>
                <img src={item.image} alt={`Offer ${index + 1}`} className="w-full h-full object-contain rounded-[20px]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2 flex-1">
          {baseSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${visibleIndex === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 bg-[#F2F2F8] text-[#003669] rounded-full border border-[#DBE9F8] flex items-center justify-center hover:bg-[#EDEFF5]"
            aria-label="previous"
            style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
          >
            <img src={arrowLeftIconSrc} alt="previous" width={20} height={20} className="object-contain" />
          </button>
          <button
            onClick={goToNext}
            className="w-10 h-10 bg-[#F2F2F8] text-[#003669] rounded-full border border-[#DBE9F8] flex items-center justify-center hover:bg-[#EDEFF5]"
            aria-label="next"
            style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }}
          >
            <img src={arrowRightIconSrc} alt="next" width={20} height={20} className="object-contain" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(OfferSection);