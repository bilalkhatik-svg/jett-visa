'use client';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/utils/i18nStub';
import { useFetchDestinationsQuery } from '@/store/visaDestinationsApi';
import { useFetchCountryListQuery } from '@/store/visaCountryListApi';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setNationality } from '@/store/slice/locationSlice';
import circleBackgroundImage from '@/assets/images/circlebg.webp';
import arcImage from '@/assets/images/Ellipse.webp';
import lineImage from '@/assets/images/lineimage.webp';
import CardImg from '@/assets/images/germany-card-img.webp';
import type { PendingAction } from '@/components-library/home-screen/HomeScreen';

// Mock data
const continents = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];
const continentLanguageMap: Record<string, string> = {
  'Asia': 'Asia',
  'Europe': 'Europe',
  'Africa': 'Africa',
  'North America': 'North America',
  'South America': 'South America',
  'Oceania': 'Oceania',
};

const DEFAULT_CONTINENT = continents[0] || 'Asia';
const SKELETON_MIN_TIME = 250;

// Helper function
const getCountryVisaUrl = (residencyIso: string, destinationIso: string): string => {
  return `/visa?res=${residencyIso}&dest=${destinationIso}`;
};

// Types
interface ApiDestination {
  id: string;
  countryName: string;
  isoCode2: string;
  isoCode3: string;
  continent: string;
  currencyCode: string;
  symbol: string;
  visaMode: string;
  visaModeName: string;
  startingPrice: number;
  getVisaDays: number;
  startsPrefix: string;
  images: Array<{ filename: string }>;
  entityIds: string[];
}

interface Destination {
  id: string;
  country: string;
  countryCode: string;
  continent: string;
  image: string;
  chips: VisaChip[];
  active: boolean;
}

interface VisaChip {
  type: 'mode' | 'price' | 'processing';
  label: string;
  value: string;
}

interface FindVisaWidgetProps {
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

// Mock country data
const mockCountries = [
  { id: '1', name: 'India', isoCode: 'IN', flag: 'https://flagcdn.com/w20/in.png' },
  { id: '2', name: 'United States', isoCode: 'US', flag: 'https://flagcdn.com/w20/us.png' },
  { id: '3', name: 'United Kingdom', isoCode: 'GB', flag: 'https://flagcdn.com/w20/gb.png' },
  { id: '4', name: 'Canada', isoCode: 'CA', flag: 'https://flagcdn.com/w20/ca.png' },
  { id: '5', name: 'Australia', isoCode: 'AU', flag: 'https://flagcdn.com/w20/au.png' },
  { id: '6', name: 'Germany', isoCode: 'DE', flag: 'https://flagcdn.com/w20/de.png' },
  { id: '7', name: 'France', isoCode: 'FR', flag: 'https://flagcdn.com/w20/fr.png' },
  { id: '8', name: 'Japan', isoCode: 'JP', flag: 'https://flagcdn.com/w20/jp.png' },
  { id: '9', name: 'China', isoCode: 'CN', flag: 'https://flagcdn.com/w20/cn.png' },
  { id: '10', name: 'Brazil', isoCode: 'BR', flag: 'https://flagcdn.com/w20/br.png' },
  { id: '11', name: 'UAE', isoCode: 'AE', flag: 'https://flagcdn.com/w20/ae.png' },
  { id: '12', name: 'Saudi Arabia', isoCode: 'SA', flag: 'https://flagcdn.com/w20/sa.png' },
];

// Functional NationalitySelect component with DaisyUI dropdown
const NationalitySelect = ({ 
  value, 
  onChange, 
  countryList 
}: { 
  value: string; 
  onChange: (id: string) => void;
  countryList?: any[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use countryList if provided, otherwise use mock data
  const countries = countryList && countryList.length > 0 
    ? countryList.map((country: any) => ({
        id: country.id || country.isoCode || country.IsoCode2 || country.isoCode2 || '',
        name: country.name || country.countryName || country.nationality || '',
        isoCode: country.isoCode || country.IsoCode2 || country.isoCode2 || '',
        flag: country.flag || `https://flagcdn.com/w20/${(country.isoCode || country.IsoCode2 || country.isoCode2 || '').toLowerCase()}.png`
      })).filter((c: any) => c.id && c.name) // Filter out invalid entries
    : mockCountries;

  const selectedCountry = countries.find(c => c.id === value);
  
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (countryId: string) => {
    if (countryId) {
      onChange(countryId);
      setIsOpen(false);
      setSearch('');
    }
  };

  return (
    <div className="dropdown dropdown-open w-full max-w-[448px]" ref={dropdownRef}>
      <label
        tabIndex={0}
        className="btn btn-outline h-12 rounded-[14px] border-2 border-base-300 px-3 py-2 bg-base-100 flex items-center justify-between cursor-pointer hover:border-primary w-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedCountry ? (
            <>
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-5 h-5 rounded-full flex-shrink-0"
              />
              <span className="text-sm text-primary font-medium truncate">
                {selectedCountry.name}
              </span>
            </>
          ) : (
            <span className="text-sm text-base-content/60">Select Nationality</span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-base-content/60 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </label>

      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-2xl shadow-xl border border-base-300 z-[9999] w-full max-h-[400px] flex flex-col mt-2"
          style={{ position: 'absolute', top: '100%', left: 0, right: 0 }}
        >
          {/* Header */}
          <li className="px-5 pt-5 pb-3 border-b border-base-300">
            <h3 className="text-lg font-semibold text-primary ">Select nationality</h3>
          </li>

          {/* Search */}
          {/* <li className="px-5 pb-4 pt-4">
            <div className="form-control">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search country..."
                  className="input input-bordered w-full h-12 rounded-full pl-4 pr-10 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </div>
            </div>
          </li> */}

          {/* List */}
          <div className="overflow-y-auto max-h-[280px] pb-2">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <li key={country.id}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelect(country.id);
                    }}
                    className={`flex items-center gap-4 px-5 py-3 cursor-pointer hover:bg-base-200 ${
                      value === country.id ? 'active bg-primary/10' : ''
                    }`}
                  >
                    <img
                      src={country.flag}
                      alt={country.name}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <span className="text-base text-primary font-medium">
                      {country.name}
                    </span>
                  </a>
                </li>
              ))
            ) : (
              <li className="px-5 py-8 text-center text-base-content/60">
                <span>No countries found</span>
              </li>
            )}
          </div>
        </ul>
      )}
    </div>
  );
};

