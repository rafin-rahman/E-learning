import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";
import { checkRole } from "@/lib/middlewareFunctions";

export async function middleware(request: NextRequest) {
  // Check for cookies and redirect if not present
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // if there's cookies, validate it
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = (await jose.jwtVerify(jwt, secret, {})) as {
      payload: { userRole: string[]; sub: string };
    };

    const userRole = payload.userRole;
    const currentRoute: string = request.nextUrl.pathname;

    // Define the configuration for your routes and their allowed allowedRoles
    const routeRoleConfig = [
      {
        route: "/studentSpace:path*",
        roles: ["STUDENT"],
      },
      {
        route: "/dashboard:path*",
        roles: ["STAFF"],
      },
      {
        route: "/dashboard/admin/manageUsers:path*",
        roles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        route: "/dashboard/admin/manageCourses:path*",
        roles: ["SUPER_ADMIN", "COURSE_MANAGER"],
      },
      // Add more route configurations here as needed
      // {route: "another-route-path", allowedRoles: ["ROLE1", "ROLE2"]}
    ];

    // Loop over the configuration and check each route
    for (const configItem of routeRoleConfig) {
      const redirectUrl = checkRole(
        currentRoute,
        userRole,
        configItem.route,
        configItem.roles
      );
      if (redirectUrl) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
    }

    // if cookies are valid refresh the token
    if (payload.sub != null) {
      const newJwt = await new jose.SignJWT({
        userRole: userRole,
        userId: payload.sub,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("10min")
        .setSubject(payload.sub)
        .sign(secret);

      // Prepare response to set new cookie
      const response = NextResponse.next();
      response.cookies.set("Authorization", newJwt, {
        // 10 minutes
        maxAge: 600,
        path: "/",
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      });
      console.log("Middleware.ts - Refreshed session with 10 more minutes");
      return response;
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}
// matching paths
export const config = {
  matcher: ["/dashboard/:path*", "/studentSpace/:path*"],
};
