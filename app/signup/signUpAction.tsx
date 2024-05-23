"use server";
import { redirect } from "next/navigation";

export default async function signUpAction(
  currentState: any,
  formData: FormData
): Promise<string> {
  // Get data from the signup form
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  // Send data to the API route
  const response = await fetch(process.env.LOCALHOST_URL + "/api/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, firstName, lastName }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (data.token) {
    // redirect to home page
    redirect("/");
  } else {
    return data.error;
  }
}
