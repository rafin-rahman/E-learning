import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Authenticated() {
  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Your dashboard</h1>
      <Button asChild variant={"outline"} className={"mr-4"}>
        <Link href={"/"}> {"< "}Leave dashboard</Link>
      </Button>
    </div>
  );
}
