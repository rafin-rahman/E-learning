import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const levels = await prisma.courseLevel.findMany();
    return NextResponse.json(levels);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
