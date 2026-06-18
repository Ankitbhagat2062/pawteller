import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import VerifyEmail from "@/components/emails/verification-template";
import connectDB from "@/lib/mongodb";
import SubscriberModel from "@/models/subscriber";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const fromMail= process.env.FROM_MAIL?.trim();
export async function POST(request: Request) {
  if (!RESEND_API_KEY || !fromMail) {
    return NextResponse.json(
      {
        error:
          "Missing RESEND_API_KEY or FROM_MAIL env var (expected process.env.RESEND_API_KEY and process.env.FROM_MAIL)",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  const body = (await request.json().catch(() => null)) as
    | { email?: string }
    | null;
  const email = body?.email?.trim();

  if (!email) {
    return NextResponse.json(
      { error: "Missing email", success: false },
      { status: 400 },
    );
  }
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      return NextResponse.json(
        { error: "Server misconfiguration: missing NEXT_PUBLIC_APP_URL" },
        { status: 500 },
      );
    }
    await connectDB();

    // If email is already registered (unique index), prevent creating a new subscriber record.
    const existingSubscriber = await SubscriberModel.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, error: "Already Registered User " },
        { status: 400 },
      );
    }

    const verificationToken = uuidv4();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const subscriber = new SubscriberModel({
      email,
      verificationToken,
      expiresAt,
      isVerified: false,
    });

    await subscriber.save();

    const tokenVerifyUrl = new URL(
      `/api/verify?email=${email}&token=${verificationToken}`,
      appUrl,
    );
    const fromAddress: string = fromMail.includes("@")
      ? `Welcome <noreply@${fromMail.split("@")[1]}>`
      : `Welcome <noreply${fromMail}>`;
    // Deliver the Welcome Email and Features Overview
    const data = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Verify your email",
      react: VerifyEmail({ verificationLink: tokenVerifyUrl.toString() }),
    });
    if (
      data.error &&
      typeof data.error === "object" &&
      "message" in data.error
    ) {
      console.error("Error sending verification email:", data.error);
      await SubscriberModel.deleteOne({ email });
      return NextResponse.json(
        { error: "Failed to send verification email" },
        { status: 422 },
      );
    }
    return NextResponse.json({ success: true });
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
