import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { businessCourseId: string } }
) {
  try {
    const businessCourse = await prisma.businessCourse.findFirst({
      where: {
        id: params.businessCourseId,
      },
    });

    if (!businessCourse) {
      return NextResponse.json({ error: "Ops, no course found" });
    }

    if (businessCourse.status != "ACTIVE") {
      return NextResponse.json({ error: "Ops, course not available anymore" });
    }

    return NextResponse.json({ data: businessCourse });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Ops, Something went wrong while fetching business course details",
    });
  }
}
