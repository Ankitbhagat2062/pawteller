import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import DogBreed from "@/components/emails/DogBreed-template";
import QuizModel from "@/models/quiz";
import { z } from "zod";


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

  const TopMatchSchema = z.object({
    rank: z.number(),
    breed: z.string(),
    compatibility: z.number(),
    description: z.string().optional(),
    temperament: z.array(z.string()).optional(),
    lifespan: z.string().optional(),
    reasons: z.array(z.string()).optional(),
  });

  const QuizResultsSchema = z.object({
    userName: z.string(),
    topMatches: z.array(TopMatchSchema),
  });

  const QuizTopMatchSchema = QuizResultsSchema;

  try {
    const { email, results } = await request.json();

    // Ensure email presence (keep existing behavior)
    if (!email || !results) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const parsed = QuizResultsSchema.safeParse(results);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid results payload" },
        { status: 400 },
      );
    }

    const safeResults = parsed.data;


    await connectDB();

    const existingQuiz = await QuizModel.findOne({ email });

    if (existingQuiz) {
      return NextResponse.json(
        { error: "You have already given quiz" },
        { status: 400 },
      );
    }


    const from = fromMail.includes("<") ? fromMail : `Pawteller <noreply${fromMail}>`;


    const data = await resend.emails.send({
      from,
      to: email, // Where YOU want to receive the messages
      subject: `Your Top 3 Breed Match`,
      react: DogBreed(safeResults) // Use the React email template for the email body
    });


    if (data.error && typeof data.error === "object" && "message" in data.error) {
      console.error("Error sending contact email:", data.error);
      return NextResponse.json({ error: "Failed to send contact email" }, { status: 422 });
    }

    // Save the contact message to the database
    const contact = new QuizModel({ email, results: safeResults });

    await contact.save();

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Quiz route failed:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

