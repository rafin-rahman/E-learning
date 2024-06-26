"use client";
import Link from "next/link";
import { useState } from "react";

export default function Menu({
  menuOptions,
}: {
  menuOptions: { name: string; link: string }[];
}) {
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");

  return (
    <ul className={"flex gap-6 "}>
      {menuOptions.map((item) => (
        <li
          key={item.name}
          className={`${
            activeMenu === item.name ? "" : "border-b-transparent"
          } hover:border-b-gray-400  border-b-2  p-2 `}
        >
          <Link
            href={item.link}
            onClick={() => {
              setActiveMenu(item.name);
            }}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
