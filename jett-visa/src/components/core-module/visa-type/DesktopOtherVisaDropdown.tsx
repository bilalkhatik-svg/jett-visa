"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useVisaModes } from "@/utils/hooks/useVisaModes";
import type { PendingAction } from "@/components-library/home-screen/HomeScreen";
import { useLocation } from "@/utils/hooks/useLocation";
import rightArrowIcon from "@/assets/images/icons/rightArrowIcon.png";
import visaDefaultIcon from "@/assets/images/icons/othersIcon.png";

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

  const visaTypes =
    visaModesList?.response?.map((mode) => ({
      Code: mode?.Code,
      Name: mode?.Name,
      Description: mode?.Description,
      Icon: mode?.Icon,
      Url: mode?.Url,
      Priority: mode?.Priority,
    })) || [];

  const handleVisaClick = (modeCode: string) => {
    const buildQuery = `?mode=${modeCode?.toLocaleLowerCase()}&nat=${nationality?.isoCode || ""}&res=${residency?.isoCode || ""}`;
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

  const anchorRect = anchorRef.current?.getBoundingClientRect();

  const dropdownStyle = {
    position: "absolute" as const,
    top: anchorRect ? anchorRect.bottom + window.scrollY + 12 : 0,
    left: anchorRect ? anchorRect.left + window.scrollX : 0,
  };

  return (
    <div
      style={dropdownStyle}
      className="bg-white rounded-2xl shadow-[0px_12px_30px_rgba(10,37,64,0.16)] border border-[rgba(237,240,247,1)] z-[1300] overflow-hidden"
    >
      <div className="flex flex-col p-2 gap-1">
        {visaTypes.slice(3).map((item, index) => (
          <div
            key={item?.Code || index}
            className="flex items-center justify-start gap-1 rounded-[28px] py-2.5 px-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleVisaClick(item.Code)}
          >
            {item?.Url ? (
              <img
                src={item.Url}
                alt={item?.Name}
                width={26}
                height={26}
                className="w-[26px] h-[26px] object-contain"
              />
            ) : (
              <Image
                src={visaDefaultIcon}
                alt={item?.Name || "visa icon"}
                width={26}
                height={26}
                className="w-[26px] h-[26px] object-contain"
              />
            )}
            <div className="text-[#0A2540] text-sm font-medium flex-1">
              {item?.Name || t("visa_type")}
            </div>
            <Image
              src={rightArrowIcon}
              alt="arrow"
              width={14}
              height={14}
              className="w-[14px] h-[14px]"
              style={{
                transform: isRTL ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopOtherVisaDropdown;

