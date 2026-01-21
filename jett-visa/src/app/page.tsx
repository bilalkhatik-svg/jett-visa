import type { Metadata } from "next";
import HomeScreen from "@/components-library/home-screen/HomeScreen";

// Force dynamic rendering to avoid static generation errors with Redux/i18next
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Home - Find Your Perfect Visa Destination",
  description: "Discover visa requirements and apply for visas to destinations worldwide. Fast, easy, and reliable visa processing services with Jett Visa.",
  keywords: ["visa application", "travel visa", "tourist visa", "visa requirements", "international travel", "visa destinations"],
  openGraph: {
    title: "Jett Visa - Find Your Perfect Visa Destination",
    description: "Discover visa requirements and apply for visas to destinations worldwide.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jett Visa - Find Your Perfect Visa Destination",
    description: "Discover visa requirements and apply for visas to destinations worldwide.",
  },
};

export default function Home() {
  return(<>
    <HomeScreen />
  </>);
}
