import { NextResponse } from "next/server";
import { getAboutAdminCms } from "@/db/aboutCmsDb";

export async function GET() {
  try {

    const cms = await getAboutAdminCms();
    return NextResponse.json(cms);
  } catch {
    return NextResponse.json(
      { error: "Failed to load about CMS" },
      { status: 500 },
    );
  }
}
