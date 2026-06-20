import { z } from "zod";

export const passwordComplexity = z
  .string()
  .min(10, { message: "Password must be at least 10 characters." })
  .regex(/[A-Z]/, {
    message: "Password must include at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must include at least one lowercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must include at least one number." })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must include at least one symbol.",
  });

export const AdminRegistrationSchema = z.object({
  adminEmail: z.string().email({ message: "Enter a valid email address." }),
  password: passwordComplexity,
  resendApiKey: z.string().min(1, { message: "Resend API key is required." }),
  mongodbUri: z.string().min(1, { message: "MongoDB URI is required." }),
});