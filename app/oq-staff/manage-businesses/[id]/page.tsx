"use client";
import getBusinessDetailsAction from "@/app/oq-staff/manage-businesses/[id]/getBusinessDetailsAction";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EmployeesCard from "@/components/business/businessDetails/EmployeesCard";
import CoursesCard from "@/components/business/businessDetails/CoursesCard";
import getBusinessEmployeesAction from "@/app/oq-staff/manage-businesses/[id]/getBusinessEmployeesAction";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

type CourseList = {
	course: string;
	thumbnail: string;
	title: string;
	quantity: number;
};

export default function businessClientDetails({
	params,
}: {
	params: { id: string };
}) {
	// const businessData = getBusinessDetailsAction(params.id);
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
				businessId: string;
				createdAt: Date;
				updatedAt: Date;
				progress: number;
				awards: string;
		  }[]
		| null
	>(null);

	useEffect(() => {
		(async () => {
			const businessDetailsResponse = await getBusinessDetailsAction(
				params.id
			);
			// Get list of employees
			const employeesActionResponse = await getBusinessEmployeesAction(
				params.id
			);

			setBusinessData(businessDetailsResponse);

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

	// get all unique courses purchased
	const {
		data: coursesList = [], // default value is an empty array,
		isLoading,
		error,
	}: UseQueryResult<CourseList[]> = useQuery({
		queryKey: ["business-courses-available", params.id],
		queryFn: async (): Promise<CourseList[]> => {
			const result = await axios.post("/api/oq-business/licenses/", {
				companyId: params.id,
			});
			return result.data.data as CourseList[];
		},
		staleTime: 1000 * 60, // 1 minute
	});

	// get all licences available and used

	if (!businessData || !employees) return null;

	return (
		<>
			<div
				className={
					"w-full bg-white bg-opacity-30 shadow-xl h-32 px-40 py-10"
				}
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
				<EmployeesCard employeesList={employees} />
				{/* Manage  courses */}
				<CoursesCard coursesList={coursesList} companyId={params.id} />
			</div>
		</>
	);
}
