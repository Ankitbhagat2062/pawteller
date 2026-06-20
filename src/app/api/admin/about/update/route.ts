import { NextResponse } from "next/server";
import { AboutAdminCmsSchema } from "@/hooks/aboutCms";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import AboutCmsModel from "@/models/aboutCms";
import FaqPageModel from "@/models/faq";
import SeoPageModel from "@/models/seo";

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

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = AboutAdminCmsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await connectDB();

    const { seo, faqItems, ...aboutContent } = parsed.data;

    await Promise.all([
      AboutCmsModel.updateOne(
        { slug: "about" },
        { $set: aboutContent },
        { upsert: true },
      ),
      SeoPageModel.updateOne(
        { pageKey: "about" },
        {
          $set: {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
          },
        },
        { upsert: true },
      ),
      FaqPageModel.updateOne(
        { pageKey: "about" },
        {
          $set: {
            items: faqItems.map((item) => ({
              question: item.question,
              answer: item.answer,
            })),
          },
        },
        { upsert: true },
      ),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update about CMS" },
      { status: 500 },
    );
  }
}
