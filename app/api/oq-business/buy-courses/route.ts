import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("API connection");

    // buy 1 business course at a time, you can buy multiple quantities.
    interface CourseDetails {
        courseId: string;
        courseQuantity: number;
        businessId: string;
    }

    try {
        const body = await request.json();
        const { courseQuantity, courseId, businessId } = body as CourseDetails;

        //region Find ACTIVE business
        const business = await prisma.business.findUnique({
            where: {
                id: businessId,
            },
        });

        if (!business) {
            return NextResponse.json({
                error: "No ACTIVE business found",
            });
        }
        //endregion
        //region Find ACTIVE course
        const businessCourse = await prisma.businessCourse.findUnique({
            where: {
                id: courseId,
            },
        });

        if (!businessCourse) {
            return NextResponse.json({ error: "Course not found" });
        }
        //endregion
        //region CREATE businessPurchase & BusinessPurchaseCourseQuantity
        const businessPurchase = await prisma.businessPurchase.create({
            data: {
                status: "COMPLETED",
                businessId: businessId,
                BusinessPurchaseCourseQuantity: {
                    create: {
                        quantity: courseQuantity,
                        BusinessCourse: {
                            connect: {
                                id: businessCourse.id,
                            },
                        },
                    },
                },
            },
        });
        if (!businessPurchase) {
            return NextResponse.json({ error: "Could not add licences" });
        }
        //endregion

        return NextResponse.json({
            message: ` ${courseQuantity} licenses added to ${business.name}`,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" });
    }
}
