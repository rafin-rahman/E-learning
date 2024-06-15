"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

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
      email: email.toLowerCase(),
    },
  });

  if (existingUser) {
    return "User already exists";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });
    return "User created";
  } catch (err) {
    return "User creation failed";
  }
}
