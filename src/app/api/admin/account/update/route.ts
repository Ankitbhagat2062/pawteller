import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";
import { verifyAdminToken } from "@/lib/admin/adminAuth";
import { getGlobalKeysForRequest } from "@/db/globalKeys";

import { z } from "zod";

const updateAccountSchema = z.object({
  fullName: z
    .string()
    .min(0)
    .max(50, "Full name must be 50 characters or fewer."),
  authorBio: z
    .string()
    .min(0)
    .max(300, "Author bio must be 300 characters or fewer."),
});

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing auth token" }, { status: 401 });
  }

  const verified = await verifyAdminToken(token);
  if (!verified.ok) {
    return NextResponse.json({ ok: false, error: "Invalid auth token" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as unknown;
  const parsed = updateAccountSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const { mongodbUri } = await getGlobalKeysForRequest(request, verified.payload.adminEmail);
    if (!mongodbUri) {
      return NextResponse.json({ ok: false, error: "Missing MongoDB configuration" }, { status: 500 });
    }

    await connectDB(mongodbUri);

    const admin = await AdminModel.findOne({ adminEmail: verified.payload.adminEmail });
    if (!admin) {
      return NextResponse.json({ ok: false, error: "Admin not found" }, { status: 404 });
    }

    admin.fullName = parsed.data.fullName ?? "";
    admin.authorBio = parsed.data.authorBio ?? "";

    await admin.save();

    return NextResponse.json({
      ok: true,
      message: "Account updated.",
      fullName: admin.fullName,
      authorBio: admin.authorBio,
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Failed to update account" },
      { status: 500 },
    );
  }
}

// Allow PUT for clients that prefer it.
export async function PUT(request: Request) {
  return POST(request);
}

