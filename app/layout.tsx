import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>
        <nav
          className={
            "pb-2 pt-2 mb-5 bg-blue-100 flex justify-center items-center scroll-m-20 text-2xl font-extrabold tracking-wider  text-gray-600"
          }
        >
          Nav bar
        </nav>
        {children}
      </body>
    </html>
  );
}
