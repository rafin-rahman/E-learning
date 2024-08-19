import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
	const body = await request.json();

	try {
		const businessPurchases = await prisma.businessPurchase.findMany({
			where: {
				businessId: body.businessId,
			},
			select: {
				BusinessPurchaseCourseQuantity: {
					select: {
						quantity: true,
						BusinessCourse: {
							select: {
								id: true,
								title: true,
								description: true,
								thumbnail: true,
								price: true,
							},
						},
					},
				},
			},
		});
		// new Map to store aggregated course and quantities
		const courseMap = new Map();

		// Loop through the purchases to aggregate the quantities
		businessPurchases.forEach((purchase) => {
			purchase.BusinessPurchaseCourseQuantity.forEach(
				(purchaseCourseQuantity) => {
					const course = purchaseCourseQuantity.BusinessCourse;
					const quantity = purchaseCourseQuantity.quantity;

					if (courseMap.has(course.id)) {
						// If the course already exists, update the quantity
						const existingCourse = courseMap.get(course.id);
						existingCourse.quantity += quantity; // Aggregate the quantity
					} else {
						// If the course doesn't exist, add it with the initial quantity
						courseMap.set(course.id, {
							...course, // Spread the course details
							quantity: quantity, // Initial quantity
						});
					}
				}
			);
		});
		// Convert the Map to an array to return in the API response
		const aggregatedCourses = Array.from(courseMap.values());

		// Returns course details and quantity
		return NextResponse.json({ data: aggregatedCourses });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: "Something went wrong" });
	}
}
