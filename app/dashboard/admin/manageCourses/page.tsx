"use client";
import { useEffect, useState } from "react";

async function getCourseSubjects() {
  const res = await fetch("http://localhost:3000/api/course/courseSubject", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch course subjects");
  }
  return res.json();
}

export default function ManageCourses() {
  const [courseSubjects, setCourseSubjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const subjects = await getCourseSubjects();
        setCourseSubjects(subjects);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);
  console.log(courseSubjects);
  return (
    <div className={"container"}>
      <h1 className={"text-4xl mb-10"}>Manage Courses</h1>
      <div className={"flex"}>
        <div className={"flex-none w-48 "}>
          <div className={"font-bold mb-4"}>Subjects</div>
          <ul>
            <li>All</li>
            {courseSubjects.map((subject: any) => (
              <li key={subject.id}>{subject.name}</li>
            ))}
          </ul>
        </div>
        <div className={"flex-auto"}>Course list</div>
      </div>
    </div>
  );
}
