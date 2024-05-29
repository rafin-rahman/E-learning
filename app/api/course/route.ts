import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // no cache
  request.headers.set("Cache-Control", "no-cache");
  try {
    const courses = await prisma.course.findMany({
      include: {
        courseLevel: true,
        courseSubject: true,
        deliveryPartner: true,
      },
    });

    if (!courses) {
      return NextResponse.json(
        { message: "No courses found" },
        { status: 404 }
      );
    }

    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
