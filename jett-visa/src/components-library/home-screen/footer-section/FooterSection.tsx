'use client';

import React from "react";
import MusafirLogo from "@/assets/images/MusafirLogo.png";
import PoweredYLogo from "@/assets/images/jettimage.webp";
import BackgroundCloudImg from "@/assets/images/BackgroundCloudImg.png";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";

const FooterSection: React.FC = React.memo(() => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n?.dir ? i18n.dir() === 'rtl' : false;
  const isMobile = useMediaQuery("(max-width:600px)");
  const TOP_CROP_PX = isMobile ? 140 : 900;

  return (
    <div
      className="relative px-[30px] w-full min-w-screen flex flex-col items-center overflow-hidden"
      dir={i18n.dir()}
      style={{ minHeight: isMobile ? 314 : 240 }}
    >
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src={BackgroundCloudImg}
          alt="background"
          className="absolute left-1/2 transform -translate-x-1/2 w-full object-cover"
          style={{ top: `-${TOP_CROP_PX}px`, minHeight: `calc(100% + ${TOP_CROP_PX}px)` }}
        />

        <div
          className="absolute inset-0 z-1"
          style={{
            background: "linear-gradient(180deg, rgba(250, 250, 250, 1) 50%, rgba(163, 38, 247, 0.1) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-center items-center gap-${isMobile ? "16" : "4"}`}
        style={{ marginTop: isMobile ? 100 : 20 }}
      >
        {/* Musafir Logo */}
        <Image
          src={MusafirLogo}
          alt="Musafir Logo"
          className={isMobile ? "h-5 w-[148px]" : "h-9 w-[271px]"}
        />

        {/* Powered By */}
        <div
          className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} items-center justify-center gap-1`}
        >
          <p
            className="font-medium"
            style={{
              fontSize: isMobile ? 12 : 23,
              color: "#002255", // Replace with your theme.palette.customColors.blue[26] hex
              fontFamily: "Poppins",
            }}
          >
            {t("powered_by")}
          </p>

          <Image
            src={PoweredYLogo}
            alt="Powered by Logo"
            className={`${isMobile ? "h-[13px] w-[34px]" : "h-[23px] w-[61px]"} object-contain`}
            style={{ marginTop: isMobile ? 0 : 10 }}
          />
        </div>
      </div>
    </div>
  );
});

export default FooterSection;
