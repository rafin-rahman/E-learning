"use client";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import CourseCard from "@/components/course/manageCourses/CourseCard";

async function getCourseLevels() {
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

async function getCourseSubjects() {
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
async function getCourses() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_LOCALHOST_URL + "/api/course",
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

export default function ManageCourses() {
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [courseLevels, setCourseLevels] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

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

  console.log(courses);
  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Manage Courses</h1>
      <div className={"flex"}>
        <div className={"flex-none w-56"}>
          <div className={"font-bold mb-4"}>Subjects</div>
          <div className={"overflow-y-auto max-h-96 border-b-4 "}>
            <ul>
              <li>
                <Checkbox />
                <span className={"ml-3"}>All</span>
              </li>
              {courseSubjects.map((subject: any) => (
                <li key={subject.id}>
                  <Checkbox />
                  <span className={"ml-3"}>{subject.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div className={"font-bold mb-4"}>Course Level</div>
          <div className={"overflow-y-auto max-h-96 border-b-4"}>
            <ul>
              <li>
                <Checkbox />
                <span className={"ml-3"}>All</span>
              </li>
              {courseLevels.map((level: any) => (
                <li key={level.id}>
                  <Checkbox />
                  <span className={"ml-3"}>{level.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={"flex-auto ml-5 "}>
          <div className={"font-bold mb-8"}>Course list - {courses.length}</div>
          <div className={"flex gap-4 flex-wrap"}>
            {courses.map((course: any) => (
              <CourseCard
                key={course.id}
                title={course.title}
                tag={course.courseLevel.name}
                editLink={""}
                viewLink={""}
                courseImage={null}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
