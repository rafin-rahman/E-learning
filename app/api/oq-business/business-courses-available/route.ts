import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Show list of unique course purchased
export async function POST(request: NextRequest) {
    const body = await request.json();

    const { companyId } = body;

    try {
        const purchasedCourses = await prisma.business.findUnique({
            where: {
                id: companyId,
            },
            select: {
                BusinessPurchase: {
                    select: {
                        BusinessPurchaseCourseQuantity: {
                            select: {
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
                },
            },
        });

        if (!purchasedCourses) {
            return NextResponse.json({ error: "No order found" });
        }

        // Flatten the results to get a list of courses
        const courseSet = new Set();
        const courses =
            purchasedCourses.BusinessPurchase.flatMap((purchase) =>
                purchase.BusinessPurchaseCourseQuantity.map(
                    (quantity) => quantity.BusinessCourse
                )
            ).filter((course) => {
                const isDuplicate = courseSet.has(course.id);
                // Set will only add course.id if it's unique
                courseSet.add(course.id);
                // returning FALSE so .filter will ignore all duplicate entries
                return !isDuplicate;
            }) ?? [];

        if (!courses) {
            return NextResponse.json({ error: "No courses found" });
        }

        return NextResponse.json({ data: courses });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Ops, Something went wrong while fetching list of all business orders",
        });
    }
}
