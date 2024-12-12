import "@/css/global.css";
import "../css/swiper.css";
import "swiper/css";
import "swiper/css/pagination";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { Modal } from "@/components/ui/Modal";
import { AppContextProvider } from "@/contexts/app.contexts";
import { NextAuthProvider } from "@/utils/next-auth/next-auth-providers";
import ReactQueryProviders from "@/utils/react-query/react-query-provider";

const montserrat = Montserrat({
  subsets: ["vietnamese"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Đồng hồ",
  description: "Đồng hồ chính hãng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${montserrat.variable} font-montserrat`}>
        <div className="w-full h-full">
          <ReactQueryProviders>
            <AppContextProvider>
              <NextAuthProvider>
                <Header />
                {children}
                <Footer />
                <Modal />
              </NextAuthProvider>
            </AppContextProvider>
          </ReactQueryProviders>
        </div>
      </body>
    </html>
  );
}
