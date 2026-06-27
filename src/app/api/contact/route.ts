import axios from "axios";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactThankYouEmail from "@/components/emails/contact-template";
import { getGlobalKeysForRequest } from "@/db/globalKeys";
import connectDB from "@/lib/mongodb";
import ContactModel from "@/models/contact";
import SubscriberModel from "@/models/subscriber";

export async function POST(request: Request) {
  const { mongodbUri, resendApiKey } = await getGlobalKeysForRequest(request);

  if (!resendApiKey) {
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

  const resend = new Resend(resendApiKey);
  try {
    const { name, email, topic, message } = await request.json();

    // Basic validation
    if (!name || !email || !message || !topic) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await connectDB(mongodbUri);

    const existingContact = await ContactModel.findOne({
      email,
      topic,
      message,
      name,
    });

    if (existingContact) {
      return NextResponse.json(
        { error: "A contact with these details already exists" },
        { status: 400 },
      );
    }

    // Save the contact message to the database
    // Save the contact message to the database
    const contact = new ContactModel({ name, email, topic, message });
    await contact.save();

    const trimmed = fromMail.trim();
    let fromAddress = "";

    if (trimmed.startsWith("@")) {
      // Fixes '@pawteller.com' by prefixing a standard mailbox name
      fromAddress = `Pawteller <contact${trimmed}>`;
    } else if (trimmed.includes("<") && trimmed.includes(">")) {
      fromAddress = trimmed;
    } else if (trimmed.includes("@")) {
      fromAddress = `Pawteller <${trimmed}>`;
    } else {
      fromAddress = `Pawteller <noreply@${trimmed}>`;
    }

    // Now Resend receives a perfectly formatted string like: "Pawteller <contact@pawteller.com>"
    const data = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: `New Contact Form Submission from ${name}`,
      react: ContactThankYouEmail({ name }),
    });
    if (
      data.error &&
      typeof data.error === "object" &&
      "message" in data.error
    ) {
      console.error("Error sending contact email:", data.error);
      return NextResponse.json(
        { error: "Failed to send contact email" },
        { status: 422 },
      );
    }
    const user = await SubscriberModel.findOne({ email });
    if (!user) {
      console.log(
        "Email not found in subscribers, sending welcome email to:",
        email,
      );
      const url = new URL(
        "/api/send-verification-email",
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      );
      try {
        await axios.post(
          url.toString(),
          { email },
          {
            timeout: 5000,
            headers: { "Content-Type": "application/json" },
          },
        );
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }
    }
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Contact route failed:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
