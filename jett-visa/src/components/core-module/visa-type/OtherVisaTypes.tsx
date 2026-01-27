"use client";

import React from "react";
import Image from "next/image";
import { useVisaModes } from "@/utils/hooks/useVisaModes";
import rightArrowIcon from "@/assets/images/icons/rightArrowIcon.png";
import { useLocation } from "@/utils/hooks/useLocation";
import { useTranslation } from "react-i18next";
import type { PendingAction } from "@/components-library/home-screen/HomeScreen";

interface VisaType {
  Code: string;
  Name: string;
  Description: string;
  Icon: string;
  Url: string;
  Priority: number;
}

interface OtherVisaTypesProps {
  onPreFlowNavigation: (action: PendingAction) => boolean;
}

const OtherVisaTypes: React.FC<OtherVisaTypesProps> = ({ onPreFlowNavigation }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n?.dir?.() === "rtl";
  const { visaModesList } = useVisaModes();

  const visaTypes: VisaType[] =
    visaModesList?.response?.map((mode) => ({
      Code: mode?.Code,
      Name: mode?.Name,
      Description: mode?.Description,
      Icon: mode?.Icon,
      Url: mode?.Url,
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

  return (
    <div className="w-[315px] flex flex-wrap gap-[14px] content-start rounded-xl m-1 justify-center">
      {visaTypes.slice(3).map((item, index) => (
        <button
          key={item?.Code || `other-visa-${index}`}
          onClick={() => handleVisaClick(item?.Code)}
          className="h-[34px] min-w-[100px] bg-white text-[#003669] rounded-xl flex items-center justify-start gap-1.5 px-3 font-normal text-[0.85rem] font-[Poppins,sans-serif] shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-[#f0f4ff] hover:text-[#1976d2] transition-colors"
        >
          {item?.Url ? (
            <img
              src={item.Url}
              alt={item?.Name}
              width={14}
              height={14}
              className="w-[14px] h-[14px] object-contain"
            />
          ) : null}
          <span className="flex-1">{item?.Name}</span>
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
        </button>
      ))}
    </div>
  );
};

export default OtherVisaTypes;