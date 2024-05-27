"use server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
type ErrorResponse = {
  error: string;
};
export default async function signUpAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get data from the signup form
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return "User already exists";
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
    return "User created";
  } catch (err) {
    return "User creation failed";
  }
}