const ContinentSelector = ({ selected, onChange }: { selected: string; onChange: (continent: string) => void }) => (
  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
    {continents.map((continent) => (
      <button
        key={continent}
        onClick={() => onChange(continent)}
        className={`btn btn-sm px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
          selected === continent
            ? 'btn-primary'
            : 'btn-outline btn-ghost'
        }`}
      >
        {continent}
      </button>
    ))}
  </div>
);

const DestinationCarousel = ({ 
  destinations, 
  onCardClick, 
  onScrollContainerReady,
  isMobile 
}: { 
  destinations: Destination[]; 
  onCardClick: (dest: Destination) => void;
  onScrollContainerReady: (node: HTMLDivElement | null) => void;
  isMobile: boolean;
}) => (
  <div
    ref={onScrollContainerReady}
    className={`flex gap-4 overflow-x-auto scrollbar-hide ${isMobile ? 'snap-x snap-mandatory' : ''}`}
  >
    {destinations.map((dest) => (
      <div
        key={dest.id}
        onClick={() => onCardClick(dest)}
        className={`card bg-base-100 rounded-lg border border-base-300 overflow-hidden cursor-pointer hover:shadow-lg transition ${
          isMobile ? 'min-w-[200px] snap-center' : 'w-[260px] flex-shrink-0'
        }`}
      >
        <figure>
          <img src={dest.image} alt={dest.country} className="w-full h-32 object-cover" />
        </figure>
        <div className="card-body p-3">
          <h3 className="card-title text-primary font-semibold text-base mb-2">{dest.country}</h3>
          <div className="flex flex-wrap gap-2">
            {dest.chips.map((chip, idx) => (
              <div key={idx} className="badge badge-outline text-xs">
                {chip.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="alert alert-info text-center py-8">
    <span>No destinations found</span>
  </div>
);

const ErrorBanner = () => (
  <div className="alert alert-error">
    <span>Error loading destinations</span>
  </div>
);

const LoadingSkeleton = () => (
  <div className="flex gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="skeleton w-[260px] h-[200px] rounded-lg flex-shrink-0" />
    ))}
  </div>
);

const FindVisaWidget: React.FC<FindVisaWidgetProps> = ({ onPreFlowNavigation }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storedNationality = useAppSelector((state) => state.locationSlice.nationality);
  const residency = useAppSelector((state) => state.locationSlice.residency);
  
  // Fetch country list
  const { data: countryListResponse } = useFetchCountryListQuery(i18n.language || 'en-US');
  const countryListData = countryListResponse?.response ? { response: countryListResponse.response } : { response: [] };
  
  const [selectedContinent, setSelectedContinent] = useState<string>(DEFAULT_CONTINENT);
  const [effectiveContinent, setEffectiveContinent] = useState<string>(DEFAULT_CONTINENT);
  const nationalityIsoCode = storedNationality?.isoCode || '';
  const hasNationality = !!nationalityIsoCode;
  const [loadingContinent, setLoadingContinent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);
  const [carouselEdges, setCarouselEdges] = useState({ atStart: true, atEnd: false });
  
  const englishContinent =
    i18n.language === 'ar'
      ? continentLanguageMap[effectiveContinent] || effectiveContinent
      : effectiveContinent;
  
  // Fetch destinations based on nationality and continent
  const { data: destinationsResponse, isLoading, isError } = useFetchDestinationsQuery(
    {
      continent: englishContinent,
      isoCode2: nationalityIsoCode,
      language: i18n.language || 'en-US',
    },
    {
      skip: !hasNationality,
    }
  );
  
  const apiDestinations = destinationsResponse?.response || [];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const allDestinations: Destination[] = useMemo(() => {
    if (isError) {
      return [];
    }
    if (!apiDestinations || apiDestinations.length === 0) {
      return [];
    }

    return (apiDestinations as unknown as ApiDestination[]).map(dest => {
      const chips: VisaChip[] = [];

      if (dest.visaModeName) {
        chips.push({
          type: 'mode',
          label: dest.visaModeName,
          value: dest.visaModeName,
        });
      }

      if (dest.startingPrice && dest.symbol && dest.startsPrefix) {
        chips.push({
          type: 'price',
          label: `${dest.startsPrefix} ${dest.symbol}${dest.startingPrice.toFixed(0)}`,
          value: dest.startingPrice.toString(),
        });
      }

      if (dest.getVisaDays) {
        chips.push({
          type: 'processing',
          label: `${dest.getVisaDays}`,
          value: dest.getVisaDays.toString(),
        });
      }

      const imageUrl = dest.images?.[0]?.filename || CardImg;

      return {
        id: dest.id,
        country: dest.countryName,
        countryCode: dest.isoCode2,
        continent: dest.continent,
        image: imageUrl,
        chips: chips,
        active: true,
      } as Destination;
    });
  }, [apiDestinations, isError]);

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
      // Find the country in the API response by matching id, isoCode, or IsoCode2
      const selectedNationalityData = countryListData?.response?.find(
        (country: any) => 
          country.id === nationalityId || 
          country.isoCode === nationalityId || 
          country.IsoCode2 === nationalityId ||
          country.isoCode2 === nationalityId
      );

      if (selectedNationalityData) {
        // Ensure the country object has all required fields
        const nationalityPayload = {
          id: selectedNationalityData.id || selectedNationalityData.isoCode || selectedNationalityData.IsoCode2 || selectedNationalityData.isoCode2,
          isoCode: selectedNationalityData.isoCode || selectedNationalityData.IsoCode2 || selectedNationalityData.isoCode2,
          name: selectedNationalityData.name || selectedNationalityData.countryName || selectedNationalityData.nationality,
          flag: selectedNationalityData.flag,
          ...selectedNationalityData
        };
        dispatch(setNationality(nationalityPayload));
      } else {
        console.warn('[FindVisaWidget] Country not found for id:', nationalityId);
      }
    },
    [countryListData, dispatch]
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
    const path = getCountryVisaUrl(residency?.isoCode || '', destination.countryCode);

    const action: PendingAction = {
      type: 'navigate',
      url: path
    };

    onPreFlowNavigation(action);
  }, [onPreFlowNavigation, residency]);

  const handleSeeAll = useCallback(() => {
    router.push(`/destinations?continent=${selectedContinent}`);
  }, [router, selectedContinent]);

  const containerHeight = hasNationality ? (isMobile ? '528px' : '730px') : 'auto';
  
  const getImageSrc = (img: any) => typeof img === 'string' ? img : (img as any)?.src || img;
  const circleBgSrc = getImageSrc(circleBackgroundImage);
  const arcImgSrc = getImageSrc(arcImage);
  const lineImgSrc = getImageSrc(lineImage);

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 py-8 flex justify-center items-center"
      role="region"
      aria-label="Find visa widget"
    >
      <div
        className={`card bg-base-100 flex flex-col gap-4 relative overflow-hidden ${
          isMobile ? 'w-[315px] border-4 border-base-200 shadow-sm' : 'w-full'
        }`}
        style={{
          height: containerHeight,
          borderRadius: '20px',
          padding: '20px',
        }}
      >
        <div className="text-center relative z-[3] flex flex-col items-center gap-2">
          <h1
            className={`font-poppins font-semibold text-primary ${
              isMobile ? 'text-base' : 'text-[28px]'
            }`}
            style={{ height: '4px' }}
          >
            {t('find_your_visa')}
          </h1>
          <div
            className={`flex items-center justify-center gap-3 ${
              isMobile ? 'w-[154px] mt-0 mb-0' : 'w-[238px] mt-2.5 mb-2.5'
            }`}
            aria-hidden="true"
          >
            <img
              src={lineImgSrc}
              alt=""
              className={`w-[30px] h-0.5 object-contain ${
                isMobile ? 'mt-[35px]' : 'mt-[30px]'
              }`}
            />
            <span
              className={`font-poppins font-normal text-primary text-center whitespace-nowrap ${
                isMobile
                  ? 'w-[154px] h-[18px] text-xs mt-10'
                  : 'w-[238px] h-[18px] text-lg mt-[30px]'
              }`}
            >
              {t('based_on_your_nationality')}
            </span>
            <img
              src={lineImgSrc}
              alt=""
              className={`w-[30px] h-0.5 object-contain ${
                isMobile ? 'mt-[35px]' : 'mt-[30px]'
              }`}
            />
          </div>
        </div>

        <div className={`relative z-[3] max-w-full mx-auto ${isMobile ? 'w-full mt-2.4' : 'w-[448px] mt-0'}`}>
          <NationalitySelect
            value={storedNationality?.id || ''}
            onChange={handleNationalityChange}
            countryList={countryListData?.response}
          />
        </div>

        {hasNationality && (
          <>
            <div
              className="visa-circle-background absolute left-1/2 -translate-x-1/2 rounded-full bg-cover bg-center bg-no-repeat z-[1]"
              style={{
                top: '178px',
                width: isMobile ? '900px' : '1126px',
                height: isMobile ? '900px' : '1126px',
                backgroundImage: `url(${circleBgSrc})`,
              }}
              aria-hidden="true"
            />
            <img
              src={arcImgSrc}
              alt=""
              className="absolute left-1/2 -translate-x-1/2 w-full max-w-[330px] h-auto z-[2] pointer-events-none"
              style={{ top: '180px' }}
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
                  <div className="w-full relative flex items-center justify-center max-w-full mx-auto px-0" style={{ maxWidth: isMobile ? '100%' : '780px' }}>
                    {shouldShowDesktopControls && (
                      <button
                        aria-label="Show previous destinations"
                        onClick={() => handleDesktopScroll('prev')}
                        disabled={carouselEdges.atStart}
                        className={`btn btn-circle btn-sm absolute -left-8 bg-base-100 shadow-md hover:bg-base-200 ${
                          carouselEdges.atStart ? 'btn-disabled' : ''
                        }`}
                      >
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
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
                        className={`btn btn-circle btn-sm absolute -right-8 bg-base-100 shadow-md hover:bg-base-200 ${
                          carouselEdges.atEnd ? 'btn-disabled' : ''
                        }`}
                      >
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                  <button
                    onClick={handleSeeAll}
                    className="btn btn-link text-sm font-medium text-primary font-poppins"
                  >
                    {t('see_all') || 'See all'}
                  </button>
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
