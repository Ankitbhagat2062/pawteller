import { NextResponse } from "next/server";
import { Resend } from "resend";
import PawtellerWelcomeEmail from "@/components/emails/welcome-template";
import connectDB from "@/lib/mongodb";
import SubscriberModel from "@/models/subscriber";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const fromMail: string = `${process.env.FROM_MAIL}`;

export async function GET(request: Request) {
  if (!RESEND_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Missing RESEND_API_KEY env var (expected process.env.RESEND_API_KEY)",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }
  if (!token)
    return NextResponse.json(
      { error: "Missing verification token" },
      { status: 400 },
    );

  try {
    await connectDB();

    // Single-use verification: update only if token matches, not already verified, and not expired.
    const now = new Date();
    const subscriber = await SubscriberModel.findOneAndUpdate(
      {
        email,
        verificationToken: token,
        isVerified: false,
        expiresAt: { $gt: now },
      },
      { isVerified: true, verificationToken: null },
      { new: true },
    );

    if (!subscriber) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }
    const fromAddress: string = fromMail.includes("@")
      ? `Welcome <noreply@${fromMail.split("@")[1]}>`
      : `Welcome <noreply${fromMail}>`;
    // Deliver the Welcome Email and Features Overview
    const data = await resend.emails.send({
      from: fromAddress,
      to: subscriber.email,
      subject: "Welcome to our Newsletter!",
      react: PawtellerWelcomeEmail({
        userFirstname: email.includes("@") ? email.split("@")[0] : "there",
      }),
    });
    if (
      data.error &&
      typeof data.error === "object" &&
      "message" in data.error
    ) {
      console.error("Error sending welcome email:", data.error);
      // Continue redirecting; verification already succeeded via findOneAndUpdate.
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
    return NextResponse.redirect(new URL("/blog", appUrl));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
