import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInForm from "@/components/signInForm/SignInForm";

export default function signin() {
  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Sign in page</h1>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}>Back to Home page</Link>
      </Button>

      <SignInForm />
      <p>
        Don't have an account? <Link href={"signup"}>Sign Up</Link>
      </p>
    </div>
  );
}
