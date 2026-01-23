import type { AccountData } from "@/utils/types/account/Accounts";

export const authenticatedUserExample: AccountData = {
  isAuthenticated: true,
  user: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    nationality: "India",
    residency: "UAE",
    passportFlag: "https://flagcdn.com/w20/in.png",
    residencyFlag: "https://flagcdn.com/w20/ae.png",
    avatar: undefined,
    isVerified: true,
  },
  navigationLinks: {
    authenticated: [
      {
        id: "my-applications",
        label: "My Applications",
        label_key: "my_applications",
        icon: undefined,
        route: "/applications",
      },
      {
        id: "my-documents",
        label: "My Documents",
        label_key: "my_documents",
        icon: undefined,
        route: "/documents",
      },
      {
        id: "wishlist",
        label: "Wishlist",
        label_key: "wishlist",
        icon: undefined,
        route: "/wishlist",
      },
    ],
    universal: [
      {
        id: "nationality-residency",
        label: "Nationality & Residency",
        label_key: "nationality_residency",
        subtitle_key: "not_set",
        icon: undefined,
        route: "/nationality-residency",
      },
      {
        id: "language",
        label: "Language",
        label_key: "language",
        icon: undefined,
        route: "/language",
      },
      {
        id: "notifications",
        label: "Notifications",
        label_key: "notifications",
        icon: undefined,
        route: "/notifications",
      },
      {
        id: "get-help",
        label: "Get Help",
        label_key: "get_help",
        icon: undefined,
        route: "/get-help",
      },
      {
        id: "terms-conditions",
        label: "Terms & Conditions",
        label_key: "terms_conditions",
        icon: undefined,
        route: "/terms",
      },
      {
        id: "privacy-policy",
        label: "Privacy Policy",
        label_key: "privacy_policy",
        icon: undefined,
        route: "/privacy",
      },
    ],
  },
  applicationMetadata: {
    appVersion: "1.0.0",
    poweredBy: "Musafir",
    buildNumber: "2024.01.01",
    lastUpdated: "2024-01-01",
    orgName: "Musafir",
    logo: "",
  },
};

export const guestUserExample: AccountData = {
  isAuthenticated: false,
  navigationLinks: {
    guest: [
      {
        id: "sign-in",
        label: "Sign In",
        label_key: "sign_in",
        icon: undefined,
        route: "/sign-in",
      },
      {
        id: "sign-up",
        label: "Sign Up",
        label_key: "sign_up",
        icon: undefined,
        route: "/sign-up",
      },
    ],
    universal: [
      {
        id: "nationality-residency",
        label: "Nationality & Residency",
        label_key: "nationality_residency",
        subtitle_key: "not_set",
        icon: undefined,
        route: "/nationality-residency",
      },
      {
        id: "language",
        label: "Language",
        label_key: "language",
        icon: undefined,
        route: "/language",
      },
      {
        id: "notifications",
        label: "Notifications",
        label_key: "notifications",
        icon: undefined,
        route: "/notifications",
      },
      {
        id: "get-help",
        label: "Get Help",
        label_key: "get_help",
        icon: undefined,
        route: "/get-help",
      },
      {
        id: "terms-conditions",
        label: "Terms & Conditions",
        label_key: "terms_conditions",
        icon: undefined,
        route: "/terms",
      },
      {
        id: "privacy-policy",
        label: "Privacy Policy",
        label_key: "privacy_policy",
        icon: undefined,
        route: "/privacy",
      },
    ],
  },
  applicationMetadata: {
    appVersion: "1.0.0",
    poweredBy: "Musafir",
    buildNumber: "2024.01.01",
    lastUpdated: "2024-01-01",
    orgName: "Musafir",
    logo: "",
  },
};

