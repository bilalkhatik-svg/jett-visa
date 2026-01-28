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
  onPreFlowNavigation,
}) => {
  const { t, i18n } = useTranslation();
  const { visaModesList, isVisaModesListPending } = useVisaModes();
  const isRTL = i18n?.dir?.() === "rtl";
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { nationality, residency } = useLocation();

  const visaTypes: VisaType[] =
    visaModesList?.response?.map((mode: any) => ({
      Code: mode?.Code || mode?.code,
      Name: mode?.Name || mode?.name,
      Description: mode?.Description || mode?.description,
      Icon: mode?.Icon || mode?.icon,
      Url: mode?.Url || mode?.url,
      Priority: mode?.Priority || mode?.priority,
    })) || [];

  const handleVisaClick = (modeCode: string) => {
    const query = `?mode=${modeCode.toLowerCase()}&nat=${nationality?.isoCode || ""}&res=${residency?.isoCode || ""}`;
    const url = `${window.location.origin}/explore/visa-mode${query}`;

    onPreFlowNavigation({
      type: "navigate",
      url,
      mode: modeCode,
    });
  };

  const [showDesktopDropdown, setShowDesktopDropdown] = React.useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = React.useState(false);
  const othersButtonRef = React.useRef<HTMLDivElement | null>(null);

  if (isVisaModesListPending && isMobile) {
    return (
      <div className="mt-3 px-4 text-center">
        <p className="font-normal text-xs text-[#003669] mb-2 font-[Poppins,sans-serif]">
          {t("loading_visa_types")}
        </p>

        <div className="flex justify-center items-center gap-3 max-w-[400px] mx-auto">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 rounded-xl w-[150px] h-[34px]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!visaTypes.length) {
    return (
      <div className={`mt-4 ${isMobile ? "text-center px-4" : "text-left"}`}>
        <p className="text-[#003669] font-normal font-[Poppins,sans-serif]">
          {t("unable_to_load_visa_types")}
        </p>
      </div>
    );
  }

  const visibleVisaTypes = visaTypes.slice(0, 3);
  const hasExtra = visaTypes.length > 3;

  const handleOthersClick = () => {
    if (isMobile) {
      setShowMobileDrawer(true);
    } else {
      setShowDesktopDropdown((p) => !p);
    }
  };

  const otherVisaTypes = visaTypes.slice(3);

  return (
    <div className="w-full z-[1]">
      {/* Title */}
      <div className={`mt-4 mb-1 ${isMobile ? "text-center -mt-[3%] px-4" : "text-left"}`}>
      <p
          className={`font-normal leading-[100%] font-[Poppins,sans-serif] text-[#003669]
            ${isMobile ? "text-xs" : "text-base"}
          `}
        >
          Find destinations by how their visas are issued
        </p>
      </div>

      {/* Visa buttons */}
      <div
        className={`flex flex-wrap gap-3 mt-5
          ${isMobile
            ? "justify-center items-center mx-auto w-full max-w-[400px] px-3"
            : "justify-start items-start"
          }
        `}
      >
        {visibleVisaTypes.map((item, index) => (
          <button
            key={item?.Code || index}
            onClick={() => handleVisaClick(item?.Code)}
            className={`bg-white text-[#003669] rounded-xl flex items-center gap-2 px-4 py-2 font-normal
              ${isMobile ? "h-[34px] text-[0.85rem]" : "h-[52px] text-base"}
              font-[Poppins,sans-serif]
              shadow-[0_2px_6px_rgba(0,0,0,0.1)]
              hover:bg-[#f0f4ff] hover:text-[#1976d2] transition-colors
            `}
          >
            {item?.Url && (
              <img
                src={item.Url}
                alt={item?.Name || ""}
                className={`${isMobile ? "w-[14px] h-[14px]" : "w-5 h-5"} object-contain`}
              />
            )}

            <span className="flex-1 text-left">{item?.Name}</span>

            <Image
              src={rightArrowIcon}
              alt="arrow"
              width={isMobile ? 14 : 20}
              height={isMobile ? 14 : 20}
              className={`${isMobile ? "w-[14px] h-[14px]" : "w-5 h-5"}`}
              style={{ transform: isRTL ? "rotate(180deg)" : undefined }}
            />
          </button>
        ))}

        {hasExtra && (
          <div className="relative">
            <div ref={othersButtonRef}>
              <button
                onClick={handleOthersClick}
                className={`bg-white text-[#0A2540] rounded-xl flex items-center gap-2 px-4 py-2 font-normal
                  ${isMobile ? "h-[34px] text-[0.85rem]" : "h-[52px] text-base"}
                  font-[Poppins,sans-serif]
                  shadow-[0_2px_6px_rgba(0,0,0,0.1)]
                  hover:bg-[#f0f4ff] hover:text-[#1976d2] transition-colors
                `}
              >
                <Image
                  src={othersIcon}
                  alt="Others"
                  width={isMobile ? 14 : 20}
                  height={isMobile ? 14 : 20}
                  className={`${isMobile ? "w-[14px] h-[14px]" : "w-5 h-5"}`}
                />

                <span className="flex-1 text-left">{t("others")}</span>

                <Image
                  src={rightArrowIcon}
                  alt="arrow"
                  width={isMobile ? 14 : 20}
                  height={isMobile ? 14 : 20}
                  className={`${isMobile ? "w-[14px] h-[14px]" : "w-5 h-5"}`}
                  style={{ transform: isRTL ? "rotate(180deg)" : undefined }}
                />
              </button>
            </div>

            {!isMobile && showDesktopDropdown && (
              <DesktopOtherVisaDropdown
                anchorRef={othersButtonRef}
                onPreFlowNavigation={onPreFlowNavigation}
                onClose={() => setShowDesktopDropdown(false)}
              />
            )}
          </div>
        )}
      </div>

      {/* Mobile Bottom Drawer for Other Visa Types */}
      {isMobile && showMobileDrawer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
            onClick={() => setShowMobileDrawer(false)}
          />

          {/* Close Button - Outside Drawer, Top Center */}
          <div className="fixed top-120 left-1/2 -translate-x-1/2 z-[10001]">
            <button
              onClick={() => setShowMobileDrawer(false)}
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
              shadow-2xl overflow-y-auto max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Content */}
            <div className="px-6 pt-6 pb-6">
              {/* Title */}
              <h3 className="text-lg font-bold text-[#00366B] mb-6">
                { "Other Visa Types"}
              </h3>

              {/* Visa Types List */}
              <div className="flex flex-col gap-3">
                {otherVisaTypes.map((item, index) => (
                  <div
                    key={item?.Code || `mobile-visa-${index}`}
                    className="flex items-center justify-between gap-3 py-3 px-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg border border-gray-100"
                    onClick={() => {
                      handleVisaClick(item.Code);
                      setShowMobileDrawer(false);
                    }}
                  >
                    {/* Left: Visa type icon */}
                    {item?.Url ? (
                      <img
                        src={item.Url}
                        alt={item?.Name || "visa icon"}
                        className="w-5 h-5 object-contain flex-shrink-0"
                      />
                    ) : (
                      <div className="w-5 h-5 bg-gray-300 rounded flex-shrink-0" />
                    )}
                    
                    {/* Center: Visa type text in blue */}
                    <div className="text-[#00366B] text-sm font-medium flex-1 text-left">
                      {item?.Name || t("visa_type")}
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
          </div>
        </>
      )}
    </div>
  );
};

export default VisaTypeSection;