import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import { CalculatorCmsSchema } from "@/lib/cms/calculatorCms";
import connectDB from "@/lib/mongodb";
import CalculatorCmsModel from "@/models/calculatorCms";

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
    const parsed = CalculatorCmsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await connectDB();

    const payload = parsed.data;

    await CalculatorCmsModel.updateOne(
      { slug: payload.slug },
      { $set: payload },
      { upsert: true },
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update calculators CMS" },
      { status: 500 },
    );
  }
}
