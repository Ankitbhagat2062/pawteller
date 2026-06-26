import { z } from "zod";

// Strict whitelist of popular consumer domains allowed for newsletter signup
const ALLOWED_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "hotmail.co.uk",
  "icloud.com",
  "aol.com"
]);

const GMAIL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

function normalizeGmailLocalPart(email: string): string {
  const [rawLocal, rawDomain, ...rest] = email.split("@");
  if (!rawDomain || rest.length > 0 || rawLocal == null) return email;

  const domain = rawDomain.toLowerCase();
  if (!GMAIL_DOMAINS.has(domain)) return email;

  // Strip dots only for DB normalization matching
  const local = rawLocal.replaceAll(".", "");
  return `${local}@${domain}`;
}

export function normalizeSubscriberEmail(email: string): string {
  const trimmed = email.trim();
  const normalized = trimmed.toLowerCase();
  return normalizeGmailLocalPart(normalized);
}

export const subscriberEmailSchema = z
  .string()
  .email()
  .superRefine((value, ctx) => {
    const trimmed = value.trim();
    const [local, domain] = trimmed.split("@");
    if (!local || !domain) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email format",
      });
      return;
    }

    const lowerDomain = domain.toLowerCase();

    // 1. Block public corporate domain harvesting (Only allow whitelisted consumer emails)
    if (!ALLOWED_DOMAINS.has(lowerDomain)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please sign up using a standard email provider (e.g., Gmail, Yahoo, Outlook).",
      });
      return;
    }

    // 2. Catch dot-stuffed bot handles on Gmail before normalization strips them
    if (GMAIL_DOMAINS.has(lowerDomain)) {
      const dotCount = (local.match(/\./g) ?? []).length;
      if (dotCount > 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email address configuration",
        });
      }
    }
  });