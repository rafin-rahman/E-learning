"use server";
import prisma from "@/lib/prisma";

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
