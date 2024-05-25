import { NextResponse } from "next/server";

export function removeCookie() {
  const response = NextResponse.json({ message: "Logged out" });
  const earlier = new Date(Date.now() - 1000).toUTCString();
  response.headers.append(
    "Set-Cookie",
    `Authorization=; Max-Age=0; HttpOnly; SameSite=strict; Expires=${earlier}; Path=/;`
  );

  return response;
}
