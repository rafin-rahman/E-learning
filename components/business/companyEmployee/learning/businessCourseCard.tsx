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
import Providers from "@/app/providers";

export default function BusinessCourseCard({
  title,
  image,
  numberOfModules,
  progressionPercentage,
}: {
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
            {progressionPercentage > 0 ? "Continue" : "Start course"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
