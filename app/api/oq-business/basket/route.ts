import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Hello, World!" });
}
