"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { userLoginTimeout } from "@/lib/company";

export default async function signInAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get data from the sign in form
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  let student;
  const staff = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (!staff) {
    student = await prisma.student.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!student) {
      return "Password or email address is wrong";
    }
  }

  const user = staff || student;
  if (!user) {
    return "Password or email address is wrong";
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return "Password or email address is wrong";
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({ userRole: user.role, userId: user.id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("10min")
    .setSubject(user.id.toString())
    .sign(secret);

  cookies().set("Authorization", jwt, {
    maxAge: 1800,
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
  });

  if (jwt) {
    // check if the user is a staff or student

    if (staff) {
      // redirect to staff dashboard
      redirect("/dashboard");
    }

    if (student) {
      // redirect to student dashboard
      redirect("/studentSpace");
    }

    redirect("/");
  } else {
    return "Something went wrong in the signinAction.tsx";
  }
}
