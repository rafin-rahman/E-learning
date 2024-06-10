import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";

export default function Homepage() {
  // check if the user is authenticated
  const userCookie = cookies().get("Authorization"); // Replace 'user-token' with your actual cookie name

  const isAuthenticated = !!userCookie;
  return (
    <div
      className={
        "container text-center  flex flex-col justify-center items-center min-h-screen "
      }
    >
      <div className={"w-full flex justify-center"}>
        <Image
          src={"logo/Logo-LightBG.svg"}
          alt={"logo"}
          width={200}
          height={200}
        />
      </div>
      <p className={"mt-10"}>Learn anywhere, anytime</p>
      {!isAuthenticated && (
        <Button
          asChild
          variant={"destructive"}
          className={"m-10 sm:w-1/2 w-full"}
        >
          <Link href={"signin"}>Sign in</Link>
        </Button>
      )}
      {!isAuthenticated && (
        <Button asChild variant={"default"} className={"m-10 sm:w-1/2 w-full"}>
          <Link href={"signup"}>Register an account as a STUDENT</Link>
        </Button>
      )}

      {isAuthenticated && (
        <Button asChild variant={"ghost"} className={"m-10 w-72 mx-auto"}>
          <Link href={"dashboard"}>
            {"< "}Dashboard <span className={"font-light"}>[staff only]</span>
          </Link>
        </Button>
      )}
      {isAuthenticated && (
        <Button asChild variant={"ghost"} className={"m-10 sm:w-1/2 w-full"}>
          <Link href={"studentSpace"}>
            {"< "}Student Space
            <span className={"font-light"}>[Student only]</span>
          </Link>
        </Button>
      )}

      {isAuthenticated && (
        <Button
          asChild
          variant={"destructive"}
          className={"m-10 sm:w-1/2 w-full"}
        >
          <Link href={"logout"}>Logout</Link>
        </Button>
      )}
    </div>
  );
}
