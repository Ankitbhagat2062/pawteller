import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import {
  CalculatorCmsSchema,
  defaultSerializedCalculatorPageCms,
} from "@/hooks/calculatorCms";
import connectDB from "@/lib/mongodb";
import CalculatorCmsModel from "@/models/calculatorCms";

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

    await connectDB();

    const existing = await CalculatorCmsModel.findOne({
      slug: "calculators-home",
    }).lean();

    if (!existing) {
      return NextResponse.json(defaultSerializedCalculatorPageCms);
    }

    const parsed = CalculatorCmsSchema.safeParse(existing);
    if (!parsed.success) {
      return NextResponse.json(defaultSerializedCalculatorPageCms);
    }

    return NextResponse.json(parsed.data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load calculators CMS" },
      { status: 500 },
    );
  }
}
