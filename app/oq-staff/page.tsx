import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Authenticated() {
  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Your dashboard</h1>
      <Button asChild variant={"outline"} className={"mr-4 group "}>
        <Link href={"/"}>
          {" "}
          {"< "}
          <span
            className={
              "transition-all duration-500 overflow-hidden group-hover:inline-block group-hover:w-32 w-0 opacity-0 group-hover:opacity-100"
            }
          >
            {" "}
            Leave dashboard
          </span>
        </Link>
      </Button>
    </div>
  );
}
