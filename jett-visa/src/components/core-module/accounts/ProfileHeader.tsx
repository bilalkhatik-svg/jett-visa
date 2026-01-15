"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/utility/types/accounts/Accounts';
import { useTranslation } from 'react-i18next';
import CheckCircle from '@/assets/images/icons/checkcircle.webp';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // Convert StaticImageData to string
  const checkCircleSrc = typeof CheckCircle === 'string' ? CheckCircle : (CheckCircle as any)?.src || CheckCircle;

  // Get user initials from fullName
  const getInitials = (name: string): string => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = (user as any).initials || getInitials(user.fullName);

  return (
    <div
      className="flex flex-col items-center py-6 px-4"
      style={{ direction: i18n.dir() }}
    >
      <div
        className="w-24 h-24 rounded-full bg-[#E6F2FF] text-[#0087FA] flex items-center justify-center text-[32px] font-semibold font-poppins"
      >
        {initials}
      </div>

      <h2 className="font-poppins font-semibold text-[#00366B] text-lg text-center mt-2">
        {user.fullName}
      </h2>

      <div
        className={`flex items-center gap-1 mb-4 ${i18n.dir() === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <span className="font-poppins font-normal text-[#00366B] text-sm">
          {user.email}
        </span>

        {(user as any).emailVerified && (
          <div className="relative group">
            <img
              src={checkCircleSrc}
              alt="Email Verified"
              className="w-[15px] h-[15px] object-contain"
            />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {t("email_verified")}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => router.push('/edit-profile')}
        className="w-[315px] h-[41px] py-2.5 px-4 gap-2 border border-[#EAEAEB] bg-white text-[#0087FA] font-medium font-poppins text-sm hover:bg-gray-50 transition-colors rounded-md"
        style={{ direction: i18n.dir() }}
      >
        {t("edit_profile")}
      </button>
    </div>
  );
};

export default ProfileHeader;
