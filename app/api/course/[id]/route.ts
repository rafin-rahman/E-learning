import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const courses = await prisma.course.findFirst({
      where: {
        id: id,
      },
      include: {
        courseLevel: true,
        courseSubject: true,
        deliveryPartner: true,
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
