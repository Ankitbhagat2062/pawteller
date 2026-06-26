import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";
import { getGlobalKeysForRequest } from "@/db/globalKeys";
import { verifyAdminToken } from "@/lib/admin/adminAuth";

import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(12)
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/\d/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a symbol"),
  confirmNewPassword: z.string().min(1),
});

export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.trim() ?? "";
  if (!token) {
    return NextResponse.json({ ok: false, error: "Missing auth token" }, { status: 401 });
  }

  const verified = await verifyAdminToken(token);
  if (!verified.ok) {
    return NextResponse.json({ ok: false, error: "Invalid auth token" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | z.infer<typeof changePasswordSchema>
    | null;
  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.newPassword !== parsed.data.confirmNewPassword) {
    return NextResponse.json({ ok: false, error: "Passwords do not match" }, { status: 400 });
  }

  const { mongodbUri } = await getGlobalKeysForRequest(request, verified.payload.adminEmail);

  try {
    if (!mongodbUri) {
      return NextResponse.json({ ok: false, error: "Missing MongoDB configuration" }, { status: 500 });
    }

    await connectDB(mongodbUri);

    const admin = await AdminModel.findOne({ adminEmail: verified.payload.adminEmail });
    if (!admin) {
      return NextResponse.json({ ok: false, error: "Admin not found" }, { status: 404 });
    }

    const currentOk = await bcrypt.compare(
      parsed.data.currentPassword,
      admin.passwordHash,
    );

    if (!currentOk) {
      return NextResponse.json({ ok: false, error: "Current password is incorrect" }, { status: 400 });
    }

    const newHash = await bcrypt.hash(parsed.data.newPassword, 12);

    admin.passwordHash = newHash;
    await admin.save();

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unexpected error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

