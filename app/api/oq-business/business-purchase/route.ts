import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { companyId } = body;

  try {
    // const businessPurchases = await prisma.businessPurchase.findMany({
    //   where: {
    //     businessId: businessId,
    //     status: "COMPLETED",
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });
    //
    // if (!businessPurchases) {
    //   return NextResponse.json({ error: "No order found" });
    // }
    //
    // return NextResponse.json({ data: businessPurchases });

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
    const courses = purchasedCourses.BusinessPurchase.flatMap((purchase) =>
      purchase.BusinessPurchaseCourseQuantity.map(
        (quantity) => quantity.BusinessCourse
      )
    );

    if (!courses) {
      return NextResponse.json({ error: "No courses found" });
    }

    return NextResponse.json({ data: courses });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error:
        "Ops, Something went wrong while fetching list of all business orders",
    });
  }
}
