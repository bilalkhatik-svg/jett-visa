import type { AccountData, NavLink } from "@/utility/types/accounts/Accounts";
import nationalityResidencyIcon from "@/assets/images/icons/indflagicon.webp";
import languageIcon from "@/assets/images/icons/languageicon.webp";
import notificationIcon from "@/assets/images/icons/notificationicon.webp";
import getHelpIcon from "@/assets/images/icons/contacticon.webp";
import myApplicationsIcon from "@/assets/images/icons/documenticon.webp";
import myDocumentsIcon from "@/assets/images/icons/documenticon.webp";
import wishlistIcon from "@/assets/images/icons/wishlisticon.webp";

export const authenticatedUserExample: AccountData = {
  isAuthenticated: true,
  user: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    nationality: "",
    residency: "",
    passportFlag: "",
    residencyFlag: "",
    isVerified: true,
  },
  navigationLinks: {
    authenticated: [
      { id: "nationality-residency", label: "Nationality & Residency", label_key: "nationality_residency", route: "/nationality-residency", icon: nationalityResidencyIcon as any },
      { id: "my-applications", label: "My Applications", label_key: "my_applications", route: "/applications", icon: myApplicationsIcon as any },
      { id: "my-documents", label: "My Documents", label_key: "my_documents", route: "/documents", icon: myDocumentsIcon as any },
      { id: "wishlist", label: "Wishlist", label_key: "wishlist", route: "/wishlist", icon: wishlistIcon as any },
    ],
    universal: [
      { id: "nationality-residency", label: "Nationality & Residency", label_key: "nationality_residency", route: "/nationality-residency", icon: nationalityResidencyIcon as any },
      { id: "language", label: "Language", label_key: "language", subtitle_key: "subtitle_language", route: "/language", icon: languageIcon as any },
      { id: "notifications", label: "Notifications", label_key: "notifications", subtitle_key: "subtitle_notifications", route: "/notifications", icon: notificationIcon as any },
      { id: "get-help", label: "Get Help", label_key: "get_help", subtitle_key: "subtitle_get_help", route: "/get-help", icon: getHelpIcon as any },
      { id: "terms-conditions", label: "Terms & Conditions", label_key: "terms_conditions", route: "/terms" },
      { id: "privacy-policy", label: "Privacy Policy", label_key: "privacy_policy", route: "/privacy" },
    ],
  },
  applicationMetadata: {
    appVersion: "1.0.0",
    poweredBy: "Jett",
    buildNumber: "100",
    lastUpdated: "2024-01-01",
    orgName: "Musafir",
    logo: "/assets/images/MusafirLogo.png",
  },
};

export const guestUserExample: AccountData = {
  isAuthenticated: false,
  navigationLinks: {
    guest: [
      { id: "login", label: "Login", route: "/login" },
      { id: "signup", label: "Sign Up", route: "/signup" },
    ],
    universal: [
      { id: "nationality-residency", label: "Nationality & Residency", label_key: "nationality_residency", route: "/nationality-residency", icon: nationalityResidencyIcon as any },
      { id: "language", label: "Language", label_key: "language", subtitle_key: "subtitle_language", route: "/language", icon: languageIcon as any },
      { id: "notifications", label: "Notifications", label_key: "notifications", subtitle_key: "subtitle_notifications", route: "/notifications", icon: notificationIcon as any },
      { id: "get-help", label: "Get Help", label_key: "get_help", subtitle_key: "subtitle_get_help", route: "/get-help", icon: getHelpIcon as any },
      { id: "terms-conditions", label: "Terms & Conditions", label_key: "terms_conditions", route: "/terms" },
      { id: "privacy-policy", label: "Privacy Policy", label_key: "privacy_policy", route: "/privacy" },
    ],
  },
  applicationMetadata: {
    appVersion: "1.0.0",
    poweredBy: "Jett",
    buildNumber: "100",
    lastUpdated: "2024-01-01",
    orgName: "Musafir",
    logo: "/assets/images/MusafirLogo.png",
  },
};

