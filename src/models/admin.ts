import crypto from "crypto";
import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const ADMIN_ENCRYPTION_KEY_ENV = "ADMIN_ENCRYPTION_KEY";
const ENC_PREFIX = "enc:v1:";

function getAdminEncryptionKey(): Buffer {
  const raw = process.env[ADMIN_ENCRYPTION_KEY_ENV];
  if (!raw) {
    throw new Error(
      `Missing ${ADMIN_ENCRYPTION_KEY_ENV} env var (required to encrypt/decrypt Admin credentials).`,
    );
  }

  // Allow 32-byte raw string or hex/base64.
  // Prefer explicit hex when possible (most common in env setups).
  if (/^[0-9a-fA-F]{64}$/.test(raw)) return Buffer.from(raw, "hex");

  const b = Buffer.from(raw, "base64");
  if (b.length === 32) return b;

  const maybe = Buffer.from(raw, "utf8");
  if (maybe.length === 32) return maybe;

  throw new Error(
    `${ADMIN_ENCRYPTION_KEY_ENV} must decode to exactly 32 bytes (AES-256 key).`,
  );
}

function encryptString(plaintext: string): string {
  if (plaintext.startsWith(ENC_PREFIX)) return plaintext; // idempotent

  const key = getAdminEncryptionKey();
  const iv = crypto.randomBytes(12); // recommended size for GCM

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return `${ENC_PREFIX}${iv.toString("base64")}:${tag.toString(
    "base64",
  )}:${ciphertext.toString("base64")}`;
}

function decryptString(value: string): string {
  if (!value.startsWith(ENC_PREFIX)) return value; // backwards compatible

  const key = getAdminEncryptionKey();
  const raw = value.slice(ENC_PREFIX.length);
  const [ivB64, tagB64, ctB64] = raw.split(":");
  if (!ivB64 || !tagB64 || !ctB64) {
    throw new Error("Invalid encrypted value format.");
  }

  const iv = Buffer.from(ivB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const ciphertext = Buffer.from(ctB64, "base64");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const plaintext = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);
  return plaintext.toString("utf8");
}

const adminSchema = new Schema(
  {
    adminEmail: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },

    fullName: { type: String, default: "" },
    authorBio: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },

    // Stored per admin (provided at registration)
    // Encrypted at rest via schema middleware.
    resendApiKey: {
      type: String,
      required: true,
      set: encryptString,
      get: decryptString,
    },
    mongodbUri: {
      type: String,
      required: true,
      set: encryptString,
      get: decryptString,
    },

    passwordResetToken: { type: String, default: null, index: true },
    passwordResetExpiresAt: { type: Date, default: null, index: true },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

type Admin = InferSchemaType<typeof adminSchema>;

const AdminModel: Model<Admin> =
  mongoose.models.Admin || mongoose.model<Admin>("Admin", adminSchema);

export default AdminModel;
