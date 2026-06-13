import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";
import { z } from "zod";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import ResetPasswordEmail from "@/components/emails/reset-password-template";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const fromMail: string = `${process.env.FROM_MAIL}`;

const ForgotSchema = z.object({
  adminEmail: z.string().email(),
});

export async function POST(request: Request) {
  try {
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: "Missing RESEND_API_KEY env var" }, { status: 500 });
    }

    const body = await request.json();
    const parsed = ForgotSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid input" }, { status: 400 });
    }

    const { adminEmail } = parsed.data;

    await connectDB();

    const admin = await AdminModel.findOne({ adminEmail });
    // For security, always respond with success.
    if (admin) {
      const token = uuidv4();
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

      admin.passwordResetToken = token;
      admin.passwordResetExpiresAt = expiresAt;
      await admin.save();

      const resend = new Resend(RESEND_API_KEY);
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      if (!appUrl) {
        return NextResponse.json({ ok: false, message: "Server misconfiguration: missing NEXT_PUBLIC_APP_URL" }, { status: 500 });
      }

      const resetUrl = new URL(`/admin?resetToken=${token}`, appUrl);

      const fromAddress = fromMail.includes("@")
        ? `Welcome <noreply@${fromMail.split("@")[1]}>`
        : `Welcome <noreply${fromMail}>`;

      await resend.emails.send({
        from: fromAddress,
        to: adminEmail,
        subject: "Reset your password",
        react: ResetPasswordEmail({ resetLink: resetUrl.toString() }),
      });
    }

    return NextResponse.json({ ok: true, message: "If an account exists, a reset link has been sent." });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, message: e instanceof Error ? e.message : "Failed to send reset email" }, { status: 500 });
  }
}

