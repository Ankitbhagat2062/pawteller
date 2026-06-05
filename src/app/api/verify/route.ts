import { NextResponse } from "next/server";
import { Resend } from "resend";
import PawtellerWelcomeEmail from "@/components/emails/welcome-template";
import connectDB from "@/lib/mongodb";
import SubscriberModel from "@/models/subscriber";

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

		// Deliver the Welcome Email and Features Overview
		const data = await resend.emails.send({
			from: `Welcome <${process.env.FROM_MAIL}>`,
			to: email,
			subject: "Welcome to our Newsletter!",
			react: PawtellerWelcomeEmail({ userFirstname: email.split("@")[0] }),
		});
		if (data.error && typeof data.error === "object" && "message" in data.error) {
			console.error("Error sending welcome email:", data.error);
			return NextResponse.json({ error: "Failed to send welcome email" }, { status: 500 });
		}

		// Single-use verification: update only if token matches and not already verified.
		const subscriber = await SubscriberModel.findOneAndUpdate(
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
		const appUrl =
			process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
		console.log("Delivered welcome email to:", subscriber.email, "Email send data:", data);
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

