"use client";

import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { useTranslation } from "@/utils/i18nStub";
import inspireMeGif from "@/assets/images/gif/inspireMeGif.gif";
import SearchIcon2 from "@/assets/images/icons/search.png";
import planeImage from "@/assets/images/planeImage.png";
import planeMark from "@/assets/images/planeMark.png";
import FindVisaWidget from "@/components/core-module/find-visa/FindVisaWidget";
import TopBar from "@/components/core-module/navbar/TopBar";
import { i18n } from "@/utils/i18nStub";
import { useFetchCountryListQuery } from "@/store/visaCountryListApi";
import { useFetchIPQuery, useFetchGeoIPQuery } from "@/store/locationApi";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setNationality,
  setResidency,
  setLocationData,
  setCountryIsoCode,
} from "@/store/slice/locationSlice";
// import { ROUTES } from "@utility/constant";
import type { ICountry } from "@/utils/types/nationality-residency/Country";
// Define types locally
interface NationalityResidencySelectorRef {
  [key: string]: any;
}
// Simple helper function
const getCountryVisaUrl = (
  residencyIso: string,
  destinationIso: string,
): string => {
  return `/visa?res=${residencyIso}&dest=${destinationIso}`;
};
// Mock ROUTES
const ROUTES = {
  INSPIRE_ME: "/inspire-me",
};
// Simple navigate function
const useNavigate = () => {
  return (path: string) => {
    if (typeof window !== "undefined") {
      window.location.href = path;
    }
  };
};
import FaqSection from "./faq-section/FaqSection";
import HowToApplySection from "./how-to-apply-section/HowToApplySection";
import TestimonialsSection from "./testimonials-section/TestimonialsSection";
import SearchTravelDate from "./travel-date-section/SearchTravelDate";
import VisaMode from "./visa-selection-options/VisaSelectionOptions";
import WhyChooseMusafirSection from "./why-choose-musafir-section/WhyChooseMusafirSection";
// Simple skeleton components
const HeroSectionSkeleton = () => (
  <div className="h-96 bg-gray-200 animate-pulse"></div>
);
const TopDestinationsSkeleton = ({
  numberOfItems = 8,
}: {
  numberOfItems?: number;
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
    {Array.from({ length: numberOfItems }).map((_, i) => (
      <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-2xl"></div>
    ))}
  </div>
);
const FindVisaWidgetSkeleton = () => (
  <div className="h-64 bg-gray-200 animate-pulse"></div>
);
const HowToApplySectionSkeleton = () => (
  <div className="h-64 bg-gray-200 animate-pulse"></div>
);
const WhyChooseMusafirSectionSkeleton = () => (
  <div className="h-64 bg-gray-200 animate-pulse"></div>
);
const TestimonialsSectionSkeleton = () => (
  <div className="h-64 bg-gray-200 animate-pulse"></div>
);
const FaqSectionSkeleton = () => (
  <div className="h-64 bg-gray-200 animate-pulse"></div>
);
const FooterSkeleton = () => (
  <div className="h-64 bg-gray-200 animate-pulse"></div>
);
const BottomConfirmBarSkeleton = () => (
  <div className="h-20 bg-gray-200 animate-pulse"></div>
);
const TopBarSkeleton = () => (
  <div className="h-16 bg-gray-200 animate-pulse"></div>
);
const MobileBottomDrawerSkeleton = () => (
  <div className="h-96 bg-gray-200 animate-pulse"></div>
);

// Simple component placeholders
// const FooterSection = () => <footer className="bg-gray-800 text-white p-8">Footer</footer>;
// const MobileBottomDrawer = ({ modalOpen, setModalOpen, children, sx }: any) => {
//   if (!modalOpen) return null;
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
//       onClick={() => setModalOpen(false)}
//     >
//       <div
//         className="bg-white w-full rounded-t-lg"
//         style={sx}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex justify-end">
//          <button
//   onClick={() => setModalOpen(false)}
//   className="
//     absolute 
//     -top-3 
//     left-1/2 
//     -translate-x-1/2
//     w-10
//     h-10
//     rounded-full 
//     bg-white 
//     shadow-md 
//     flex 
//     items-center 
//     justify-center
//     text-gray-600 
//     text-xl
//     active:scale-95
//   "
// >
//   ✕
// </button>

//         </div>
//         <div
//           className="overflow-y-auto"
//           style={{ height: "calc(100% - 40px)" }}
//         >
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };
const VisaTypeSection = ({
  showOthers,
  setShowOthers,
  onPreFlowNavigation,
}: any) => <div className="p-4">Visa Type Section</div>;
const BottomConfirmBar = ({
  residency,
  flagUrl,
  onConfirmClick,
  nationalitySelectorRef,
}: any) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between">
    <span>{residency}</span>
    <button
      onClick={onConfirmClick}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Confirm
    </button>
  </div>
);
const UpdateResidencyDialog = ({
  open,
  onClose,
  initialNationality,
  initialResidency,
  onConfirm,
  onFlagUpdate,
}: any) => {
  if (!open) return null;
  return (
   <>
    <MobileBottomDrawer 
    modalOpen={open}
    setModalOpen={onClose}
    children={null}
    />
   </>
  );
};

