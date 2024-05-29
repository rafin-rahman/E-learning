import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInForm from "@/components/signInForm/SignInForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { roboto_mono } from "@/lib/font";

export default function signin() {
  // if the user is already logged in, redirect to the home page
  if (cookies().get("Authorization")) {
    redirect("/");
  }

  return (
    <div className={"container mt-20"}>
      <h1 className={"text-4xl mb-10"}>Sign in page</h1>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>

      <SignInForm />
      <p>
        Don't have an account? <Link href={"signup"}>Sign Up</Link>
      </p>

      {/*  this is test application, anyone who visits the page should be able to test it using our default logins for ADMIN, SUPER_ADMIN, COURSE_MANAGER  */}
      <div className={roboto_mono.className}>
        <div className={"text-gray-400"}>
          <h2 className={"text-2xl mt-40 mb-4 "}>STAFF </h2>
          <div className={"flex gap-8"}>
            <p>
              <span className={"uppercase"}>Course Manager</span>
              <br />
              Email: <strong>basic@gmail.com</strong> <br />
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
          <div className={"flex gap-8"}>
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
