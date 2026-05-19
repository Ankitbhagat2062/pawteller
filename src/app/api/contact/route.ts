import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your API key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, topic, message } = await request.json();

    // Basic validation
    if (!name || !email || !message || !topic) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Send the email to YOUR own email address
    const data = await resend.emails.send({
      from: "Contact Form <website@yourdomain.com>", // Must be a verified domain in Resend
      to: "your-personal-email@gmail.com", // Where YOU want to receive the messages
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
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
