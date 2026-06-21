import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";
import { AdminRegistrationSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate inputs safely
    const parsed = AdminRegistrationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: parsed.error.issues[0]?.message ?? "Invalid input",
        },
        { status: 400 },
      );
    }

    const { adminEmail, password, mongodbUri, resendApiKey } = parsed.data;

    await connectDB();

    // Check if admin already exists
    const existing = await AdminModel.findOne({ adminEmail });
    if (existing) {
      return NextResponse.json(
        { ok: false, message: "Admin email is already registered." },
        { status: 400 },
      );
    }

    // Hash password and store record safely
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = new AdminModel({
      adminEmail,
      passwordHash,
      mongodbUri,
      resendApiKey,
    });

    await admin.save();

    // Generate their initial login token
    const token = await createAdminToken({ adminEmail });

    return NextResponse.json({
      ok: true,
      message: "Registration successful. You may now log in.",
      token,
    });
  } catch (e: unknown) {
    console.error("Registration Crash Error:", e);
    return NextResponse.json(
      {
        ok: false,
        message: e instanceof Error ? e.message : "Registration failed.",
      },
      { status: 500 },
    );
  }
}