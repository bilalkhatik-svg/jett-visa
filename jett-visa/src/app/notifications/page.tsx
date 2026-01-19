import type { Metadata } from "next";
import NotificationSettingsPage from "@/components-library/notifications/NotificationSettingsPage";

// Force dynamic rendering for Redux/i18next
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Notification Settings - Stay Updated",
  description: "Manage your notification preferences and stay updated on your visa application status.",
  robots: {
    index: false, // Usually notification settings pages shouldn't be indexed
    follow: true,
  },
};

export default function Notifications() {
  return <NotificationSettingsPage />;
}

