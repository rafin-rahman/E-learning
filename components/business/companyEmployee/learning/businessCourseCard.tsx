import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Providers from "@/lib/providers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function BusinessCourseCard({
  id,
  title,
  image,
  numberOfModules,
  progressionPercentage,
}: {
  id: string;
  title: string;
  image: string;
  numberOfModules: number;
  progressionPercentage: number;
}) {
  return (
    <>
      <Card className={"max-w-72 shadow-xl  border-none"}>
        <CardHeader>
          <div className={"relative h-40 w-full bg-amber-300"}>
            <Image src={image} alt={title} className={" object-cover"} fill />
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            <div className={"mt-1 "}>{numberOfModules} Chapters</div>

            <div className={"mt-1 float-right"}>
              {" "}
              {progressionPercentage}% completed{" "}
            </div>
            <Progress value={progressionPercentage} />
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button>
            <Link href={`/business/companyEmployee/learning/${id}`}>
              {progressionPercentage > 0 ? "Continue" : "Start course"}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
