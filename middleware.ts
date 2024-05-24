import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  // Check for cookies and redirect if not present
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // if there's cookies, validate it
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  // try {
  //   console.log("refreshed token");
  //   const { payload } = await jose.jwtVerify(jwt, secret, {});
  //   // if cookies are valid refresh the token
  //   if (payload.sub != null) {
  //     const newJwt = await new jose.SignJWT()
  //       .setProtectedHeader({ alg: "HS256" })
  //       .setIssuedAt()
  //       .setExpirationTime("10min")
  //       .setSubject(payload.sub)
  //       .sign(secret);
  //
  //     // Prepare response to set new cookie
  //     const response = NextResponse.next();
  //     response.cookies.set("Authorization", newJwt, {
  //       maxAge: 600,
  //       path: "/",
  //       sameSite: "strict",
  //       secure: true,
  //       httpOnly: true,
  //     });
  //
  //     return response;
  //   }
  // } catch (err) {
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }
}
// matching paths
export const config = {
  matcher: "/protected/:path*",
};
