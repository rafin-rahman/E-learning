import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        courseLevel: true,
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
