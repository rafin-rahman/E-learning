"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import logoutAction from "@/app/logout/logoutAction";

export default function SomethingWrong() {
  async function logoutUser() {
    await logoutAction({});
  }
  //TODO if no cookies, redirect to home page '/'
  // currently, even if user not logged in, this page will be shown

  return (
    <div className={"container mt-20"}>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>
      <div className={"flex mx-auto flex-col text-center pt-20"}>
        <h1 className={"text-4xl mb-10 "}>
          <span className={"block"}>Ops!</span> There ware major database
          changes, you must logout and login again
        </h1>
        <Button
          variant={"destructive"}
          className={"mr-4"}
          onClick={() => {
            logoutUser();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
