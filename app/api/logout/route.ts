import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  cookieStore.set("Authorization", "", { maxAge: -1, path: "/" });

  return NextResponse.json({ message: "Logged out" });
}
