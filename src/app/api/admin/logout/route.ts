import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const baseUrl =   process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const res = NextResponse.redirect(new URL("/admin", baseUrl), {
    status: 303,
  });
  // Expire the auth cookie so server components stop accepting the session.
  // Keep both path variants to match how other code may set it.
  res.cookies.set("adminAuthToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.cookies.set("adminAuthToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });

  return res;
}

