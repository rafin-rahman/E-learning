"use client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  StarIcon,
  UserGroupIcon,
  UserIcon,
  TagIcon,
  GlobeAltIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BuyModalButton from "@/app/oq-staff/manage-businesses/[id]/buy-courses/[businessCourseId]/BuyModalButton";
import { formatCurrencyToGBP } from "@/lib/utils";

interface BusinessCourse {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

export default function BuyBusinessCourseDetails({
  params,
}: {
  params: { id: string; businessCourseId: string };
}) {
  const [courseQuantity, setCourseQuantity] = useState(0);

  const {
    data: businessCourse,
    isLoading,
    error,
  }: UseQueryResult<BusinessCourse> = useQuery({
    queryKey: ["businessCourse", params.businessCourseId],
    queryFn: async () => {
      const response = await fetch(
        "/api/oq-business/course/cpd/" + params.businessCourseId
      );
      const result = await response.json();
      return result.data;
    },
  });

  if (isLoading) return <>Loading...</>;
  if (error)
    return (
      <>Error: {error instanceof Error ? error.message : "Unknown error"}</>
    );

  if (!businessCourse) {
    return <>Course not found</>;
  }

  return (
    <div>
      <div className={"py-20 "}>
        <div className={"container"}>
          <div className={"flex justify-around"}>
            <div>
              <h1 className={"text-4xl my-10"}>{businessCourse.title}</h1>

              <div
                className={
                  "flex gap-x-10 gap-y-4 flex-wrap text-gray-500 w-2/3 text-sm"
                }
              >
                <div className={"flex items-center gap-2"}>
                  <StarIcon className={"h-5"} />
                  <StarIcon className={"h-5"} />
                  <StarIcon className={"h-5"} />
                  <StarIcon className={"h-5"} />
                  4.2
                </div>
                <div className={"flex items-center gap-2"}>
                  <UserGroupIcon className={"h-5"} /> 345 Enrolled
                </div>{" "}
                <div className={"flex items-center gap-2"}>
                  <UserIcon className={"h-5"} /> Instructor{" "}
                  <span className={"text-gray-900"}>Joseph Doe</span>
                </div>
                <div className={"flex items-center gap-2"}>
                  <TagIcon className={"h-5"} /> Business, Technology
                </div>{" "}
                <div className={"flex items-center gap-2"}>
                  <GlobeAltIcon className={"h-5"} /> English
                </div>
              </div>
            </div>

            <div className={"relative h-48 w-96"}>
              <Image
                src={"/" + businessCourse.thumbnail}
                alt={"course thumbnail"}
                className={"object-cover"}
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <div className={"flex flex-wrap "}>
        <Tabs defaultValue={"overview"} className={"w-2/3 "}>
          <TabsList className={"grid w-full grid-cols-3 rounded-none p-0 "}>
            <TabsTrigger
              value={"overview"}
              className={
                "rounded-none shadow-none border-none  data-[state=active]:bg-gray-300"
              }
            >
              Overview{" "}
            </TabsTrigger>
            <TabsTrigger
              value={"1"}
              className={
                "rounded-none shadow-none border-none data-[state=active]:bg-gray-300"
              }
            >
              Curriculum{" "}
            </TabsTrigger>
          </TabsList>
          <div className={"bg-white"}>
            <TabsContent value={"overview"} className={"mt-0"}>
              <div className={"container py-6"}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas in finibus neque. Vivamus in ipsum quis elit vehicula
                  tempus vitae quis lacus. Vestibulum interdum diam non mi
                  cursus venenatis. Morbi lacinia libero et elementum vulputate.
                  Vivamus et facilisis mauris. Maecenas nec massa auctor,
                  ultricies massa eu, tristique erat. Vivamus in ipsum quis elit
                  vehicula tempus vitae quis lacus. Eu pellentesque, accumsan
                  tellus leo, ultrices mi dui lectus sem nulla eu.Eu
                  pellentesque, accumsan tellus leo, ultrices mi dui lectus sem
                  nulla eu. Maecenas arcu, nec ridiculus quisque orci, vulputate
                  mattis risus erat.
                </p>
                <h2 className={"text-2xl my-6"}>What will you learn?</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas in finibus neque. Vivamus in ipsum quis elit vehicula
                  tempus vitae quis lacus. Vestibulum interdum diam non mi
                  cursus venenatis. Morbi lacinia libero et elementum vulputate.
                </p>
                <h2 className={"text-2xl my-6"}>Learning outcomes:</h2>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </li>
                  <li>
                    roin et eros varius, ornare turpis ac, dapibus nisi. Morbi
                    luctus arcu non massa consequat, et tristique velit semper.
                    Curabitur interdum vulputate sagittis. Donec erat massa,
                    tincidunt sed feugiat id, suscipit in est. Proin laoreet
                    orci quis augue eleifend varius. Donec hendrerit ex ut lacus
                    blandit euismod.
                  </li>
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        <Card className={"rounded-none border-none shadow-none   flex-1 "}>
          <CardHeader>
            {" "}
            <CardTitle>Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={"text-xl"}>Requirements:</p>
            <ul className={""}>
              <li className={""}>
                <ChevronRightIcon className={"h-3 inline text-cyan-400"} />
                English
              </li>
            </ul>
            <p className={"text-xl mt-2"}>Learning materials:</p>
            <ul className={""}>
              <li className={""}>
                <ChevronRightIcon className={"h-3 inline text-cyan-400"} />
                10 Chapters
              </li>
              <li>
                {" "}
                <ChevronRightIcon className={"h-3 inline text-cyan-400"} />5
                Videos
              </li>{" "}
              <li>
                {" "}
                <ChevronRightIcon className={"h-3 inline text-cyan-400"} />8
                Exams
              </li>
            </ul>
            <p className={"text-xl mt-2"}>Certification:</p>
            <ChevronRightIcon className={"h-3 inline text-cyan-400"} />
            The Essentials of Data Protection
            <p className={"text-xl mt-2"}>Certification type:</p>
            <ChevronRightIcon className={"h-3 inline text-cyan-400"} />
            CPD<p className={"text-xl mt-2"}>Fee:</p>
            <ChevronRightIcon className={"h-3 inline text-cyan-400"} />
            {formatCurrencyToGBP(businessCourse.price)}
          </CardContent>
          <CardFooter className={""}>
            <div className={"flex flex-col"}>
              <div className={"flex justify-start gap-6 "}>
                <Input
                  type={"number"}
                  value={courseQuantity}
                  onChange={(e) => {
                    if (parseInt(e.target.value) < 0) {
                      setCourseQuantity(0);
                      return;
                    }
                    setCourseQuantity(parseInt(e.target.value));
                  }}
                  className={"w-20"}
                />
                <BuyModalButton
                  quantity={courseQuantity}
                  totalValue={courseQuantity * businessCourse.price}
                  businessId={params.id}
                />
                {courseQuantity > 0 ? (
                  <p>
                    {formatCurrencyToGBP(courseQuantity * businessCourse.price)}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className={"mt-6"}></div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
