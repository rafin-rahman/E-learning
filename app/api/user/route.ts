import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
// get user info by id
export async function POST(request: NextRequest) {
  const body = await request.json();

  const { userId } = body;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(user);
}
