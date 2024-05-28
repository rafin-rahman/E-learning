import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// get student info by id
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { studentId } = body;
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });
  if (!student) {
    return NextResponse.json(
      {
        error: "Student not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(student);
}
