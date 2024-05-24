import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from "jose";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;
  // Check if password matches with hashed password
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return NextResponse.json({
      error: "Password or email address is wrong",
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({
      error: "Password or email address is wrong",
    });
  }

  // create JWT token
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";
  const jwt = await new jose.SignJWT()
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2min")
    .setSubject(user.id.toString())
    .sign(secret);

  return NextResponse.json({ token: jwt });
}
