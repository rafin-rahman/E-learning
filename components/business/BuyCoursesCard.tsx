"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { inter } from "@/lib/font";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

export default function BuyCoursesCard({
  companyId,
  userType,
}: {
  companyId: string;
  userType: string;
}) {
  const {
    data: coursesList,
    isLoading,
    error,
  }: UseQueryResult<Course[]> = useQuery({
    queryKey: ["courses", companyId],
    queryFn: async () => {
      const response = await fetch(`/api/oq-business/buy-courses/`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const coursesList = await response.json();
      return coursesList.data;
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!coursesList) {
    return <div>Loading...</div>;
  }

  const coursesCard = coursesList.map((course) => {
    return (
      <Card key={course.thumbnail} className={"mb-10"}>
        <CardHeader>
          <CardTitle>{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={"flex justify-between"}>
            <div className={"w-[600px] "}>{course.description}</div>
            <div className={"w-96 "}>
              <AspectRatio ratio={16 / 9} className={""}>
                <Image
                  src={"/" + course.thumbnail}
                  alt={"course image"}
                  className={"object-cover"}
                  fill
                />
              </AspectRatio>
            </div>
          </div>
        </CardContent>
        <CardFooter className={"flex justify-between"}>
          <div className={"mr-4"}>{"£" + " " + course.price}</div>
          <Button variant={"default"} type={"submit"}>
            <Link
              href={`/oq-staff/manage-businesses/${companyId}/buy-courses/${course.id}`}
            >
              View{" "}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy courses</CardTitle>
      </CardHeader>
      <CardContent>{isLoading ? "Loading" : coursesCard}</CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
