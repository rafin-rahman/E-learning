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
import { SearchFilter } from "@/components/business/businessDetails/SearchFilter";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Employee = {
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
};

type EmployeesListType = Employee[] | null;

export default function EmployeesCard({
	employeesList,
}: {
	employeesList: EmployeesListType;
}) {
	const itemsPerPage = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [statusFilter, setStatusFilter] = useState("ACTIVE");
	let [filteredEmployeesList, setFilteredEmployeesList] = useState<
		Employee[]
	>(employeesList ?? []);

	// let filteredEmployeesList = employeesList ?? [];

	if (searchValue) {
		filteredEmployeesList = filteredEmployeesList.filter((employee) =>
			employee.email.includes(searchValue)
		);
	}

	const totalPages = filteredEmployeesList
		? Math.ceil(filteredEmployeesList.length / itemsPerPage)
		: 1;

	const employeesListForSearchBox = filteredEmployeesList?.map((employee) => {
		return {
			label: employee.email,
			value: employee.email,
		};
	});

	useEffect(() => {
		if (statusFilter) {
			setFilteredEmployeesList(
				employeesList?.filter((employee) =>
					statusFilter === "ACTIVE"
						? employee.status === "ACTIVE"
						: employee.status === "INACTIVE"
				) ?? []
			);
		}
	}, [statusFilter]);

	// Get the total number of pages based on the employeesList length
	function getPaginatedData(page: number) {
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = page * itemsPerPage;

		return filteredEmployeesList?.slice(startIndex, endIndex);
	}

	// Handler for page change
	function handlePageChange(page: number) {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	}

	// Get the data for the current page
	const paginatedItems = getPaginatedData(currentPage);

	// Callback function to handle SearchFilter component
	function handleFilterChange(value: string) {
		setSearchValue(value);
	}

	// Update to handle status filter
	function handleStatusChange(value: string) {
		setStatusFilter(value);
	}

	return (
		<Card className={" shadow"}>
			<CardHeader>
				<CardTitle className={"flex justify-between"}>
					<div>Employees</div>
					<div className={"w-72"}>
						<SearchFilter
							list={employeesListForSearchBox ?? []}
							onFilterChange={handleFilterChange}
						/>
					</div>
				</CardTitle>
				<CardDescription className={"flex justify-between"}>
					<div>Licences is use: 10/50</div>
					<div>
						<Button asChild variant={"default"}>
							<Select
								onValueChange={handleStatusChange}
								value={statusFilter}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue
										placeholder="Active"
										defaultValue={"ACTIVE"}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ACTIVE">
										Active
									</SelectItem>
									<SelectItem value="INACTIVE">
										Inactive
									</SelectItem>
								</SelectContent>
							</Select>
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
									"flex items-center gap-10 group justify-between hover:bg-gray-100 px-4 py-1 rounded-2xl"
								}
							>
								<div
									className={
										"w-[20%] flex items-center gap-x-2 "
									}
								>
									<PencilSquareIcon
										className={
											"h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
										}
									/>
									<ArchiveBoxXMarkIcon
										className={
											"h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
										}
									/>
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
				{filteredEmployeesList.length > 0 && (
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
										onClick={() =>
											handlePageChange(index + 1)
										}
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
				)}
			</CardContent>

			<CardFooter className={"flex justify-end"}>
				<Button variant="outline" className={"shadow"}>
					+
				</Button>
			</CardFooter>
		</Card>
	);
}
