import Image from "next/image";
import React from "react";

import Menu from "@/components/business/companyEmployee/dashboard/menu";

export default function CompanyEmployee({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const menu = [
    {
      name: "Dashboard",
      link: "dashboard",
    },
    {
      name: "Learning",
      link: "learning",
    },
    {
      name: "Awards",
      link: "awards",
    },
  ];

  return (
    <div>
      <nav className={" w-full   py-8 mb-10 shadow "}>
        <div className={"container flex flex-wrap justify-between"}>
          {/* logo & Menu */}
          <div>
            <Menu menuOptions={menu} />
          </div>
          {/* Account icon */}
          <div>
            <Image
              src={"/logo/Logo-LightBG.svg"}
              alt="logo"
              width={40}
              height={40}
            />
          </div>
        </div>
      </nav>
      <div className={"min-h-[600px] "}> {children}</div>
      <footer className={"bg-gradient-to-r from-amber-100   to-red-200 py-4"}>
        <div className={"container"}>
          <div className={"text-center text-sm text-gray-600 mb-2"}>
            <ul className={"flex justify-center gap-6"}>
              <li>Terms & conditions</li>
              <li>Help & Support</li>
            </ul>
          </div>
          <div>
            <p className={"text-center text-sm text-gray-600"}>
              &copy; 2024 Online Qualifications Ltd - Training centre
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
