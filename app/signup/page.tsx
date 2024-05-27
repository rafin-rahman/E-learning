import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUpForm from "@/components/signUpForm/SignUpForm";

export default function signup() {
  return (
    <div className={"container mt-20"}>
      <h1 className={"text-4xl mb-10"}>Sign up page</h1>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>
      <SignUpForm />
      <p>
        Already have an account? <Link href={"signin"}>Sign in</Link>
      </p>
    </div>
  );
}
