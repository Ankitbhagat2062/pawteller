import { NextResponse } from "next/server";
import { getHomepageAdminCms } from "@/db/homepageCmsDb";

export async function GET() {
  try {

    const cms = await getHomepageAdminCms();

    return NextResponse.json(cms);
  } catch {
    return NextResponse.json(
      { error: "Failed to load homepage CMS" },
      { status: 500 },
    );
  }
}
