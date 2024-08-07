import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInForm from "@/components/signInForm/SignInForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { roboto_mono } from "@/lib/font";
import { SEO } from "@/lib/company";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function signin() {
  // if the user is already logged in, redirect to the home page
  if (cookies().get("Authorization")) {
    redirect("/");
  }

  return (
    <div className={"container mt-20"}>
      <div className={"relative h-32 w-full mb-16"}>
        <Image
          src={SEO.logo_light}
          className={"object-fill"}
          fill
          alt={"logo"}
          priority
        />
      </div>

      <h1 className={"text-4xl mb-10 "}>Sign in page</h1>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>

      {/* Staff - it's an internal user to OQ unlike students or business users */}
      <SignInForm />
      <p>
        Don't have an account? <Link href={"/auth/signup"}>Sign Up</Link>
      </p>
      {/*  this is test application, anyone who visits the page should be able to test it using our default logins for ADMIN, SUPER_ADMIN, COURSE_MANAGER  */}
      <div className={roboto_mono.className}>
        <div className={"text-gray-400"}>
          <h2 className={"text-2xl mt-40 mb-4 "}>STAFF </h2>
          <div className={"flex gap-8 flex-wrap"}>
            <p>
              <span className={"uppercase"}>Course Manager</span>
              <br />
              Email: <strong>course@gmail.com</strong> <br />
              Password: <strong>123123</strong>
            </p>
            <p>
              <span className={"uppercase"}>Business Admin</span>
              <br />
              Email: <strong>business@gmail.com</strong> <br />
              Password: <strong>123123</strong>
            </p>
            <p>
              <span className={"uppercase"}>Admin</span>
              <br />
              Email: <strong>admin@gmail.com</strong> <br />
              Password: <strong>123123</strong>
            </p>
            <p>
              <span className={"uppercase"}>Super Admin</span>
              <br />
              Email: <strong>superadmin@gmail.com</strong> <br />
              Password: <strong> 123123</strong>
            </p>
          </div>
        </div>
        <div className={"text-gray-400 mt-20 mb-20"}>
          <h2 className={"text-2xl mb-4 "}>STUDENT </h2>
          <div className={"flex gap-8 flex-wrap"}>
            <p>
              <span className={"uppercase"}>Student</span>
              <br />
              Email: <strong>student@gmail.com</strong> <br />
              Password: <strong>123123</strong>
            </p>
            <p>
              <span className={"uppercase"}>Student</span>
              <br />
              Email: <strong>student2@gmail.com</strong> <br />
              Password: <strong>123123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
