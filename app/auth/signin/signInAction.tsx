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
  const userType = formData.get("userType") as string;
  console.log("userType", userType);
  let student;
  let staff;
  let companyEmployee;

  if (userType === "staff") {
    staff = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  if (userType === "student") {
    student = await prisma.student.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  if (userType === "companyEmployee") {
    companyEmployee = await prisma.businessEmployee.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
  }

  const user = staff || student || companyEmployee;
  if (!user) {
    return "Password or email address is wrong";
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return "Password or email address is wrong";
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const jwt = await new jose.SignJWT({ userRole: user.roles, userId: user.id })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(`${userLoginTimeout}s`) // 30 minutes
    .setSubject(user.id.toString())
    .sign(secret);

  cookies().set("Authorization", jwt, {
    maxAge: userLoginTimeout, // 30 minutes
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
  });

  if (jwt) {
    // check if the user is a staff or student

    if (staff) {
      // redirect to staff dashboard
      redirect("/oq-staff");
    } else if (student) {
      // redirect to student dashboard
      redirect("/studentSpace");
    } else if (
      companyEmployee &&
      companyEmployee.roles.includes("COMPANY_EMPLOYEE")
    ) {
      // redirect to business employee dashboard
      redirect("/oq-business/learning");
    } else if (
      companyEmployee &&
      companyEmployee.roles.includes("COMPANY_ADMIN")
    ) {
      // redirect to business admin dashboard
      redirect("/oq-business/learning");
    }

    redirect("/");
  } else {
    return "Something went wrong in the signInAction.tsx";
  }
}
