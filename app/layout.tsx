import type { Metadata } from "next";
import "./globals.css";
import { roboto_mono } from "@/lib/font";

export const metadata: Metadata = {
  title: "NextJS RBAC Auth",
  description: "template app for NextJS with RBAC auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto_mono.className}>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
}
