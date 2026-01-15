import React, { useEffect, useState } from "react";
import monthIcon from "@/assets/images/icons/monthIcon.png";
import rightAwayIcon from "@/assets/images/icons/rightAwayIcon.png";
import CalenderIcon from "@/assets/images/icons/calendericon.webp"
import { useTranslation } from "react-i18next";
// import { useLocation } from "@/utility/hooks/useLocation";
// import { getTravelDateVisaUrl, formatDate } from "@/utility/helper";
// import type { PendingAction } from "@/pages/home-screen/HomeScreen";
// import { theme } from "@/theme";
// import DesktopTravelDateCalendar from "@/components/core-module/travel-date-calendar/DesktopTravelDateCalendar";

// Define types locally
export type PendingAction = {
  type: string;
  url?: string;
  date?: Date;
  [key: string]: any;
};

// Simple helper functions
const getTravelDateVisaUrl = (nationalityIso: string, residencyIso: string, date?: Date): string => {
  // Simple URL generation for testing
  const dateStr = date ? date.toISOString().split('T')[0] : '';
  return `/visa?nationality=${nationalityIso}&residency=${residencyIso}${dateStr ? `&date=${dateStr}` : ''}`;
};

interface SearchTravelDateProps {
  setShowCalender: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate?: Date | null;
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const SearchTravelDate = ({
  setShowCalender,
  selectedDate,
  onPreFlowNavigation
}: SearchTravelDateProps) => {
  const { t, i18n } = useTranslation();
  // const { nationality, residency } = useLocation();
  // Mock data for testing
  const nationality = { isoCode: "IN" };
  const residency = { isoCode: "AE" };
  
  const [inputValue, setInputValue] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [desktopCalendarOpen, setDesktopCalendarOpen] = useState(false);
  const [desktopSelectedDate, setDesktopSelectedDate] = useState<Date | null>(selectedDate || null);
  const inputAnchorRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isArabic = i18n.language === "ar" || i18n.language === "ar-AE";

  const formatSelectedDate = (date: Date | null) => {
    if (!date) {
      setInputValue("");
      return;
    }

    const locale = i18n.language || "en-US";
    const weekday = date.toLocaleDateString(locale, { weekday: "short" });
    const month = date.toLocaleDateString(locale, { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    
    const formatted = `${weekday}, ${month} ${day}, ${year}`;
    setInputValue(formatted);
  };

  useEffect(() => {
    if (selectedDate) {
      setDesktopSelectedDate(selectedDate);
      formatSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (desktopSelectedDate) {
      formatSelectedDate(desktopSelectedDate);
    }
  }, [desktopSelectedDate, i18n.language]);

  const handleQuickSelect = (type: "instant" | "month" | "moreThanMonth") => {
    let date: Date | null = null;
    const today = new Date();
    
    if (type === "instant") {
      // Within 2 weeks
      date = new Date(today);
      date.setDate(today.getDate() + 14);
    } else if (type === "month") {
      // Within a month
      date = new Date(today);
      date.setMonth(today.getMonth() + 1);
    } else if (type === "moreThanMonth") {
      // More than a month
      date = new Date(today);
      date.setMonth(today.getMonth() + 2);
    }

    if (date) {
      setDesktopSelectedDate(date);
      formatSelectedDate(date);
      
      const path = getTravelDateVisaUrl(
        nationality?.isoCode || "",
        residency?.isoCode || "",
        date
      );

      const action: PendingAction = {
        type: "navigate",
        url: path,
        date: date,
      };

      onPreFlowNavigation(action);
    }
  };

  // Convert StaticImageData to string for img src
  const calenderIconSrc = typeof CalenderIcon === 'string' ? CalenderIcon : (CalenderIcon as any)?.src || CalenderIcon;
  const rightAwayIconSrc = typeof rightAwayIcon === 'string' ? rightAwayIcon : (rightAwayIcon as any)?.src || rightAwayIcon;
  const monthIconSrc = typeof monthIcon === 'string' ? monthIcon : (monthIcon as any)?.src || monthIcon;

  return (
    <div className="relative z-10 ml-[22%] mt-[2%]">
      {!isMobileView ? (
        <div className="relative z-10">
          <div className="flex flex-row items-center gap-2 overflow-x-auto py-1 scrollbar-hide relative z-10">
            <div
              ref={inputAnchorRef}
              onClick={() => setDesktopCalendarOpen(true)}
              className="flex items-center justify-between rounded-[14px] border-2 border-[#E0E0E0] px-3 py-2 bg-white backdrop-blur cursor-pointer flex-shrink-0 relative z-10"
              style={{ width: isMobileView ? '100%' : '295px', maxWidth: '315px', gap: 16 }}
            >
              {!isArabic ? (
                <input
                  placeholder={t("select_travel_date")}
                  value={inputValue}
                  readOnly
                  onMouseDown={(e) => e.preventDefault()}
                  className="text-sm bg-transparent outline-none w-full cursor-pointer"
                />
              ) : (
                <div className="text-sm flex-1 truncate" dir="rtl">
                  {inputValue || t("select_travel_date")}
                </div>
              )}
              <img src={calenderIconSrc} width={14} height={14} alt="calendar" />
            </div>

            <button onClick={() => handleQuickSelect("instant")} className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0] bg-white px-2 sm:px-3 py-2 shadow-sm hover:bg-gray-50 transition flex-shrink-0">
              <img src={rightAwayIconSrc} alt="Instant" className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#003669] whitespace-nowrap">{t('instant_within_2_weeks')}</span>
            </button>

            <button onClick={() => handleQuickSelect("month")} className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0] bg-white px-2 sm:px-3 py-2 shadow-sm hover:bg-gray-50 transition flex-shrink-0">
              <img src={monthIconSrc} alt="Within a month" className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#003669] whitespace-nowrap">{t('within_a_month')}</span>
            </button>

            <button onClick={() => handleQuickSelect("moreThanMonth")} className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0] bg-white px-2 sm:px-3 py-2 shadow-sm hover:bg-gray-50 transition flex-shrink-0">
              <img src={calenderIconSrc} alt="More than a month" className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-[#003669] whitespace-nowrap">{t('more_than_a_month')}</span>
            </button>
          </div>

          {/* Simple calendar replacement - replace with DesktopTravelDateCalendar when component is available */}
          {desktopCalendarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center" onClick={() => setDesktopCalendarOpen(false)}>
              <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4 relative z-[10000]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{t("select_travel_date")}</h3>
                  <button onClick={() => setDesktopCalendarOpen(false)} className="text-gray-500">✕</button>
                </div>
                <input
                  type="date"
                  value={desktopSelectedDate ? desktopSelectedDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null;
                    setDesktopSelectedDate(date);
                    if (date) {
                      formatSelectedDate(date);
                      const path = getTravelDateVisaUrl(
                        nationality?.isoCode || "",
                        residency?.isoCode || "",
                        date
                      );
                      onPreFlowNavigation({ type: "navigate", url: path, date });
                      setDesktopCalendarOpen(false);
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
        ) : (
          <>
            <div onClick={() => setShowCalender(true)} className="flex items-center justify-between w-full max-w-[315px] h-[46px] rounded-[14px] border-2 border-[#E0E0E0] px-3 py-2 bg-white backdrop-blur mt-1.5 cursor-pointer relative z-10">
              {!isArabic ? (
                <input
                  placeholder={t("select_travel_date")}
                  value={inputValue}
                  readOnly
                  onMouseDown={(e) => e.preventDefault()}
                  className="text-sm bg-transparent outline-none w-full cursor-pointer"
                />
              ) : (
                <div className="text-sm flex-1 truncate" dir="rtl">{inputValue || t("select_travel_date")}</div>
              )}
              <img src={calenderIconSrc} width={14} height={14} alt="calendar" className="flex-shrink-0" />
            </div>

            <div className="w-full max-w-[315px] mt-2 flex flex-col gap-2 relative z-10">
              <div className="flex justify-center">
                <button onClick={() => handleQuickSelect("instant")} className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0] bg-white px-3 py-2 shadow-sm hover:bg-gray-50 transition">
                  <img src={rightAwayIconSrc} alt="Instant" className="w-3 h-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#003669] whitespace-nowrap">{t('instant_within_2_weeks')}</span>
                </button>
              </div>

              <div className="flex gap-2 justify-between">
                <button onClick={() => handleQuickSelect("month")} className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0] bg-white px-2 sm:px-3 py-2 shadow-sm hover:bg-gray-50 transition flex-1">
                  <img src={monthIconSrc} alt="Within a month" className="w-3 h-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#003669] whitespace-nowrap">{t('within_a_month')}</span>
                </button>
                <button onClick={() => handleQuickSelect("moreThanMonth")} className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0] bg-white px-2 sm:px-3 py-2 shadow-sm hover:bg-gray-50 transition flex-1">
                  <img src={calenderIconSrc} alt="More than a month" className="w-3 h-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-[#003669] whitespace-nowrap">{t('more_than_a_month')}</span>
                </button>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default SearchTravelDate;