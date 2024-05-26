import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const subjects = await prisma.courseSubject.findMany();

    return NextResponse.json(subjects);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
