import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, firstName, lastName } = body;
  console.log(firstName);

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
    await prisma.user.create({
      data: {
        firstName: "firstName",
        lastName: lastName,
        email: email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ message: "User created" });
  } catch (error) {
    return NextResponse.json({ message: "User creation failed " + error });
  }
}
