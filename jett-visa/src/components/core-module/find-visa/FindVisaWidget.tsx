"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import NationalitySelect from '@/components/core-module/find-visa/NationalitySelect';
import ContinentSelector from '@/components/core-module/find-visa/ContinentSelector';
import DestinationCarousel from '@/components/core-module/find-visa/DestinationCarousel';
import EmptyState from '@/components/core-module/find-visa/EmptyState';
import ErrorBanner from '@/components/core-module/find-visa/ErrorBanner';
import circleBackgroundImage from '@/assets/images/circlebg.webp';
import arcImage from '@/assets/images/Ellipse.webp';
import lineImage from '@/assets/images/lineimage.webp';
import { setNationality } from '@/store/slice/locationSlice';
import { useTranslation } from 'react-i18next';
import type { PendingAction } from '@/components-library/home-screen/HomeScreen';
import { useLocation } from '@/utils/hooks/useLocation';
import LoadingSkeleton from '@/components/core-module/skeletons/VisaCardSkeleton';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';
import { mockDestinations, continents, continentLanguageMap, nationalities } from '@/utility/mock/mockVisaApi';
import type { Destination } from '@/utility/types/find-visa/Visa';

const DEFAULT_CONTINENT = continents[0] || 'Asia';
const SKELETON_MIN_TIME = 250;

interface FindVisaWidgetProps {
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const FindVisaWidget: React.FC<FindVisaWidgetProps> = ({ onPreFlowNavigation }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storedNationality = useAppSelector((state) => state.locationSlice.nationality);
  const { residency } = useLocation();
  const [selectedContinent, setSelectedContinent] = useState<string>(DEFAULT_CONTINENT);
  const [effectiveContinent, setEffectiveContinent] = useState<string>(DEFAULT_CONTINENT);
  const nationalityIsoCode = storedNationality?.isoCode || '';
  const hasNationality = !!nationalityIsoCode;
  const [loadingContinent, setLoadingContinent] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);
  const [carouselEdges, setCarouselEdges] = useState({ atStart: true, atEnd: false });
  const englishContinent =
    i18n.language === 'ar'
      ? continentLanguageMap[effectiveContinent] || effectiveContinent
      : effectiveContinent;

  // Use mock destinations filtered by continent
  const allDestinations: Destination[] = useMemo(() => {
    if (!hasNationality) return [];
    
    return mockDestinations.filter(dest => 
      dest.continent === englishContinent
    );
  }, [hasNationality, englishContinent]);

  const isLoading = false;
  const isError = false;

