import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import { getHomepageAdminCms } from "@/db/homepageCmsDb";

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

    const cms = await getHomepageAdminCms();

    return NextResponse.json(cms);
  } catch {
    return NextResponse.json(
      { error: "Failed to load homepage CMS" },
      { status: 500 },
    );
  }
}
