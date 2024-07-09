import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";
import { checkRole } from "@/lib/middlewareFunctions";
import { userLoginTimeout } from "@/lib/company";

export async function middleware(request: NextRequest) {
  // Check for cookies and redirect if not present
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // if there's cookies, validate it
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = (await jose.jwtVerify(jwt, secret, {})) as {
      payload: { userRole: string[]; sub: string; userId: string };
    };

    //TODO uncomment this to complete the user status check
    //TODO API/user route needs to be adjust with user / student / businessEmployee

    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_LOCALHOST_URL}/api/user`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userId: payload.userId }),
    //   }
    // );
    // const user = await response.json();
    //
    // // Logout and redirect if user account is not active
    // if (user.status !== "ACTIVE") {
    //TODO: add proper error message for the user, so they know their account is suspended

    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    const userRole = payload.userRole;
    const currentRoute: string = request.nextUrl.pathname;

    // Define the configuration for your routes and their allowed roles
    const routeRoleConfig = [
      // major routes: oq-staff, oq-business, oq-learner, oq-recruiter
      {
        route: "/oq-staff:path*",
        roles: ["STAFF"],
      },
      {
        route: "/oq-business/:path*",
        roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "COMPANY_EMPLOYEE"],
      },
      {
        route: "/oq-learner:path*",
        roles: ["STUDENT"],
      },
      {
        route: "/oq-recruiter:path*",
        roles: ["RECRUITER"],
      },
      // sub pages
      {
        route: "/oq-staff/admin/manageUsers:path*",
        roles: ["SUPER_ADMIN"],
      },
      {
        route: "/oq-staff/admin/manageCourses:path*",
        roles: ["SUPER_ADMIN", "COURSE_MANAGER"],
      },

      // Add more route configurations here as needed
      // {route: "another-route-path",
      // roles: ["ROLE1", "ROLE2"]}
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
        .setExpirationTime(`${userLoginTimeout}s`) // 30 minutes
        .setSubject(payload.sub)
        .sign(secret);

      // Prepare response to set new cookie
      const response = NextResponse.next();
      response.cookies.set("Authorization", newJwt, {
        maxAge: userLoginTimeout, // 30 minutes
        path: "/",
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      });
      console.log("Middleware.ts - Refreshed session with 10 more minutes");
      return response;
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}
// matching paths
export const config = {
  matcher: [
    "/oq-staff/:path*",
    "/oq-learner/:path*",
    "/oq-business/:path*",
    "/oq-recruiter/:path*",
  ],
};
