'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MuzafirLogo from "@/assets/images/MusafirLogo.png";
import arrowLeft from "@/assets/images/arrow-left.png";
import searchIcon from "@/assets/images/icons/search.png";
import menuIcon from "@/assets/images/icons/add-dashboard.webp";
import { useTranslation } from "react-i18next";


interface TopBarProps {
  flagIcon?: string;
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
  const isRTL = i18n.dir() === "rtl";
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
          className="ml-0 bg-white text-[#0066CC] w-[32px] h-[32px] rounded-full text-base font-semibold relative hover:bg-gray-50 hover:text-[#0066CC] border border-gray-200 transition-all"
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
      className={`w-full transition-all duration-300 ${
        isFixed 
          ? 'fixed top-0 z-50 rounded-b-3xl shadow-sm bg-white backdrop-blur-sm' 
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
                <div className="flex-grow" />
                {Logo}
              </>
            ) : (
              <>
                {Logo}
                <div className="flex-grow" />
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
