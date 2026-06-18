import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import FaqPageModel from "@/models/faq";

const QuerySchema = z.object({
  pageKey: z.string().min(1).max(200),
});

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const verified = await verifyAdminToken(token);
    if (!verified.ok) {
      return NextResponse.json({ error: verified.reason }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get("pageKey");

    const parsed = QuerySchema.safeParse({ pageKey });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    await connectDB();

    const existing = await FaqPageModel.findOne({
      pageKey: parsed.data.pageKey,
    });
    if (!existing) {
      return NextResponse.json(
        { pageKey: parsed.data.pageKey, items: [] },
        { status: 200 },
      );
    }

    return NextResponse.json({
      pageKey: existing.pageKey,
      items: existing.items.map((it) => ({
        question: it.question,
        answer: it.answer,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to load FAQ" }, { status: 500 });
  }
}
