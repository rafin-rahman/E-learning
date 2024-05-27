import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const image = await request.json();
  console.log("image URL::: ", image.url);

  try {
    await prisma.course.update({
      where: { id: id },
      data: {
        image: image.url,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Image URL saved successfully" },
    { status: 200 }
  );
}
