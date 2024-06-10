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
        <Providers>{children}</Providers>
        <div className={""}>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
