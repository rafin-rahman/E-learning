import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUpForm from "@/components/signUpForm/SignUpForm";

export default function Authenticated() {
  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Authenticated route</h1>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>
    </div>
  );
}
