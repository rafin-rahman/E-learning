"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logoutAction from "@/app/logout/logoutAction";
import Image from "next/image";
import { SEO } from "@/lib/company";

export default function logout() {
  async function logoutUser() {
    await logoutAction({});
  }

  return (
    <div
      className={"container h-screen flex flex-col items-center justify-center"}
    >
      <div className={"relative h-32 w-full mb-16"}>
        <Image
          src={SEO.logo_light}
          className={"object-fill"}
          fill
          alt={"logo"}
        />
      </div>
      <Button asChild variant={"outline"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>
      {/*<div className={"flex mx-auto flex-col text-center pt-20"}>*/}
      <h1 className={"text-4xl my-10 text-center "}>
        Are you sure you want to logout?
      </h1>
      <Button
        variant={"destructive"}
        className={"m-10 sm:w-1/2 w-full"}
        onClick={() => {
          logoutUser();
        }}
      >
        Yes, log me out
      </Button>

      {/*</div>*/}
    </div>
  );
}