const TravelDateCalender = ({
  selectedDate,
  setSelectedDate,
  setShowCalender,
  onPreFlowNavigation,
}: any) => <div className="p-4">Travel Date Calendar</div>;
const OtherVisaTypes = ({ onPreFlowNavigation }: any) => (
  <div className="p-4">Other Visa Types</div>
);

// Simple useMediaQuery replacement
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query.replace("@media ", ""));
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};
import arrowLeft from "@/assets/images/icons/arrowLeft.webp";
import VectorImage from "@/assets/images/Vector.png";
import SearchImage from "@/assets/images/Search.png";
import VisaImage from "@/assets/images/visa.png";
import ScrollingDestinationImages from "./scrolling-destination-images/ScrollingDestinationImages";
import OfferSection from "./offer-section/OfferSection";
import homeBgImage from "@/assets/images/Rectangleimg.png";
import scrollBgImage from "@/assets/images/scrollBgImage.png";
import FooterSection from "./footer-section/FooterSection";
import NationalityResidencySelector from "@/components/core-module/nationality-residency/common/Nationality-Residence-Selector";
import DesktopSearchDropdown from "./search-destination/DesktopSearchDropdown";
import TopDestinationSection from "./top-destination-section/TopDestinationSection";
import SearchDestination from "./search-destination/SearchDestination";
import MobileBottomDrawer from "../bottom-drawer/BottomDrawer";
import ResidencyDialogContent from "@/components/core-module/nationality-residency/ResidencyDialogContent";

export type ModalTypes = "searchDestination" | "visaMode" | "travelDate" | "";

export interface PendingAction {
  type: "navigate" | "search" | string;
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
      className={`relative w-full`}
      onClick={onClick}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        readOnly
        disabled
        className="w-full h-[48px] sm:h-[48px] md:h-[52px] px-4 pr-12 bg-white rounded-[12px] border border-gray-200 text-[#9CA3AF] text-sm sm:text-sm font-poppins cursor-pointer shadow-sm"
        style={{ pointerEvents: 'none' }}
        {...props}
      />
      <img
        src={searchIcon2Src}
        width={16}
        height={16}
        alt="searchIcon"
        className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4"
      />
    </div>
  );
};

