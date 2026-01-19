"use client";

// import {
//   Box,
//   InputAdornment,
//   styled,
//   TextField,
//   Typography,
// } from "@mui/material";
import { lazy, Suspense, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "@/utils/i18nStub";
// import { useNavigate } from "react-router-dom";
import inspireMeGif from "@/assets/images/gif/inspireMeGif.gif";
import SearchIcon2 from "@/assets/images/icons/search.png";
import planeImage from "@/assets/images/planeImage.png";
import planeMark from "@/assets/images/planeMark.png";
// import { FooterSection, MobileBottomDrawer, VisaTypeSection } from "@/components";
import FindVisaWidget from "@/components/core-module/find-visa/FindVisaWidget";
// import BottomConfirmBar from "@components/core-module/nationality-residency/common/BottomConfirmBar";
// import UpdateResidencyDialog from "@components/core-module/nationality-residency/modals/UpdateResidencyDialog";
// import NationalityResidencySelector, { type NationalityResidencySelectorRef } from "@components/core-module/nationality-residency/NationalityResidencySelector";
import TopBar from "@/components/core-module/navbar/TopBar";
// import MobileBottomDrawerSkeleton from "@components/core-module/skeletons/MobileBottomDrawerSkeleton";
// import TravelDateCalender from "@components/core-module/travel-date-calendar/TravelDateCalender";
// import OtherVisaTypes from "@components/core-module/visa-type/OtherVisaTypes";
import { i18n } from "@/utils/i18nStub";
import { useFetchCountryListQuery } from "@/store/visaCountryListApi";
import { useFetchIPQuery, useFetchGeoIPQuery } from "@/store/locationApi";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setNationality, setResidency, setLocationData, setCountryIsoCode } from "@/store/slice/locationSlice";
// import { ROUTES } from "@utility/constant";
import type { Country } from "@/utils/types/nationality-residency/Country";
// Define types locally
interface NationalityResidencySelectorRef {
  [key: string]: any;
}
// Simple helper function
const getCountryVisaUrl = (residencyIso: string, destinationIso: string): string => {
  return `/visa?res=${residencyIso}&dest=${destinationIso}`;
};
// Mock ROUTES
const ROUTES = {
  INSPIRE_ME: "/inspire-me"
};
// Simple navigate function
const useNavigate = () => {
  return (path: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };
};
import FaqSection from './faq/FaqSection';
import HowToApplySection from './howToApplySection/HowToApplySection';
import TestimonialsSection from './testimonialsSection/TestimonialsSection';
import SearchTravelDate from "./travelDateSection/SearchTravelDate";
import VisaMode from "./visaSelectionOptions/VisaSelectionOptions";
import WhyChooseMusafirSection from './whyChooseMusafirSection/WhyChooseMusafirSection';
// import HeroSectionSkeleton from "@/components/core-module/skeletons/HeroSectionSkeleton";
// import TopDestinationsSkeleton from "@components/core-module/skeletons/TopDestinationsSkeleton";
// import FindVisaWidgetSkeleton from "@components/core-module/skeletons/FindVisaWidgetSkeleton";
// import HowToApplySectionSkeleton from "@components/core-module/skeletons/HowToApplySectionSkeleton";
// import WhyChooseMusafirSectionSkeleton from "@components/core-module/skeletons/WhyChooseMusafirSkeleton";
// import TestimonialsSectionSkeleton from "@components/core-module/skeletons/TestimonialsSectionSkeleton";
// import FaqSectionSkeleton from "@components/core-module/skeletons/FaqSectionSkeleton";
// import FooterSkeleton from "@components/core-module/skeletons/FooterSkeleton";
// import BottomConfirmBarSkeleton from "@components/core-module/skeletons/BottomConfirmBarSkeleton";
// import { getCountryVisaUrl } from "@/utility/helper";
// import TopBarSkeleton from "@components/core-module/skeletons/TopBarSkeleton";
// import { useMediaQuery } from "@mui/material";

