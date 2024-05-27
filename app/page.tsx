import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";

export default function Home() {
  // check if the user is authenticated
  const userCookie = cookies().get("Authorization"); // Replace 'user-token' with your actual cookie name

  const isAuthenticated = !!userCookie;

  return (
    <div className={"container   flex flex-col justify-center min-h-screen "}>
      <h1 className={"text-4xl font-bold mb-10 text-center"}>Home page</h1>
      {!isAuthenticated && (
        <Button asChild variant={"destructive"} className={"m-10 mx-80"}>
          <Link href={"signup"}>Sign up</Link>
        </Button>
      )}
      {!isAuthenticated && (
        <Button asChild variant={"destructive"} className={"m-10 mx-80"}>
          <Link href={"signin"}>Sign in</Link>
        </Button>
      )}
      {isAuthenticated && (
        <Button asChild variant={"ghost"} className={"m-10 mx-80"}>
          <Link href={"dashboard"}>{"< "}Dashboard</Link>
        </Button>
      )}{" "}
      {isAuthenticated && (
        <Button asChild variant={"destructive"} className={"m-10 mx-80"}>
          <Link href={"logout"}>Logout</Link>
        </Button>
      )}
    </div>
  );
}
