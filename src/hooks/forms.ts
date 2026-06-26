"use server";
import axios from "axios";
import * as z from "zod";
import type { FormState } from "@/lib/types";

export async function submitVerificationForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const formSchema = z.object({
      email: z.string().email(),
      // but the backend will generate a single-use link.
    });

    // Honeypot (invisible field). If filled, drop silently (no Axios call).
    const payload = Object.fromEntries(formData.entries()) as Record<string, unknown>;
    const honeypotValue = payload.website;
    if (typeof honeypotValue === "string" && honeypotValue.trim().length > 0) {
      return { success: true, message: "" };
    }

    const parsed = formSchema.safeParse(payload);
    if (!parsed.success) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!appUrl) {
      return {
        success: false,
        error: "Server misconfiguration: missing NEXT_PUBLIC_APP_URL",
      };
    }

    // Important: server actions run on the server, so we should not rely on
    // client/browser cookies; just call the API directly.
    const url = new URL("/api/send-verification-email", appUrl);
    const res = await axios.post(
      url.toString(),
      { email: parsed.data.email, website: payload.website },
      {
        validateStatus: () => true,
        headers: { "Content-Type": "application/json" },
      },
    );

    const apiData = res.data as { success?: boolean; error?: string };

    if (res.status < 200 || res.status >= 300 || !apiData?.success) {
      return {
        success: false,
        error: apiData?.error ?? "Failed to send email. Please try again.",
      };
    }

    return {
      success: true,
      message: "Verification email sent! Please check your inbox.",
    };
  } catch (error) {
    console.error("Server action error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
