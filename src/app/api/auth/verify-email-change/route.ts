import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getGlobalKeysForRequest } from "@/db/globalKeys";
import AdminModel from "@/models/admin";
import EmailChangeTokenModel from "@/models/emailChangeToken";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token")?.trim();

  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing token" }, { status: 400 });
  }

  const { mongodbUri } = await getGlobalKeysForRequest(request);
  if (!mongodbUri) {
    return NextResponse.json({ ok: false, error: "Missing MongoDB configuration" }, { status: 500 });
  }

  try {
    await connectDB(mongodbUri);

    const now = new Date();

    // Single-use atomic verification:
    // 1) match token, expiry, and not-yet-used
    // 2) capture adminEmail + newEmail
    const emailToken = await EmailChangeTokenModel.findOne({
      token,
      expiresAt: { $gt: now },
      usedAt: null,
    });

    if (!emailToken) {
      return NextResponse.json({ ok: false, error: "Invalid or expired token" }, { status: 400 });
    }

    // Update admin email and mark token used.
    const updated = await AdminModel.findOneAndUpdate(
      { adminEmail: emailToken.adminEmail },
      { $set: { adminEmail: emailToken.newEmail } },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Admin not found" }, { status: 404 });
    }

    emailToken.usedAt = new Date();
    await emailToken.save();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (appUrl) {
      return NextResponse.redirect(new URL("/admin/settings", appUrl));
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

