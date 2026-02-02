"use client";

import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "@/utils/hooks/useLocation";

interface VisaType {
  Code: string;
  Name: string;
  Url?: string;
}

interface DesktopOtherVisaDropdownProps {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onPreFlowNavigation: (action: any) => boolean;
  onClose: () => void;
}

const DesktopOtherVisaDropdown: React.FC<DesktopOtherVisaDropdownProps> = ({
  anchorRef,
  onPreFlowNavigation,
  onClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { i18n, t } = useTranslation();
  const isRTL = i18n?.dir?.() === "rtl";
  const { nationality, residency } = useLocation();

  // ⛔ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, anchorRef]);

  // Example data (REPLACE with real props if needed)
  const otherVisaTypes: VisaType[] = [
    { Code: "TYPE1", Name: t("visa_type") },
    { Code: "TYPE2", Name: t("visa_type") },
    { Code: "TYPE3", Name: t("visa_type") },
    { Code: "TYPE4", Name: t("visa_type") },
  ];

  const handleVisaClick = (modeCode: string) => {
    const query = `?mode=${modeCode.toLowerCase()}&nat=${nationality?.isoCode || ""}&res=${residency?.isoCode || ""}`;
    const url = `${window.location.origin}/explore/visa-mode${query}`;

    onPreFlowNavigation({
      type: "navigate",
      url,
      mode: modeCode,
    });

    onClose();
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full mt-2
        ${isRTL ? "left-0" : ""}
        w-[200px]
        bg-white
        rounded-2xl
        shadow-[0_12px_30px_rgba(0,0,0,0.12)]
        z-[1000]
        overflow-hidden
      `}
    >
      <div className="flex flex-col">
        {otherVisaTypes.map((item, index) => (
          <div
            key={item.Code || index}
            onClick={() => handleVisaClick(item.Code)}
            className="flex items-center justify-between
              px-4 py-3
              cursor-pointer
              hover:bg-[#F5F8FF]
              transition-colors z-[1000]"
          >
            {/* Left: text */}
            <span className="text-[#00366B] text-sm font-medium">
              {item.Name}
            </span>

            {/* Right: chevron */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00366B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isRTL ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopOtherVisaDropdown;
