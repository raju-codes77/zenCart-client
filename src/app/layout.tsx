import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/query-client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ZenCart — Multi-Seller Marketplace",
  description: "Discover products on our multi-seller marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <Providers>
          <Navbar />
          <main className="flex-grow w-full relative">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
