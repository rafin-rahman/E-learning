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
import getImageUrlAction from "@/app/dashboard/admin/courseDetails/[id]/getImageUrlAction";

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
  price: number;
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
    price: 0,
    deliveryPartner: {
      id: "",
      name: "loading...",
    },
    courseCode: "loading...",
  });
  const [file, setFile] = useState<File | null>(null);
  const [courseImageUrl, setCourseImageUrl] = useState<string | null>(null);
  const [toggleImageUploadForm, setToggle] = useState<boolean>(false);
  const [imageUploadLoading, setImageUploadLoading] = useState<boolean>(false);

  // Function to format the price
  function formatPrice(price: number) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
    }).format(price);
  }

  async function getCourseDetails(): Promise<Course> {
    const res = await fetch(
      process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/course/" + params.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch course");
    }

    return res.json();
  }
  useEffect(() => {
    setImageUploadLoading(true);
    async function getImageUrl() {
      const res = await getImageUrlAction(params.id);
      if (res) setCourseImageUrl(res);
    }
    getImageUrl();
    setImageUploadLoading(false);

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
    setImageUploadLoading(true);

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
      setImageUploadLoading(false);
      console.error("Error uploading file");
      return { error: "Error uploading file" };
    }

    const data = await response.json();
    setCourseImageUrl(data.url);

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
    setImageUploadLoading(false);
    return data.file;
  };

  return (
    <div className={"container mx-10"}>
      <Button asChild variant={"outline"} className={"my-10 "}>
        <Link href={"/courses/allCourses"}>{"< "} All courses</Link>
      </Button>

      <div className={"font-light text-gray-400 mb-4"}>
        {course.courseLevel.name} - by{" "}
        <span className={"font-normal"}>{course.deliveryPartner.name}</span>
      </div>
      <div className={"flex flex-wrap gap-4"}>
        <div className={"text-4xl font-extrabold mb-8"}>{course.title}</div>
        <Button variant={"destructive"}>
          Join now {formatPrice(course.price)}
        </Button>
      </div>
      <div className={"text-xl"}>
        Advance your career and earning potential by developing real-world
        business acumen and critical leadership skills with an online MBA from
        Central Queensland University. Master key business functions to become
        an industry leader that inspires and delivers.
      </div>
      {courseImageUrl ? (
        <div
          className={
            "relative h-80 my-4  flex items-center justify-center text-4xl text-gray-600 group"
          }
        >
          <Image
            src={courseImageUrl}
            alt="preview"
            className={"w-full h-full object-cover"}
            fill
          />
        </div>
      ) : (
        <div
          className={
            "h-80 my-4  flex  flex-col items-center justify-center text-4xl text-gray-600"
          }
        >
          <p className={"mb-10"}>
            {imageUploadLoading ? "Loading image..." : "No image available"}
          </p>
        </div>
      )}

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
        <div className={"flex flex-wrap"}>
          <div className={"sm:w-1/2 bg-gray-200 p-10"}>
            <h2 className={"text-4xl font-bold"}>
              What skills will you learn?
            </h2>
            <ul className={"mt-4"}>
              <li> Computer programming</li>
              <li> Software engineering</li>
              <li> Coding</li>
              <li> Data science</li>
              <li> AI innovation</li>
              <li> Data mining</li>
              <li> Machine learning</li>
              <li> Cyber operations</li>
              <li> Navigating algorithms</li>
              <li> Entrepreneurial skills</li>
            </ul>
          </div>

          <div
            className={
              "w-96 sm:w-1/2 h-96 relative sm:bg-gradient-to-r from-gray-200 to-white"
            }
          >
            <Image
              src={"/images/backgrounds/learner in red.webp"}
              className={"object-contain scale-90 "}
              alt={"test image"}
              fill
            />
          </div>
        </div>
        <div className={"mb-10"}>
          <Collapsible>
            <CollapsibleTrigger className={"w-full text-left "}>
              <div
                className={"text-2xl font-extrabold mb-6 mt-10 text-red-400"}
              >
                - What do I need to apply?
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className={"font-bold mb-4"}>
                To apply for this degree, you will need:
              </p>
              <li>
                A bachelor’s degree in Computer Science or a related discipline
                at a level equivalent to a UK second-class honours degree.
              </li>
              <li>
                {" "}
                The university will also consider non-standard applicants who
                can demonstrate that they have relevant and appropriate work
                experience (above that of user) in computing or a related field,
                over a sustained period of time, typically four to five years.
              </li>
              <li>
                {" "}
                International applicants whose first language is not English
                will need an IELTS score of at least 6.0 (with no less than 5.5
                in any band), or equivalent.
              </li>
            </CollapsibleContent>
            <div className="relative mt-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className={"w-full text-left "}>
              <div
                className={"text-2xl font-extrabold mb-6 mt-10 text-red-400"}
              >
                - What are the learning outcomes?
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className={" mb-4"}>
                The content on this MSc in Computer Science has been carefully
                designed to arm you with the workplace-ready skills to excel in
                the tech industry.
              </p>
              <p>Here are just some of the topics you’ll cover:</p>{" "}
              <ul className={"my-4"}>
                <li>• Data structure and algorithms</li>
                <li>• Artificial Intelligence</li>
                <li>• Enterprise databases</li>
                <li>• Responsible technology</li>
              </ul>
              <p>
                You’ll also complete a research project to apply computer
                science techniques.
              </p>
            </CollapsibleContent>
            <div className="relative mt-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
          </Collapsible>
          <Collapsible>
            <CollapsibleTrigger className={"w-full text-left "}>
              <div
                className={"text-2xl font-extrabold mb-6 mt-10 text-red-400"}
              >
                - What you will learn
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
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
                      This section includes all the information you will need to
                      get started in this course.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Introduction to Week 1</div>
                    <div className={"font-light w-72 text-justify"}>
                      Let's take a look ahead to what we'll be covering this
                      week.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Misleading statistics</div>
                    <div className={"font-light w-72 text-justify"}>
                      Let's explore some common issues that arise with data
                      collection and how they can result in misleading
                      statistics.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Misleading statistics</div>
                    <div className={"font-light w-72 text-justify"}>
                      Learn some common techniques people use to mislead others
                      with percentages.
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
                      This section includes all the information you will need to
                      get started in this course.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Introduction to Week 1</div>
                    <div className={"font-light w-72 text-justify"}>
                      Let's take a look ahead to what we'll be covering this
                      week.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Misleading statistics</div>
                    <div className={"font-light w-72 text-justify"}>
                      Let's explore some common issues that arise with data
                      collection and how they can result in misleading
                      statistics.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Misleading statistics</div>
                    <div className={"font-light w-72 text-justify"}>
                      Learn some common techniques people use to mislead others
                      with percentages.
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger>
                  <div className={"text-xl  mb-6 mt-10"}>
                    Week 3 - Study design
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className={"py-2 "}>
                    <div className={"font-bold"}>- Getting started</div>
                    <div className={"font-light w-72 text-justify"}>
                      This section includes all the information you will need to
                      get started in this course.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Introduction to Week 1</div>
                    <div className={"font-light w-72 text-justify"}>
                      Let's take a look ahead to what we'll be covering this
                      week.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Misleading statistics</div>
                    <div className={"font-light w-72 text-justify"}>
                      Let's explore some common issues that arise with data
                      collection and how they can result in misleading
                      statistics.
                    </div>
                  </div>
                  <div className={"py-2"}>
                    <div className={"font-bold"}>- Misleading statistics</div>
                    <div className={"font-light w-72 text-justify"}>
                      Learn some common techniques people use to mislead others
                      with percentages.
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
