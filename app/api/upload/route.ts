import { NextResponse, NextRequest } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const file = body.get("file") as File;

  if (!file.name) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }
  const blobResult = await put(file.name, file, {
    access: "public",
  });

  console.log("blobResult");
  console.log(blobResult);

  return NextResponse.json(blobResult);
}
