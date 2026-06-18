import { NextResponse } from "next/server";
import { seoDefaults } from "@/lib/cms/seoCms";

export async function GET() {
  return NextResponse.json({
    pageKeys: Object.keys(seoDefaults),
  });
}
