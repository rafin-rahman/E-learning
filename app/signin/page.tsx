import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInForm from "@/components/signInForm/SignInForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function signin() {
  // if the user is already logged in, redirect to the home page
  if (cookies().get("Authorization")) {
    redirect("/");
  }

  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Sign in page</h1>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>

      <SignInForm />
      <p>
        Don't have an account? <Link href={"signup"}>Sign Up</Link>
      </p>
    </div>
  );
}
