"use client";
import getCompanyDetailsAction from "@/app/oq-staff/manage-businesses/[id]/getCompanyDetailsAction";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LicensesInUseCard from "@/components/business/businessDetails/licensesInUseCard";
import CoursesCard from "@/components/business/businessDetails/coursesCard";
import getCompanyEmployeesAction from "@/app/oq-staff/manage-businesses/[id]/getCompanyEmployeesAction";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

type CourseList ={
    course: string;
    thumbnail: string;
}

export default function businessClientDetails({
  params,
}: {
  params: { id: string };
}) {
  // const businessData = getCompanyDetailsAction(params.id);
  const [businessData, setBusinessData] = useState<{
    name: string;
    logo: string;
  } | null>(null);
  const [employees, setEmployees] = useState<
    | {
        id: string;
        status: string;
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
        roles: string[];
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        progress: number;
        awards: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    (async () => {
      const companyDetailsResponse = await getCompanyDetailsAction(params.id);
      // Get list of employees
      const employeesActionResponse = await getCompanyEmployeesAction(
        params.id
      );

      setBusinessData(companyDetailsResponse);

      // add 2 properties in the employeesActionResponse, progress and awards
      const employeesList = employeesActionResponse.map((employee) => {
        const progress = Math.floor(Math.random() * 100);
        const awards = `${Math.floor(Math.random() * 5)}/${Math.floor(
          Math.random() * 5
        )}`;
        return { ...employee, progress, awards };
      });
      setEmployees(employeesList);
    })();
  }, [params.id]);

  const {
    data: coursesList = [], // default value is an empty array,
    isLoading,
    error,
  }: UseQueryResult<CourseList[]> = useQuery({
    queryKey: ["businessPurchases", params.id],
    queryFn: async () => {
      const response = await fetch(`/api/oq-business/business-purchase`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    },
  });

  if (!businessData || !employees) return null;



  return (
    <>
      <div
        className={"w-full bg-white bg-opacity-30 shadow-xl h-32 px-40 py-10"}
      >
        <div className={"flex justify-between"}>
          <div>
            <div>
              {businessData?.logo ? (
                <Image
                  src={businessData.logo}
                  alt="logo"
                  width={100}
                  height={100}
                />
              ) : null}
            </div>
            {businessData?.name}
          </div>

          <Button variant="outline" className={"shadow float-right"}>
            {" "}
            Manage admins{" "}
          </Button>
        </div>
      </div>

      <div className={"mx-20 mt-10"}>
        {/* Manage licences  */}
        <LicensesInUseCard employeesList={employees} />
        {/* Manage  courses */}
        <CoursesCard coursesList={coursesList} companyId={params.id} />
      </div>
    </>
  );
}
