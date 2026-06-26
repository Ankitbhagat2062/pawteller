import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import { getGlobalKeysForRequest } from "@/db/globalKeys";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")?.trim() ?? "";

  if (!authHeader) {
    return NextResponse.json({ ok: false, error: "Missing auth token" }, { status: 401 });
  }

  const verified = await verifyAdminToken(authHeader);
  if (!verified.ok) {
    return NextResponse.json({ ok: false, error: "Invalid auth token" }, { status: 401 });
  }

  try {
    const { mongodbUri } = await getGlobalKeysForRequest(request, verified.payload.adminEmail);
    if (!mongodbUri) {
      return NextResponse.json({ ok: false, error: "Missing MongoDB configuration" }, { status: 500 });
    }

    await connectDB(mongodbUri);

    const admin = await AdminModel.findOne({ adminEmail: verified.payload.adminEmail }).select(
      "fullName adminEmail authorBio avatarUrl emailVerified",
    );

    if (!admin) {
      return NextResponse.json({ ok: false, error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      fullName: admin.fullName ?? "",
      email: admin.adminEmail,
      authorBio: admin.authorBio ?? "",
      avatarUrl: admin.avatarUrl ?? "",
      emailVerified: (admin as any).emailVerified ?? false,
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Failed to load account" },
      { status: 500 },
    );
  }
}

