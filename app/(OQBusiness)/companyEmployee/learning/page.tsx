import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BusinessCourseCard from "@/components/business/companyEmployee/learning/businessCourseCard";

export default function Learning() {
  const courses = [
    {
      title: "The Essentials of Data Protection",
      image: "/testings/data_protection.png",
      numberOfModules: 3,
      progressionPercentage: 10,
    },
    {
      title: "Radicalisation and Extremism (Prevent)",
      image: "/testings/extremism.png",
      numberOfModules: 7,
      progressionPercentage: 60,
    },
    {
      title: "Level 2 Safeguarding Adults",
      image: "/testings/safeguarding_adults.png",
      numberOfModules: 11,
      progressionPercentage: 20,
    },
    {
      title: "Unconscious Bias in the Workplace",
      image: "/testings/bias.png",
      numberOfModules: 6,
      progressionPercentage: 5,
    },
    {
      title: "Bullying and Harassment in the Workplace",
      image: "/testings/bullying.png",
      numberOfModules: 8,
      progressionPercentage: 0,
    },
    {
      title: "Equality, Diversity and Inclusion for Employees",
      image: "/testings/equality.png",
      numberOfModules: 10,
      progressionPercentage: 0,
    },
  ];

  function renderCourses() {
    return courses.map((course) => (
      <BusinessCourseCard
        title={course.title}
        image={course.image}
        numberOfModules={course.numberOfModules}
        progressionPercentage={course.progressionPercentage}
        //TODO replace with actual id
        id={course.title}
      />
    ));
  }

  return (
    <div className={"container"}>
      <div className="flex w-full  justify-center items-center space-x-2 ">
        <Input type="search" placeholder="Search courses" />
        <Button type="submit">Search</Button>
      </div>
      <div className={"flex gap-6 flex-wrap my-10"}>{renderCourses()}</div>
    </div>
  );
}
