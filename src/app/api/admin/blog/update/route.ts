import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import BlogCmsModel from "@/models/blogCms";

const ContentItemSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(8000),
  time: z.string().max(200).optional().default(""),
});

const HyperLinkSchema = z
  .object({
    label: z.string().min(1).max(200).optional().default(""),
    href: z.string().min(1).max(500).optional().default(""),
    ariaLabel: z.string().min(1).max(200).optional().default(""),
  })
  .partial();

const PostSchema = z.object({
  imageSrc: z.string().min(1).max(2000),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  url: z.string().min(1).max(500),
  totalTime: z.string().min(1).max(200),
  content: z.array(ContentItemSchema).min(1).max(50),
  category: z.string().min(1).max(200),
  date: z.string().max(200).optional().default(""),
  bgColor: z.string().max(200).optional().default(""),
  cta: HyperLinkSchema.optional(),
});


const BodySchema = z.object({
  slug: z.string().min(1).max(200),
  posts: z.array(PostSchema).min(1).max(50),
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token)
      return NextResponse.json({ error: "Missing token" }, { status: 401 });

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

    const payload = parsed.data;

    await BlogCmsModel.updateOne(
      { slug: payload.slug },
      {
        $set: {
          slug: payload.slug,
          posts: payload.posts,
        },
      },
      { upsert: true },
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}
