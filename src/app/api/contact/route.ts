import ContactThankYouEmail from "@/components/emails/contact-template";
import ContactModel from "@/models/contact";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Resend } from "resend";


// Initialize Resend with your API key from .env.local
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
  const fromMail = process.env.FROM_MAIL;
  if (!fromMail) {
    return NextResponse.json(
      { error: "Missing FROM_MAIL or CONTACT_INBOX_MAIL env var" },
      { status: 500 },
    );
  }
  const resend = new Resend(RESEND_API_KEY);
  try {
    const { name, email, topic, message } = await request.json();

    // Basic validation
    if (!name || !email || !message || !topic) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await connectDB();

    const existingContact = await ContactModel.findOne({ email, topic, message, name });

    if (existingContact) {
      return NextResponse.json({ error: "A contact with these details already exists" }, { status: 400 });
    }
    // Send the email to YOUR own email address
    const data = await resend.emails.send({
      from: `<${fromMail}>`,
      to: email, // Where YOU want to receive the messages
      subject: `New Contact Form Submission from ${name}`,
      react: ContactThankYouEmail({ name }), // Use the React email template for the email body
    });
    if (data.error && typeof data.error === "object" && "message" in data.error) {
      console.error("Error sending contact email:", data.error);
      return NextResponse.json({ error: "Failed to send contact email" }, { status: 500 });
    }
    // Save the contact message to the database
    const contact = new ContactModel({ name, email, topic, message });
    await contact.save();

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Contact route failed:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
