import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, firstName, lastName } = body;

  // Check if user already exists
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return NextResponse.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
      },
    });
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    return NextResponse.json({ message: "User creation failed " + error });
  }
}
