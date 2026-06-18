import crypto from "crypto";
import { jwtVerify, SignJWT } from "jose";

const TOKEN_PREFIX = "adminAuth.";

type AdminTokenPayload = {
  adminEmail: string;
  role?: string;
  exp?: number;
};

export async function createAdminToken(payload: AdminTokenPayload) {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("Missing ADMIN_JWT_SECRET env var");

  const iat = Math.floor(Date.now() / 1000);
  const exp = payload.exp ?? iat + 60 * 60 * 24; // default 24h

  const jwt = await new SignJWT({ role: payload.role ?? "admin" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(payload.adminEmail)
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(crypto.createSecretKey(Buffer.from(secret)));
  return `${TOKEN_PREFIX}${jwt}`;
}

export async function verifyAdminToken(token: string) {
  if (!token.startsWith(TOKEN_PREFIX)) {
    return { ok: false as const, reason: "INVALID" };
  }

  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) return { ok: false as const, reason: "NO_SECRET" };

  const raw = token.slice(TOKEN_PREFIX.length);

  try {
    const { payload } = await jwtVerify(
      raw,
      crypto.createSecretKey(Buffer.from(secret)),
      {
        algorithms: ["HS256"],
      },
    ) 

    if (typeof payload.sub !== "string") {
      return { ok: false as const, reason: "INVALID_PAYLOAD" };
    }

    return {
      ok: true as const,
      payload: {
        adminEmail: payload.sub,
        role: typeof payload.role === "string" ? payload.role : "admin",
      },
    };
  } catch {
    // jwtVerify throws for malformed tokens, bad signature, and expiration
    return { ok: false as const, reason: "INVALID" };
  }
}
