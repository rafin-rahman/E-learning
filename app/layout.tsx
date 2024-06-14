import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/font";
import { Toaster } from "@/components/ui/toaster";
import { SEO } from "@/lib/company";
import Providers from "@/app/providers";
import React from "react";

export const metadata: Metadata = {
  title: SEO.companyName,
  description: SEO.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div
          className={
            "flex flex-wrap h-12 sm:h-6 justify-center bg-gradient-to-r from-amber-300 to-red-400 items-center text-center opacity-50 text-xs"
          }
        >
          <p>
            This is a demo/test application for presentation purposes only and
            is not part of our official business operations.
          </p>
        </div>
        <Providers>{children}</Providers>
        <div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
