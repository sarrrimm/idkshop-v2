import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react"; // Import React
import Navbar from "@/components/Navigation";
import { WishlistProvider } from "@/context/wishlistContext";
import Loading from "./loading";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IDK shop",
  description: "Buy and sell anything!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-teal-50">
        <Suspense fallback={<Loading />}>
          <WishlistProvider>
            <ScrollToTop />
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </WishlistProvider>
        </Suspense>
      </body>
    </html>
  );
}
