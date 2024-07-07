import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.log("server coursesList");

  try {
    const coursesList = await prisma.businessCourse.findMany({
      where: {
        status: "ACTIVE",
      },
      select: {
        title: true,
        description: true,
        thumbnail: true,
        price: true,
      },
    });
    if (!coursesList) {
      return NextResponse.json({ error: "No courses found" });
    }
    console.log("server coursesList");
    return NextResponse.json({ data: coursesList });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" });
  }
}