  useEffect(() => {
    if (!hasNationality) return;

    setLoadingContinent(true);
    const timer = setTimeout(() => {
      setEffectiveContinent(selectedContinent);
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedContinent, hasNationality]);

  useEffect(() => {
    if (!loadingContinent) return;

    const timer = setTimeout(() => {
      if (!isLoading) {
        setLoadingContinent(false);
      }
    }, SKELETON_MIN_TIME);

    return () => clearTimeout(timer);
  }, [isLoading, loadingContinent]);

  const firstFiveDestinations = useMemo(() => {
    return allDestinations.slice(0, 5);
  }, [allDestinations]);

  const hasMoreThanFive = useMemo(() => {
    return allDestinations.length > 5;
  }, [allDestinations]);

  const shouldShowDesktopControls = !isMobile && allDestinations.length > 3;

  const updateCarouselEdges = useCallback(() => {
    if (!carouselContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselContainerRef.current;
    setCarouselEdges({
      atStart: scrollLeft <= 1,
      atEnd: scrollLeft + clientWidth >= scrollWidth - 1,
    });
  }, []);

  const handleCarouselContainer = useCallback(
    (node: HTMLDivElement | null) => {
      carouselContainerRef.current = node;
      if (!isMobile) {
        if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
          window.requestAnimationFrame(() => updateCarouselEdges());
        } else {
          updateCarouselEdges();
        }
      }
    },
    [isMobile, updateCarouselEdges]
  );

  useEffect(() => {
    if (isMobile) return;
    const container = carouselContainerRef.current;
    if (!container) return;

    updateCarouselEdges();
    const handleScroll = () => updateCarouselEdges();
    container.addEventListener('scroll', handleScroll);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleScroll);
      }
    };
  }, [allDestinations.length, isMobile, updateCarouselEdges]);

  const handleNationalityChange = useCallback(
    (nationalityId: string) => {
      const selectedNationalityData = nationalities?.find(
        (country: any) => country.id === nationalityId
      );

      if (selectedNationalityData) {
        dispatch(setNationality(selectedNationalityData));
      }
    },
    [dispatch]
  );

  const handleContinentChange = useCallback((continent: string) => {
    setSelectedContinent(continent);
  }, []);

  const handleDesktopScroll = useCallback((direction: 'next' | 'prev') => {
    const container = carouselContainerRef.current;
    if (!container) return;

    const firstChild = container.children[0] as HTMLElement | undefined;
    const cardWidth = firstChild?.offsetWidth || 260;

    let gap = 16;
    if (typeof window !== 'undefined') {
      const styles = window.getComputedStyle(container);
      const gapValue = styles.columnGap || styles.gap || '16px';
      gap = parseFloat(gapValue) || 16;
    }

    const scrollAmount = cardWidth + gap;
    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  const handleCardClick = useCallback((destination: Destination) => {
    const buildQuery = `?res=${residency?.isoCode || ''}&dest=${destination.countryCode}`;
    const path = "/visa" + buildQuery;
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${path}`;

    const action: PendingAction = {
      type: 'navigate',
      url: url
    };

    onPreFlowNavigation(action);
  }, [onPreFlowNavigation, residency]);

  const handleSeeAll = useCallback(() => {
    router.push(`/all-destinations?continent=${selectedContinent}`);
  }, [router, selectedContinent]);

  const containerHeight = hasNationality ? (isMobile ? '528px' : '730px') : 'auto';

  return (
    <div
      className="px-2 py-4 flex justify-center items-center max-w-7xl mx-auto"
      role="region"
      aria-label="Find visa widget"
    >
      <div
        className={`${
          isMobile ? 'w-[315px]' : 'w-full'
        } rounded-[20px] ${
          isMobile ? 'border-4 border-[#F2F2F8]' : 'border-none'
        } p-5 flex flex-col gap-[15px] bg-white ${
          isMobile ? 'shadow-sm' : 'shadow-none'
        } relative overflow-hidden`}
        style={{ height: containerHeight }}
      >
        <div className="text-center relative z-[3] flex flex-col items-center gap-2">
          <h1
            className={`h-1 ${
              isMobile ? 'text-base' : 'text-[28px]'
            } font-semibold text-[#00366B] font-[Poppins,sans-serif]`}
          >
            {t('find_your_visa')}
          </h1>
          <div
            className={`${
              isMobile ? 'w-[154px]' : 'w-[238px]'
            } h-[18px] flex items-center justify-center gap-3 ${
              isMobile ? 'mt-0 mb-0' : 'mt-2.5 mb-2.5'
            }`}
            aria-hidden="true"
          >
            <img
              src={typeof lineImage === 'string' ? lineImage : (lineImage as any)?.src}
              alt=""
              className={`w-[30px] h-[2px] object-contain ${isMobile ? 'mt-[35px]' : 'mt-[30px]'}`}
            />
            <p
              className={`${
                isMobile ? 'w-[154px]' : 'w-[238px]'
              } h-[18px] ${
                isMobile ? 'text-xs' : 'text-lg'
              } font-normal font-[Poppins,sans-serif] leading-[100%] text-[#00366B] text-center whitespace-nowrap ${
                isMobile ? 'mt-10' : 'mt-[30px]'
              }`}
            >
              {t('based_on_your_nationality')}
            </p>
            <img
              src={typeof lineImage === 'string' ? lineImage : (lineImage as any)?.src}
              alt=""
              className={`w-[30px] h-[2px] object-contain ${isMobile ? 'mt-[35px]' : 'mt-[30px]'}`}
            />
          </div>
        </div>

        <div
          className={`relative z-[3] max-w-full mx-auto ${
            !isMobile ? 'w-[448px]' : 'w-full'
          } ${isMobile ? 'mt-2.5' : 'mt-0'}`}
        >
          <NationalitySelect
            value={storedNationality?.id || ''}
            onChange={handleNationalityChange}
          />
        </div>

        {hasNationality && (
          <>
            <div
              className="visa-circle-background absolute top-[178px] left-1/2 -translate-x-1/2 rounded-full z-[1]"
              style={{
                width: isMobile ? '900px' : '1126px',
                height: isMobile ? '900px' : '1126px',
                backgroundImage: `url(${typeof circleBackgroundImage === 'string' ? circleBackgroundImage : (circleBackgroundImage as any)?.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              aria-hidden="true"
            />
            <img
              src={typeof arcImage === 'string' ? arcImage : (arcImage as any)?.src}
              alt=""
              className="absolute top-[180px] left-1/2 -translate-x-1/2 w-full max-w-[330px] h-auto z-[2] pointer-events-none"
              aria-hidden="true"
            />
          </>
        )}

        {hasNationality && (
          <>
            <div className="relative z-[3] pt-1 flex justify-center">
              <ContinentSelector
                selected={selectedContinent}
                onChange={handleContinentChange}
              />
            </div>

            <div className="absolute left-0 right-0 bottom-5 z-[3] flex flex-col gap-2">
              <div className="flex justify-center">
                {loadingContinent || isLoading ? (
                  <LoadingSkeleton />
                ) : isError ? (
                  <ErrorBanner />
                ) : allDestinations?.length > 0 ? (
                  <div
                    className={`w-full relative flex items-center justify-center ${
                      isMobile ? 'max-w-full' : 'max-w-[780px]'
                    } mx-auto`}
                  >
                    {shouldShowDesktopControls && (
                      <button
                        aria-label="Show previous destinations"
                        onClick={() => handleDesktopScroll('prev')}
                        disabled={carouselEdges.atStart}
                        className="absolute -left-8 bg-white rounded-full p-2 shadow-md hover:bg-[#F5F7FB] disabled:opacity-40 disabled:shadow-none transition-all"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#00366B]"
                        >
                          <path
                            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    )}
                    <div className={`w-full ${isMobile ? 'overflow-visible' : 'overflow-hidden'}`}>
                      <DestinationCarousel
                        destinations={firstFiveDestinations}
                        onCardClick={handleCardClick}
                        onScrollContainerReady={handleCarouselContainer}
                        isMobile={isMobile}
                      />
                    </div>
                    {shouldShowDesktopControls && (
                      <button
                        aria-label="Show next destinations"
                        onClick={() => handleDesktopScroll('next')}
                        disabled={carouselEdges.atEnd}
                        className="absolute -right-8 bg-white rounded-full p-2 shadow-md hover:bg-[#F5F7FB] disabled:opacity-40 disabled:shadow-none transition-all"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#00366B]"
                        >
                          <path
                            d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </div>
              {hasMoreThanFive && (
                <div className="flex justify-center">
                  <div
                    onClick={handleSeeAll}
                    className="cursor-pointer text-sm font-medium text-[#00366B] font-[Poppins,sans-serif] text-center hover:underline"
                  >
                    {t('see_all') || 'See all'}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FindVisaWidget;
