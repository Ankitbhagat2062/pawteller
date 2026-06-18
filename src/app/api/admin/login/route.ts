import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";

const LoginSchema = z.object({
  adminEmail: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid input" },
        { status: 400 },
      );
    }

    const { adminEmail, password } = parsed.data;

    await connectDB();

    const admin = await AdminModel.findOne({ adminEmail });
    const matches = admin
      ? await bcrypt.compare(password, admin.passwordHash)
      : false;
    if (!admin || !matches) {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_CREDENTIALS",
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const token = await createAdminToken({ adminEmail });
    return NextResponse.json({ ok: true, message: "Login successful.", token });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, message: e instanceof Error ? e.message : "Login failed." },
      { status: 500 },
    );
  }
}
