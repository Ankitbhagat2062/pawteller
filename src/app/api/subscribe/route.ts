import crypto from "crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongodb";
import Subscriber from "@/models/subscriber";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
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
  try {
    const { email } = await request.json();
    if (!email)
      return NextResponse.json({ error: "Email is required" }, { status: 400 });

    await connectToDatabase();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const fromMail = process.env.FROM_MAIL;
    if (!appUrl || !fromMail) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_APP_URL or FROM_MAIL env var" },
        { status: 500 },
      );
    }
    const token = crypto.randomBytes(32).toString("hex");
    const verificationUrl = `${appUrl}/api/verify?token=${token}`;
    // Find existing unverified user or create a new entry
    await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { verificationToken: token, isVerified: false },
      { upsert: true, new: true },
    );

    // Send the Verification Email via Resend
    await resend.emails.send({
      from: `<${fromMail}>`,
      to: email,
      subject: "Verify your subscription",
      html: `
        <p>Please click the link below to verify your email address and subscribe:</p>
        <a href="${verificationUrl}">Click here to verify</a>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Verification email sent!",
    });
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
