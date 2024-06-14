import Image from "next/image";
import { SEO, socials } from "@/lib/company";

export default function Footer() {
  return (
    <div className={"h-28 bg-white"}>
      <div className={"container flex justify-between h-full items-center"}>
        <div>
          <ul className={"flex gap-4"}>
            <li>
              <div className={"relative h-6 w-6"}>
                <Image
                  src={socials.facebook}
                  alt={"logo"}
                  className={"object-fill"}
                  fill
                />
              </div>
            </li>
            <li>
              <div className={"relative h-6 w-6"}>
                <Image
                  src={socials.instagram}
                  alt={"logo"}
                  className={"object-fill"}
                  fill
                />
              </div>
            </li>
            <li>
              <div className={"relative h-6 w-6"}>
                <Image
                  src={socials.linkedin}
                  alt={"logo"}
                  className={"object-fill"}
                  fill
                />
              </div>
            </li>
            <li>
              <div className={"relative h-6 w-6"}>
                <Image
                  src={socials.web}
                  alt={"logo"}
                  className={"object-fill"}
                  fill
                />
              </div>
            </li>
          </ul>
        </div>
        <div className={"relative h-14 w-14"}>
          <Image
            src={SEO.logo_light_no_text}
            alt={"logo"}
            className={"object-fill"}
            fill
          />
        </div>
      </div>
    </div>
  );
}
