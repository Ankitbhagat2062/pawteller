import { NextResponse } from "next/server";
import {
  CalculatorCmsSchema,
  defaultSerializedCalculatorPageCms,
} from "@/hooks/calculatorCms";
import connectDB from "@/lib/mongodb";
import CalculatorCmsModel from "@/models/calculatorCms";

export async function GET() {
  try {

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
