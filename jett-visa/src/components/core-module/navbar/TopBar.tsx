'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MuzafirLogo from "@/assets/images/MusafirLogo.png";
import arrowLeft from "@/assets/images/arrow-left.png";
import searchIcon from "@/assets/images/icons/search.png";
import menuIcon from "@/assets/images/icons/add-dashboard.webp";
import { useTranslation } from "@/utils/i18nStub";
import type { ICountry } from "@/utils/types/nationality-residency/Country";


interface TopBarProps {
  flagIcon?: string;
  nationality?: ICountry | null;
  residency?: ICountry | null;
  userInitial?: string;
  variant?: "home" | "inner";
  isLoggedIn?: boolean;
  onFlagClick?: () => void;
  onProfileClick?: () => void;
  onLogoClick?: () => void;
  onBackClick?: () => void;
  onSearchClick?: () => void;
  onMenuClick?: () => void;
  extraText?: string;
  isFixed?: boolean;
  showSearchIcon?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  userInitial = "H",
  variant = "home",
  flagIcon,
  nationality,
  residency,
  isLoggedIn = false,
  onFlagClick,
  onProfileClick,
  onLogoClick,
  onBackClick,
  onSearchClick,
  extraText,
  isFixed = false,
  showSearchIcon = false,
}) => {
  const { i18n } = useTranslation();
  const isRTL = typeof i18n.dir === 'function' ? i18n.dir() === "rtl" : i18n.language?.startsWith('ar');
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuClick = () => {
    router.push('/accounts');
  };

  const getImageSrc = (img: any) => typeof img === 'string' ? img : (img as any)?.src || img;

  const logoSrc = getImageSrc(MuzafirLogo);
  const arrowLeftSrc = getImageSrc(arrowLeft);
  const menuIconSrc = getImageSrc(menuIcon);

  const Logo = (
    <div className="flex justify-between gap-2 items-center">
      <img
        src={logoSrc}
        alt="Muzafir Logo"
        onClick={onLogoClick}
        className={`cursor-pointer select-none object-contain ${isMobile ? 'h-[20px] w-auto' : 'h-[28px] w-auto'}`}
      />
      {variant === "inner" && extraText && (
        <span
          className={`text-base font-semibold flex items-center leading-none bg-gradient-to-r from-[#D536F6] to-[#0AB1BA] bg-clip-text text-transparent ${isRTL ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {extraText}
        </span>
      )}
    </div>
  );

  const nationalityFlag = nationality?.flag ? getImageSrc(nationality.flag) : null;
  const nationalityName = nationality?.name || nationality?.nationality || '';
  const residencyFlag = residency?.flag ? getImageSrc(residency.flag) : null;
  const residencyName = residency?.name || residency?.residency || '';

  const FlagButton = !isMobile && isFixed && (nationality || residency) ? (
    <div className="hidden md:flex justify-center items-center gap-[10px]">
      {nationality && nationalityFlag && (
        <>
          <span className="text-[#707478] font-poppins text-[12px] font-normal leading-[16px]">Nationality</span>
          <button
            onClick={onFlagClick}
            aria-label="Update nationality"
            className="flex py-[6px] px-[10px] items-center gap-[6px] rounded-[100px] bg-[#EFEFEF] hover:bg-gray-200 transition-all"
          >
            <img src={nationalityFlag} alt="Nationality flag" className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[#707478] font-poppins text-[12px] font-normal leading-[16px]">{nationalityName}</span>
          </button>
        </>
      )}
      {nationality && residency && (
        <div className="w-[3px] h-[3px] aspect-square fill-[#00366B]">
          <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
            <circle cx="1.5" cy="1.5" r="1.5" fill="#00366B" />
          </svg>
        </div>
      )}
      {residency && residencyFlag && (
        <>
          <span className="text-[#707478] font-poppins text-[12px] font-normal leading-[16px]">Residency</span>
          <button
            onClick={onFlagClick}
            aria-label="Update residency"
            className="flex py-[6px] px-[10px] items-center gap-[6px] rounded-[100px] bg-[#EFEFEF] hover:bg-gray-200 transition-all"
          >
            <img src={residencyFlag} alt="Residency flag" className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[#707478] font-poppins text-[12px] font-normal leading-[16px]">{residencyName}</span>
          </button>
        </>
      )}
    </div>
  ) : null;

  const IconsBox = (
    <div className="flex flex-row items-center gap-4">

      {!isMobile ? (
        <div className="flex-grow" />
      ) : (
        <button
          onClick={onFlagClick}
          aria-label="Update nationality and residency"
          className="p-0 w-[32px] h-[32px] bg-white hover:bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 transition-all"
        >
          <img src={flagIcon} alt="Country flag" className="w-5 h-5 rounded-full object-cover" />
        </button>
      )}

      {isLoggedIn ? (
        <button
          onClick={onProfileClick}
          aria-label="User profile"
          className="ml-0 bg-white text-[#00366B] w-[32px] h-[32px] rounded-full text-base font-semibold relative hover:bg-gray-50 hover:text-[#00366B] border border-gray-200 transition-all"
        >
          {userInitial}
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#0066CC] rounded-full" />
        </button>
      ) : (
        <button
          onClick={handleMenuClick}
          aria-label="Menu"
          className={`p-0 ${isMobile ? 'w-[32px] h-[32px]' : 'w-[48px] h-[48px]'} hover:bg-gray-50 rounded-full bg-white flex items-center justify-center relative transition-all`}
        >
          <img
            src={menuIconSrc}
            alt="Menu"
            className={isMobile ? 'w-[20px] h-[20px]' : 'w-6 h-6'}
          />
          <span className={`absolute ${isMobile ? 'top-1 right-1 w-1.5 h-1.5' : 'top-1.5 right-1.5 w-2 h-2'} bg-[#0066CC] rounded-full`} />
        </button>
      )}
    </div>
  );

  return (
    <header
      className={`w-full transition-all duration-300 ${isFixed
        ? 'fixed top-3 z-50 rounded-b-3xl shadow-sm bg-white backdrop-blur-sm'
        : 'absolute top-0 z-50  bg-opacity-95'
        }`}
    >
      <nav className={`min-h-[72px] py-4 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-40 flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} max-w-[1920px] mx-auto`}>
        {variant === "inner" ? (
          <>
            {isRTL ? (
              <>
                <div className="flex-grow" />
                {Logo}
                <button
                  onClick={onBackClick}
                  aria-label="go back"
                  className="mr-5 text-gray-900 p-0"
                >
                  <img
                    src={arrowLeftSrc}
                    alt="Back"
                    className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`}
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onBackClick}
                  aria-label="go back"
                  className="mr-5 text-gray-900 p-0"
                >
                  <img
                    src={arrowLeftSrc}
                    alt="Back"
                    className={`w-6 h-6 ${isRTL ? 'rotate-180' : ''}`}
                  />
                </button>
                {Logo}
                <div className="flex-grow" />
              </>
            )}
          </>
        ) : (
          <>
            {isRTL ? (
              <>
                {IconsBox}
                {FlagButton && <div className="ml-[30px]">{FlagButton}</div>}
                <div className="flex-grow" />
                {Logo}
              </>
            ) : (
              <>
                {Logo}
                <div className="flex-grow" />
                {FlagButton && <div className="mr-[30px]">{FlagButton}</div>}
                {IconsBox}
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
};

export default React.memo(TopBar);
