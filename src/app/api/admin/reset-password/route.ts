import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";
import { z } from "zod";
import bcrypt from "bcryptjs";

const ResetSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ResetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, message: "Invalid input" }, { status: 400 });
    }

    const { token, newPassword } = parsed.data;

    await connectDB();

    const now = new Date();

    const admin = await AdminModel.findOne({
      passwordResetToken: token,
      passwordResetExpiresAt: { $gt: now },
    });

    if (!admin) {
      return NextResponse.json({ ok: false, message: "Invalid or expired token." }, { status: 400 });
    }

    admin.passwordResetToken = null;
    admin.passwordResetExpiresAt = null;
    admin.passwordHash = await bcrypt.hash(newPassword, 10);

    await admin.save();

    return NextResponse.json({ ok: true, message: "Password updated successfully." });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, message: e instanceof Error ? e.message : "Reset failed" }, { status: 500 });
  }
}

