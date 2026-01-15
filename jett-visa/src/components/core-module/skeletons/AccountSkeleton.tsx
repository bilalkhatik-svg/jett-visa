"use client";

import React from "react";
import { useTranslation } from "react-i18next";

export const SkeletonAccountHeader = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <div
      className="w-full h-[60px] flex items-center justify-between px-[30px] bg-white pt-5 pb-5"
      style={{ direction: i18n.dir() }}
    >
      {!isRTL && (
        <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
      )}

      <div className="flex-1 mx-2 h-[18px] bg-gray-200 animate-pulse rounded" />

      {isRTL && (
        <div
          className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"
          style={{ transform: "scaleX(-1)" }}
        />
      )}
    </div>
  );
};

export const SkeletonProfileHeader = () => (
  <div className="flex flex-col items-center py-6 px-4">
    <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />

    <div className="w-40 h-5 bg-gray-200 animate-pulse rounded mt-4" />

    <div className="flex items-center mt-2 gap-2">
      <div className="w-[140px] h-4 bg-gray-200 animate-pulse rounded" />
      <div className="w-4 h-4 rounded-full bg-gray-200 animate-pulse" />
    </div>

    <div className="w-[315px] h-[41px] bg-gray-200 animate-pulse rounded-lg mt-4" />
  </div>
);

export const SkeletonGuestBanner = () => (
  <div className="w-full h-20 bg-gray-200 animate-pulse rounded-none" />
);

export const SkeletonGuestButtons = () => (
  <div className="w-[315px] mx-auto mt-6 mb-6 flex justify-between">
    <div className="w-[150px] h-12 bg-gray-200 animate-pulse rounded-[14px]" />
    <div className="w-[150px] h-12 bg-gray-200 animate-pulse rounded-[14px]" />
  </div>
);


export const SkeletonNavCard = () => (
  <div className="w-[315px] mx-auto mt-4 rounded-2xl border border-[#EAEAEB] bg-white p-4">
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />

        <div className="ml-4 flex-1">
          <div className="w-40 h-3.5 bg-gray-200 animate-pulse rounded" />
          <div className="w-28 h-2.5 bg-gray-200 animate-pulse rounded mt-1" />
        </div>

        <div className="w-3 h-[18px] bg-gray-200 animate-pulse rounded" />
      </div>
    ))}
  </div>
);

export const SkeletonTermsPrivacy = () => (
  <div className="w-[315px] mx-auto mt-4">
    {[1, 2].map((i) => (
      <div
        key={i}
        className="flex justify-between items-center h-[50px] px-4"
      >
        <div className="w-[150px] h-3.5 bg-gray-200 animate-pulse rounded" />
        <div className="w-3 h-[18px] bg-gray-200 animate-pulse rounded" />
      </div>
    ))}

    <div className="w-[100px] h-3.5 bg-gray-200 animate-pulse rounded ml-4 mt-2" />
  </div>
);

export const SkeletonFooter = () => (
  <div className="w-full h-[215px] mt-8 flex flex-col justify-center items-center">
    <div className="w-[150px] h-[50px] bg-gray-200 animate-pulse rounded mb-4" />

    <div className="w-[100px] h-3.5 bg-gray-200 animate-pulse rounded mb-2" />
  </div>
);

const AccountSkeleton = {
  AccountHeader: SkeletonAccountHeader,
  ProfileHeader: SkeletonProfileHeader,
  GuestBanner: SkeletonGuestBanner,
  GuestButtons: SkeletonGuestButtons,
  NavCard: SkeletonNavCard,
  TermsPrivacy: SkeletonTermsPrivacy,
  Footer: SkeletonFooter,
};

export default AccountSkeleton;
