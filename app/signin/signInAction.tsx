"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import * as jose from "jose";

export default async function signInAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get data from the sign in form
  const email = formData.get("email");
  const password = formData.get("password");

  // Send data to the API route
  const response = await fetch(process.env.LOCALHOST_URL + "/api/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.token === undefined) {
    return data.error;
  }

  cookies().set("Authorization", data.token, {
    //max age of 10 minutes
    maxAge: 600,
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
  });
  if (data.token) {
    // redirect to home page
    redirect("/dashboard");
  } else {
    return data.error;
  }
}
