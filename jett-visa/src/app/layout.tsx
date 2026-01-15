import I18nProvider from "@/components/I18nProvider";
import StoreProvider from "@/components/StoreProvider";
import "@/app/globals.css";
import type { Metadata } from "next";
// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black">
        <StoreProvider>
          <I18nProvider>{children}</I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
