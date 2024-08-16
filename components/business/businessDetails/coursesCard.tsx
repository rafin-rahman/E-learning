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
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CoursesCard({
    coursesList,
    companyId,
}: {
    coursesList: { title: string; course: string; thumbnail: string }[];
    companyId: string;
}) {
    return (
        <Card className={"mt-10 shadow"}>
            <CardHeader>
                <CardTitle> Courses </CardTitle>
                <CardDescription>
                    {coursesList && (
                        <div>Available courses: {coursesList.length}</div>
                    )}
                </CardDescription>
            </CardHeader>
            <Separator
                className={
                    "mb-12 mt-4 shadow bg-gradient-to-r from-amber-300 to-red-400 opacity-40"
                }
            />
            <CardContent>
                {!coursesList || coursesList.length === 0 ? (
                    <div>No course available</div>
                ) : (
                    <div className={"flex flex-wrap gap-10"}>
                        {coursesList.map((course) => (
                            <div
                                className={
                                    "shadow p-6  max-w-72 hover:shadow-xl"
                                }
                                key={course.thumbnail}
                            >
                                <div
                                    className={
                                        "py-4 text-center min-h-20 font-bold"
                                    }
                                >
                                    {course.title}
                                </div>
                                <div className={"h-28 w-full relative mx-auto"}>
                                    <Image
                                        src={
                                            course.thumbnail
                                                ? "/" + course.thumbnail
                                                : ""
                                        }
                                        alt={"image"}
                                        className={"object-cover"}
                                        fill
                                    />
                                </div>{" "}
                                <Separator className="my-4" />
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger
                                            className={"text-center w-full "}
                                        >
                                            <div>09 / 20</div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            09 used out of 20 licences
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <Button variant="outline" className={"shadow"}>
                    <Link
                        href={`/oq-staff/manage-businesses/${companyId}/buy-courses`}
                    >
                        Add courses
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
