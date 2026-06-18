import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import SeoPageModel from "@/models/seo";

const BodySchema = z.object({
  pageKey: z.string().min(1).max(200),
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(320),
  keywords: z.array(z.string().min(1).max(60)).max(50),
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

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

    const { pageKey, title, description, keywords } = parsed.data;

    await SeoPageModel.updateOne(
      { pageKey },
      { $set: { title, description, keywords } },
      { upsert: true },
    );

    return NextResponse.json({ success: true });
  } catch (_e) {
    return NextResponse.json(
      { error: "Failed to update SEO" },
      { status: 500 },
    );
  }
}
