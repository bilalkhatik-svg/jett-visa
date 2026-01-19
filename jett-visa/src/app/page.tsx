import type { Metadata } from "next";
<<<<<<< HEAD
import HomeScreenClient from "@/components/HomeScreenClient";

export const metadata: Metadata = {
  title: "Search & Apply for Visa Online - Jett Visa",
  description: "Search for visa requirements to 190+ countries. Get instant visa approval, check processing times, and apply online. Trusted by thousands of travelers worldwide.",
  keywords: [
    "visa application",
    "online visa",
    "tourist visa",
    "business visa",
    "visa requirements",
    "travel visa",
    "visa processing",
    "e-visa",
    "visa on arrival"
  ],
  openGraph: {
    title: "Search & Apply for Visa Online - Jett Visa",
    description: "Search for visa requirements to 190+ countries. Get instant visa approval, check processing times, and apply online.",
    type: "website",
    url: "/",
  },
  alternates: {
    canonical: "/",
=======
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
>>>>>>> 0f1ee9dd767d1707b6f0517bfcaf4a5fc9484625
  },
};

export default function Home() {
<<<<<<< HEAD
  return (
    <>
      {/* SEO-optimized hidden content for crawlers */}
      <noscript>
        <div className="sr-only">
          <h1>Visa Application Services - Search & Apply Online</h1>
          <p>
            Find visa requirements for over 190 countries. Fast, secure, and hassle-free visa processing.
            Check eligibility, processing times, and fees instantly.
          </p>
          <h2>Popular Visa Destinations</h2>
          <ul>
            <li>USA Visa Application</li>
            <li>UK Visa Requirements</li>
            <li>Schengen Visa</li>
            <li>Canada Visitor Visa</li>
            <li>Australia Tourist Visa</li>
            <li>Dubai UAE Visa</li>
          </ul>
        </div>
      </noscript>
      
      <HomeScreenClient />
    </>
  );
=======
  return(<>
    <div>Home page</div>
    <HomeScreen />
  </>);
>>>>>>> 0f1ee9dd767d1707b6f0517bfcaf4a5fc9484625
}
