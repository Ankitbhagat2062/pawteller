import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import ResetPasswordEmail from "@/components/emails/reset-password-template";
import { getGlobalKeysByAdminEmail } from "@/db/globalKeys";
import connectDB from "@/lib/mongodb";

import AdminModel from "@/models/admin";

const fromMail: string = `${process.env.FROM_MAIL}`;

const ForgotSchema = z.object({
  adminEmail: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ForgotSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid input" },
        { status: 400 },
      );
    }

    const { adminEmail } = parsed.data;
    const { resendApiKey, mongodbUri } = await getGlobalKeysByAdminEmail(adminEmail);
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Missing RESEND_API_KEY env var" },
        { status: 500 },
      );
    }

    await connectDB(mongodbUri);

    const admin = await AdminModel.findOne({ adminEmail });
    // For security, always respond with success.
    if (admin) {
      const token = uuidv4();
      const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

      // Store only a hash of the token (avoid plaintext reset tokens in DB).
      const tokenHash = await bcrypt.hash(token, 10);

      admin.passwordResetToken = tokenHash;
      admin.passwordResetExpiresAt = expiresAt;
      await admin.save();

      const resend = new Resend(resendApiKey);
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;
      if (!appUrl) {
        return NextResponse.json(
          {
            ok: false,
            message: "Server misconfiguration: missing NEXT_PUBLIC_APP_URL",
          },
          { status: 500 },
        );
      }

      const resetUrl = new URL(`/admin?resetToken=${token}`, appUrl);

      const fromAddress = fromMail.includes("@")
        ? `Welcome <noreply@${fromMail.split("@")[1]}>`
        : `Welcome <noreply${fromMail}>`;
      try {
        await resend.emails.send({
          from: fromAddress,
          to: adminEmail,
          subject: "Reset your password",
          react: ResetPasswordEmail({ resetLink: resetUrl.toString() }),
        });
      } catch (error) {
        console.error("Error sending reset email:", error);
      }
    }

    return NextResponse.json({
      ok: true,
      message: "If an account exists, a reset link has been sent.",
    });
  } catch (e: unknown) {
    console.error("Forgot-password failed", e);
    return NextResponse.json(
      {
        ok: true,
        message: "If an account exists, a reset link has been sent.",
      },
      { status: 200 },
    );
  }
}
