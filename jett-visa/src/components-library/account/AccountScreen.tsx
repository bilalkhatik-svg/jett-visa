"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/core-module/custom-header/AppHeader";
import ProfileHeader from "@/components/core-module/accounts/ProfileHeader";
import NavList from "@/components/core-module/accounts/NavList";
import TermsPrivacyList from "@/components/core-module/accounts/TermsPrivacyList";
import FooterMeta from "@/components/core-module/accounts/FooterMeta";
import GuestHeaderBanner from "@/components/core-module/accounts/GuestHeaderBanner";
import AccountSkeleton from "@/components/core-module/skeletons/AccountSkeleton";
// import {
//   authenticatedUserExample,
//   guestUserExample,
// } from "@/utility/mock/accountsMockData";
import type { AccountMode, NavLink } from "@/utility/types/accounts/Accounts";
import { useAppSelector } from "@/store/hooks";
import FooterSection from "../home-screen/footer-section/FooterSection";

const AccountScreen: React.FC = () => {
  const [mode, setMode] = useState<AccountMode>("guest");
  const [loading, setLoading] = useState(true);
  const { nationality, residency } = useAppSelector(
    (state) => state.locationSlice
  );

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [mode]);

  // const data =
  //   mode === "authenticated" ? authenticatedUserExample : guestUserExample;

  const { isAuthenticated, user, navigationLinks, applicationMetadata } = data;

  // Static fallback data for India
  const staticNationality = {
    name: "India",
    flag: "https://flagcdn.com/w20/in.png",
  };

  // Prepare nationality/residency data for display
  const nationalityData = {
    nationality: (nationality as any)?.name || staticNationality.name,
    residency: (residency as any)?.name || "",
    passportFlag: (nationality as any)?.flag || staticNationality.flag,
    residencyFlag: (residency as any)?.flag || "",
  };

  // Update user object if it exists (authenticated users)
  if (user) {
    user.nationality = nationalityData.nationality;
    user.residency = nationalityData.residency;
    user.passportFlag = nationalityData.passportFlag;
    user.residencyFlag = nationalityData.residencyFlag;
  }

  // Create a user-like object for guest users to pass nationality/residency data
  const guestUserData = isAuthenticated ? user : nationalityData;

  // Order for authenticated users
  const AUTHENTICATED_ORDER = [
    "nationality-residency",
    "my-applications",
    "my-documents",
    "wishlist",
    "language",
    "notifications",
    "get-help",
  ];

  // Order for guest users (nationality-residency should be above language)
  const GUEST_ORDER = [
    "nationality-residency",
    "language",
    "notifications",
    "get-help",
  ];

  const ORDER = isAuthenticated ? AUTHENTICATED_ORDER : GUEST_ORDER;

  const linkMap: Record<string, NavLink> = {};

  if (isAuthenticated && navigationLinks.authenticated) {
    navigationLinks.authenticated.forEach((l: NavLink) => (linkMap[l.id] = l));
  }

  navigationLinks.universal.forEach((l: NavLink) => (linkMap[l.id] = l));

  const mainLinks: NavLink[] = ORDER.map((id) => linkMap[id]).filter(
    (item): item is NavLink => Boolean(item)
  );

  const termsLinks: NavLink[] = navigationLinks.universal.filter((l: NavLink) =>
    ["terms-conditions", "privacy-policy"].includes(l.id)
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {loading ? <AccountSkeleton /> : <AppHeader titleKey="account" />}

      <div className="p-4 text-center bg-[#FFFBEA] border-b border-[#FFE58F]">
        <button
          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          onClick={() => {
            setLoading(true);
            setMode(mode === "guest" ? "authenticated" : "guest");
          }}
        >
          Switch to {mode === "guest" ? "Authenticated" : "Guest"} Mode
        </button>
      </div>

      <div className="flex-1 max-w-sm mx-auto w-full px-0">
        {isAuthenticated
          ? loading
            ? <AccountSkeleton />
            : user && <ProfileHeader user={user} />
          : null}

        {!isAuthenticated
          ? loading
            ? <AccountSkeleton />
            : <GuestHeaderBanner />
          : null}

        {!isAuthenticated
          ? loading
            ? <AccountSkeleton />
            : navigationLinks.guest && (
              <NavList links={navigationLinks.guest} isGuestButtons />
            )
          : null}

        {loading ? (
          <AccountSkeleton />
        ) : (
          <NavList links={mainLinks} card user={guestUserData} />
        )}

        {loading ? (
          <AccountSkeleton />
        ) : (
          <TermsPrivacyList
            links={termsLinks}
            appVersion={applicationMetadata.appVersion}
          />
        )}

        {loading ? (
          <AccountSkeleton />
        ) : (
          // <FooterMeta metadata={applicationMetadata} />
          <FooterSection/>
        )}
      </div>
    </div>
  );
};

export default AccountScreen;
