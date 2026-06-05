import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import VerifyEmail from "@/components/emails/verification-template";
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
	console.log("Received request to send verification email to:", request.url);
	const { searchParams } = new URL(request.url);
	const email = searchParams.get("email");

	if (!email) {
		return NextResponse.json({ error: "Missing email", success: false }, { status: 400 });
	}
	try {
		await connectDB();

		// If email is already registered (unique index), prevent creating a new subscriber record.
		const existingSubscriber = await SubscriberModel.findOne({ email });
		if (existingSubscriber) {
			return NextResponse.json(
				{ success: false, error: "Already registered email" },
				{ status: 409 },
			);
		}
		
		const verificationToken = uuidv4();
		const tokenVerifyUrl = new URL(
			`${process.env.NEXT_PUBLIC_APP_URL}/api/verify?email=${email}&token=${verificationToken}`,
		);
		const data = await resend.emails.send({
			from: `Welcome <noreply${process.env.FROM_MAIL}>`,
			to: email,
			subject: "Verify your email",
			react: VerifyEmail({ verificationLink: tokenVerifyUrl.toString() }),
		});
		if (data.error && typeof data.error === "object" && "message" in data.error) {
			console.error("Error sending verification email:", data.error);
			return NextResponse.json({ error: "Failed to send verification email" }, { status: 422 });
		}
		
		const subscriber = new SubscriberModel({
			email,
			verificationToken,
			isVerified: false,
		});
		await subscriber.save();

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

