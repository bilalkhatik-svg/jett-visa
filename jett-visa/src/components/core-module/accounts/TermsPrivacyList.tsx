"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { NavLink } from "@/utility/types/accounts/Accounts";
import RightArrowIcon from "@/assets/images/icons/arrowrighticon.webp";
import { useTranslation } from "react-i18next";

interface TermsPrivacyProps {
  links: NavLink[];
  appVersion?: string;
}

const TermsPrivacyList: React.FC<TermsPrivacyProps> = ({ links, appVersion }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const isRTL = i18n.dir() === "rtl";

  // Convert StaticImageData to string
  const rightArrowIconSrc = typeof RightArrowIcon === 'string' ? RightArrowIcon : (RightArrowIcon as any)?.src || RightArrowIcon;

  const handleClick = (link: NavLink) => {
    if (link.route) {
      router.push(link.route);
    }
  };

  return (
    <div className="w-[315px] mx-auto mt-4">
      <ul className="list-none p-0 m-0">
        {links.map((link) => {
          const displayLabel = link.label_key ? t(link.label_key) : link.label;
          
          return (
            <li
              key={link.id}
              onClick={() => handleClick(link)}
              className="h-[50px] px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <span className="ml-0.5 font-poppins text-[15px] font-medium text-[#00366B]">
                {displayLabel}
              </span>

              <img
                src={rightArrowIconSrc}
                alt="arrow"
                className="w-[7.07px] h-[11.68px] object-contain flex-shrink-0"
                style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
              />
            </li>
          );
        })}

        {appVersion && (
          <li className="font-poppins text-xs font-medium text-[#9D9FA3] mt-2 ml-4 list-none">
            {t('app_version')} {appVersion}
          </li>
        )}
      </ul>
    </div>
  );
};

export default TermsPrivacyList;
