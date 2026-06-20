import { verifyAdminToken } from "@/lib/admin/adminAuth";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/models/admin";

export type GlobalKeys = {
  resendApiKey?: string;
  mongodbUri?: string;
};

function getEnvGlobalKeys(): GlobalKeys {
  return {
    resendApiKey: process.env.RESEND_API_KEY,
    mongodbUri: process.env.MONGODB_URI || process.env.MONGO_URI,
  };
}

function cleanKeyValue(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

async function getAdminEmailFromRequest(
  request?: Request,
): Promise<string | undefined> {
  const authHeader = request?.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return undefined;

  const verified = await verifyAdminToken(token);
  return verified.ok ? verified.payload.adminEmail : undefined;
}

export async function getGlobalKeysByAdminEmail(
  adminEmail?: string,
): Promise<GlobalKeys> {
  const envKeys = getEnvGlobalKeys();

  try {
    await connectDB();

    const admin = adminEmail
      ? await AdminModel.findOne({ adminEmail })
      : await AdminModel.findOne({}).sort({ createdAt: 1 });

    return {
      resendApiKey: cleanKeyValue(admin?.resendApiKey) ?? envKeys.resendApiKey,
      mongodbUri: cleanKeyValue(admin?.mongodbUri) ?? envKeys.mongodbUri,
    };
  } catch (error) {
    console.error("Failed to load global keys from database:", error);
    return envKeys;
  }
}

export async function getGlobalKeysForRequest(
  request?: Request,
  adminEmail?: string,
): Promise<GlobalKeys> {
  const requestAdminEmail =
    adminEmail ?? (await getAdminEmailFromRequest(request));
  return getGlobalKeysByAdminEmail(requestAdminEmail);
}
