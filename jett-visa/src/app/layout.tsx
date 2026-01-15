import I18nProvider from "@/components/I18nProvider";
import ReduxProvider from "@/components/ReduxProvider";
import "./globals.css";
import AppInit from "./providers/AppInit";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black">
        <ReduxProvider>
          <I18nProvider>
            <AppInit />
            {children}</I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
