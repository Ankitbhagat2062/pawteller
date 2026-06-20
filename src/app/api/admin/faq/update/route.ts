import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import FaqPageModel from "@/models/faq";

const BodyItemSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
});

const BodySchema = z.object({
  pageKey: z.string().min(1).max(200),
  items: z.array(BodyItemSchema).max(200),
});

export async function POST(request: Request) {
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

    const body = await request.json();
    const parsed = BodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await connectDB();

    const { pageKey, items } = parsed.data;

    await FaqPageModel.updateOne(
      { pageKey },
      {
        $set: {
          items: items.map((it) => ({
            question: it.question,
            answer: it.answer,
          })),
        },
      },
      { upsert: true },
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 },
    );
  }
}
