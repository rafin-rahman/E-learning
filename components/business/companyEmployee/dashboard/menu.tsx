"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Menu({
  menuOptions,
}: {
  menuOptions: { name: string; link: string }[];
}) {
  const currentUrl = usePathname();

  return (
    <ul className={"flex gap-6 "}>
      {menuOptions.map((item) => (
        <li
          key={item.name}
          className={`${
            currentUrl.includes(item.name.toLowerCase())
              ? ""
              : "border-b-transparent"
          } hover:border-b-gray-400  border-b-2  p-2 `}
        >
          <Link href={item.link}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}
