"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CourseSlider() {
  const slides = [
    {
      page: "Introduction",
      content:
        "Learn about the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/1.png",
    },
    {
      page: "Page 1",
      content:
        "Understand the strategies and policies in place to prevent radicalization.",
      image: "/testings/slides/1/2.png",
    },
    {
      page: "Page 2",
      content: "Identify warning signs and promote community cohesion.",
      image: "/testings/slides/1/3.png",
    },
    {
      page: "Page 3",
      content:
        "Understand the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/4.png",
    },
    {
      page: "Page 4",
      content:
        "Understand the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/5.png",
    },
    {
      page: "Page 5",
      content:
        "Understand the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/6.png",
    },
    {
      page: "Page 6",
      content:
        "Understand the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/7.png",
    },
    {
      page: "Page 7",
      content:
        "Understand the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/8.png",
    },
    {
      page: "Page 8",
      content:
        "Understand the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/9.png",
    },
    {
      page: "Page 9",
      content:
        "Understand the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/10.png",
    },
    {
      page: "Page 10",
      content:
        "Understand the causes and consequences of radicalization and extremism.",
      image: "/testings/slides/1/11.png",
    },
  ];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function calculatePercentage() {
    return (current / count) * 100;
  }

  function renderSlides() {
    return slides.map((slide) => {
      return (
        <CarouselItem>
          <p>{slide.content}</p>
          <div className={"relative h-[500px] w-full"}>
            {/*<AspectRatio ratio={9 / 16} className={"relative"}>*/}
            <Image
              src={slide.image}
              alt={slide.page}
              fill
              className={" object-contain"}
            />
            {/*</AspectRatio>*/}
          </div>
        </CarouselItem>
      );
    });
  }

  return (
    <Carousel setApi={setApi}>
      <CarouselContent className={""}>{renderSlides()}</CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div className={"float-right"}>
        Page {current} of {count}
      </div>
      <Progress value={calculatePercentage()} className={"w-full my-2"} />
      <div className={""}>
        <Badge
          variant={"secondary"}
          className={`hover:bg-green-300   ${
            calculatePercentage() === 100 ? "bg-green-300" : ""
          }`}
        >
          {calculatePercentage() === 100 ? "Completed" : "Chapter in progress"}
        </Badge>
        {calculatePercentage() === 100 ? (
          <div className={"py-2  my-6 underline bg-gray-100 text-center"}>
            <Link href={"/"}>
              Start quiz <PencilSquareIcon className={"h-4 inline"} />
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </Carousel>
  );
}
