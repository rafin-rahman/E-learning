import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";

export default function Home() {
  function logout() {
    // remove the cookies
    cookies().delete("Authorization");
  }
  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Home page</h1>
      <Button asChild variant={"destructive"} className={"mr-4"}>
        <Link href={"signup"}>Sign up</Link>
      </Button>
      <Button asChild variant={"destructive"}>
        <Link href={"signin"}>Sign in</Link>
      </Button>
      {/*logout button, basically remove the cookies*/}
      <Button asChild variant={"destructive"}>
        <Link href={"/api/logout"}>Logout</Link>
      </Button>
    </div>
  );
}
