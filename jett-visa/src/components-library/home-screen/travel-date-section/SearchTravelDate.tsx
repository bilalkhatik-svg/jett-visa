"use client";

import React, { useEffect, useState } from "react";
import monthIcon from "@/assets/images/icons/monthIcon.png";
import rightAwayIcon from "@/assets/images/icons/rightAwayIcon.png";
import CalenderIcon from "@/assets/images/icons/calendericon.webp";
import { useTranslation } from "@/utils/i18nStub";

export type PendingAction = {
  type: string;
  url?: string;
  date?: Date;
  [key: string]: any;
};

const getTravelDateVisaUrl = (
  nationalityIso: string,
  residencyIso: string,
  date?: Date
): string => {
  const dateStr = date ? date.toISOString().split("T")[0] : "";
  return `/visa?nationality=${nationalityIso}&residency=${residencyIso}${
    dateStr ? `&date=${dateStr}` : ""
  }`;
};

interface SearchTravelDateProps {
  setShowCalender: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate?: Date | null;
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const SearchTravelDate = ({
  setShowCalender,
  selectedDate,
  onPreFlowNavigation,
}: SearchTravelDateProps) => {
  const { t, i18n } = useTranslation();

  const nationality = { isoCode: "IN" };
  const residency = { isoCode: "AE" };

  const [inputValue, setInputValue] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const [desktopCalendarOpen, setDesktopCalendarOpen] = useState(false);
  const [mobileCalendarOpen, setMobileCalendarOpen] = useState(false);
  const [desktopSelectedDate, setDesktopSelectedDate] = useState<Date | null>(
    selectedDate || null
  );
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const inputAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const [calendarPlacement, setCalendarPlacement] = useState<"top" | "bottom">(
    "bottom"
  );

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isArabic = i18n.language?.startsWith("ar");

  const formatSelectedDate = (date: Date | null) => {
    if (!date) return setInputValue("");
    const locale = i18n.language || "en-US";
    const weekday = date.toLocaleDateString(locale, { weekday: "short" });
    const month = date.toLocaleDateString(locale, { month: "short" });
    setInputValue(`${weekday}, ${month} ${date.getDate()}, ${date.getFullYear()}`);
  };

  useEffect(() => {
    if (desktopSelectedDate) formatSelectedDate(desktopSelectedDate);
  }, [desktopSelectedDate, i18n.language]);

  const handleQuickSelect = (type: "instant" | "month" | "moreThanMonth") => {
    const date = new Date();
    if (type === "instant") date.setDate(date.getDate() + 14);
    if (type === "month") date.setMonth(date.getMonth() + 1);
    if (type === "moreThanMonth") date.setMonth(date.getMonth() + 2);

    setDesktopSelectedDate(date);

    onPreFlowNavigation({
      type: "navigate",
      url: getTravelDateVisaUrl(
        nationality.isoCode,
        residency.isoCode,
        date
      ),
      date,
    });
  };

  const calenderIconSrc =
    typeof CalenderIcon === "string"
      ? CalenderIcon
      : (CalenderIcon as any)?.src;

  const rightAwayIconSrc =
    typeof rightAwayIcon === "string"
      ? rightAwayIcon
      : (rightAwayIcon as any)?.src;

  const monthIconSrc =
    typeof monthIcon === "string"
      ? monthIcon
      : (monthIcon as any)?.src;

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    // Prevent selecting past dates
    if (selectedDate < today) return;
    
    setDesktopSelectedDate(selectedDate);
    formatSelectedDate(selectedDate);
    
    const path = getTravelDateVisaUrl(
      nationality?.isoCode || "",
      residency?.isoCode || "",
      selectedDate
    );
    
    onPreFlowNavigation({ type: "navigate", url: path, date: selectedDate });
    setDesktopCalendarOpen(false);
    setMobileCalendarOpen(false);
  };

