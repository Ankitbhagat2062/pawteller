import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import DogBreed from "@/components/emails/DogBreed-template";
import { getGlobalKeysForRequest } from "@/db/globalKeys";
import connectDB from "@/lib/mongodb";
import QuizModel from "@/models/quiz";
const TopMatchSchema = z.object({
  rank: z.number(),
  breed: z.string(),
  compatibility: z.number(),
  description: z.string().optional(),
  temperament: z.array(z.string()).optional(),
  lifespan: z.string().optional(),
  reasons: z.array(z.string()).optional(),
  scoreBreakdown: z
    .object({
      apartmentLiving: z.string(),
      lifestyleMatch: z.string(),
      kidFriendly: z.string(),
      beginnerFriendly: z.string(),
      lowShedding: z.string(),
      sizePreference: z.string(),
      total: z.string(),
    })
    .optional(),
});

const QuizResultsSchema = z.object({
  userName: z.string(),
  topMatches: z
    .array(TopMatchSchema)
    .min(1, "At least one match is required"),
});

const QuizIdSchema = z
  .string()
  .min(1, "quizId is required")
  .max(200, "quizId is too long");

const SubmissionSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((value) => value.toLowerCase()),
  quizId: z.string(),
  results: QuizResultsSchema,
});
const correctedFrom = (fromMail: String) => {
  const trimmed = fromMail.trim();

  // If already in the form "Name <mailbox>", keep verbatim.
  if (trimmed.includes("<")) return trimmed;

  // If it's a full mailbox like "hello@example.com", format as "Pawteller <...>".
  if (trimmed.includes("@")) return `Pawteller <noreply${trimmed}>`;

  // If it's a bare domain or starts with '@', construct "noreply@domain".
  // Also handles cases like ".com"/"example.com" vs leading "@".
  const domain = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
  return `Pawteller <noreply@${domain}>`;
};

export async function POST(request: Request) {
  const { mongodbUri, resendApiKey } = await getGlobalKeysForRequest(request);
  const fromMail = process.env.FROM_MAIL;
  if (!fromMail || !resendApiKey) {
    return NextResponse.json(
      { error: "Missing FROM_MAIL or resendApiKey env var" },
      { status: 500 },
    );
  }
  const resend = new Resend(resendApiKey);
  const emailFrom = correctedFrom(fromMail);

  try {
    const submission = SubmissionSchema.safeParse(await request.json());
    if (!submission.success) {
      console.log('Zod Schema Validation failed')
      return NextResponse.json(
        { error: "Zod Schema Validation failed" },
        { status: 400 },
      );
    }
    const { email, quizId, results } = submission.data;

    // Ensure required fields are present (keep existing behavior for email/results)
    if (!email || !quizId || !results) {
      console.log('Email , quizId or results is not present')
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 500 },
      );
    }

    const parsedQuizId = QuizIdSchema.safeParse(quizId);
    const parsed = QuizResultsSchema.safeParse(results);

    const safeQuizId = parsedQuizId.data;
    if (!parsed.success || !parsedQuizId.success) {
      console.log('Zod Schema Validation failed')
      return NextResponse.json(
        { error: "Zod Schema Validation failed" },
        { status: 400 },
      );
    }

    await connectDB(mongodbUri);
    const safeResults = parsed.data;
    // Persist first (so we can update delivery status after sending)
    const quiz = new QuizModel({
      email,
      results: safeResults,
      quizId: safeQuizId,
      status: "pending",
    });
    await quiz.save();
    const data = await resend.emails.send({
      from: emailFrom,
      to: email, // Where YOU want to receive the messages
      subject: `Your Top 3 Breed Match`,
      react: DogBreed(safeResults), // Use the React email template for the email body
    });
    await QuizModel.findByIdAndUpdate(quiz._id, { status: "sent" });
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Quiz route failed:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
