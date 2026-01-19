import type { Metadata } from "next";
import GetHelpScreen from "@/components-library/account/GetHelpScreen";

// Force dynamic rendering for Redux/i18next
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Get Help - Customer Support",
  description: "Need help with your visa application? Contact our support team or browse our help resources.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function GetHelp() {
  return <GetHelpScreen />;
}

