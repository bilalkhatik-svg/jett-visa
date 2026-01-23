"use client";

import React, { useEffect, useState } from "react";
import monthIcon from "@/assets/images/icons/monthIcon.png";
import rightAwayIcon from "@/assets/images/icons/rightAwayIcon.png";
import CalenderIcon from "@/assets/images/icons/calendericon.webp"
import { useTranslation } from "@/utils/i18nStub";
// import { useLocation } from "@/utility/hooks/useLocation";
// import { getTravelDateVisaUrl, formatDate } from "@/utility/helper";

// import type { PendingAction } from "@/components-library/home-screen/HomeScreen";
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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const inputAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const [calendarPlacement, setCalendarPlacement] = useState<'top' | 'bottom'>('bottom');

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
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (desktopCalendarOpen && desktopSelectedDate) {
      setCurrentMonth(desktopSelectedDate);
    }
  }, [desktopCalendarOpen]);

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

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateSelect = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    
    const { year, month } = getDaysInMonth(currentMonth);
    const selectedDate = new Date(year, month, day);
    setDesktopSelectedDate(selectedDate);
    formatSelectedDate(selectedDate);
    
    const path = getTravelDateVisaUrl(
      nationality?.isoCode || "",
      residency?.isoCode || "",
      selectedDate
    );
    
    onPreFlowNavigation({ type: "navigate", url: path, date: selectedDate });
    setDesktopCalendarOpen(false);
  };

  const isDateSelected = (day: number, isCurrentMonth: boolean) => {
    if (!desktopSelectedDate || !isCurrentMonth) return false;
    const { year, month } = getDaysInMonth(currentMonth);
    const checkDate = new Date(year, month, day);
    return checkDate.toDateString() === desktopSelectedDate.toDateString();
  };

  const isDateUnavailable = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    // Example: mark 14th as unavailable (can be customized)
    return day === 14;
  };

  return (
    <div className="relative z-10 ml-[-20%] mt-[1%]">
      {!isMobileView ? (
        <div className="relative z-10">
          <div className="flex flex-row items-center gap-2 overflow-x-auto py-1 scrollbar-hide relative z-10">
            <div
              ref={inputAnchorRef}
              onClick={() => {
                if (inputAnchorRef.current) {
                  const rect = inputAnchorRef.current.getBoundingClientRect();
                  const spaceBelow = window.innerHeight - rect.bottom;
                  const spaceAbove = rect.top;
                
                  setCalendarPlacement(
                    spaceBelow < 460 && spaceAbove > spaceBelow ? 'top' : 'bottom'
                  );
                }
                setDesktopCalendarOpen(true);
              }}
              className="flex items-center justify-between rounded-[14px] border-2 border-[#E0E0E0] px-3 py-2 bg-white backdrop-blur cursor-pointer flex-shrink-0 relative z-10"
              style={{ width: isMobileView ? '100%' : '295px', maxWidth: '315px', gap: 16 }}
            >
              {!isArabic ? (
                <input
                  placeholder={"Select travel date"}
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

          {/* Calendar Modal */}
          {desktopCalendarOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-[9999]" 
                onClick={() => setDesktopCalendarOpen(false)}
              />
              
              {/* Calendar */}
              <div
  className={`
    absolute z-[99999] flex flex-col bg-white shadow-xl rounded-[30px]
    w-[375px] h-[442px]
    p-[30px] pt-[30px] pb-[20px]
    ${calendarPlacement === 'bottom'
      ? 'top-full mt-2'
      : 'bottom-full mb-2'
    }
  `}
  onClick={(e) => e.stopPropagation()}
>
                {/* Title */}
                <h3 className="text-lg font-bold text-[#00366B]">
                  Select travel date or range
                </h3>

                {/* Month Navigation */}
                <div className="flex items-center justify-center" style={{ gap: '20px' }}>
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  
                  <span className="text-base font-medium text-gray-700 min-w-[140px] text-center">
                    {currentMonth.toLocaleDateString(i18n.language || 'en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  
                  <button
                    onClick={() => navigateMonth('next')}
                    className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7" style={{ gap: '20px' }}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div
                      key={index}
                      className="text-xs font-medium text-gray-600 text-center py-2 bg-gray-50 rounded"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 flex-1" style={{ gap: '20px' }}>
                  {(() => {
                    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
                    const prevMonth = new Date(year, month - 1, 0);
                    const prevMonthDays = prevMonth.getDate();
                    const days: Array<{ day: number; isCurrentMonth: boolean; isPrevMonth: boolean }> = [];

                    // Previous month's trailing days
                    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
                      days.push({
                        day: prevMonthDays - i,
                        isCurrentMonth: false,
                        isPrevMonth: true,
                      });
                    }

                    // Current month's days
                    for (let day = 1; day <= daysInMonth; day++) {
                      days.push({
                        day,
                        isCurrentMonth: true,
                        isPrevMonth: false,
                      });
                    }

                    // Next month's leading days (fill remaining cells)
                    const remainingCells = 42 - days.length; // 6 rows * 7 days
                    for (let day = 1; day <= remainingCells; day++) {
                      days.push({
                        day,
                        isCurrentMonth: false,
                        isPrevMonth: false,
                      });
                    }

                    return days.map(({ day, isCurrentMonth, isPrevMonth }, index) => {
                      const isSelected = isDateSelected(day, isCurrentMonth);
                      const isUnavailable = isDateUnavailable(day, isCurrentMonth);
                      const isDisabled = !isCurrentMonth || isUnavailable;

                      return (
                        <button
                          key={index}
                          onClick={() => handleDateSelect(day, isCurrentMonth)}
                          disabled={isDisabled}
                          className={`
                            relative h-10 w-10 flex items-center justify-center text-sm rounded-lg transition-colors
                            ${isDisabled 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                            }
                            ${isSelected 
                              ? 'text-[#0066CC] font-semibold bg-blue-50' 
                              : ''
                            }
                          `}
                        >
                          {day}
                          {isSelected && (
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0066CC] rounded-full" />
                          )}
                        </button>
                      );
                    });
                  })()}
                </div>

                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setDesktopCalendarOpen(false)}
                    className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
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
