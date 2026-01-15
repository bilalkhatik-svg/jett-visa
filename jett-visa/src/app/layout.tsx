import I18nProvider from "@/components/I18nProvider";
<<<<<<< HEAD
import ReduxProvider from "@/components/ReduxProvider";
import "./globals.css";
import AppInit from "./providers/AppInit";
=======
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
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black">
<<<<<<< HEAD
        <ReduxProvider>
          <I18nProvider>
            <AppInit />
            {children}</I18nProvider>
        </ReduxProvider>
=======
        <StoreProvider>
          <I18nProvider>{children}</I18nProvider>
        </StoreProvider>
>>>>>>> e3f38b1df29a584bee40332dad12e59eae138b54
      </body>
    </html>
  );
}
