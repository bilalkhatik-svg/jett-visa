"use client";

import React from "react";

interface CalendarGridProps {
  currentMonth: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  isDateDisabled?: (date: Date) => boolean;
}

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  selectedDate,
  onDateSelect,
  isDateDisabled,
}) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: Array<{
    day: number;
    isCurrentMonth: boolean;
  }> = [];

  // Prev month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
    });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isCurrentMonth: true,
    });
  }

  // Next month
  while (cells.length < 42) {
    cells.push({
      day: cells.length - daysInMonth - firstDay + 1,
      isCurrentMonth: false,
    });
  }

  return (
    <>
      {/* Week Header */}
      <div className="grid grid-cols-7 bg-[#F4F6F8] rounded-lg py-2 mb-3">
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className="text-xs font-medium text-gray-600 text-center"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map(({ day, isCurrentMonth }, idx) => {
          const date = new Date(year, month, day);
          date.setHours(0, 0, 0, 0);

          const isSelected =
            isCurrentMonth &&
            selectedDate &&
            date.toDateString() === selectedDate.toDateString();

          const isToday =
            isCurrentMonth && date.getTime() === today.getTime();

          const disabled =
            !isCurrentMonth ||
            isDateDisabled?.(date);

          return (
            <button
              key={idx}
              disabled={disabled}
              onClick={() => isCurrentMonth && onDateSelect(date)}
              className={`
                relative h-9 w-9 flex items-center justify-center rounded-md text-sm
                ${disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"}
                ${isSelected ? "text-[#00366B] font-semibold" : ""}
                ${isToday && !isSelected ? "text-[#00366B] font-semibold" : ""}
              `}
            >
              {day}

              {(isSelected || isToday) && (
                <div
                  className="absolute bottom-[4px] left-1/2 -translate-x-1/2
                  w-[5px] h-[5px] bg-[#00366B] rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default CalendarGrid;
