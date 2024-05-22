import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Home page</h1>
      <Button asChild variant={"destructive"} className={"mr-4"}>
        <Link href={"signup"}>Sign up</Link>
      </Button>
      <Button asChild variant={"destructive"}>
        <Link href={"signin"}>Sign in</Link>
      </Button>
    </div>
  );
}
