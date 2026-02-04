import type { Metadata, Viewport } from "next";
import ReduxProvider from "@/components/ReduxProvider";
import StructuredData from "@/components/StructuredData";
import "./globals.css";
import AppInit from "./providers/AppInit";

export const metadata: Metadata = {
  title: {
    default: "Jett Visa - Easy Visa Application & Processing",
    template: "%s | Jett Visa"
  },
  description: "Get your visa processed quickly and easily with Jett Visa. We provide visa services for multiple destinations worldwide.",
  keywords: ["visa", "visa application", "travel visa", "tourist visa", "visa processing", "international travel"],
  authors: [{ name: "Jett Visa" }],
  creator: "Jett Visa",
  publisher: "Jett Visa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://jettvisa.com'),
  openGraph: {
    title: "Jett Visa - Easy Visa Application & Processing",
    description: "Get your visa processed quickly and easily with Jett Visa.",
    type: "website",
    locale: "en_US",
    siteName: "Jett Visa",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jett Visa - Easy Visa Application & Processing",
    description: "Get your visa processed quickly and easily with Jett Visa.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
