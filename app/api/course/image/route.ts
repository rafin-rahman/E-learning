import { NextResponse, NextRequest } from "next/server";
import { put, del } from "@vercel/blob";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const file = body.get("file") as File;
  const courseID = body.get("courseID") as string;

  if (!file.name) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const course = await prisma.course.findFirst({
    where: {
      id: courseID,
    },
    select: {
      image: true,
    },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  // If course has an image, delete it
  if (course.image) {
    const currentImageUrl = course.image;
    del(currentImageUrl);
  }

  const pathName = "course/" + courseID + "/" + file.name;
  const blobResult = await put(pathName, file, {
    access: "public",
  });

  return NextResponse.json(blobResult);
}
