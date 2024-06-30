import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const businessCoursesList = await prisma.businessCourse.findMany({
      where: {
        status: "ACTIVE",
      },
    });

    if (!businessCoursesList) {
      return NextResponse.json({ error: "No course found" });
    }

    return NextResponse.json({ data: businessCoursesList });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error:
        "Ops, Something went wrong while fetching list of all business courses",
    });
  }
}
