import type { Metadata } from "next";
import AccountScreen from "@/components-library/account/AccountScreen";

// Force dynamic rendering for Redux/i18next
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "My Account - Manage Your Visa Applications",
  description: "Manage your visa applications, view your travel history, and update your profile settings.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccountsPage() {
  return <AccountScreen />;
}