const HomeScreen = () => {
  const [isTopBarLoading, setIsTopBarLoading] = useState(true);
  const [isHeroLoading, setIsHeroLoading] = useState(true);
  const [isDestinationsLoading, setIsDestinationsLoading] = useState(true);
  const [isBottomConfirmBarLoading, setIsBottomConfirmBarLoading] =
    useState(true);
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
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(
    null,
  );
  const [isTopBarFixed, setIsTopBarFixed] = useState(false);
  // Desktop search dropdown state now handled in DesktopSearchDropdown
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px) and (min-width:601px)");
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const nationalitySelectorRef = useRef<NationalityResidencySelectorRef>(null);

  const { t, i18n: i18nInstance } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isLoading,  } = useFetchCountryListQuery("en-US");
  // Fetch country list
  const {
    data: countryListResponse,
    isSuccess: isCountryListSuccess,
    error: countryListError,
  } = useFetchCountryListQuery(i18nInstance.language || "en-US");
  const countryListData = countryListResponse?.response
    ? { response: countryListResponse.response }
    : { response: [] };

  // Log API errors for debugging
  useEffect(() => {
    if (countryListError) {
      // RTK Query error structure
      const error = countryListError as any;
      const status = error?.status || error?.originalStatus;
      const errorData = error?.data;

      // Check if error object is truly empty (no meaningful data)
      const hasStatus = status !== undefined && status !== null;
      const hasData =
        errorData !== undefined &&
        errorData !== null &&
        (typeof errorData !== "object" ||
          Object.keys(errorData || {}).length > 0);
      const hasMessage =
        error?.message ||
        error?.error ||
        errorData?.message ||
        errorData?.error?.message;
      const hasOtherProps =
        error?.statusText || error?.data?.url || error?.originalStatus;

      // Only log if there's meaningful error information
      if (hasStatus || hasData || hasMessage || hasOtherProps) {
        const errorDetails: Record<string, any> = {};
        if (hasStatus) errorDetails.status = status;
        if (error?.statusText) errorDetails.statusText = error.statusText;
        if (hasData) errorDetails.data = errorData;
        if (error?.error) errorDetails.error = error.error;
        if (hasMessage) {
          errorDetails.message =
            error?.message || errorData?.message || errorData?.error?.message;
        }
        if (error?.data?.url) errorDetails.url = error.data.url;

        // console.error('[HomeScreen] Country list API error:', errorDetails);

        // If it's a 401, log a helpful message
        if (status === 401) {
          console.warn(
            "[HomeScreen] 401 Unauthorized - OAuth tokens are missing. Please authorize first.",
          );
        }
      }
      // Silently ignore empty error objects - they're likely from RTK Query's internal state management
    }
  }, [countryListError]);

  // Fetch IP address
  const { data: ipData, error: ipError } = useFetchIPQuery();
  // Memoize userIP to prevent unnecessary recalculations
  const userIP = useMemo(() => ipData?.ip || "", [ipData?.ip]);

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
  const {
    data: geoIPData,
    isSuccess: isGeoIPSuccess,
    error: geoIPError,
  } = useFetchGeoIPQuery(userIP, {
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
      // console.error('[HomeScreen] GeoIP API error:', errorDetails);

      // If it's a 401, log a helpful message
      if (
        (geoIPError as any)?.status === 401 ||
        (geoIPError as any)?.originalStatus === 401
      ) {
        console.warn(
          "[HomeScreen] 401 Unauthorized - OAuth tokens are missing. Please authorize first.",
        );
      }
    }
  }, [geoIPError]);

  // Get location data from Redux store
  const locationState = useAppSelector((state) => state.locationSlice);
  const nationality = locationState.nationality;
  const residency = locationState.residency;
  const locationResponse = locationState.locationResponse;
  const countryIsoCode = locationState.countryIsoCode;

  const handleUpdateNationality = useCallback(
    (country: ICountry) => {
      dispatch(setNationality(country));
    },
    [dispatch],
  );

  const handleUpdateResidency = useCallback(
    (country: ICountry) => {
      dispatch(setResidency(country));
    },
    [dispatch],
  );

  const handleUpdateCountryIsoCode = useCallback(
    (code: string) => {
      dispatch(setCountryIsoCode(code));
    },
    [dispatch],
  );

  // Update location data when geoIP data is fetched
  useEffect(() => {
    if (isGeoIPSuccess && geoIPData?.response && userIP) {
      dispatch(
        setLocationData({
          ip: userIP,
          countryIsoCode: geoIPData.response.countryIsoCode || "",
          residency: geoIPData.response.residency || "",
        }),
      );
    }
  }, [isGeoIPSuccess, geoIPData, userIP, dispatch]);

  const isRTL = i18n.language === "ar" || i18n.language === "ar-AE";
  useEffect(() => {
    if (!isCountryListSuccess || !countryListData?.response) return;
    const currentResidency = residency as ICountry | null;
    if (currentResidency && currentResidency.isoCode) return;
    const residencyText = (
      locationResponse as any
    )?.response?.residency?.toLocaleLowerCase();
    const residencyIsoCodeValue = countryIsoCode
      ? String(countryIsoCode).toLocaleLowerCase()
      : null;
    const residencyIsoCode =
      residencyIsoCodeValue ||
      (locationResponse as any)?.response?.countryIsoCode?.toLocaleLowerCase();
    const residencyData = countryListData.response.find((item: ICountry) => {
      if (
        residencyIsoCode &&
        item.isoCode &&
        item.isoCode.toLocaleLowerCase() === residencyIsoCode
      ) {
        return true;
      }
      if (
        residencyText &&
        item.isoCode &&
        item.isoCode.toLocaleLowerCase().includes(residencyText)
      ) {
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
      setModalType(mode);
    }
  };

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

  const handleMenuClick = useCallback(() => {}, []);

  const executePendingAction = useCallback(
    (action: PendingAction) => {
      if (!action) return;

      switch (action.type) {
        case "navigate":
          if (action.url) {
            window.location.href = action.url;
          }
          break;
        case "search":
          const currentResidencyForSearch = residency as ICountry | null;
          const destination = action.destination as ICountry | undefined;
          if (
            destination &&
            currentResidencyForSearch &&
            currentResidencyForSearch.isoCode &&
            destination.isoCode
          ) {
            const path = getCountryVisaUrl(
              currentResidencyForSearch.isoCode,
              destination.isoCode,
            );
            window.location.href = path;
          }
          break;
      }
      setPendingAction(null);
    },
    [residency],
  );

  const handlePreFlowNavigation = useCallback(
    (action: PendingAction): boolean => {
      const currentNationality = nationality as ICountry | null;
      const currentResidency = residency as ICountry | null;
      if (
        !currentNationality ||
        !currentNationality.isoCode ||
        !currentResidency ||
        !currentResidency.isoCode
      ) {
        setPendingAction(action);
        setShowModal(false);
        setIsDialogOpen(true);
        return false;
      }

      executePendingAction(action);
      return true;
    },
    [nationality, residency, executePendingAction],
  );

  const handleConfirmUpdate = useCallback(
    (newNationality: ICountry, newResidency: ICountry) => {
      handleUpdateNationality(newNationality);
      handleUpdateResidency(newResidency);
      if (newResidency?.isoCode) {
        handleUpdateCountryIsoCode(newResidency.isoCode);
      }

      if (pendingAction) {
        setTimeout(() => {
          if (pendingAction.type === "navigate" && pendingAction.url) {
            let finalUrl = pendingAction.url;

            try {
              const urlObj = new URL(finalUrl);
              const params = new URLSearchParams(urlObj.search);

              if (params.has("nat")) {
                params.set("nat", newNationality?.isoCode || "");
              }

              if (params.has("res")) {
                params.set("res", newResidency?.isoCode || "");
              }

              finalUrl = `${urlObj.origin}${urlObj.pathname}?${params.toString()}`;
            } catch (error) {}

            window.location.href = finalUrl;
          } else if (
            pendingAction.type === "search" &&
            pendingAction.destination &&
            newResidency.isoCode &&
            pendingAction.destination.isoCode
          ) {
            const path = getCountryVisaUrl(
              newResidency.isoCode,
              pendingAction.destination.isoCode,
            );
            window.location.href = path;
          }

          setPendingAction(null);
        }, 100);
      }
    },
    [
      handleUpdateNationality,
      handleUpdateResidency,
      handleUpdateCountryIsoCode,
      pendingAction,
    ],
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
  const planeMarkSrc =
    typeof planeMark === "string"
      ? planeMark
      : (planeMark as any)?.src || planeMark;
  const planeImageSrc =
    typeof planeImage === "string"
      ? planeImage
      : (planeImage as any)?.src || planeImage;
  const homeBgImageSrc =
    typeof homeBgImage === "string"
      ? homeBgImage
      : (homeBgImage as any)?.src || homeBgImage;
  const scrollBgImageSrc =
    typeof scrollBgImage === "string"
      ? scrollBgImage
      : (scrollBgImage as any)?.src || scrollBgImage;
  const inspireMeGifSrc =
    typeof inspireMeGif === "string"
      ? inspireMeGif
      : (inspireMeGif as any)?.src || inspireMeGif;
  const arrowLeftSrc =
    typeof arrowLeft === "string"
      ? arrowLeft
      : (arrowLeft as any)?.src || arrowLeft;

  return (
    <div
      className="w-full flex flex-col items-center bg-gradient-to-b from-[#F8FAFC] to-white min-h-screen md:overflow-x-hidden"
      style={{ borderBottom: '2px solid transparent' }}
    >
      <div
        className="relative w-full bg-white shadow-sm"
        style={{ zIndex: 1100 }}
      >
        {isTopBarLoading ? (
          <TopBarSkeleton />

        ) : (
          <TopBar
            variant="home"
            flagIcon={(residency as ICountry | null)?.flag}
            isLoggedIn={false}
            onFlagClick={handleFlagClick}
            onLogoClick={() => {}}
            onSearchClick={handleSearchClick}
            onMenuClick={handleMenuClick}
            isFixed={isTopBarFixed}
            showSearchIcon={showSearchIcon}
          />
        )}
      </div>

      {isTopBarFixed && (
        <div className="h-[72px]" />
      )}

      {isHeroLoading ? (
        <HeroSectionSkeleton />
      ) : (
        <div
          ref={heroSectionRef}
          className="w-full bg-white"
        >
          <div
            className={`relative w-full flex flex-col rounded-b-3xl ${
              isMobile 
                ? 'pb-10 pt-6 px-5 min-h-[auto] justify-start' 
                : 'pb-12 pt-16 px-12 min-h-[600px] justify-center items-center lg:px-20 xl:px-32 2xl:px-40'
            }`}
            style={{
              backgroundImage: isMobile
                ? `linear-gradient(135deg, #E8F4F8 0%, #F0F9FF 100%)`
                : `url(${homeBgImageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "soft-light",
              zIndex: 2,
            }}
          >
            {!isMobile && !isTablet && (
              <div
                className="absolute top-0 left-0 right-0 bottom-0 rounded-b-3xl overflow-hidden pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <div
                  className="absolute bottom-0 right-0 w-[50%] h-full pointer-events-none opacity-90"
                  style={{
                    backgroundImage: `url(${scrollBgImageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    zIndex: 1,
                  }}
                />
                <div className="pointer-events-auto">
                  <ScrollingDestinationImages isMobile={isMobile} isTablet={isTablet} />
                </div>
              </div>
            )}
            {/* ===== Header ===== */}
            <div
              className={`flex items-center gap-2 relative ${
                isMobile ? 'w-full mt-8 mb-6 justify-center' : 'self-start mb-4'
              }`}
              style={{
                zIndex: 2,
                width: isMobile ? "100%" : isTablet ? "85%" : "65%",
              }}
            >
              <div className="relative inline-block">
              <img
                src={planeMarkSrc}
                alt="plane mark"
              className={
    isMobile
      ? "block w-[162.62px] h-[46.75px] mt-[10%] opacity-100"
      : "block w-[320px] h-[58px] md:w-[320px] md:h-[58px] lg:w-[280px]"
  }
  style={{
    transform: isRTL ? "scaleX(-1)" : "none",
  }}
/>
                <div  className={`
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-full flex justify-center
    ${isMobile ? 'flex-col items-center gap-0' : 'items-center gap-1'}
  `}>
                  {isMobile ? (
                    <>
                      <img
      src={typeof SearchImage === 'string' ? SearchImage : (SearchImage as any)?.src || SearchImage}
      alt="Search"
      className="block w-[97px] h-[39px] object-contain"
    />
    <img
      src={typeof VisaImage === 'string' ? VisaImage : (VisaImage as any)?.src || VisaImage}
      alt="Visa Go"
      className="block w-[115px] h-[39px] object-contain mt-[-6%]"
    />

                    </>
                  ) : (
                    <img
                      src={typeof VectorImage === 'string' ? VectorImage : (VectorImage as any)?.src || VectorImage}
                      alt="Search Visa Go"
                      className="h-auto max-w-full object-contain max-h-[40px] ml-[20%]"
                    />
                  )}
                </div>
              </div>
              <img
                src={planeImageSrc}
                alt="plane"
                className={isMobile ? "block w-[60px] mb-8 -ml-5" : "block w-[100px] mb-12 -ml-8 md:w-[100px] md:mb-12 md:-ml-8 lg:w-[85px]"}
                style={{
                  transform: isRTL ? "scaleX(-1)" : "none",
                }}
              />
            </div>

            {/* Nationality & Residency Selector - Desktop/Tablet Only */}
            {countryListData?.response && !isMobile && (
              <div
                className="relative block mb-3 self-start"
                style={{
                  zIndex: 100,
                  width: isTablet ? "85%" : "65%",
                }}
              >
                <div className="w-full">
                  <NationalityResidencySelector
                    countryList={data?.response ?? []}
                    nationality={nationality}
                    residency={residency}
                    onNationalityChange={handleUpdateNationality}
                    onResidencyChange={handleUpdateResidency}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            )}

            {/* Visa Mode Options - Mobile Only */}
            {isMobile && (
              <div className="relative w-full mb-6" style={{ zIndex: 2 }}>
                <VisaMode showDestinationModal={toggleModal} />
              </div>
            )}

            {/* Search by country or city - Mobile Only - Always visible */}
            {isMobile && (
              <div className="relative w-full" style={{ zIndex: 2 }}>
                <SearchField
                  isMobile={isMobile}
                  placeholder={"Search by country or city"}
                  value=""
                  onClick={() => toggleModal(true, "searchDestination")}
                />
              </div>
            )}

            {/* Desktop/Tablet VisaMode */}
            {!isMobile && (
              <div
                className="relative hidden md:block z-[2] mb-3 self-start"
                style={{
                  width: isTablet ? "85%" : "65%",
                }}
              >
                <VisaMode showDestinationModal={toggleModal} />
              </div>
            )}

            {/* Desktop/Tablet Search Destination */}
            {!isMobile && modalType === "searchDestination" && (
              <div
                className="relative flex justify-start z-[2] mb-4 self-start"
                style={{
                  width: isTablet ? "85%" : "65%",
                }}
              >
                <DesktopSearchDropdown
                isMobile={isMobile}
                  t={t}
                  onPreFlowNavigation={handlePreFlowNavigation}
                  countryList={countryListData?.response || []}
                  // widthByBreakpoint={{ md: "400px", lg: "500px", xl: "590px" }}
                  // dropdownWidth="391px"
                />
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
              className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 rounded-full p-[2px] cursor-pointer inline-block transition-all duration-300 hover:shadow-xl hover:scale-105 md:bottom-[-30px] sm:bottom-[-25px] z-0"
              style={{
                background: "linear-gradient(135deg, #D536F6 0%, #75ECF3 100%)",
              }}
            >
              <div className="rounded-full px-4 py-2 flex items-center justify-center gap-2 bg-white md:px-4 md:py-2 sm:px-3 sm:py-1.5">
                <img
                  src={inspireMeGifSrc}
                  alt="Inspire Me Gif"
                  className="w-[32px] h-[28px] md:w-[32px] md:h-[28px] sm:w-7 sm:h-6"
                />
                <span
                  className="text-sm font-semibold whitespace-nowrap md:text-sm sm:text-xs"
                  style={{
                    background: "linear-gradient(135deg, #D536F6, #0AB1BA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {/* {isMobile ? t("inspire_me") : t("inspire_me_for_desktopView")} */}
                  {isMobile ? "inspire me" :  "Plan your next adventure, and let AI simplify your visa"}
                </span>
                {!isMobile && (
                  <img
                    src={arrowLeftSrc}
                    alt="arrowLeft"
                    className="w-5 h-5 md:block sm:hidden"
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
        <div className="w-full">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 md:overflow-hidden">
            <TopDestinationSection onPreFlowNavigation={handlePreFlowNavigation} />
          </div>
        </div>
      )}
      {
        !isMobile && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <OfferSection />
          </div>
        )
      }
      {isFindVisaLoading ? (
        <FindVisaWidgetSkeleton />
      ) : (
        <div className="w-full bg-gradient-to-b from-white to-[#F8FAFC] pt-12 sm:pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FindVisaWidget onPreFlowNavigation={handlePreFlowNavigation} />
          </div>
        </div>
      )}
      {isHowToApplyLoading ? (
        <HowToApplySectionSkeleton />
      ) : (
        <div className="w-full bg-[#EBF2FF] pt-12 sm:pt-16 ">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <HowToApplySection />
          </div>
        </div>
      )}
      {isWhyChooseLoading ? (
        <WhyChooseMusafirSectionSkeleton />
      ) : (
        <div className="w-full pt-12 sm:pt-16 bg-white">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseMusafirSection />
          </div>
        </div>
      )}
      {isTestimonialsLoading ? (
        <TestimonialsSectionSkeleton />
      ) : (
        <div className="w-full pt-12 sm:pt-16 bg-[#F8FAFC] ">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <TestimonialsSection />
          </div>
        </div>
      )}
      {isFaqLoading ? (
        <FaqSectionSkeleton />
      ) : (
        <div className="w-full pt-12 sm:pt-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:ml-[6%]">
            <FaqSection />
          </div>
        </div>
      )}
      {isFooterLoading ? (
        <FooterSkeleton />
      ) : (
        <div className="w-full bg-gradient-to-b from-white to-[#F8FAFC] pt-12">
          <FooterSection />
        </div>
      )}
      <MobileBottomDrawer
        modalOpen={showModal}
        setModalOpen={toggleModal}
        height="65%"
      >
        {modalType === "searchDestination" && showModal && (
          <Suspense fallback={<MobileBottomDrawerSkeleton />}>
            <SearchDestination label="Search Destination" onPreFlowNavigation={handlePreFlowNavigation} countryList={countryListData?.response} />
            {/* <div>Search destination</div> */}
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

      {!nationality &&
        (isBottomConfirmBarLoading ? (
          <BottomConfirmBarSkeleton />
        ) : (
          <div className="w-full">
            <BottomConfirmBar
              residency={
                residency
                  ? (residency as unknown as ICountry).residency ||
                    (residency as unknown as ICountry).name ||
                    ""
                  : ""
              }
              flagUrl={
                residency ? (residency as unknown as ICountry).flag : undefined
              }
              onConfirmClick={handleConfirmBarClick}
              nationalitySelectorRef={nationalitySelectorRef}
            />
          </div>
        ))}

      {/* <UpdateResidencyDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        initialNationality={nationality}
        initialResidency={residency}
        onConfirm={handleConfirmUpdate}
        onFlagUpdate={() => {}}
      /> */}
     <MobileBottomDrawer 
    modalOpen={isDialogOpen}
    setModalOpen={handleDialogClose}
    height="75%"
    // children={null}
    >
        {/* <SearchDestination
          onPreFlowNavigation={handlePreFlowNavigation}
          countryList={countryListData?.response}
          initialNationality={nationality}
          initialResidency={residency}
          // onConfirm={handleConfirmUpdate}
          // isForUpdateDialog={true}
        /> */}
        <ResidencyDialogContent/>

       </MobileBottomDrawer>
    </div>
  );
};

export default HomeScreen;
