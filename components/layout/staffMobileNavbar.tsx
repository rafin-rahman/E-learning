import Image from "next/image";
import { SEO } from "@/lib/company";

export default function StaffMobileNavbar() {
  return (
    <div className={"h-20 bg-amber-300 flex items-center justify-center"}>
      <div className={"relative h-10 w-20"}>
        <Image
          className={"object-fill"}
          src={SEO.logo_light_no_text}
          alt={"logo"}
          fill
        />
      </div>
    </div>
  );
}
