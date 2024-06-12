import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";

import Homepage from "@/components/homepage/homepage";
import PublicNavbar from "@/components/layout/publicNavbar";

export default function Home() {
  return (
    <div>
      <PublicNavbar />
      <Homepage />;
    </div>
  );
}
