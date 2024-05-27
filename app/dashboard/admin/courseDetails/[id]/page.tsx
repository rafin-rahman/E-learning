"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  courseLevel: {
    id: string;
    name: string;
  };
  courseSubject: {
    id: string;
    name: string;
  };
  price: string;
  deliveryPartner: {
    id: string;
    name: string;
  };
  courseCode: string;
};

export default function CourseDetails({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course>({
    id: "",
    title: "loading...",
    description: "loading...",
    duration: "loading...",
    courseLevel: {
      id: "",
      name: "loading...",
    },
    courseSubject: {
      id: "",
      name: "loading...",
    },
    price: "loading...",
    deliveryPartner: {
      id: "",
      name: "loading...",
    },
    courseCode: "loading...",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  async function getCourseDetails(): Promise<Course> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/course/" + params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch course");
    }

    return res.json();
  }
  useEffect(() => {
    setPreview(
      "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/course/userID/hello-YyhQVyztTzns7i0kvr49Kvk8SDkNIZ.jpg"
    );
    async function fetchCourse() {
      try {
        const course = await getCourseDetails();
        setCourse(course);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCourse();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("courseID", course.id);

    const response = await fetch(
      process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/course/image",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      console.error("Error uploading file");
      return { error: "Error uploading file" };
    }

    const data = await response.json();
    setPreview(data.url);

    // save data.url to the course.image database
    const saveImageApi = await fetch(
      process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/course/image/" + course.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: data.url }),
      }
    );

    const saveImageApiData = await saveImageApi.json();

    if (!saveImageApi.ok) {
      console.error("Error saving image URL to course");
      console.error(saveImageApiData.message);
      return { error: "Error saving image URL to course" };
    }

    return data.file;
  };

  return (
    <div className={"container mx-10"}>
      <Button asChild variant={"outline"} className={"my-10 "}>
        <Link href={"/dashboard/admin/manageCourses"}>
          {"< "}Manage Courses
        </Link>
      </Button>

      <div className={"font-light text-gray-400"}>
        {course.courseLevel.name} - by{" "}
        <span className={"font-normal"}>{course.deliveryPartner.name}</span>
      </div>
      <div className={"text-4xl font-extrabold mb-8"}>{course.title}</div>
      <div className={"text-xl"}>
        Advance your career and earning potential by developing real-world
        business acumen and critical leadership skills with an online MBA from
        Central Queensland University. Master key business functions to become
        an industry leader that inspires and delivers.
      </div>
      {preview ? (
        <div
          className={
            "relative h-80 my-4  flex items-center justify-center text-4xl text-gray-600"
          }
        >
          <Image
            src={preview}
            alt="preview"
            className={"w-full h-full object-cover"}
            fill
          />
        </div>
      ) : (
        <div
          className={
            "h-40 my-4 bg-amber-300 flex items-center justify-center text-4xl text-gray-600"
          }
        >
          Course image coming soon
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          className={"h-20"}
          type={"file"}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept="image/jpeg, image/png, image/jpg"
        />
        <Button type={"submit"} className={"w-full mt-4"}>
          Submit
        </Button>
      </form>
      <div>
        <ul className={"flex justify-around  my-4 text-center font-light"}>
          <li className={"border-r-2  w-64 py-4"}>
            <div className={"font-normal"}>Subject</div>
            <div>{course.courseSubject.name}</div>
          </li>
          <li className={"border-r-2  w-64 py-4"}>
            <div className={"font-normal"}>Duration</div>
            <div>{course.duration}</div>
          </li>
          <li className={"border-r-2  w-64 py-4"}>
            <div className={"font-normal"}>Course code</div>
            <div>{course.courseCode}</div>
          </li>
          <li className={"  w-64 py-4"}>
            <div className={"font-normal"}>Tuition Fees</div>
            <div>£{course.price}</div>
          </li>
        </ul>
        <div className={"text-2xl font-extrabold mb-6 mt-10"}>
          What you will learn
        </div>
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
        </div>

        <Collapsible>
          <CollapsibleTrigger>
            <div className={"text-xl  mb-6 mt-10"}>
              Week 1 - Fundamentals of Senior Management
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className={"bg-gray-50 w-80 p-4"}>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Getting started</div>
              <div className={"font-light  text-justify"}>
                This section includes all the information you will need to get
                started in this course.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Introduction to Week 1</div>
              <div className={"font-light w-72 text-justify"}>
                Let's take a look ahead to what we'll be covering this week.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Misleading statistics</div>
              <div className={"font-light w-72 text-justify"}>
                Let's explore some common issues that arise with data collection
                and how they can result in misleading statistics.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Misleading statistics</div>
              <div className={"font-light w-72 text-justify"}>
                Learn some common techniques people use to mislead others with
                percentages.
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>
            <div className={"text-xl  mb-6 mt-10"}>
              Week 2 - Sampling and variability
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Getting started</div>
              <div className={"font-light w-72 text-justify"}>
                This section includes all the information you will need to get
                started in this course.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Introduction to Week 1</div>
              <div className={"font-light w-72 text-justify"}>
                Let's take a look ahead to what we'll be covering this week.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Misleading statistics</div>
              <div className={"font-light w-72 text-justify"}>
                Let's explore some common issues that arise with data collection
                and how they can result in misleading statistics.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Misleading statistics</div>
              <div className={"font-light w-72 text-justify"}>
                Learn some common techniques people use to mislead others with
                percentages.
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger>
            <div className={"text-xl  mb-6 mt-10"}>Week 3 - Study design</div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={"py-2 "}>
              <div className={"font-bold"}>- Getting started</div>
              <div className={"font-light w-72 text-justify"}>
                This section includes all the information you will need to get
                started in this course.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Introduction to Week 1</div>
              <div className={"font-light w-72 text-justify"}>
                Let's take a look ahead to what we'll be covering this week.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Misleading statistics</div>
              <div className={"font-light w-72 text-justify"}>
                Let's explore some common issues that arise with data collection
                and how they can result in misleading statistics.
              </div>
            </div>
            <div className={"py-2"}>
              <div className={"font-bold"}>- Misleading statistics</div>
              <div className={"font-light w-72 text-justify"}>
                Learn some common techniques people use to mislead others with
                percentages.
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
