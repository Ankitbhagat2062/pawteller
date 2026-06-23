import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import DogBreed from "@/components/emails/DogBreed-template";
import { getGlobalKeysForRequest } from "@/db/globalKeys";
import connectDB from "@/lib/mongodb";
import QuizModel from "@/models/quiz";

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

  try {
    const SubmissionSchema = z.object({
      email: z
        .string()
        .trim()
        .email()
        .transform((value) => value.toLowerCase()),
      quizId: z.string(),
      results: QuizResultsSchema,
    });
    const submission = SubmissionSchema.safeParse(await request.json());
    if (!submission.success) {
      console.log('Zod Validation failed')
      return NextResponse.json(
        { error: "Invalid quiz payload" },
        { status: 400 },
      );
    }
    const { email, quizId, results } = submission.data;

    // Ensure required fields are present (keep existing behavior for email/results)
    if (!email || !quizId || !results) {
      console.log('Email , quizId or results is not present')
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const parsedQuizId = QuizIdSchema.safeParse(quizId);
    if (!parsedQuizId.success) {
      console.log('QuizId schema failed')
      return NextResponse.json(
        { error: parsedQuizId.error.issues[0]?.message ?? "Invalid quizId" },
        { status: 400 },
      );
    }

    const safeQuizId = parsedQuizId.data;

    const parsed = QuizResultsSchema.safeParse(results);
    if (!parsed.success) {
      console.log('Results schema failed')
      return NextResponse.json(
        { error: "Invalid results payload" },
        { status: 400 },
      );
    }

    const safeResults = parsed.data;

    await connectDB(mongodbUri);

    const existingQuiz = await QuizModel.findOne({ email, quizId: safeQuizId });

    if (existingQuiz) {
      console.log('Already Given Quiz')
      return NextResponse.json(
        { error: "You have already given quiz" },
        { status: 400 },
      );
    }

    const correctedFrom = (() => {
      const trimmed = fromMail.trim();

      // If already in the form "Name <mailbox>", keep verbatim.
      if (trimmed.includes("<")) return trimmed;

      // If it's a full mailbox like "hello@example.com", format as "Pawteller <...>".
      if (trimmed.includes("@")) return `Pawteller <${trimmed}>`;

      // If it's a bare domain or starts with '@', construct "noreply@domain".
      // Also handles cases like ".com"/"example.com" vs leading "@".
      const domain = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
      return `Pawteller <noreply@${domain}>`;
    })();

    // Persist first (so we can update delivery status after sending)
    const contact = new QuizModel({
      email,
      results: safeResults,
      quizId: safeQuizId,
      status: "pending",
    });
    try {
      await contact.save();
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        (err as { code?: number }).code === 11000
      ) {
      console.log('Already Given Quiz')
        return NextResponse.json(
          { error: "You have already given quiz" },
          { status: 400 },
        );
      }
      throw err;
    }
    try {
      const data = await resend.emails.send({
        from: correctedFrom,

        to: email, // Where YOU want to receive the messages
        subject: `Your Top 3 Breed Match`,
        react: DogBreed(safeResults), // Use the React email template for the email body
      });

      if (
        data.error &&
        typeof data.error === "object" &&
        "message" in data.error
      ) {
        await QuizModel.findByIdAndUpdate(contact._id, { status: "failed" });
        console.error("Error sending contact email:", data.error);
        return NextResponse.json(
          { error: "Failed to send contact email" },
          { status: 422 },
        );
      }

      await QuizModel.findByIdAndUpdate(contact._id, { status: "sent" });
      return NextResponse.json({ success: true, data });
    } catch (emailError) {
      await QuizModel.findByIdAndUpdate(contact._id, { status: "failed" });
      console.error("Error sending contact email:", emailError);
      return NextResponse.json(
        { error: "Failed to send contact email" },
        { status: 422 },
      );
    }
  } catch (error: unknown) {
    console.error("Quiz route failed:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
