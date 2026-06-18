import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";

const ResetSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ResetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid input" },
        { status: 400 },
      );
    }

    const { token, newPassword } = parsed.data;

    await connectDB();

    const now = new Date();

    const passwordHash = await bcrypt.hash(newPassword, 10);

    // passwordResetToken is stored as a bcrypt hash.
    // Fetch the admin(s) that have a non-expired reset token, then compare in memory.
    // Minimal schema change: we don't add a separate deterministic index for lookup.
    const candidates = await AdminModel.find(
      {
        passwordResetExpiresAt: { $gt: now },
        passwordResetToken: { $ne: null },
      },
      { passwordResetToken: 1 },
    );

    let updated = null;
    for (const admin of candidates) {
      if (
        admin.passwordResetToken &&
        (await bcrypt.compare(token, admin.passwordResetToken))
      ) {
        updated = await AdminModel.findOneAndUpdate(
          { _id: admin._id },
          {
            $set: {
              passwordHash,
              passwordResetToken: null,
              passwordResetExpiresAt: null,
            },
          },
        );
        break;
      }
    }

    if (!updated) {
      return NextResponse.json(
        { ok: false, message: "Invalid or expired token." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Password updated successfully.",
    });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        ok: false,
        message: e instanceof Error ? "Reset Failed" : "Reset failed",
      },
      { status: 500 },
    );
  }
}
