import { NextResponse } from "next/server";
import { z } from "zod";
import { getGlobalKeysForRequest } from "@/db/globalKeys";
import connectDB from "@/lib/mongodb";
import QuizModel from "@/models/quiz";


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
});

export async function POST(request: Request) {
  const { mongodbUri} = await getGlobalKeysForRequest(request);
  try {
    const submission = SubmissionSchema.safeParse(await request.json());
    if (!submission.success) {
      console.log('Zod Schema Validation failed')
      return NextResponse.json(
        { error: "Zod Schema Validation failed" },
        { status: 400 },
      );
    }
    const { email, quizId } = submission.data;

    // Ensure required fields are present (keep existing behavior for email/results)
    if (!email || !quizId) {
      console.log('Email , quizId is not present')
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 500 },
      );
    }

    const parsedQuizId = QuizIdSchema.safeParse(quizId);

    const safeQuizId = parsedQuizId.data;
    if (!parsedQuizId.success) {
      console.log('Zod Schema Validation failed')
      return NextResponse.json(
        { error: "Zod Schema Validation failed" },
        { status: 400 },
      );
    }

    await connectDB(mongodbUri);

    const existingQuiz = await QuizModel.findOne({ email, quizId: safeQuizId });

    if (existingQuiz) {

      return NextResponse.json(
        { message: "You have already given quiz" },
        { status: 200 },
      );
    }
    // Persist first (so we can update delivery status after sending)
    return NextResponse.json({ success: true, message:"New User" });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
