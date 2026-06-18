import bcrypt from "bcryptjs";
import dns from "dns";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminToken, verifyAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";

const AdminRegistrationSchema = z.object({
  adminEmail: z.string().email(),
  password: z.string().min(10),

  // Stored per admin (provided at registration)
  resendApiKey: z.string().min(1),
  // NOTE: mongodbUri intentionally omitted to prevent SSRF/credential-injection.
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

    const { adminEmail, password, resendApiKey } = parsed.data;

    // This endpoint must be protected: never accept user-controlled DB connection details.
    // Require an admin token (same pattern as other admin routes).
    const authHeader = request.headers.get("authorization") ?? "";
    const bearerToken = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!bearerToken) {
      return NextResponse.json({ message: "Missing token" }, { status: 401 });
    }
    const verified = verifyAdminToken(bearerToken);
    if (!verified.ok) {
      return NextResponse.json({ message: verified.reason }, { status: 401 });
    }

    await connectDB();

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