  const isToday = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    const { year, month } = getDaysInMonth(currentMonth);
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  };

  const isPastDate = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;
    const { year, month } = getDaysInMonth(currentMonth);
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="w-full">
    <div className="relative z-10 mt-[1%] max-sm:ml-0 max-sm:flex max-sm:justify-center">
      {!isMobileView ? (
        /* ================= DESKTOP (UNCHANGED) ================= */
        <div className="relative z-10">
  <div className="flex flex-row items-center gap-2 overflow-x-auto py-1 scrollbar-hide relative z-10">
    {/* Date Input */}
    <div
      ref={inputAnchorRef}
      onClick={() => {
        if (inputAnchorRef.current) {
          const rect = inputAnchorRef.current.getBoundingClientRect();
          const spaceBelow = window.innerHeight - rect.bottom;
          const spaceAbove = rect.top;

          setCalendarPlacement(
            spaceBelow < 460 && spaceAbove > spaceBelow ? "top" : "bottom"
          );
        }
        setDesktopCalendarOpen(true);
      }}
      className="flex items-center justify-between rounded-[14px] border-2 border-[#E0E0E0]
        px-4 py-4 bg-white backdrop-blur cursor-pointer flex-shrink-0
        relative z-10 w-[295px] max-w-[315px]"
    >
      {!isArabic ? (
        <input
          placeholder={"select travel date"}
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
      <img src={calenderIconSrc} className="w-5 h-5" alt="calendar" />
    </div>

    {/* Instant */}
    <button
      onClick={() => handleQuickSelect("instant")}
      className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0]
        bg-white px-4 py-4 shadow-sm hover:bg-gray-50 transition flex-shrink-0"
    >
      <img src={rightAwayIconSrc} className="w-5 h-5" />
      <span className="text-sm text-[#003669] whitespace-nowrap">
        {"instant within 2 weeks"}
      </span>
    </button>

    {/* Within a month */}
    <button
      onClick={() => handleQuickSelect("month")}
      className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0]
        bg-white px-4 py-4 shadow-sm hover:bg-gray-50 transition flex-shrink-0"
    >
      <img src={monthIconSrc} className="w-5 h-5" />
      <span className="text-sm text-[#003669] whitespace-nowrap">
        {"within a month"}
      </span>
    </button>

    {/* More than a month */}
    <button
      onClick={() => handleQuickSelect("moreThanMonth")}
      className="flex items-center gap-2 rounded-[10px] border border-[#E0E0E0]
        bg-white px-4 py-4 shadow-sm hover:bg-gray-50 transition flex-shrink-0"
    >
      <img src={calenderIconSrc} className="w-5 h-5" />
      <span className="text-sm text-[#003669] whitespace-nowrap">
        {"more than a month"}
      </span>
    </button>
  </div>

  {/* Calendar Overlay */}
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
          p-[30px] pt-[10px] pb-[20px]
          ${calendarPlacement === "bottom" ? "top-full mt-2" : "bottom-full mb-2"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-[#00366B]">
          Select travel date or range
        </h3>

        {/* Month Navigation */}
        <div className="flex items-center justify-center gap-5 mt-2">
          <button onClick={() => navigateMonth("prev")}>
            ‹
          </button>

          <span className="text-base font-medium text-gray-700 min-w-[140px] text-center">
            {currentMonth.toLocaleDateString(i18n.language || "en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <button onClick={() => navigateMonth("next")}>
            ›
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4 mt-4">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d} className="text-xs text-center text-gray-500">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4 mt-2">
          {(() => {
            const { daysInMonth, startingDayOfWeek, year, month } =
              getDaysInMonth(currentMonth);

            const days: any[] = [];
            for (let i = 0; i < startingDayOfWeek; i++) {
              days.push({ empty: true });
            }

            for (let d = 1; d <= daysInMonth; d++) {
              const date = new Date(year, month, d);
              const selected =
                desktopSelectedDate &&
                date.toDateString() === desktopSelectedDate.toDateString();
              const isTodayDate = isToday(d, true);
              const isPast = isPastDate(d, true);

              days.push({ day: d, selected, isTodayDate, isPast });
            }

            return days.map((item, idx) =>
              item.empty ? (
                <div key={idx} />
              ) : (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(item.day, true)}
                  disabled={item.isPast}
                  className={`h-10 w-10 rounded-lg flex items-center justify-center relative
                    ${
                      item.isPast
                        ? "text-gray-300 cursor-not-allowed"
                        : item.selected
                        ? "bg-blue-50 text-[#00366B] font-semibold hover:bg-blue-100"
                        : item.isTodayDate
                        ? "text-[#00366B] font-semibold hover:bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {item.day}
                  {(item.selected || item.isTodayDate) && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00366B] rounded-full" />
                  )}
                </button>
              )
            );
          })()}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => setDesktopCalendarOpen(false)}
            className="px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )}
</div>

      ) : (
        /* ================= MOBILE (CENTERED) ================= */
        <div className="w-full flex flex-col items-center">
          {/* Input */}
          <div className="w-full flex justify-center">
            <div
              onClick={() => setMobileCalendarOpen(true)}
              className="flex items-center justify-between w-full max-w-[315px] h-[46px]
              rounded-[14px] border-2 border-[#E0E0E0] px-3 py-2 bg-white
              mt-1.5 cursor-pointer relative z-10 mx-auto"
            >
              {!isArabic ? (
                <input
                  placeholder={"Select travel date"}
                  value={inputValue}
                  readOnly
                  className="text-sm bg-transparent outline-none w-full"
                />
              ) : (
                <div className="text-sm flex-1 truncate" dir="rtl">
                  {inputValue || t("select_travel_date")}
                </div>
              )}
              <img src={calenderIconSrc} width={14} height={14} alt="calendar" />
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full flex justify-center mt-2">
            <div className="w-full max-w-[315px] flex flex-col gap-2 mx-auto">
              <div className="flex justify-center">
                <button
                  onClick={() => handleQuickSelect("instant")}
                  className="flex items-center gap-2 rounded-[10px] border
                  border-[#E0E0E0] bg-white px-3 py-2 shadow-sm"
                >
                  <img src={rightAwayIconSrc} className="w-3 h-3" />
                  <span className="text-xs text-[#003669]">
                    {"instant within 2 weeks"}
                  </span>
                </button>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleQuickSelect("month")}
                  className="flex-1 flex items-center gap-2 rounded-[10px]
                  border border-[#E0E0E0] bg-white px-3 py-2 shadow-sm"
                >
                  <img src={monthIconSrc} className="w-3 h-3" />
                  <span className="text-xs text-[#003669]">
                    {"within a month"}
                  </span>
                </button>

                <button
                  onClick={() => handleQuickSelect("moreThanMonth")}
                  className="flex-1 flex items-center gap-2 rounded-[10px]
                  border border-[#E0E0E0] bg-white px-3 py-2 shadow-sm"
                >
                  <img src={calenderIconSrc} className="w-3 h-3" />
                  <span className="text-xs text-[#003669]">
                    {"more than a month"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Calendar Bottom Drawer */}
          {mobileCalendarOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
                onClick={() => setMobileCalendarOpen(false)}
              />

              {/* Close Button - Outside Calendar, Top Center */}
              <div className="fixed top-40 left-1/2 -translate-x-1/2 z-[10001]">
                <button
                  onClick={() => setMobileCalendarOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-700">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Bottom Drawer */}
              <div
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[30px] z-[10000] 
                  shadow-2xl max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drawer Content */}
                <div className="px-6 pt-6 pb-6">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#00366B] mb-6">
                    Select travel date
                  </h3>

                  {/* Month Navigation */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateMonth("prev");
                      }}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    <span className="text-base font-medium text-gray-700 min-w-[140px] text-center">
                      {currentMonth.toLocaleDateString(i18n.language || "en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateMonth("next");
                      }}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                      <div
                        key={index}
                        className="text-xs font-bold text-gray-700 text-center py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-6">
                    {(() => {
                      const { daysInMonth, startingDayOfWeek, year, month } =
                        getDaysInMonth(currentMonth);
                      const prevMonth = new Date(year, month - 1, 0);
                      const prevMonthDays = prevMonth.getDate();
                      const days: Array<{ day: number; isCurrentMonth: boolean }> = [];

                      // Previous month's trailing days
                      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
                        days.push({
                          day: prevMonthDays - i,
                          isCurrentMonth: false,
                        });
                      }

                      // Current month's days
                      for (let day = 1; day <= daysInMonth; day++) {
                        days.push({
                          day,
                          isCurrentMonth: true,
                        });
                      }

                      // Next month's leading days
                      const remainingCells = 42 - days.length;
                      for (let day = 1; day <= remainingCells; day++) {
                        days.push({
                          day,
                          isCurrentMonth: false,
                        });
                      }

                      return days.map(({ day, isCurrentMonth }, index) => {
                        const isSelected =
                          desktopSelectedDate &&
                          isCurrentMonth &&
                          new Date(year, month, day).toDateString() ===
                            desktopSelectedDate.toDateString();
                        const isTodayDate = isToday(day, isCurrentMonth);
                        const isPast = isPastDate(day, isCurrentMonth);
                        const isDisabled = !isCurrentMonth || isPast;

                        return (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(day, isCurrentMonth)}
                            disabled={isDisabled}
                            className={`
                              relative h-10 w-10 flex items-center justify-center text-sm rounded-lg transition-colors
                              ${isDisabled
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-700 hover:bg-gray-100 cursor-pointer"
                              }
                              ${isSelected
                                ? "text-[#00366B] font-semibold"
                                : ""
                              }
                              ${isTodayDate && !isSelected
                                ? "text-[#00366B] font-semibold"
                                : ""
                              }
                            `}
                          >
                            {day}
                            {(isSelected || isTodayDate) && (
                              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#00366B] rounded-full" />
                            )}
                          </button>
                        );
                      });
                    })()}
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={() => {
                      if (desktopSelectedDate) {
                        const path = getTravelDateVisaUrl(
                          nationality?.isoCode || "",
                          residency?.isoCode || "",
                          desktopSelectedDate
                        );
                        onPreFlowNavigation({ type: "navigate", url: path, date: desktopSelectedDate });
                      }
                      setMobileCalendarOpen(false);
                    }}
                    className="w-full py-4 rounded-xl bg-gray-400 hover:bg-gray-500 text-white font-medium text-base transition-colors"
                    disabled={!desktopSelectedDate}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchTravelDate;