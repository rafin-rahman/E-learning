"use server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export default async function getImageUrlAction(
  courseId: string
): Promise<string> {
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
    },
    select: {
      image: true,
    },
  });

  if (!course) {
    return "";
  }

  return course.image;
}
