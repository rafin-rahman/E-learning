"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function logoutAction(currentState: any): Promise<string> {
  // logout user
  cookies().set("Authorization", "", {
    maxAge: 0,
    path: "/",
    sameSite: "strict",
    secure: true,
    httpOnly: true,
  });
  // redirect to home page
  redirect("/");
}
