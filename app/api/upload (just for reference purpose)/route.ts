import { NextResponse, NextRequest } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const body = await request.formData();
  const file = body.get("file") as File;

  if (!file.name) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const pathName = "users/userID/asdas";
  const blobResult = await put(pathName, file, {
    access: "public",
  });

  return NextResponse.json(blobResult);
}

export async function GET(request: NextRequest) {}
