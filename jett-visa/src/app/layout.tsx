import type { Metadata, Viewport } from "next";
import ReduxProvider from "@/components/ReduxProvider";
import StructuredData from "@/components/StructuredData";
import "./globals.css";
import AppInit from "./providers/AppInit";

export const metadata: Metadata = {
  title: {
    default: "Jett Visa - Search, Apply & Get Your Visa Online",
    template: "%s | Jett Visa"
  },
  description: "Find and apply for visas to over 190+ countries. Fast, secure, and hassle-free visa services. Check visa requirements, processing times, and fees instantly.",
  keywords: ["visa", "travel visa", "visa application", "tourist visa", "business visa", "visa requirements", "online visa"],
  authors: [{ name: "Jett Visa" }],
  creator: "Jett Visa",
  publisher: "Jett Visa",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://jett-visa.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "ar-AE": "/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Jett Visa - Search, Apply & Get Your Visa Online",
    description: "Find and apply for visas to over 190+ countries. Fast, secure, and hassle-free visa services.",
    siteName: "Jett Visa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jett Visa - Search, Apply & Get Your Visa Online",
    description: "Find and apply for visas to over 190+ countries. Fast, secure, and hassle-free visa services.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-white text-black">
        <StructuredData />
        <ReduxProvider>
          <AppInit />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
