import type { Metadata } from "next";
import InspireMe from "./InspireMe";

export const metadata: Metadata = {
  title: "Inspire Me - AI Travel Assistant",
  description: "Let our AI assistant inspire your next visa destination. Get personalized travel recommendations based on your preferences and requirements.",
  keywords: ["travel inspiration", "AI travel assistant", "visa recommendations", "destination discovery", "travel planning", "visa destinations"],
  openGraph: {
    title: "Inspire Me - AI Travel Assistant | Jett Visa",
    description: "Let our AI assistant inspire your next visa destination. Get personalized travel recommendations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspire Me - AI Travel Assistant | Jett Visa",
    description: "Let our AI assistant inspire your next visa destination. Get personalized travel recommendations.",
  },
};

// Force dynamic rendering for Redux/i18next
export const dynamic = 'force-dynamic';

export default function InspireMePage() {
  return <InspireMe />;
}

