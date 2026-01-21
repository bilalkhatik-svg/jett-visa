"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import footerBackground from "@/assets/images/BackgroundCloudImg.png";
import PoweredYLogo from "@/assets/images/jettimage.webp";

interface FooterMetaProps {
  metadata: {
    appVersion: string;
    poweredBy: string;
    buildNumber: string;
    lastUpdated: string;
    orgName: string;
    logo: string;
  };
}

const FooterMeta: React.FC<FooterMetaProps> = ({ metadata }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // Convert StaticImageData to string
  const footerBackgroundSrc = typeof footerBackground === 'string' ? footerBackground : (footerBackground as any)?.src || footerBackground;
  const poweredByLogoSrc = typeof PoweredYLogo === 'string' ? PoweredYLogo : (PoweredYLogo as any)?.src || PoweredYLogo;
  const metadataLogoSrc = typeof metadata.logo === 'string' ? metadata.logo : (metadata.logo as any)?.src || metadata.logo;

  return (
    <div
      className="w-full h-[215px] mt-8 flex flex-col justify-center items-center bg-cover bg-no-repeat bg-bottom"
      style={{
        backgroundImage: `url(${footerBackgroundSrc})`,
        direction: i18n.dir(),
      }}
    >
      <img
        src={metadataLogoSrc}
        alt={metadata.orgName}
        className="w-[150px] h-auto mb-2"
      />

      <div
        className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <span className="font-poppins text-xs text-[#00366B] font-medium">
          {t("powered_by")}
        </span>

        <img
          src={poweredByLogoSrc}
          alt="Powered by Logo"
          className="h-[13px] w-[34px] object-contain"
        />
      </div>
    </div>
  );
};

export default FooterMeta;
