"use server";
import { FormState } from "@/lib/types";
import axios from "axios";
import * as z from "zod";

export async function submitVerificationForm(
	_prevState: FormState,
	formData: FormData,
): Promise<FormState> {
	try {
		const formSchema = z.object({
			email: z.email(),
			// kept for backward compatibility with the form UI,
			// but the backend will generate a single-use link.
		});

		const parsed = formSchema.safeParse(Object.fromEntries(formData.entries()));
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
		url.searchParams.set("email", parsed.data.email);

		// Use validateStatus so we can read the JSON body on non-2xx.
		const res = await axios.get(url.toString(), {
			validateStatus: () => true,
		});

		const apiData = res.data as { success?: boolean; error?: string };

		if (res.status < 200 || res.status >= 300 || !apiData?.success) {
			return {
				success: false,
				error: apiData?.error ?? "Failed to send email. Please try again.",
			};
		}

		return {
			success: true,
			message: "Success! I'll get back to you as soon as possible.",
		};
	} catch (error) {
		console.error("Server action error:", error);
		return {
			success: false,
			error: "Something went wrong. Please try again.",
		};
	}
}

