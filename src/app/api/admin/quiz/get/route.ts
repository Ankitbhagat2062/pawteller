import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import { quizData } from "@/lib/cms/quizpage";
import connectDB from "@/lib/mongodb";
import QuizCmsModel from "@/models/quizCms";

const QuerySchema = z.object({
  quizId: z.string().min(1).max(200),
});

function getFallback(quizId: string) {
  // Fallback to existing static defaults if Mongo doesn't have the document.
  return quizData.find((q) => q.url === `/quiz?quiz=${quizId}`) ?? quizData[0];
}

export async function GET(request: Request) {
  try {

    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get("quizId");

    const parsed = QuerySchema.safeParse({ quizId });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    await connectDB();

    const existing = await QuizCmsModel.findOne({ quizId: parsed.data.quizId });
    if (!existing) {
      const fb = getFallback(parsed.data.quizId);
      return NextResponse.json({
        quizId: parsed.data.quizId,
        seo: fb.seo,
        banner: fb.banner,
        category: fb.category,
        title: fb.title,
        totalQuestions: fb.totalQuestions,
        estimatedTime: fb.estimatedTime,
        url: fb.url,
        header: fb.header,
        subheader: fb.subheader,
        button: fb.button,
        steps: fb.steps,
        dogs: fb.dogs ?? [],
      });
    }

    return NextResponse.json({
      quizId: existing.quizId,
      seo: existing.seo,
      banner: existing.banner,
      category: existing.category,
      title: existing.title,
      totalQuestions: existing.totalQuestions,
      estimatedTime: existing.estimatedTime,
      url: existing.url,
      header: existing.header,
      subheader: existing.subheader,
      button: existing.button,
      steps: existing.steps,
      dogs: existing.dogs ?? [],
    });
  } catch {
    return NextResponse.json({ error: "Failed to load quiz" }, { status: 500 });
  }
}
