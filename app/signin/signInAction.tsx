"use server";
import { redirect } from "next/navigation";

export default async function SignInAction(
  currentState: any,
  formData: FormData
) {
  // Get data from the signin form
  const email = formData.get("email");
  const password = formData.get("password");
  // Send data to the API route
  const response = await fetch("/api/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (data.token) {
    // redirect to home page
    redirect("/protected");
  }
}