// Simple skeleton components
const HeroSectionSkeleton = () => <div className="h-96 bg-gray-200 animate-pulse"></div>;
const TopDestinationsSkeleton = ({ numberOfItems = 8 }: { numberOfItems?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
    {Array.from({ length: numberOfItems }).map((_, i) => (
      <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>
    ))}
  </div>
);
const FindVisaWidgetSkeleton = () => <div className="h-64 bg-gray-200 animate-pulse"></div>;
const HowToApplySectionSkeleton = () => <div className="h-64 bg-gray-200 animate-pulse"></div>;
const WhyChooseMusafirSectionSkeleton = () => <div className="h-64 bg-gray-200 animate-pulse"></div>;
const TestimonialsSectionSkeleton = () => <div className="h-64 bg-gray-200 animate-pulse"></div>;
const FaqSectionSkeleton = () => <div className="h-64 bg-gray-200 animate-pulse"></div>;
const FooterSkeleton = () => <div className="h-64 bg-gray-200 animate-pulse"></div>;
const BottomConfirmBarSkeleton = () => <div className="h-20 bg-gray-200 animate-pulse"></div>;
const TopBarSkeleton = () => <div className="h-16 bg-gray-200 animate-pulse"></div>;
const MobileBottomDrawerSkeleton = () => <div className="h-96 bg-gray-200 animate-pulse"></div>;

// Simple component placeholders
// const FooterSection = () => <footer className="bg-gray-800 text-white p-8">Footer</footer>;
const MobileBottomDrawer = ({ modalOpen, setModalOpen, children, sx }: any) => {
  if (!modalOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" onClick={() => setModalOpen(false)}>
      <div className="bg-white w-full rounded-t-lg" style={sx} onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end p-2">
          <button onClick={() => setModalOpen(false)} className="text-gray-500 text-xl">✕</button>
        </div>
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 40px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
const VisaTypeSection = ({ showOthers, setShowOthers, onPreFlowNavigation }: any) => (
  <div className="p-4">Visa Type Section</div>
);
const BottomConfirmBar = ({ residency, flagUrl, onConfirmClick, nationalitySelectorRef }: any) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between">
    <span>{residency}</span>
    <button onClick={onConfirmClick} className="bg-blue-500 text-white px-4 py-2 rounded">Confirm</button>
  </div>
);
const UpdateResidencyDialog = ({ open, onClose, initialNationality, initialResidency, onConfirm, onFlagUpdate }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Update Residency</h2>
        <button onClick={onClose} className="text-gray-500">Close</button>
      </div>
    </div>
  );
};

const dummyCities = [
  { code: 'IQ', name: 'Iraqi', flag: 'https://flagcdn.com/w20/iq.png' },
  { code: 'JM', name: 'Jamaican', flag: 'https://flagcdn.com/w20/jm.png' },
  { code: 'KZ', name: 'Kazakhstani', flag: 'https://flagcdn.com/w20/kz.png' },
  { code: 'KE', name: 'Kenyan', flag: 'https://flagcdn.com/w20/ke.png' },
  { code: 'KP', name: 'North Korean', flag: 'https://flagcdn.com/w20/kp.png' },
]; 

const NationalityResidencySelector = ({
  nationality,
  residency,
  onNationalityChange,
  onResidencyChange,
  isMobile = false,
}: any) => {

  const [openNationality, setOpenNationality] = useState(false);
  const [search, setSearch] = useState('');

  const filteredList = dummyCities.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="relative w-full max-w-full sm:max-w-md mx-auto z-50">
      <div className={`flex items-center justify-between rounded-[10px] bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md shadow-sm ${
        isMobile ? 'px-3 py-2.5' : 'px-4 py-3'
      }`}>
    
        {/* Nationality trigger */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1 min-w-0"
          onClick={() => setOpenNationality(prev => !prev)}
        >
          <span className={`text-gray-400 whitespace-nowrap ${isMobile ? 'text-xs' : 'text-sm'}`}>Nationality</span>
          <svg
            className={`text-gray-500 transition-transform flex-shrink-0 ${
              isMobile ? 'w-3 h-3' : 'w-4 h-4'
            } ${openNationality ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Divider */}
        <div className={`h-6 sm:h-8 w-px bg-gray-200 ${isMobile ? 'mx-2' : 'mx-4 sm:mx-6'}`} />

        {/* Residency */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-1 min-w-0"
          onClick={onResidencyChange}
        >
          <img
            src="https://flagcdn.com/w20/in.png"
            alt="India"
            className={`rounded-full flex-shrink-0 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`}
          />
          <div className="flex flex-col leading-tight min-w-0">
            <span className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>Residency</span>
            <span className={`font-semibold text-gray-900 truncate ${isMobile ? 'text-xs' : 'text-base'}`}>
              India
            </span>
          </div>
          <svg
            className={`text-gray-500 flex-shrink-0 ${isMobile ? 'w-3 h-3 ml-0.5' : 'w-4 h-4 ml-1'}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Nationality dropdown */}
      {openNationality && (
        <div className={`absolute ${isMobile ? 'left-0 right-0' : 'left-0'} mt-3 rounded-2xl bg-white shadow-xl border border-gray-100 z-[9999] ${
          isMobile ? 'w-full' : 'w-[320px]'
        }`}>
          
          {/* Header */}
          <div className={`${isMobile ? 'px-4 pt-4 pb-2' : 'px-5 pt-5 pb-3'}`}>
            <h3 className={`font-semibold text-[#0B3C6F] ${isMobile ? 'text-base' : 'text-lg'}`}>
              Search nationality
            </h3>
          </div>

          {/* Search */}
          <div className={`${isMobile ? 'px-4 pb-3' : 'px-5 pb-4'}`}>
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full rounded-full border-2 border-gray-200 pl-4 pr-10 focus:outline-none focus:border-blue-400 ${
                  isMobile ? 'h-10 text-sm' : 'h-12'
                }`}
                placeholder="Search..."
              />
              <svg
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 ${
                  isMobile ? 'w-4 h-4' : 'w-5 h-5'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </div>
          </div>

          {/* List */}
          <div className={`overflow-y-auto ${isMobile ? 'max-h-[200px]' : 'max-h-[280px]'}`}>
            {filteredList.map(item => (
              <div
                key={item.code}
                onClick={() => {
                  onNationalityChange?.(item);
                  setOpenNationality(false);
                }}
                className={`flex items-center gap-3 sm:gap-4 cursor-pointer hover:bg-blue-50 transition ${
                  isMobile ? 'px-4 py-2.5' : 'px-5 py-3'
                }`}
              >
                <img
                  src={item.flag}
                  alt={item.name}
                  className={`rounded-full flex-shrink-0 ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`}
                />
                <span className={`text-[#1E5AA8] font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TravelDateCalender = ({ selectedDate, setSelectedDate, setShowCalender, onPreFlowNavigation }: any) => (
  <div className="p-4">Travel Date Calendar</div>
);
const OtherVisaTypes = ({ onPreFlowNavigation }: any) => (
  <div className="p-4">Other Visa Types</div>
);

// Simple useMediaQuery replacement
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia(query.replace('@media ', ''));
    setMatches(mediaQuery.matches);
    
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);
  
  return matches;
};
import arrowLeft from "@/assets/images/icons/arrowLeft.webp";
import ScrollingDestinationImages from "./scrollingDestinationImages/ScrollingDestinationImages";
import OfferSection from "./offerSection/OfferSection";
import homeBgImage from "@/assets/images/homeBgImage.webp";
import scrollBgImage from "@/assets/images/scrollBgImage.png";
import FooterSection from "./footer-section/FooterSection";



export type ModalTypes = "searchDestination" | "visaMode" | "travelDate" | "";

export interface PendingAction {
  type: 'navigate' | 'search' | string;
  url?: string;
  destination?: any;
  mode?: string;
  date?: string | Date;
  [key: string]: any;
}

// Simple SearchField component using Tailwind
const SearchField = ({ isMobile, placeholder, onClick, value, ...props }: any) => {
  const searchIcon2Src = typeof SearchIcon2 === 'string' ? SearchIcon2 : (SearchIcon2 as any)?.src || SearchIcon2;
  
  return (
    <div 
      className={`relative w-full max-w-[315px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[590px] my-3`}
      onClick={onClick}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        readOnly
        disabled
        className="w-full h-[42px] md:h-[52px] px-4 pr-10 bg-white rounded-[14px] border-2 border-[#F2F2F8] text-[#B5B5B5] text-sm cursor-pointer"
        style={{ pointerEvents: 'none' }}
        {...props}
      />
      <img
        src={searchIcon2Src}
        width={14}
        height={14}
        alt="searchIcon"
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
};

const HomeScreen = () => {
  const [isTopBarLoading, setIsTopBarLoading] = useState(true);
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [isDestinationsLoading, setIsDestinationsLoading] = useState(true);
  const [isBottomConfirmBarLoading, setIsBottomConfirmBarLoading] = useState(true);
  const [isFindVisaLoading, setIsFindVisaLoading] = useState(true);
  const [isHowToApplyLoading, setIsHowToApplyLoading] = useState(true);
  const [isWhyChooseLoading, setIsWhyChooseLoading] = useState(true);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);
  const [isFaqLoading, setIsFaqLoading] = useState(true);
  const [isFooterLoading, setIsFooterLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalTypes>("searchDestination");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const [isTopBarFixed, setIsTopBarFixed] = useState(false);
  // Desktop search dropdown state now handled in DesktopSearchDropdown
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px) and (min-width:601px)");
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const nationalitySelectorRef = useRef<NationalityResidencySelectorRef>(null);
  
  const { t, i18n: i18nInstance } = useTranslation();
  const dispatch = useAppDispatch();
  
  // Fetch country list
  const { data: countryListResponse, isSuccess: isCountryListSuccess, error: countryListError } = useFetchCountryListQuery(
    i18nInstance.language || 'en-US'
  );
  const countryListData = countryListResponse?.response ? { response: countryListResponse.response } : { response: [] };
  
  // Log API errors for debugging
  useEffect(() => {
    if (countryListError) {
      // RTK Query error structure
      const error = countryListError as any;
      const status = error?.status || error?.originalStatus;
      const errorData = error?.data;
      
      // Check if error object is truly empty (no meaningful data)
      const hasStatus = status !== undefined && status !== null;
      const hasData = errorData !== undefined && errorData !== null && 
                     (typeof errorData !== 'object' || Object.keys(errorData || {}).length > 0);
      const hasMessage = error?.message || error?.error || errorData?.message || errorData?.error?.message;
      const hasOtherProps = error?.statusText || error?.data?.url || error?.originalStatus;
      
      // Only log if there's meaningful error information
      if (hasStatus || hasData || hasMessage || hasOtherProps) {
        const errorDetails: Record<string, any> = {};
        if (hasStatus) errorDetails.status = status;
        if (error?.statusText) errorDetails.statusText = error.statusText;
        if (hasData) errorDetails.data = errorData;
        if (error?.error) errorDetails.error = error.error;
        if (hasMessage) {
          errorDetails.message = error?.message || errorData?.message || errorData?.error?.message;
        }
        if (error?.data?.url) errorDetails.url = error.data.url;
        
        // console.error('[HomeScreen] Country list API error:', errorDetails);
        
        // If it's a 401, log a helpful message
        if (status === 401) {
          console.warn('[HomeScreen] 401 Unauthorized - OAuth tokens are missing. Please authorize first.');
        }
      }
      // Silently ignore empty error objects - they're likely from RTK Query's internal state management
    }
  }, [countryListError]);
  
  // Fetch IP address
  const { data: ipData, error: ipError } = useFetchIPQuery();
  // Memoize userIP to prevent unnecessary recalculations
  const userIP = useMemo(() => ipData?.ip || '', [ipData?.ip]);
  
  // Log IP fetch errors
  useEffect(() => {
    if (ipError) {
      const errorDetails = {
        status: (ipError as any)?.status,
        data: (ipError as any)?.data,
        error: (ipError as any)?.error,
        message: (ipError as any)?.message,
        originalStatus: (ipError as any)?.originalStatus,
        fullError: ipError,
      };
      // console.error('[HomeScreen] IP fetch error:', errorDetails);
    }
  }, [ipError]);
  
  // Fetch location based on IP - RTK Query will cache based on userIP value
  const { data: geoIPData, isSuccess: isGeoIPSuccess, error: geoIPError } = useFetchGeoIPQuery(userIP, {
    skip: !userIP,
    // Prevent refetching on remount if data exists
    refetchOnMountOrArgChange: false,
  });
  
  // Log geoIP errors
  useEffect(() => {
    if (geoIPError) {
      const errorDetails = {
        status: (geoIPError as any)?.status,
        data: (geoIPError as any)?.data,
        error: (geoIPError as any)?.error,
        message: (geoIPError as any)?.message,
        originalStatus: (geoIPError as any)?.originalStatus,
        fullError: geoIPError,
      };
      console.error('[HomeScreen] GeoIP API error:', errorDetails);
      
      // If it's a 401, log a helpful message
      if ((geoIPError as any)?.status === 401 || (geoIPError as any)?.originalStatus === 401) {
        console.warn('[HomeScreen] 401 Unauthorized - OAuth tokens are missing. Please authorize first.');
      }
    }
  }, [geoIPError]);
  
  // Get location data from Redux store
  const locationState = useAppSelector((state) => state.locationSlice);
  const nationality = locationState.nationality;
  const residency = locationState.residency;
  const locationResponse = locationState.locationResponse;
  const countryIsoCode = locationState.countryIsoCode;
  
  const handleUpdateNationality = useCallback((country: Country) => {
    dispatch(setNationality(country));
  }, [dispatch]);
  
  const handleUpdateResidency = useCallback((country: Country) => {
    dispatch(setResidency(country));
  }, [dispatch]);
  
  const handleUpdateCountryIsoCode = useCallback((code: string) => {
    dispatch(setCountryIsoCode(code));
  }, [dispatch]);
  
  // Update location data when geoIP data is fetched
  useEffect(() => {
    if (isGeoIPSuccess && geoIPData?.response && userIP) {
      dispatch(setLocationData({
        ip: userIP,
        countryIsoCode: geoIPData.response.countryIsoCode || '',
        residency: geoIPData.response.residency || '',
      }));
    }
  }, [isGeoIPSuccess, geoIPData, userIP, dispatch]);

  const isRTL = i18n.language === "ar" || i18n.language === "ar-AE";
  useEffect(() => {
    if (!isCountryListSuccess || !countryListData?.response) return;
    const currentResidency = residency as Country | null;
    if (currentResidency && currentResidency.isoCode) return;
    const residencyText =
      (locationResponse as any)?.response?.residency?.toLocaleLowerCase();
    const residencyIsoCodeValue = countryIsoCode ? String(countryIsoCode).toLocaleLowerCase() : null;
    const residencyIsoCode =
      residencyIsoCodeValue ||
      (locationResponse as any)?.response?.countryIsoCode?.toLocaleLowerCase();
    const residencyData = countryListData.response.find((item: Country) => {
      if (residencyIsoCode && item.isoCode && item.isoCode.toLocaleLowerCase() === residencyIsoCode) {
        return true;
      }
      if (residencyText && item.isoCode && item.isoCode.toLocaleLowerCase().includes(residencyText)) {
        return true;
      }
      return false;
    });
    if (residencyData && (!currentResidency || !currentResidency.isoCode)) {
      handleUpdateResidency(residencyData);
    }
  }, [
    isCountryListSuccess,
    countryListData,
    residency,
    locationResponse,
    countryIsoCode,
    handleUpdateResidency,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroSectionRef.current) return;

      const heroHeight = heroSectionRef.current.offsetHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const threshold = heroHeight - 70;

      if (scrollTop > threshold) {
        setIsTopBarFixed(true);
        setShowSearchIcon(true);
      } else {
        setIsTopBarFixed(false);
        setShowSearchIcon(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleModal = (value: boolean, mode?: ModalTypes) => {
    setShowModal(value);
    if (mode) {
      setModalType(mode)
    }
  }

  const handleFlagClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    setPendingAction(null);
  }, []);

  const handleSearchClick = useCallback(() => {
    toggleModal(true, "searchDestination");
  }, [toggleModal]);

  const handleMenuClick = useCallback(() => {
  }, []);

  const executePendingAction = useCallback((action: PendingAction) => {
    if (!action) return;

    switch (action.type) {
      case 'navigate':
        if (action.url) {
          window.location.href = action.url;
        }
        break;
      case 'search':
        const currentResidencyForSearch = residency as Country | null;
        const destination = action.destination as Country | undefined;
        if (destination && currentResidencyForSearch && currentResidencyForSearch.isoCode && destination.isoCode) {
          const path = getCountryVisaUrl(currentResidencyForSearch.isoCode, destination.isoCode);
          window.location.href = path;
        }
        break;
    }
    setPendingAction(null);
  }, [residency]);

  const handlePreFlowNavigation = useCallback((action: PendingAction): boolean => {
    const currentNationality = nationality as Country | null;
    const currentResidency = residency as Country | null;
    if (!currentNationality || !currentNationality.isoCode || !currentResidency || !currentResidency.isoCode) {
      setPendingAction(action);
      setShowModal(false);
      setIsDialogOpen(true);
      return false;
    }

    executePendingAction(action);
    return true;
  }, [nationality, residency, executePendingAction]);

  const handleConfirmUpdate = useCallback(
    (newNationality: Country, newResidency: Country) => {
      handleUpdateNationality(newNationality);
      handleUpdateResidency(newResidency);
      if (newResidency?.isoCode) {
        handleUpdateCountryIsoCode(newResidency.isoCode);
      }

      if (pendingAction) {
        setTimeout(() => {
          if (pendingAction.type === 'navigate' && pendingAction.url) {
            let finalUrl = pendingAction.url;

            try {
              const urlObj = new URL(finalUrl);
              const params = new URLSearchParams(urlObj.search);

              if (params.has('nat')) {
                params.set('nat', newNationality?.isoCode || '');
              }

              if (params.has('res')) {
                params.set('res', newResidency?.isoCode || '');
              }

              finalUrl = `${urlObj.origin}${urlObj.pathname}?${params.toString()}`;
            } catch (error) {

            }

            window.location.href = finalUrl;
          } else if (pendingAction.type === 'search' && pendingAction.destination && newResidency.isoCode && pendingAction.destination.isoCode) {
            const path = getCountryVisaUrl(newResidency.isoCode, pendingAction.destination.isoCode);
            window.location.href = path;
          }

          setPendingAction(null);
        }, 100);
      }
    },
    [handleUpdateNationality, handleUpdateResidency, handleUpdateCountryIsoCode, pendingAction]
  );

  const handleInspireMeClick = () => {
    navigate(ROUTES.INSPIRE_ME);
  };

  const handleConfirmBarClick = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  useEffect(() => {
    // Set loading to false after a timeout, regardless of API success
    // This ensures the page renders even if APIs fail
    const timer = setTimeout(() => {
      setIsTopBarLoading(false);
      setIsHeroLoading(false);
      setIsDestinationsLoading(false);
      setIsBottomConfirmBarLoading(false);
    }, 1000); // Give APIs time to respond, but don't wait forever
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHeroLoading) {
      const timers = [
        setTimeout(() => setIsFindVisaLoading(false), 400),
        setTimeout(() => setIsHowToApplyLoading(false), 600),
        setTimeout(() => setIsWhyChooseLoading(false), 800),
        setTimeout(() => setIsTestimonialsLoading(false), 1000),
        setTimeout(() => setIsFaqLoading(false), 1200),
        setTimeout(() => setIsFooterLoading(false), 1400),
      ];
      return () => timers.forEach((timer) => clearTimeout(timer));
    }
  }, [isHeroLoading]);


  // Convert StaticImageData to string
  const planeMarkSrc = typeof planeMark === 'string' ? planeMark : (planeMark as any)?.src || planeMark;
  const planeImageSrc = typeof planeImage === 'string' ? planeImage : (planeImage as any)?.src || planeImage;
  const homeBgImageSrc = typeof homeBgImage === 'string' ? homeBgImage : (homeBgImage as any)?.src || homeBgImage;
  const scrollBgImageSrc = typeof scrollBgImage === 'string' ? scrollBgImage : (scrollBgImage as any)?.src || scrollBgImage;
  const inspireMeGifSrc = typeof inspireMeGif === 'string' ? inspireMeGif : (inspireMeGif as any)?.src || inspireMeGif;
  const arrowLeftSrc = typeof arrowLeft === 'string' ? arrowLeft : (arrowLeft as any)?.src || arrowLeft;

  return (
    <div
      className="w-full flex flex-col items-center bg-white"
      style={{ borderBottom: '2px solid transparent' }}
    >
      <div
        className="relative w-full"
        style={{ zIndex: 1100 }}
      >
        {isTopBarLoading ? (
           <TopBarSkeleton />
    
        ) : (
          <TopBar
            variant="home"
            flagIcon={(residency as Country | null)?.flag}
            isLoggedIn={false}
            onFlagClick={handleFlagClick}
            onLogoClick={() => { }}
            onSearchClick={handleSearchClick}
            onMenuClick={handleMenuClick}
            isFixed={isTopBarFixed}
            showSearchIcon={showSearchIcon}
          />
        )}
      </div>

      {isTopBarFixed && (
        <div className="h-[60px]" />
      )}

      {isHeroLoading ? (
        <HeroSectionSkeleton />
      ) : (
        <div
          ref={heroSectionRef}
          className="w-full"
        >
          <div
            className="relative w-full flex flex-col justify-center border-b border-[#1976d2] rounded-b-[20px] pb-[30px] pt-10 px-4 min-h-auto items-center sm:pb-[30px] sm:pt-10 sm:px-4 sm:min-h-auto sm:items-center md:pb-10 md:pt-[60px] md:px-[60px] md:min-h-[547px] lg:px-[120px] xl:px-[180px]"
            style={{
              backgroundImage: isMobile 
                ? `linear-gradient(200deg, #e7c0eeff, #a0e0e3ff 100%),linear-gradient(to top right, #dbd68fff 0%, transparent 50%)`
                : `url(${homeBgImageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "screen",
              zIndex: 2,
            }}
          >
            {!isMobile && !isTablet && (
              <div
                className="absolute top-0 left-0 right-0 bottom-0.5 rounded-br-[20px] overflow-hidden pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <div
                  className="absolute bottom-0 right-0 w-[45%] h-screen pointer-events-none"
                  style={{
                    backgroundImage: `url(${scrollBgImageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: 1,
                }}
                />
                <div className="pointer-events-auto">
                  <ScrollingDestinationImages isMobile={isMobile} isTablet={isTablet}/>
                </div>
              </div>
            )}
            {/* ===== Header ===== */}
            <div className="flex items-center mb-0 mt-3 ml-2 gap-2 relative md:mb-0 md:mt-3 md:ml-2 sm:mb-4 sm:mt-2 sm:ml-0" style={{ zIndex: 2, width: isMobile ? "100%" : isTablet ? "80%" : "60%" }}>
              <div className="relative inline-block">
                <img
                  src={planeMarkSrc}
                  alt="plane mark"
                  className="block w-[362px] h-[64px] md:w-[362px] md:h-[64px] lg:w-[280px] sm:w-[140px] sm:h-auto"
                  style={{
                    transform: isRTL ? "scaleX(-1)" : "none",
                  }}
                />
                <div className="absolute top-[60%] left-[40%] -translate-x-[30%] -translate-y-1/2 text-center w-full flex md:flex sm:block sm:top-[30%] sm:left-1/2">
                  <span className="text-[#003669] font-poppins font-bold text-4xl leading-none md:text-4xl lg:text-[30px] sm:font-normal sm:text-[22px]">
                    {t("search")}.
                  </span>
                  <span className="text-[#003669] font-poppins whitespace-nowrap font-black text-4xl leading-none mt-0.5 md:text-4xl lg:text-[30px] sm:font-bold sm:text-[22px]">
                    {t("visa")}. {t("go")}.
                  </span>
                </div>
              </div>
              <img
                src={planeImageSrc}
                alt="plane"
                className="block w-[108px] mb-[50px] -ml-[35px] md:w-[108px] md:mb-[50px] md:-ml-[35px] lg:w-[80px] sm:w-[50px] sm:mb-[30px] sm:-ml-2"
                style={{
                  transform: isRTL ? "scaleX(-1)" : "none",
                }}
              />
            </div>
            {
              countryListData?.response && !isMobile && (
                <div
                className="relative block -ml-[30%]"
                style={{
                  zIndex: 2,
                  width: isTablet ? "80%" : "60%",
                }}
              >
              
   {/* {countryListData?.response && (
                <div
                className="
                  relative flex
                  justify-start
                  z-[2]
                  mt-3
                  sm:mt-3
                  md:mt-4
                  w-full
                  sm:w-full
                  md:w-[80%]
                  lg:w-[60%]
                "
              > */}
                <div className="w-full">
                  <NationalityResidencySelector
                    ref={nationalitySelectorRef}
                    nationality={nationality}
                    residency={residency}
                    onNationalityChange={handleUpdateNationality}
                    onResidencyChange={handleUpdateResidency}
                    countryList={countryListData.response}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            )}
            {/* Mobile VisaMode */}
            {isMobile && (
              <div className="relative w-full sm:block md:hidden" style={{ zIndex: 2 }}>
                    <VisaMode showDestinationModal={toggleModal} />
              </div>
            )}
            
            {/* Desktop/Tablet VisaMode */}
            {!isMobile && (
              <div
              className="
                relative hidden md:block
                z-[2]
                mt-[3%]
                -ml-[5%]
                w-[60%]
                tablet:w-[80%]
              "
            >
                  <VisaMode showDestinationModal={toggleModal} />
              </div>
            )}

            {/* Nationality and Residency Selector - Above destination search */}
          

            {modalType === "searchDestination" && (
              <div
              className="
                relative flex
                justify-start
                z-[2]
                mt-3
                sm:mt-3
                md:mt-4
                w-full
                sm:w-full
                md:w-[80%]
<<<<<<<< HEAD:jett-visa/src/features/home-screen/HomeScreen.tsx
========
                
>>>>>>>> 0f1ee9dd767d1707b6f0517bfcaf4a5fc9484625:jett-visa/src/components-library/home-screen/HomeScreen.tsx
              "
            >
            
                {isMobile ? (
                  <SearchField
                    isMobile={isMobile}
                    placeholder={t("search_by_country_or_city")}
                    value={t("search_by_country_or_city")}
                    onClick={() => toggleModal(true, "searchDestination")}
                  />
                ) : (
                  // <DesktopSearchDropdown
                  //   isMobile={isMobile}
                  //   t={t}
                  //   onPreFlowNavigation={handlePreFlowNavigation}
                  //   countryList={countryListData?.response || []}
                  //   widthByBreakpoint={{ md: "400px", lg: "500px", xl: "590px" }}
                  // dropdownWidth="391px"
                  // />
                  <div>drowpdown</div>
                )}
              </div>
            )}
            {modalType === "visaMode" && (
              <VisaTypeSection
                showOthers={showModal}
                setShowOthers={setShowModal}
                onPreFlowNavigation={handlePreFlowNavigation}
              />
            )}
            {modalType === "travelDate" && (
              <SearchTravelDate
                setShowCalender={setShowModal}
                selectedDate={selectedDate}
                onPreFlowNavigation={handlePreFlowNavigation}
              />
            )}

            {/* ===== Inspire Me Button ===== */}
            <div
              onClick={handleInspireMeClick}
              className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 rounded-[30px] p-0.5 cursor-pointer inline-block transition-all duration-300 hover:shadow-lg md:bottom-[-25px] sm:bottom-[-20px]"
              style={{
                background: "radial-gradient(133.33% 145.92% at 0% 0%, #D536F6 0%, #75ECF3 100%)",
              }}
            >
              <div className="rounded-[28px] px-2 py-1 flex items-center justify-center bg-white md:px-2 md:py-1 sm:px-1.5 sm:py-0.5">
                <img
                  src={inspireMeGifSrc}
                  alt="Inspire Me Gif"
                  className="mr-0 w-[35px] h-[30px] md:w-[35px] md:h-[30px] sm:w-8 sm:h-6"
                />
                <span
                  className="text-sm font-medium mr-1 md:text-sm md:mr-1 sm:text-xs sm:mr-0.5"
                  style={{
                    background: "linear-gradient(135deg, #D536F6, #0AB1BA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {isMobile ? t("inspire_me") : t("inspire_me_for_desktopView")}
                </span>
                {!isMobile && (
                  <img
                    src={arrowLeftSrc}
                      alt="arrowLeft"
                    className="mr-1 ml-0.5 w-6 h-6 md:block sm:hidden"
                    style={{
                        transform: isRTL ? "scaleX(-1)" : "none",
                      }}
                    />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isDestinationsLoading ? (
        <TopDestinationsSkeleton numberOfItems={8} />
      ) : (
        <div>Top destination</div>
      )}
      {
        !isMobile && (
          <div>
           <OfferSection/>
          </div>
        )
      }
      {isFindVisaLoading ? (
        <FindVisaWidgetSkeleton />
      ) : (
        <div className="w-full">
          <FindVisaWidget onPreFlowNavigation={handlePreFlowNavigation} />
        </div>
      )}
      {isHowToApplyLoading ? (
        <HowToApplySectionSkeleton />
      ) : (
        <div className="w-full" style={{ background: 'rgba(235, 242, 255, 1)' }}>
          <HowToApplySection />
        </div>
      )}
      {isWhyChooseLoading ? (
        <WhyChooseMusafirSectionSkeleton />
      ) : (
        <div className="w-full">
          <WhyChooseMusafirSection />
        </div>
      )}
      {isTestimonialsLoading ? (
        <TestimonialsSectionSkeleton />
      ) : (
        <div className="w-full">
          <TestimonialsSection />
        </div>
      )}
      {isFaqLoading ? (
        <FaqSectionSkeleton />
      ) : (
        <div className="w-full">
          <FaqSection />
        </div>
      )}
      {isFooterLoading ? (
        <FooterSkeleton />
      ) : (
        <div className="w-full">
          <FooterSection />
        </div>
      )}
      <div
        className="flex-grow w-full bg-white rounded-t-[20px]"
        style={{ marginTop: "25px" }}
      />
      <MobileBottomDrawer
        modalOpen={showModal}
        setModalOpen={toggleModal}
        sx={modalType === "searchDestination" ? { minHeight: '85%' } : {}}
      >
        {modalType === "searchDestination" && showModal && (
          <Suspense fallback={<MobileBottomDrawerSkeleton />}>
            {/* <SearchDestination onPreFlowNavigation={handlePreFlowNavigation} /> */}
            <div>Search destination</div>
          </Suspense>
        )}
        {modalType === "visaMode" && showModal && (
          <OtherVisaTypes onPreFlowNavigation={handlePreFlowNavigation} />
        )}
        {modalType === "travelDate" && showModal && (
          <TravelDateCalender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setShowCalender={setShowModal}
            onPreFlowNavigation={handlePreFlowNavigation}
          />
        )}
      </MobileBottomDrawer>

      {!nationality && (
        isBottomConfirmBarLoading ? (
          <BottomConfirmBarSkeleton />
        ) : (
          <div className="w-full">
            <BottomConfirmBar
              residency={residency ? ((residency as unknown as Country).residency || (residency as unknown as Country).name || '') : ''}
              flagUrl={residency ? (residency as unknown as Country).flag : undefined}
              onConfirmClick={handleConfirmBarClick}
              nationalitySelectorRef={nationalitySelectorRef}
            />
          </div>
        )
      )}

      <UpdateResidencyDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        initialNationality={nationality}
        initialResidency={residency}
        onConfirm={handleConfirmUpdate}
        onFlagUpdate={() => { }}
      />
    </div>
  );
};

export default HomeScreen;
