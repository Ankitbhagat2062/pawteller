import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import { blogPosts } from "@/lib/cms/blogpage";
import connectDB from "@/lib/mongodb";
import BlogCmsModel from "@/models/blogCms";

const QuerySchema = z.object({
  slug: z.string().min(1).max(200).optional().default("blog-home"),
});

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token)
      return NextResponse.json({ error: "Missing token" }, { status: 401 });

    const verified = await verifyAdminToken(token);
    if (!verified.ok) {
      return NextResponse.json({ error: verified.reason }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") ?? "blog-home";

    const parsed = QuerySchema.safeParse({ slug });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    await connectDB();

    const existing = await BlogCmsModel.findOne({ slug: parsed.data.slug });

    if (!existing) {
      return NextResponse.json({ slug: parsed.data.slug, posts: blogPosts });
    }

    return NextResponse.json({
      slug: existing.slug,
      posts: existing.posts,
    });
  } catch {
    return NextResponse.json({ error: "Failed to load blog" }, { status: 500 });
  }
}
