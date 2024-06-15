import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUpForm from "@/components/signUpForm/SignUpForm";
import Image from "next/image";
import { SEO } from "@/lib/company";

export default function signup() {
  return (
    <div className={"container mt-20"}>
      <div className={"relative h-32 w-full mb-16"}>
        <Image
          src={SEO.logo_light}
          className={"object-fill"}
          fill
          alt={"logo"}
        />
      </div>
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
