import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/mongodb";
import Subscriber from "@/models/subscriber";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

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

  if (!token)
    return NextResponse.json(
      { error: "Missing verification token" },
      { status: 400 },
    );

  try {
    await connectToDatabase();

    // Find and update subscriber if the token matches
    const subscriber = await Subscriber.findOneAndUpdate(
      { verificationToken: token, isVerified: false },
      { isVerified: true, verificationToken: null },
      { new: true },
    );

    if (!subscriber) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 },
      );
    }

    // Deliver the Welcome Email and Features Overview
    await resend.emails.send({
      from: `Welcome <${process.env.FROM_MAIL}>`,
      to: subscriber.email,
      subject: "Welcome to our Newsletter!",
      html: `
        <h2>You are now officially verified! 🎉</h2>
        <p>Thanks for subscribing. Here is what you can look forward to:</p>
        <ul>
          <li><strong>Automated Newsletter:</strong> Monthly industry roundups.</li>
          <li><strong>Feature Updates:</strong> Real-time beta logs on our platform features.</li>
        </ul>
      `,
    });

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
    return NextResponse.redirect(new URL("/subscribed-success", appUrl));
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
