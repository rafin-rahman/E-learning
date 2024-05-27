import { NextResponse, NextRequest } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const file = body.get("file") as File;
  const courseID = body.get("courseID") as string;
  console.log("courseID:::", courseID);

  if (!file.name) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const pathName = "course/courseID/" + file.name;
  const blobResult = await put(pathName, file, {
    access: "public",
  });

  return NextResponse.json(blobResult);
}
