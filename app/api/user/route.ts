import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// get user info using prisma
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId } = body;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    const cookieStore = cookies();
    cookieStore.set("Authorization", "", { maxAge: -1, path: "/" });
    return NextResponse.json({
      error: "User not found",
    });
  }
  return NextResponse.json(user);
}
