import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import QuizCmsModel from "@/models/quizCms";

const SeoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  keywords: z.array(z.string().min(1).max(60)).max(200),
});

const StepSchema = z.object({
  question: z.string().min(1).max(500),
  options: z.array(z.string().min(1).max(200)).min(1).max(20),
});

const BodySchema = z.object({
  quizId: z.string().min(1).max(200),
  seo: SeoSchema,
  banner: z.string().min(1).max(200),
  category: z.string().max(200).optional(),
  title: z.string().min(1).max(300),
  totalQuestions: z.number().int().min(1).max(200),
  estimatedTime: z.string().min(1).max(100),
  url: z.string().min(1).max(300),
  header: z.string().min(1).max(300),
  subheader: z.string().min(1).max(5000),
  button: z.string().min(1).max(200),
  steps: z.array(StepSchema).min(1).max(100),
  dogs: z.array(z.string().min(1).max(200)).max(1000).optional(),
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token)
      return NextResponse.json({ error: "Missing token" }, { status: 401 });

    const verified = verifyAdminToken(token);
    if (!verified.ok) {
      return NextResponse.json({ error: verified.reason }, { status: 401 });
    }

    const body = await request.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await connectDB();

    const payload = parsed.data;

    await QuizCmsModel.updateOne(
      { quizId: payload.quizId },
      {
        $set: {
          quizId: payload.quizId,
          seo: payload.seo,
          banner: payload.banner,
          category: payload.category,
          title: payload.title,
          totalQuestions: payload.totalQuestions,
          estimatedTime: payload.estimatedTime,
          url: payload.url,
          header: payload.header,
          subheader: payload.subheader,
          button: payload.button,
          steps: payload.steps,
          dogs: payload.dogs ?? [],
        },
      },
      { upsert: true },
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update quiz" },
      { status: 500 },
    );
  }
}
