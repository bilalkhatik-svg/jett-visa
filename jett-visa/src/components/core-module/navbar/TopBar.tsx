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
    <div className="flex justify-between gap-1 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[180px]">
      <img
        src={logoSrc}
        alt="Muzafir Logo"
        onClick={onLogoClick}
        className={`cursor-pointer select-none ${isMobile ? 'h-[18px] w-[134px]' : 'h-[25px] w-[183px]'}`}
      />
      {variant === "inner" && extraText && (
        <span
          className={`text-base font-semibold flex items-center leading-none mt-1 bg-gradient-to-r from-[#D536F6] to-[#0AB1BA] bg-clip-text text-transparent ${isRTL ? '[transform:rotateY(180deg)]' : ''}`}
        >
          {extraText}
        </span>
      )}
    </div>
  );

  const IconsBox = (
    <div className="flex flex-row items-center gap-3 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-[180px]">
      {!isMobile ? (
        <div className="flex-grow" />
      ) : (
        <button
          onClick={onFlagClick}
          aria-label="Update nationality and residency"
          className="p-0 w-[30px] h-[30px] bg-white hover:bg-white rounded-full flex items-center justify-center"
        >
          <img src={flagIcon} alt="Country flag" className="w-5 h-5 rounded-full" />
        </button>
      )}

      {isLoggedIn ? (
        <button
          onClick={onProfileClick}
          aria-label="User profile"
          className="ml-0 bg-white text-[#0066CC] w-[30px] h-[30px] rounded-full text-base font-semibold relative hover:bg-white hover:text-[#0066CC]"
        >
          {userInitial}
          <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#0066CC] rounded-full" />
        </button>
      ) : (
        <button
          onClick={handleMenuClick}
          aria-label="Menu"
          className={`p-0 ${isMobile ? 'w-[30px] h-[30px]' : 'w-[46px] h-[46px]'} hover:bg-[#F5F5F5] flex items-center justify-center relative`}
        >
          <img 
            src={menuIconSrc} 
            alt="Menu" 
            className={isMobile ? 'w-[18px] h-[18px]' : 'w-6 h-6'} 
          />
          <span className={`absolute top-0.5 ${isMobile ? 'right-0.5 w-1.5 h-1.5' : 'right-1 w-2 h-2'} bg-[#0066CC] rounded-full`} />
        </button>
      )}
    </div>
  );

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isFixed 
          ? 'fixed top-0 z-50 rounded-b-[20px] border-b border-[#1976d2] shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-transparent' 
          : 'absolute top-0 z-50 bg-transparent'
      }`}
      style={isFixed ? {
        background: 'linear-gradient(200deg, #e7c0eeff, #bfe1fc 100%), linear-gradient(to top right, #dbd68fff 0%, transparent 50%)',
        backgroundBlendMode: 'screen',
      } : undefined}
    >
      <nav className={`min-h-[60px] py-3 px-4 sm:py-4 sm:px-6 md:py-5 md:px-[30px] flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
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
