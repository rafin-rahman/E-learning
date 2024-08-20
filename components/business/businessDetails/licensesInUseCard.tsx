import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
	ArchiveBoxXMarkIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchFilter } from "@/components/SearchFilter";
import { useState } from "react";

type employeesListType =
	| {
			id: string;
			status: string;
			firstName: string;
			lastName: string;
			email: string;
			telephone: string;
			roles: string[];
			businessId: string;
			createdAt: Date;
			progress: number;
			awards: string;
	  }[]
	| null;

export default function LicensesInUseCard({
	employeesList,
}: {
	employeesList: employeesListType;
}) {
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = employeesList
		? Math.ceil(employeesList.length / itemsPerPage)
		: 1;

	const employeesListForSearchBox = employeesList?.map((employee) => {
		return {
			label: employee.email,
			value: employee.email,
		};
	});

	// Get the total number of pages based on the employeesList length
	function getPaginatedData(page: number) {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = page * itemsPerPage;

		return employeesList?.slice(startIndex, endIndex);
	}

	// Handler for page change
	function handlePageChange(page: number) {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	}

	// Get the data for the current page
	const paginatedItems = getPaginatedData(currentPage);

	return (
		<Card className={" shadow"}>
			<CardHeader>
				<CardTitle className={"flex justify-between"}>
					<div>Employees</div>
					<SearchFilter list={employeesListForSearchBox ?? []} />
				</CardTitle>
				<CardDescription className={"flex justify-between"}>
					<div>Licences is use: 10/50</div>
					<div>
						<Button asChild variant={"default"}>
							<select name="options">
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</Button>
					</div>
				</CardDescription>
			</CardHeader>
			<Separator
				className={
					"mb-12 mt-4 shadow bg-gradient-to-r from-amber-300 to-red-400 opacity-40"
				}
			/>

			<CardContent>
				<ul className={"leading-10"}>
					{paginatedItems?.map((item) => {
						return (
							<li
								key={item.id}
								className={
									"flex items-center gap-10 group justify-between"
								}
							>
								<div
									className={
										"w-[20%] flex items-center gap-x-2"
									}
								>
									<PencilSquareIcon className={"h-4"} />
									<ArchiveBoxXMarkIcon className={"h-4"} />
									{item.email}
								</div>
								<div
									className={
										"flex w-[50%] items-center gap-4 "
									}
								>
									{" "}
									<div className={"text-xs"}>
										Training Progress
									</div>
									<Progress
										value={item.progress}
										className="w-[30%] "
									/>{" "}
									{item.progress}%
								</div>
								<div>Award obtained: {item.awards} </div>
							</li>
						);
					})}
				</ul>
				<Pagination className={"mt-10"}>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={() =>
									handlePageChange(currentPage - 1)
								}
							/>
						</PaginationItem>
						{/* Dynamically render page numbers */}
						{[...Array(totalPages)].map((_, index) => (
							<PaginationItem key={index}>
								<PaginationLink
									href="#"
									className={
										currentPage === index + 1
											? 'bg-gray-200   px-3 py-1"'
											: ""
									}
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={() =>
									handlePageChange(currentPage + 1)
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</CardContent>

			<CardFooter>
				<Button variant="outline" className={"shadow"}>
					Edit
				</Button>
			</CardFooter>
		</Card>
	);
}
