import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import SeoPageModel from "@/models/seo";

const QuerySchema = z.object({
  pageKey: z.string().min(1).max(200),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get("pageKey");

    const parsed = QuerySchema.safeParse({ pageKey });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    await connectDB();

    const existing = await SeoPageModel.findOne({
      pageKey: parsed.data.pageKey,
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      pageKey: existing.pageKey,
      title: existing.title,
      description: existing.description,
      keywords: existing.keywords,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to load SEO" }, { status: 500 });
  }
}
