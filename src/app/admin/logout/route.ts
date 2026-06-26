import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(new URL("/admin", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost"));

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

