import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";

export default function Home() {
  // check if the user is authenticated
  const userCookie = cookies().get("Authorization"); // Replace 'user-token' with your actual cookie name

  const isAuthenticated = !!userCookie;

  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Home page</h1>
      {!isAuthenticated && (
        <Button asChild variant={"destructive"} className={"mr-4"}>
          <Link href={"signup"}>Sign up</Link>
        </Button>
      )}
      {!isAuthenticated && (
        <Button asChild variant={"destructive"} className={"mr-4"}>
          <Link href={"signin"}>Sign in</Link>
        </Button>
      )}
      {isAuthenticated && (
        <Button asChild variant={"ghost"} className={"mr-4"}>
          <Link href={"dashboard"}>{"< "}Dashboard</Link>
        </Button>
      )}{" "}
      {isAuthenticated && (
        <Button asChild variant={"destructive"} className={"mr-4"}>
          <Link href={"logout"}>Logout</Link>
        </Button>
      )}
    </div>
  );
}
