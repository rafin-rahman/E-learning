"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import CourseCard from "@/components/course/manageCourses/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define types for subjects and levels
type CourseSubject = {
  id: string;
  name: string;
};

type CourseLevel = {
  id: string;
  name: string;
};
type DeliveryPartner = {
  id: string;
  name: string;
};

type Course = {
  id: string;
  title: string;
  courseSubject: CourseSubject;
  courseLevel: CourseLevel;
  deliveryPartner: DeliveryPartner;
  image: string;
};

async function getCourseLevels(): Promise<CourseLevel[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/course/courseLevel",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch course levels");
  }
  return res.json();
}

async function getCourseSubjects(): Promise<CourseSubject[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/course/courseSubject",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch course subjects");
  }
  return res.json();
}

async function getCourses(): Promise<Course[]> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/course",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cache: "no-store",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }
  return res.json();
}

export default function ManageCourses() {
  const [courseSubjects, setCourseSubjects] = useState<CourseSubject[]>([]);
  const [courseLevels, setCourseLevels] = useState<CourseLevel[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      // set course subjects
      try {
        const subjects = await getCourseSubjects();
        setCourseSubjects(subjects);
      } catch (err: any) {
        setError(err.message);
      }
      // set course levels
      try {
        const courseLevels = await getCourseLevels();
        setCourseLevels(courseLevels);
      } catch (err: any) {
        setError(err.message);
      }
      // set courses
      try {
        const courses = await getCourses();
        setCourses(courses);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  const handleSubjectChange = (subjectName: string) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.includes(subjectName)
        ? prevSelected.filter((name) => name !== subjectName)
        : [...prevSelected, subjectName]
    );
  };

  const handleLevelChange = (levelName: string) => {
    setSelectedLevels((prevSelected) =>
      prevSelected.includes(levelName)
        ? prevSelected.filter((name) => name !== levelName)
        : [...prevSelected, levelName]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const filteredCourses = courses.filter((course: Course) => {
    const subjectMatch =
      selectedSubjects.length === 0 ||
      selectedSubjects.includes(course.courseSubject.name);
    const levelMatch =
      selectedLevels.length === 0 ||
      selectedLevels.includes(course.courseLevel.name);
    const searchMatch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return subjectMatch && levelMatch && searchMatch;
  });

  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Manage Courses</h1>
      <div className={"flex"}>
        <div className={"flex-none w-56"}>
          <div className={"font-bold mb-4"}>Course Level</div>
          <div className={"overflow-y-auto max-h-96 border-b-4"}>
            <ul>
              <li>
                <Checkbox
                  checked={selectedLevels.length === 0}
                  onCheckedChange={() => setSelectedLevels([])}
                />
                <span className={"ml-3"}>All</span>
              </li>
              {courseLevels.map((level: CourseLevel) => (
                <li key={level.id}>
                  <Checkbox
                    checked={selectedLevels.includes(level.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleLevelChange(level.name);
                      } else {
                        setSelectedLevels(
                          selectedLevels.filter((name) => name !== level.name)
                        );
                      }
                    }}
                  />
                  <span className={"ml-3"}>{level.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div className={"font-bold mb-4"}>Subjects</div>
          <div className={"overflow-y-auto max-h-96 border-b-4"}>
            <ul>
              <li>
                <Checkbox
                  checked={selectedSubjects.length === 0}
                  onCheckedChange={() => setSelectedSubjects([])}
                />
                <span className={"ml-3"}>All</span>
              </li>
              {courseSubjects.map((subject: CourseSubject) => (
                <li key={subject.id}>
                  <Checkbox
                    checked={selectedSubjects.includes(subject.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleSubjectChange(subject.name);
                      } else {
                        setSelectedSubjects(
                          selectedSubjects.filter(
                            (name) => name !== subject.name
                          )
                        );
                      }
                    }}
                  />
                  <span className={"ml-3"}>{subject.name}</span>
                </li>
              ))}
            </ul>
          </div>
          {filteredCourses.length !== courses.length && (
            <Button
              variant={"destructive"}
              onClick={() => {
                setSelectedSubjects([]);
                setSelectedLevels([]);
                setSearch("");
              }}
              className={"mt-6 w-full"}
            >
              Clear filters
            </Button>
          )}
        </div>
        <div className={"flex-auto ml-5"}>
          <div className={"flex mb-8 items-center"}>
            <div className={"font-bold"}>
              Course list - {filteredCourses.length}
            </div>
            <Input
              className={"max-w-48 ml-10 "}
              type="search"
              placeholder="Search courses"
              value={search}
              onChange={(e) => {
                handleSearch(e);
              }}
            />

            <div className={"ml-auto -translate-x-20"}>
              <Button variant={"ghost"}>Add new</Button>
            </div>
          </div>
          <ScrollArea className="h-dvh w-full ">
            <div className={"flex gap-4 flex-wrap justify-around"}>
              {filteredCourses.map((course: Course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  tag={course.courseLevel.name}
                  deliveryPartner={course.deliveryPartner.name}
                  editLink={""}
                  viewLink={"/dashboard/admin/courseDetails/" + course.id}
                  imageUrl={course.image}
                />
              ))}
              {filteredCourses.length === 0 && (
                <div className={"text-center "}>No courses found</div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
