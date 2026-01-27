"use client";

import React from "react";
import Image from "next/image";
import othersIcon from "@/assets/images/icons/othersIcon.png";
import { useVisaModes } from "@/utils/hooks/useVisaModes";
import rightArrowIcon from "@/assets/images/icons/rightArrowIcon.png";
import { useLocation } from "@/utils/hooks/useLocation";
import { useTranslation } from "react-i18next";
import type { PendingAction } from "@/components-library/home-screen/HomeScreen";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";
import DesktopOtherVisaDropdown from "@/components/core-module/visa-type/DesktopOtherVisaDropdown";

interface VisaType {
  Code: string;
  Name: string;
  Description: string;
  Icon: string;
  Url: string;
  Priority: number;
}

interface VisaTypeSectionProps {
  showOthers: boolean;
  setShowOthers: React.Dispatch<React.SetStateAction<boolean>>;
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const VisaTypeSection: React.FC<VisaTypeSectionProps> = ({
  setShowOthers,
  onPreFlowNavigation
}) => {
  const { t, i18n } = useTranslation();
  const { visaModesList, isVisaModesListPending } = useVisaModes();
  const isRTL = i18n?.dir?.() === "rtl";
  const isMobile = useMediaQuery("(max-width: 640px)");
  const visaTypes: VisaType[] =
    visaModesList?.response?.map((mode) => ({
      Code: mode?.code,
      Name: mode?.name,
      Description: mode?.description,
      Icon: mode?.icon,
      Url: mode?.url,
      Priority: mode?.Priority,
    })) || [];

  const { nationality, residency } = useLocation();

  const handleVisaClick = (modeCode: string) => {
    const buildQuery = `?mode=${modeCode?.toLocaleLowerCase()}&nat=${nationality?.isoCode || ''}&res=${residency?.isoCode || ''}`;
    const path = "/explore/visa-mode" + buildQuery;
    const url = `${window.location.origin}${path}`;

    const action: PendingAction = {
      type: 'navigate',
      url: url,
      mode: modeCode
    };

    onPreFlowNavigation(action);
  };

  const [showDesktopDropdown, setShowDesktopDropdown] = React.useState(false);
  const othersButtonRef = React.useRef<HTMLDivElement | null>(null);

  if (isVisaModesListPending && isMobile) {
    return (
      <div className="mt-3 px-2 text-center">
        <p className="font-normal text-xs text-[#003669] mb-2 font-[Poppins,sans-serif]">
          {t("loading_visa_types")}
        </p>

        <div className="flex justify-center items-center gap-3 max-w-[400px] mx-auto">
          {[...Array(3)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="animate-pulse bg-gray-200 rounded-xl w-[150px] h-[34px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (visaTypes?.length === 0) {
    return (
      <div className={`mt-4 ${isMobile ? "text-center" : "text-left"}`}>
        <p className={`${isMobile ? "text-sm" : "text-base"} text-[#003669] font-normal font-[Poppins,sans-serif]`}>
          {t("unable_to_load_visa_types")}
        </p>
      </div>
    );
  }

  const visibleVisaTypes = visaTypes?.slice(0, 3);
  const hasExtra = visaTypes?.length > 3;
  console.log('visible visa types', visibleVisaTypes)
  const handleOthersClick = () => {
    if (isMobile) {
      setShowOthers(true);
    } else {
      setShowDesktopDropdown((prev) => !prev);
    }
  };

  return (
    <div>
      <div className={`mt-2 mb-1 ${isMobile ? "text-center" : "text-left"}`}>
        <p
          className={`font-normal ${isMobile ? "text-xs" : "text-base"} leading-[100%] font-[Poppins,sans-serif] text-[#003669]`}
        >
          {t("find_destination_by_visa")}
        </p>
      </div>

      <div
        className={`flex flex-wrap gap-3 mt-3 ${isMobile ? "justify-center items-center px-2 max-w-[400px]" : "justify-start items-start"}`}
      >
        {visibleVisaTypes?.map((item, index) => (
          <button
            key={item?.Code || `visa-${index}`}
            onClick={() => handleVisaClick(item?.Code)}
            className={`bg-white text-[#003669] rounded-xl flex items-center justify-start gap-2 px-4 py-2 font-normal ${isMobile ? "h-[34px] text-[0.85rem]" : "h-[52px] text-base"
              } font-[Poppins,sans-serif] shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-[#f0f4ff] hover:text-[#1976d2] transition-colors`}
          >
            {item?.Url ? (
              <img
                src={item.Url}
                alt={item?.Name}
                width={isMobile ? 14 : 20}
                height={isMobile ? 14 : 20}
                className={`${isMobile ? "w-[14px] h-[14px]" : "w-5 h-5"} object-contain`}
              />
            ) : null}
            <span className="flex-1 text-left">{item?.Name}</span>
            <Image
              src={rightArrowIcon}
              alt="arrow"
              width={isMobile ? 14 : 20}
              height={isMobile ? 14 : 20}
              className={`${isMobile ? "w-[14px] h-[14px]" : "w-5 h-5"}`}
              style={{
                transform: isRTL ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
        ))}

        {hasExtra && (
          <div className="relative">
            <div ref={othersButtonRef}>
              <button
                onClick={handleOthersClick}
                className={`bg-white text-[#0A2540] rounded-xl flex items-center justify-start gap-2 px-4 py-2 font-normal ${isMobile ? "h-[34px] text-[0.85rem]" : "h-[52px] text-base"
                  } font-[Poppins,sans-serif] shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-[#f0f4ff] hover:text-[#1976d2] transition-colors`}
              >
                <Image
                  src={othersIcon}
                  alt="Others"
                  width={isMobile ? 14 : 20}
                  height={isMobile ? 14 : 20}
                  className={`${isMobile ? "w-[14px] h-[14px]" : "w-5 h-5"} object-contain`}
                />
                <span className="flex-1 text-left">{t("others")}</span>
                <Image
                  src={rightArrowIcon}
                  alt="arrow"
                  width={isMobile ? 14 : 20}
                  height={isMobile ? 14 : 20}
                  className={`${isMobile ? "w-[14px] h-[14px]" : "w-5 h-5"}`}
                  style={{
                    transform: isRTL ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
            </div>
            {!isMobile && showDesktopDropdown && (
              <DesktopOtherVisaDropdown
                onPreFlowNavigation={onPreFlowNavigation}
                anchorRef={othersButtonRef}
                onClose={() => setShowDesktopDropdown(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaTypeSection;