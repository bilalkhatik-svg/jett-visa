"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { NavLink } from "@/utility/types/accounts/Accounts";
import RightArrowIcon from "@/assets/images/icons/arrowrighticon.webp";
import { useTranslation } from "react-i18next";

interface NavListProps {
  links: NavLink[];
  card?: boolean;
  isGuestButtons?: boolean;
  user?: any;
}

const NavList: React.FC<NavListProps> = ({
  links,
  card = false,
  isGuestButtons = false,
  user,
}) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const isRTL = i18n.dir() === "rtl";

  const handleClick = (link: NavLink) => {
    if (link.onClick) {
      link.onClick();
      return;
    }

    if (link.action) {
      link.action();
      return;
    }

    if (link.route) {
      router.push(link.route);
    }
  };

  // Convert StaticImageData to string
  const rightArrowIconSrc = typeof RightArrowIcon === 'string' ? RightArrowIcon : (RightArrowIcon as any)?.src || RightArrowIcon;

  if (isGuestButtons) {
    return (
      <div className="w-[315px] mx-auto mt-6 mb-6 flex justify-between">
        <button
          onClick={() => router.push('/login')}
          className="w-[150px] h-12 rounded-[14px] bg-white border border-[#D3D6DA] flex items-center justify-center cursor-pointer shadow-[0px_3px_0px_#C3C6CA] hover:opacity-90 transition-opacity"
        >
          <span className="text-[#00366B] font-normal font-poppins text-sm">
            {t("register")}
          </span>
        </button>

        <button
          onClick={() => router.push('/login')}
          className="w-[150px] h-12 rounded-[14px] bg-[#0087FA] flex items-center justify-center cursor-pointer shadow-[0px_3px_0px_#0065C4] hover:opacity-90 transition-opacity"
        >
          <span className="text-white font-medium font-poppins text-sm">
            {t("login")}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${card ? "w-[315px] mx-auto rounded-2xl border border-[#EAEAEB] bg-white" : "w-full"} overflow-hidden`}
    >
      <ul className="list-none p-0 m-0">
        {links.map((link) => {
          const linkIconSrc = link.icon ? (typeof link.icon === 'string' ? link.icon : (link.icon as any)?.src || link.icon) : '';
          const displayLabel = link.label_key ? t(link.label_key) : link.label;
          
          return (
            <li
              key={link.id}
              onClick={() => handleClick(link)}
              className="h-[60px] px-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {link.icon && (
                <div className="w-10 h-10 rounded-full bg-[#EAF4FF] flex items-center justify-center mr-4 flex-shrink-0">
                  <img
                    src={linkIconSrc}
                    alt={link.label_key || link.label}
                    className="w-[22px] h-[22px] object-contain"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="font-poppins font-medium text-sm text-[#00366B]">
                  {displayLabel}
                </div>

                <div className="font-poppins text-[10px] font-normal text-[#777] mt-0.5 flex items-center gap-1">
                  {link.id === "nationality-residency" && (
                    <>
                      {user?.nationality && user?.passportFlag && (
                        <>
                          <img
                            src={typeof user.passportFlag === 'string' ? user.passportFlag : (user.passportFlag as any)?.src || user.passportFlag}
                            alt=""
                            className="w-[10px] h-[10px] rounded-full object-cover flex-shrink-0"
                          />
                          <span className="truncate">{user.nationality} {t("passport")}</span>

                          {user?.residency && user?.residencyFlag && (
                            <span className="mx-0.5">•</span>
                          )}
                        </>
                      )}

                      {user?.residency && user?.residencyFlag && (
                        <>
                          <img
                            src={typeof user.residencyFlag === 'string' ? user.residencyFlag : (user.residencyFlag as any)?.src || user.residencyFlag}
                            alt=""
                            className="w-[10px] h-[10px] rounded-full object-cover flex-shrink-0"
                          />
                          <span className="truncate">{user.residency} {t("resident")}</span>
                        </>
                      )}
                      
                      {!user?.nationality && !user?.residency && (
                        <span className="text-[#777]">{t("not_set") || "Not set"}</span>
                      )}
                    </>
                  )}
                  {link.subtitle_key &&
                    link.id !== "nationality-residency" && (
                      <span>{t(link.subtitle_key)}</span>
                    )}
                </div>
              </div>

              <img
                src={rightArrowIconSrc}
                alt="arrow"
                className="w-[7.07px] h-[11.68px] object-contain flex-shrink-0"
                style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavList;
