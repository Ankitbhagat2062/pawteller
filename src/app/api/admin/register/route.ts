import bcrypt from "bcryptjs";
import dns from "dns";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";

const AdminRegistrationSchema = z.object({
  adminEmail: z.string().email(),
  password: z.string().min(10),

  // Stored per admin (provided at registration)
  resendApiKey: z.string().min(1),
  mongodbUri: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
    const body = await request.json();
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

    const { adminEmail, password, resendApiKey, mongodbUri } = parsed.data;

    await connectDB(mongodbUri);

    const existing = await AdminModel.findOne({ adminEmail });
    if (existing) {
      return NextResponse.json(
        { ok: false, message: "Admin email is already registered." },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = new AdminModel({
      adminEmail,
      passwordHash,
      resendApiKey,
      mongodbUri,
    });
    await admin.save();

    const token = createAdminToken({ adminEmail });
    return NextResponse.json({
      ok: true,
      message: "Registration successful. You may now log in.",
      token,
    });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        ok: false,
        message: e instanceof Error ? e.message : "Registration failed.",
      },
      { status: 500 },
    );
  }
}
