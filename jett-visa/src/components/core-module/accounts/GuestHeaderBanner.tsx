"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import bgClouds from "@/assets/images/cloudImageBg.png";
import planeIcon from "@/assets/images/planeImage.png";
import curveTail from "@/assets/images/planeMark.png";
import cloud1 from "@/assets/images/cloud1.webp";
import cloud2 from "@/assets/images/cloud2.webp";
import cloud3 from "@/assets/images/cloud3.webp";
import cloud4 from "@/assets/images/cloud4.webp";

const GuestHeaderBanner: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // Convert StaticImageData to string
  const bgCloudsSrc = typeof bgClouds === 'string' ? bgClouds : (bgClouds as any)?.src || bgClouds;
  const planeIconSrc = typeof planeIcon === 'string' ? planeIcon : (planeIcon as any)?.src || planeIcon;
  const curveTailSrc = typeof curveTail === 'string' ? curveTail : (curveTail as any)?.src || curveTail;
  const cloud1Src = typeof cloud1 === 'string' ? cloud1 : (cloud1 as any)?.src || cloud1;
  const cloud2Src = typeof cloud2 === 'string' ? cloud2 : (cloud2 as any)?.src || cloud2;
  const cloud3Src = typeof cloud3 === 'string' ? cloud3 : (cloud3 as any)?.src || cloud3;
  const cloud4Src = typeof cloud4 === 'string' ? cloud4 : (cloud4 as any)?.src || cloud4;

  return (
    <div
      className="w-full h-[79.818px] relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgCloudsSrc})`,
      }}
    >
      <img
        src={cloud1Src}
        alt=""
        className="absolute top-[10px] left-0 w-[45px] h-4 z-0 opacity-100"
      />

      <img
        src={cloud2Src}
        alt=""
        className="absolute top-[10px] right-[10px] w-[30px] h-[10px] z-0 opacity-100"
      />

      <img
        src={cloud3Src}
        alt=""
        className="absolute bottom-0 left-[10px] w-[76px] h-[26px] z-0 opacity-100"
      />

      <img
        src={cloud4Src}
        alt=""
        className="absolute bottom-0 right-0 w-[82px] h-[28px] z-0 opacity-100"
      />

      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-center z-[3]">
        <div className="font-poppins font-normal text-[26px] text-[#00366B] leading-[26px] h-[39px] w-[97px]">
          {t('search')}.
        </div>

        <div className="font-poppins font-bold text-[26px] text-[#00366B] leading-[28px] -mt-3">
          {t('visa')}.  {t('go')}.
        </div>
      </div>

      <img
        src={curveTailSrc}
        alt="plane trail"
        className="absolute w-[158.4px] h-[46.746px] top-[22px] z-[1] opacity-100"
        style={{
          left: isRTL ? 'auto' : '110px',
          right: isRTL ? '110px' : 'auto',
          transform: isRTL ? 'scaleX(-1)' : 'none',
        }}
      />

      <img
        src={planeIconSrc}
        alt="plane"
        className="absolute w-[59.542px] h-[26.739px] top-5 z-[2] opacity-100"
        style={{
          left: isRTL ? '265px' : '255px',
          transform: isRTL ? 'scaleX(-1)' : 'none',
        }}
      />
    </div>
  );
};

export default GuestHeaderBanner;
