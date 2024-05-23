import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();

  interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const { email, password, firstName, lastName } = body as User;
  console.log(firstName);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json({ message: "User created", user: newUser });
  } catch (error) {
    return NextResponse.json({ message: "User creation failed", error });
  }
}
