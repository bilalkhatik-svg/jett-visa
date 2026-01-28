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
import { useFetchTopDestinationQuery } from "@/store/visaTopDestinationApi";
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

// const VisaTypeSection = ({
//   showOthers,
//   setShowOthers,
//   onPreFlowNavigation,
// }: any) => <div className="p-4">Visa Type Section</div>;
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
import ResidencyDialogContent from "@/components/core-module/nationality-residency/common/ResidencyDialogContent";
import { VisaTypeSection } from "@/components/core-module/visa-type";
import SearchField from "../search-field/SearchField";

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
  const [showFloatingInspireMe, setShowFloatingInspireMe] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px) and (min-width:601px)");
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const nationalitySelectorRef = useRef<NationalityResidencySelectorRef>(null);

  const { t, i18n: i18nInstance } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useFetchCountryListQuery("en-US");
  // Fetch country list
  const {
    data: countryListResponse,
    isSuccess: isCountryListSuccess,
    error: countryListError,
  } = useFetchCountryListQuery(i18nInstance.language || "en-US");
  const countryListData = countryListResponse?.response
    ? { response: countryListResponse.response }
    : { response: [] };

  // Fetch top destinations
  const {
    data: topDestinationResponse,
    isLoading: isTopDestinationListPending,
  } = useFetchTopDestinationQuery({
    count: 20,
    language: i18nInstance.language || "en-US",
  });

  // Map top destinations data
  const topDestinations = useMemo(() => {
    const topDestinationList = topDestinationResponse?.Response || [];
    return topDestinationList.map((dest: any) => ({
      VisaType: dest.VisaType || "E-Visa",
      imageUrl: dest.Images?.[0]?.Filename || "",
      name: dest.Name || "",
      GetVisaDays:
        typeof dest.GetVisaDays === "number"
          ? dest.GetVisaDays
          : Number(dest.GetVisaDays) || 0,
      order: dest.Order || 0,
      unit: dest.Unit || "days",
      currencyCode: "",
      CountryCode: dest.IsoCode2 || "",
      StartingPrice: dest.StartingPrice || "0",
    }));
  }, [topDestinationResponse]);

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      lastScrollY.current = currentScrollY;

      setShowFloatingInspireMe(true);
      // if (currentScrollY > 300 && isScrollingUp) {
      //   return;
      // }

      // if (currentScrollY < 200 || !isScrollingUp) {
      //   setShowFloatingInspireMe(false);
      // }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      className="w-full flex flex-col items-center from-[#F8FAFC] to-white min-h-screen md:overflow-x-hidden"
      style={{ borderBottom: "2px solid transparent" }}
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
            nationality={nationality}
            residency={residency}
            onMenuClick={handleMenuClick}
            isFixed={isTopBarFixed}
            showSearchIcon={showSearchIcon}
          />
        )}
      </div>

      {isTopBarFixed && <div className="h-[72px]" />}

      {isHeroLoading ? (
        <HeroSectionSkeleton />
      ) : (
        <div ref={heroSectionRef} className="w-full bg-white">
          <div
            className={`relative w-full flex flex-col rounded-b-3xl ${isMobile
              ? 'pb-10 pt-6 px-5 min-h-[auto] justify-start'
              : 'pb-12 pt-16 px-12 min-h-[600px] justify-center items-center lg:px-20 xl:px-32 2xl:px-40'
              }`}
            style={{
              backgroundImage: isMobile
                ? `linear-gradient(200deg, rgb(231, 192, 238), rgb(160, 224, 227) 100%), linear-gradient(to right top, rgb(219, 214, 143) 0%, transparent 50%)`
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
                    // backgroundSize: "cover",
                    // objectFit: "cover",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    zIndex: 1,
                  }}
                />
                <div className="pointer-events-auto">
                  <ScrollingDestinationImages
                    isMobile={isMobile}
                    isTablet={isTablet}
                  />
                </div>
              </div>
            )}
            {/* ===== Header ===== */}
            <div
              className={`flex items-center gap-2 relative ${
                isMobile ? "w-full mt-8 mb-6 justify-center" : "self-start mb-4"
              }`}
              style={{
                zIndex: 2,
                width: isMobile ? "100%" : isTablet ? "85%" : "560px",
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
                <div
                  className={`
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-full flex justify-center
    ${isMobile ? "flex-col items-center gap-0" : "items-center gap-1"}
  `}
                >
                  {isMobile ? (
                    <>
                      <img
                        src={
                          typeof SearchImage === "string"
                            ? SearchImage
                            : (SearchImage as any)?.src || SearchImage
                        }
                        alt="Search"
                        className="block w-[97px] h-[39px] object-contain"
                      />
                      <img
                        src={
                          typeof VisaImage === "string"
                            ? VisaImage
                            : (VisaImage as any)?.src || VisaImage
                        }
                        alt="Visa Go"
                        className="block w-[115px] h-[39px] object-contain mt-[-6%]"
                      />
                    </>
                  ) : (
                    <img
                      src={
                        typeof VectorImage === "string"
                          ? VectorImage
                          : (VectorImage as any)?.src || VectorImage
                      }
                      alt="Search Visa Go"
                      className="h-auto max-w-full object-contain max-h-[40px] ml-[20%]"
                    />
                  )}
                </div>
              </div>
              <img
                src={planeImageSrc}
                alt="plane"
                className={
                  isMobile
                    ? "block w-[60px] mb-8 -ml-5"
                    : "block w-[100px] mb-12 -ml-8 md:w-[100px] md:mb-12 md:-ml-8 lg:w-[85px]"
                }
                style={{
                  transform: isRTL ? "scaleX(-1)" : "none",
                }}
              />
            </div>
            <div className="flex justify-center">
              {isMobile && (
                <div className="inline-flex h-[24px] px-[10px] py-[4px] justify-center items-center gap-[8px] rounded-[5px] bg-white/30">
                  {nationality && (nationality as ICountry).flag && (
                    <>
                      <img
                        src={
                          typeof (nationality as ICountry).flag === "string"
                            ? (nationality as ICountry).flag
                            : ((nationality as ICountry).flag as any)?.src ||
                              (nationality as ICountry).flag
                        }
                        alt="Nationality flag"
                        className="w-[10px] h-[10px] shrink-0 aspect-square rounded-[10px] object-cover"
                      />
                      <span className="text-[#00366B] font-poppins text-[10px] font-normal leading-[16px]">
                        {(nationality as ICountry).name ||
                          (nationality as ICountry).nationality ||
                          ""}{" "}
                        passport
                      </span>
                    </>
                  )}
                  {nationality && residency && (
                    <div className="w-[3px] h-[3px] aspect-square">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3"
                        height="3"
                        viewBox="0 0 3 3"
                        fill="none"
                      >
                        <circle cx="1.5" cy="1.5" r="1.5" fill="#00366B" />
                      </svg>
                    </div>
                  )}
                  {residency && (residency as ICountry).flag && (
                    <>
                      <img
                        src={
                          typeof (residency as ICountry).flag === "string"
                            ? (residency as ICountry).flag
                            : ((residency as ICountry).flag as any)?.src ||
                              (residency as ICountry).flag
                        }
                        alt="Residency flag"
                        className="w-[10px] h-[10px] shrink-0 aspect-square rounded-[10px] object-cover"
                      />
                      <span className="text-[#00366B] font-poppins text-[10px] font-normal leading-[16px]">
                        Resident of{" "}
                        {(residency as ICountry).name ||
                          (residency as ICountry).residency ||
                          ""}
                      </span>

                      <div className="w-[10.582px] h-[10.582px] shrink-0 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M0.5 11.0817L0.00680304 10.9995C-0.0197434 11.1588 0.0322662 11.3211 0.146447 11.4353C0.260627 11.5495 0.422921 11.6015 0.5822 11.5749L0.5 11.0817ZM0.927886 8.51443L0.434689 8.43223H0.434689L0.927886 8.51443ZM1.53106 7.34236L1.1775 6.9888V6.9888L1.53106 7.34236ZM7.8125 1.06091L8.16605 1.41447V1.41447L7.8125 1.06091ZM3.06732 10.6539L3.14952 11.1471V11.1471L3.06732 10.6539ZM4.23939 10.0507L3.88584 9.69714L3.88584 9.69714L4.23939 10.0507ZM3.72324 10.4928L3.95114 10.9379L3.95201 10.9374L3.72324 10.4928ZM3.72709 10.4908L3.95587 10.9354L3.95677 10.935L3.72709 10.4908ZM1.08893 7.85851L0.644344 7.62972L0.64389 7.63061L1.08893 7.85851ZM1.09091 7.85465L0.646789 7.62497L0.646328 7.62587L1.09091 7.85465ZM0.5 11.0817L0.993197 11.1639L1.42108 8.59663L0.927886 8.51443L0.434689 8.43223L0.00680304 10.9995L0.5 11.0817ZM1.53106 7.34236L1.88461 7.69591L8.16605 1.41447L7.8125 1.06091L7.45895 0.707362L1.1775 6.9888L1.53106 7.34236ZM0.5 11.0817L0.5822 11.5749L3.14952 11.1471L3.06732 10.6539L2.98512 10.1607L0.4178 10.5885L0.5 11.0817ZM4.23939 10.0507L4.59294 10.4042L10.8744 4.1228L10.5208 3.76925L10.1673 3.41569L3.88584 9.69714L4.23939 10.0507ZM3.06732 10.6539L3.14952 11.1471C3.45664 11.0959 3.71637 11.0581 3.95114 10.9379L3.72324 10.4928L3.49534 10.0478C3.43062 10.0809 3.3529 10.0994 2.98512 10.1607L3.06732 10.6539ZM4.23939 10.0507L3.88584 9.69714C3.62219 9.96079 3.562 10.0133 3.49741 10.0467L3.72709 10.4908L3.95677 10.935C4.19106 10.8138 4.37278 10.6244 4.59294 10.4042L4.23939 10.0507ZM3.72324 10.4928L3.95201 10.9374L3.95587 10.9354L3.72709 10.4908L3.49832 10.0462L3.49446 10.0482L3.72324 10.4928ZM10.5208 1.06091L10.1673 1.41447C10.7199 1.96709 10.7199 2.86307 10.1673 3.41569L10.5208 3.76925L10.8744 4.1228C11.8175 3.17965 11.8175 1.65051 10.8744 0.70736L10.5208 1.06091ZM7.8125 1.06091L8.16605 1.41447C8.71868 0.861844 9.61466 0.861844 10.1673 1.41447L10.5208 1.06091L10.8744 0.70736C9.93124 -0.235788 8.40209 -0.235786 7.45895 0.707362L7.8125 1.06091ZM0.927886 8.51443L1.42108 8.59663C1.48238 8.22885 1.50083 8.15112 1.53397 8.08641L1.08893 7.85851L0.64389 7.63061C0.523667 7.86538 0.485876 8.12511 0.434689 8.43223L0.927886 8.51443ZM1.53106 7.34236L1.1775 6.9888C0.957337 7.20897 0.76795 7.39069 0.646789 7.62497L1.09091 7.85465L1.53504 8.08433C1.56844 8.01975 1.62096 7.95956 1.88461 7.69591L1.53106 7.34236ZM1.08893 7.85851L1.53352 8.08729L1.5355 8.08344L1.09091 7.85465L0.646328 7.62587L0.644345 7.62972L1.08893 7.85851ZM9.16667 5.12341L9.52022 4.76986L6.81189 2.06153L6.45833 2.41508L6.10478 2.76863L8.81311 5.47697L9.16667 5.12341Z"
                            fill="#0087FA"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Nationality & Residency Selector - Desktop/Tablet Only */}
            {countryListData?.response && !isMobile && (
              <div
                className="relative block mb-3 self-start"
                style={{
                  zIndex: 100,
                  width: isTablet ? "85%" : "560px",
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

            {/* Desktop/Tablet VisaMode */}
            {!isMobile && (
              <div
                className="relative hidden md:block z-[2] mb-3 self-start"
                style={{
                  width: isTablet ? "85%" : "560px",
                }}
              >
                <VisaMode showDestinationModal={toggleModal} />
              </div>
            )}

            {/* Desktop/Mobile/Tablet Search Destination */}
            {modalType === "searchDestination" &&
              (isMobile ? (
                <div className="relative w-full z-[2]">
                  <SearchField
                    placeholder="Search by country or city"
                    value=""
                    onChange={() => {}}
                    onClick={() => toggleModal(true, "searchDestination")}
                  />
                </div>
              ) : (
                <div
                  className="relative flex justify-start z-[2] mb-4 self-start"
                  style={{ width: isTablet ? "85%" : "560px" }}
                >
                  <DesktopSearchDropdown
                    isMobile={isMobile}
                    t={t}
                    onPreFlowNavigation={handlePreFlowNavigation}
                    countryList={countryListData?.response || []}
                  />
                </div>
              ))}

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
              className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 rounded-full p-[2px] cursor-pointer inline-block transition-all duration-300 hover:shadow-xl hover:scale-105 md:bottom-[-25px] sm:bottom-[-25px] z-0"
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
                  {isMobile
                    ? "inspire me"
                    : "Plan your next adventure, and let AI simplify your visa"}
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

      {isTopBarFixed && showFloatingInspireMe && !isMobile && (
        <div className="fixed inset-x-0 bottom-6 z-[9999]">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end">
              <button
                onClick={handleInspireMeClick}
                className="rounded-full p-[2px] shadow-lg transition-all duration-300 hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #D536F6 0%, #75ECF3 100%)",
                }}
                aria-label="Inspire me"
              >
                <span className="rounded-full px-4 py-2 flex items-center justify-center gap-2 bg-white">
                  <img
                    src={inspireMeGifSrc}
                    alt=""
                    className="w-[24px] h-[20px] object-contain"
                  />
                  <span
                    className="text-sm font-semibold whitespace-nowrap"
                    style={{
                      background: "linear-gradient(135deg, #D536F6, #0AB1BA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Inspire me
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isDestinationsLoading || isTopDestinationListPending ? (
        <TopDestinationsSkeleton numberOfItems={8} />
      ) : (
        <div className="w-full">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-12 sm:pt-16 md:overflow-hidden">
            <TopDestinationSection
              onPreFlowNavigation={handlePreFlowNavigation}
              destinations={topDestinations}
              isLoading={isTopDestinationListPending}
            />
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <OfferSection />
        </div>
      )}
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
        <div className="w-full bg-[#EBF2FF] p-4 sm:pt-4 ">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <HowToApplySection />
          </div>
        </div>
      )}
      {isWhyChooseLoading ? (
        <WhyChooseMusafirSectionSkeleton />
      ) : (
        <div className="w-full pt-6 sm:pt-8 bg-white">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <WhyChooseMusafirSection />
          </div>
        </div>
      )}
      {isTestimonialsLoading ? (
        <TestimonialsSectionSkeleton />
      ) : (
        <div className="w-full pt-12 sm:pt-16 ">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
            <TestimonialsSection />
          </div>
        </div>
      )}
      {isFaqLoading ? (
        <FaqSectionSkeleton />
      ) : (
        <div className="w-full pt-6 sm:pt-8 bg-white">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
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
            <SearchDestination
              label="Search Destination"
              onPreFlowNavigation={handlePreFlowNavigation}
              countryList={countryListData?.response}
            />
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
        <ResidencyDialogContent />
      </MobileBottomDrawer>
    </div>
  );
};

export default HomeScreen;
