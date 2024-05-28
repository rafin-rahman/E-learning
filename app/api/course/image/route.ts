import { NextResponse, NextRequest } from "next/server";
import { put, del } from "@vercel/blob";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const file = body.get("file") as File;
  const courseId = body.get("courseID") as string;

  if (!file.name) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Find course by courseId, get only image field
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
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
    //TODO Testing function, keep only  del(currentImageUrl) when done with testing
    // This helps when we seed courses with a default image, we don't want to delete it whilst testing
    if (
      currentImageUrl !==
      "https://smu7wqatocnljzs9.public.blob.vercel-storage.com/online%20learning-CSOyhUf2yhXsFKHTqNql2GaDHyE8wx.webp"
    ) {
      del(currentImageUrl);
    }
  }

  const pathName = "course/" + courseId + "/" + file.name;
  const blobResult = await put(pathName, file, {
    access: "public",
  });

  return NextResponse.json(blobResult);
}
