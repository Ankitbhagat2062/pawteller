import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { getGlobalKeysForRequest } from "@/db/globalKeys";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";
import EmailChangeTokenModel from "@/models/emailChangeToken";

import { verifyAdminToken } from "@/lib/admin/adminAuth";
import AdminEmailChangeTemplate from "@/components/emails/admin-email-change-template";

const requestEmailChangeSchema = z.object({
  newEmailAddress: z.string().email(),
  currentPassword: z.string().min(1),
});

const TOKEN_TTL_MINUTES = 15;

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing auth token" }, { status: 401 });
  }

  const verified = await verifyAdminToken(token);
  if (!verified.ok) {
    return NextResponse.json({ ok: false, error: "Invalid auth token" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | z.infer<typeof requestEmailChangeSchema>
    | null;
  const parsed = requestEmailChangeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  const { mongodbUri, resendApiKey } = await getGlobalKeysForRequest(request, verified.payload.adminEmail);

  if (!resendApiKey) {
    return NextResponse.json({ ok: false, error: "Missing RESEND_API_KEY" }, { status: 500 });
  }

  const fromMail = process.env.FROM_MAIL?.trim();
  if (!fromMail) {
    return NextResponse.json({ ok: false, error: "Missing FROM_MAIL" }, { status: 500 });
  }

  try {
    if (!mongodbUri) {
      return NextResponse.json({ ok: false, error: "Missing MongoDB configuration" }, { status: 500 });
    }

    await connectDB(mongodbUri);

    const admin = await AdminModel.findOne({ adminEmail: verified.payload.adminEmail });
    if (!admin) {
      return NextResponse.json({ ok: false, error: "Admin not found" }, { status: 404 });
    }

    const currentOk = await bcrypt.compare(parsed.data.currentPassword, admin.passwordHash);
    if (!currentOk) {
      return NextResponse.json({ ok: false, error: "Current password is incorrect" }, { status: 400 });
    }

    const newEmail = parsed.data.newEmailAddress.trim().toLowerCase();
    if (newEmail === admin.adminEmail.toLowerCase()) {
      return NextResponse.json({ ok: false, error: "New email must be different" }, { status: 400 });
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

    // Replace any existing outstanding token(s) for this admin.
    await EmailChangeTokenModel.deleteMany({ adminEmail: admin.adminEmail });

    const emailChange = new EmailChangeTokenModel({
      adminEmail: admin.adminEmail,
      newEmail,
      token,
      expiresAt,
      usedAt: null,
    });
    await emailChange.save();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      return NextResponse.json(
        { ok: false, error: "Server misconfiguration: missing NEXT_PUBLIC_APP_URL" },
        { status: 500 },
      );
    }

    const verificationUrl = new URL(
      `/api/auth/verify-email-change?token=${encodeURIComponent(token)}`,
      appUrl,
    );

    const resend = new Resend(resendApiKey);

    const fromAddress: string = fromMail.includes("@")
      ? `Pawteller <noreply@${fromMail.split("@")[1]}>`
      : `Pawteller <noreply${fromMail}>`;

    const data = await resend.emails.send({
      from: fromAddress,
      to: newEmail,
      subject: "Confirm your email change",
      react: AdminEmailChangeTemplate({
        verificationLink: verificationUrl.toString(),
        previousEmail: admin.adminEmail,
        newEmail,
      }),
    });

    if (data.error && typeof data.error === "object" && "message" in data.error) {
      // Best-effort cleanup so we don't leave dangling tokens.
      await EmailChangeTokenModel.deleteOne({ token });
      return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 422 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

