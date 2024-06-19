import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function CoursesCard({
  coursesList,
}: {
  coursesList: { course: string; thumbnail: string }[];
}) {
  return (
    <Card className={"mt-10 shadow"}>
      <CardHeader>
        <CardTitle> Courses </CardTitle>
        <CardDescription>
          <div>Available courses: {coursesList.length}</div>
        </CardDescription>
      </CardHeader>
      <Separator
        className={
          "mb-12 mt-4 shadow bg-gradient-to-r from-amber-300 to-red-400 opacity-40"
        }
      />
      <CardContent>
        <div className={"flex flex-wrap gap-10"}>
          {coursesList.map((course) => (
            <div className={"shadow p-6  max-w-72 hover:shadow-xl"}>
              <div className={"h-28 w-[80%] relative mx-auto"}>
                <Image
                  src={course.thumbnail ? course.thumbnail : ""}
                  alt={"image"}
                  className={"object-contain"}
                  fill
                />
              </div>{" "}
              <Separator className="my-4" />
              <p className={"text-black"}>{course.course}</p>
            </div>
          ))}
          <div
            className={
              "shadow p-6  max-w-72 hover:shadow-xl bg-gray-50 flex items-center border-4 hover:bg-gray-100"
            }
          >
            <div
              className={
                "h-28 w-[80%]  mx-auto  text-center text-xl text-gray-700 "
              }
            >
              ADD NEW COURSE
              <Separator className="my-4" />
            </div>{" "}
            <p className={"text-black"}></p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className={"shadow"}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
