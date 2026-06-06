import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import DogBreed from "@/components/emails/DogBreed-template";
import QuizModel from "@/models/quiz";
import dns from 'dns'

// Initialize Resend with your API key from .env.local
const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function POST(request: Request) {
  if (!RESEND_API_KEY) {
    return NextResponse.json(
      {
        error: "Missing RESEND_API_KEY env var (expected process.env.RESEND_API_KEY)",
      },
      { status: 500 },
    );
  }

  const fromMail = process.env.FROM_MAIL;
  if (!fromMail) {
    return NextResponse.json(
      { error: "Missing FROM_MAIL or CONTACT_INBOX_MAIL env var" },
      { status: 500 },
    );
  }

  const resend = new Resend(RESEND_API_KEY);
  try {
    dns.setServers(["1.1.1.1","8.8.8.8"])
    const { email, results } = await request.json();

    // Basic validation
    if (!email || !results) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const existingContact = await QuizModel.findOne({ email, results });

    if (existingContact) {
      return NextResponse.json(
        { error: "You have already given quiz" },
        { status: 400 },
      );
    }

    console.log("Received contact form submission:", {  email, results });

    const from = fromMail.includes("<") ? fromMail : `Pawteller <noreply${fromMail}>`;

    const data = await resend.emails.send({
      from,
      to: email, // Where YOU want to receive the messages
      subject: `Your Top 3 Breed Match`,
      react: DogBreed(results) // Use the React email template for the email body
    });

    if (data.error && typeof data.error === "object" && "message" in data.error) {
      console.error("Error sending contact email:", data.error);
      return NextResponse.json({ error: "Failed to send contact email" }, { status: 422 });
    }

    // Save the contact message to the database
    const contact = new QuizModel({ email, results });
    await contact.save();

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Quiz route failed:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

