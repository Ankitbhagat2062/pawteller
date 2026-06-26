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
  // 1. Clean the token string if it includes "Bearer "
  let cleanToken = token.trim();
  if (cleanToken.startsWith("Bearer ")) {
    cleanToken = cleanToken.substring(7).trim();
  }

  // 2. Now it will perfectly match "adminAuth."
  if (!cleanToken.startsWith(TOKEN_PREFIX)) {
    return { ok: false as const, reason: "INVALID" };
  }

  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    console.log('No Secret');
    return { ok: false as const, reason: "NO_SECRET" };
  }

  // 3. Slice using the cleaned token string
  const raw = cleanToken.slice(TOKEN_PREFIX.length);

  try {
    const { payload } = await jwtVerify(
      raw,
      crypto.createSecretKey(Buffer.from(secret)),
      {
        algorithms: ["HS256"],
      },
    );

    if (typeof payload.sub !== "string") {
      console.log('Invalid Payload');
      return { ok: false as const, reason: "INVALID_PAYLOAD" };
    }

    return {
      ok: true as const,
      payload: {
        adminEmail: payload.sub,
        role: typeof payload.role === "string" ? payload.role : "admin",
      },
    };
  } catch(err) {
    console.log(err);
    return { ok: false as const, reason: "INVALID" };
  }
}
