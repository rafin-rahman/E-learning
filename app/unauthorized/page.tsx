import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnAuthorized() {
  return (
    <div
      className={"container mt-20 flex flex-col items-center justify-center"}
    >
      <h1 className={"text-4xl mb-10"}>
        You don't have permission to access this resource{" "}
      </h1>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}> {"< "}Home page</Link>
      </Button>
    </div>
  );
}
