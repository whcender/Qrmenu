import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: "Arlan Medya | QR Menü - Demo",
  description: "Arlan Medya QR Menü Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="md:w-[50%] lg:w-[30%] m-auto max-md:w-[90%] font-sans flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" theme="dark" autoClose={3000}/>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
