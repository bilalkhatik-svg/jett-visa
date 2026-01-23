"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useVisaModes } from "@/utils/hooks/useVisaModes";
import type { PendingAction } from "@/components-library/home-screen/HomeScreen";
import { useLocation } from "@/utils/hooks/useLocation";

interface DesktopOtherVisaDropdownProps {
  onPreFlowNavigation: (action: PendingAction) => boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

const DesktopOtherVisaDropdown: React.FC<DesktopOtherVisaDropdownProps> = ({
  onPreFlowNavigation,
  anchorRef,
  onClose,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n?.dir?.() === "rtl";
  const { visaModesList } = useVisaModes();
  const { nationality, residency } = useLocation();

  // Get all visa types from API response
  const allVisaTypes = visaModesList?.response || [];
  
  // Get visa types that are NOT shown as stickers (skip first 3)
  const otherVisaTypes = allVisaTypes.slice(3);

  const handleVisaClick = (modeCode: string) => {
    const buildQuery = `?mode=${modeCode?.toLowerCase()}&nat=${nationality?.isoCode || ""}&res=${residency?.isoCode || ""}`;
    const path = "/explore/visa-mode" + buildQuery;
    const url = `${window.location.origin}${path}`;

    const action: PendingAction = {
      type: "navigate",
      url,
      mode: modeCode,
    };

    onPreFlowNavigation(action);
    onClose();
  };

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      if (anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + 12,
          left: rect.left,
        });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  // Don't render if no items
  if (!otherVisaTypes || otherVisaTypes.length === 0) {
    return null;
  }

  const dropdownStyle = {
    position: "fixed" as const,
    top: `${position.top}px`,
    left: `${position.left}px`,
  };

  return (
    <>
      {/* Backdrop to close dropdown */}
      <div
        className="fixed inset-0 z-[1299]"
        onClick={onClose}
      />
      <div
        style={dropdownStyle}
        className="bg-white rounded-2xl shadow-[0px_12px_30px_rgba(10,37,64,0.16)] border border-[rgba(237,240,247,1)] z-[1300] overflow-hidden min-w-[280px]"
      >
      <div className="flex flex-col p-3 gap-2">
        {otherVisaTypes.map((item: any, index: number) => (
          <div
            key={item?.Code || item?.code || `visa-${index}`}
            className="flex items-center justify-between gap-3 py-3 px-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg"
            onClick={() => handleVisaClick(item?.Code || item?.code || "")}
          >
            {/* Left: Visa type icon */}
            {item?.Url || item?.url ? (
              <img
                src={item.Url || item.url}
                alt={item?.Name || item?.name || "visa icon"}
                className="w-5 h-5 object-contain flex-shrink-0"
              />
            ) : (
              <div className="w-5 h-5 bg-gray-300 rounded flex-shrink-0" />
            )}
            
            {/* Center: Visa type text in blue */}
            <div className="text-[#00366B] text-sm font-medium flex-1 text-left">
              {item?.Name || item?.name || t("visa_type")}
            </div>
            
            {/* Right: Blue chevron */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00366B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
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
    </>
  );
};

export default DesktopOtherVisaDropdown;

