import type { Metadata } from "next";
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
  },
};

export default function Home() {
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
}
