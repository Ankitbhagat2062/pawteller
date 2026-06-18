import crypto from "crypto";

const TOKEN_PREFIX = "adminAuth.";

function base64url(input: Buffer) {
  return input
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function createAdminToken(payload: {
  adminEmail: string;
  role?: string;
  exp?: number;
}) {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_JWT_SECRET env var");
  }

  const header = { alg: "HS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = payload.exp ?? iat + 60 * 60 * 24; // default 24h

  const body = {
    sub: payload.adminEmail,
    role: payload.role ?? "admin",
    iat,
    exp,
  };

  const headerPart = base64url(Buffer.from(JSON.stringify(header)));
  const bodyPart = base64url(Buffer.from(JSON.stringify(body)));
  const data = `${headerPart}.${bodyPart}`;

  const signature = crypto.createHmac("sha256", secret).update(data).digest();

  const sigPart = base64url(signature);
  return `${TOKEN_PREFIX}${data}.${sigPart}`;
}

export function verifyAdminToken(token: string) {
  if (!token.startsWith(TOKEN_PREFIX))
    return { ok: false as const, reason: "INVALID" };

  const raw = token.slice(TOKEN_PREFIX.length);
  const parts = raw.split(".");
  if (parts.length !== 3) return { ok: false as const, reason: "INVALID" };

  const [headerPart, bodyPart, sigPart] = parts;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) return { ok: false as const, reason: "NO_SECRET" };

  const data = `${headerPart}.${bodyPart}`;
  const expectedSig = base64url(
    crypto.createHmac("sha256", secret).update(data).digest(),
  );

  // Constant-time comparison
  const ok = crypto.timingSafeEqual(
    Buffer.from(sigPart),
    Buffer.from(expectedSig),
  );
  if (!ok) return { ok: false as const, reason: "INVALID_SIG" };

  let body: any;
  try {
    body = JSON.parse(
      Buffer.from(
        bodyPart.replace(/-/g, "+").replace(/_/g, "/"),
        "base64",
      ).toString("utf8"),
    );
  } catch {
    return { ok: false as const, reason: "INVALID_PAYLOAD" };
  }

  if (typeof body?.exp !== "number")
    return { ok: false as const, reason: "NO_EXP" };
  if (Math.floor(Date.now() / 1000) > body.exp)
    return { ok: false as const, reason: "EXPIRED" };

  return {
    ok: true as const,
    payload: { adminEmail: body.sub as string, role: body.role as string },
  };
}
