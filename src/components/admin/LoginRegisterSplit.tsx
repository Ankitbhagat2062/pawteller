"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const passwordComplexity = z
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

type AdminRegistrationInput = z.infer<typeof AdminRegistrationSchema>;

type Mode = "login" | "register" | "forgot" | "reset";

const LoginSchema = z.object({
  adminEmail: z.string().email(),
  password: z.string().min(1),
});

const ForgotSchema = z.object({
  adminEmail: z.string().email(),
});

const ResetSchema = z.object({
  token: z.string().min(1),
  newPassword: passwordComplexity,
});

function getSafeAuthMessage(message: unknown, fallback: string) {
  if (typeof message !== "string") return fallback;
  const msg = message.toLowerCase();
  const sensitive = [
    "mongodb",
    "mongoose",
    "connection error",
    "server misconfiguration",
    "missing resend_api_key env var",
    "next_public_app_url",
    "resend",
    "env var",
    "token",
  ];
  if (sensitive.some((k) => msg.includes(k))) return fallback;
  return message;
}

export function LoginRegisterSplit() {
  const router = useRouter();
  const resetToken =
    typeof window !== "undefined"
      ? new URL(window.location.href).searchParams.get("resetToken")
      : null;

  const [mode, setMode] = React.useState<Mode>("login");
  const [loading, setLoading] = React.useState(false);
  const [validationBubble, setValidationBubble] = React.useState<string | null>(
    null,
  );
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {},
  );
  const [registerValues, setRegisterValues] =
    React.useState<AdminRegistrationInput>({
      adminEmail: "",
      password: "",
      resendApiKey: "",
      mongodbUri: "",
    });

  const [loginValues, setLoginValues] = React.useState({
    adminEmail: "",
    password: "",
  });
  const [forgotValues, setForgotValues] = React.useState({ adminEmail: "" });
  const [resetValues, setResetValues] = React.useState({ newPassword: "" });

  React.useEffect(() => {
    if (resetToken) {
      setMode("reset");
    }
  }, [resetToken]);

  async function submitRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setValidationBubble(null);
    setFieldErrors({});

    const parsed = AdminRegistrationSchema.safeParse(registerValues);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".") || "form";
        if (!next[key]) next[key] = issue.message;
      }
      setFieldErrors(next);
      setValidationBubble("Please fix the highlighted fields.");
      setLoading(false);
      return;
    }

    try {
      const existingToken =
        localStorage.getItem("adminAuth.token") ??
        localStorage.getItem("adminAuthToken");
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(existingToken
            ? { Authorization: `Bearer ${existingToken}` }
            : {}),
        },
        body: JSON.stringify(parsed.data),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string };

      if (!res.ok || data.ok === false) {
        setValidationBubble(
          getSafeAuthMessage(data.message, "Registration failed."),
        );
        return;
      }

      const token = (data as { token?: string }).token;
      localStorage.setItem("adminExists", "true");
      localStorage.setItem("adminEmail", parsed.data.adminEmail);
      if (token) {
        localStorage.setItem("adminAuthToken", token);
        localStorage.setItem("adminAuth.token", token);
      }

      setValidationBubble(
        data.message ?? "Registration successful. You may now log in.",
      );
      setMode("login");
    } finally {
      setLoading(false);
    }
  }

  async function submitLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setValidationBubble(null);
    setFieldErrors({});

    const parsed = LoginSchema.safeParse(loginValues);
    if (!parsed.success) {
      setValidationBubble("Please enter a valid email and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        code?: string;
        message?: string;
      };

      if (!res.ok || data.ok === false) {
        if (data.code === "NOT_REGISTERED") {
          setValidationBubble(
            "Account not registered. Switching to registration.",
          );
          // Persist existence state for later UI logic
          localStorage.setItem("adminExists", "false");
          localStorage.removeItem("adminAuthToken");

          // Prefill email to reduce friction
          setRegisterValues((prev) => ({
            ...prev,
            adminEmail: parsed.data.adminEmail,
          }));
          setMode("register");
          return;
        }

        setValidationBubble(getSafeAuthMessage(data.message, "Login failed."));
        return;
      }

      const token = (data as { token?: string }).token;
      if (token) {
        localStorage.setItem("adminAuthToken", token);
        localStorage.setItem("adminAuth.token", token);
        localStorage.setItem("adminExists", "true");
        localStorage.setItem("adminEmail", parsed.data.adminEmail);
      }

      setValidationBubble(data.message ?? "Login successful.");
      router.push("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function submitForgot(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setValidationBubble(null);
    setFieldErrors({});

    const parsed = ForgotSchema.safeParse(forgotValues);
    if (!parsed.success) {
      setValidationBubble("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok || data.ok === false) {
        setValidationBubble(
          getSafeAuthMessage(data.message, "Failed to send reset link."),
        );
        return;
      }

      setValidationBubble(
        data.message ?? "If an account exists, a reset link has been sent.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function submitReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setValidationBubble(null);
    setFieldErrors({});

    const token = resetToken;
    if (!token) {
      setValidationBubble("Missing reset token.");
      setLoading(false);
      return;
    }

    const parsed = ResetSchema.safeParse({
      token,
      newPassword: resetValues.newPassword,
    });
    if (!parsed.success) {
      setValidationBubble(
        parsed.error.issues[0]?.message ?? "Invalid password.",
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: parsed.data.newPassword }),
      });

      const data = (await res.json()) as { ok?: boolean; message?: string };

      if (!res.ok || data.ok === false) {
        setValidationBubble(data.message ?? "Reset failed.");
        return;
      }

      setValidationBubble(data.message ?? "Password updated. Please log in.");
      setMode("login");
      setLoginValues((prev) => ({ ...prev, password: "" }));
      setResetValues({ newPassword: "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex items-center justify-center w-full max-w-4xl">
      {(mode === "login" || mode === "forgot") && (
        <Card className="border-zinc-200 bg-white/60 shadow-sm min-w-2xl dark:border-zinc-800 dark:bg-zinc-900/30">
          <CardHeader>
            <CardTitle>
              {mode === "login" ? "Login" : "Forgot password"}
            </CardTitle>
            <CardDescription>Access the Pawteller CMS admin.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {validationBubble ? (
                <Alert variant={mode === "login" ? "default" : "destructive"}>
                  <AlertTitle>Notice</AlertTitle>
                  <AlertDescription>{validationBubble}</AlertDescription>
                </Alert>
              ) : null}

              {mode === "login" ? (
                <form className="space-y-4" onSubmit={submitLogin}>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmailLogin">Admin Email</Label>
                    <Input
                      required
                      id="adminEmailLogin"
                      name="adminEmail"
                      type="email"
                      autoComplete="email"
                      value={loginValues.adminEmail}
                      onChange={(e) =>
                        setLoginValues((prev) => ({
                          ...prev,
                          adminEmail: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordLogin">Password</Label>
                    <Input
                      required
                      id="passwordLogin"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={loginValues.password}
                      onChange={(e) =>
                        setLoginValues((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Logging in
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>

                  <div className="flex flex-col items-center justify-between">
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => setMode("forgot")}
                    >
                      Forgot password? Reset Now
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => setMode("register")}
                    >
                      Acccount not registered yet ! Create account
                    </Button>
                  </div>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={submitForgot}>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmailForgot">Admin Email</Label>
                    <Input
                      required
                      id="adminEmailForgot"
                      name="adminEmail"
                      type="email"
                      autoComplete="email"
                      value={forgotValues.adminEmail}
                      onChange={(e) =>
                        setForgotValues({ adminEmail: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending
                      </span>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                  <Button
                    type="button"
                    className="w-full"
                    variant="secondary"
                    onClick={() => setMode("login")}
                  >
                    Back to login
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {mode === "register" && (
        <Card className="border-zinc-200 bg-white/60 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/30">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Provide your Resend API key and MongoDB URI, then create an admin
              account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitRegister} className="space-y-6">
              {validationBubble ? (
                <Alert variant={"destructive"}>
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>{validationBubble}</AlertDescription>
                </Alert>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  autoComplete="email"
                  value={registerValues.adminEmail}
                  onChange={(e) =>
                    setRegisterValues((prev) => ({
                      ...prev,
                      adminEmail: e.target.value,
                    }))
                  }
                />
                {fieldErrors.adminEmail ? (
                  <p className="text-sm text-red-600">
                    {fieldErrors.adminEmail}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Secure Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={registerValues.password}
                  onChange={(e) =>
                    setRegisterValues((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                {fieldErrors.password ? (
                  <p className="text-sm text-red-600">{fieldErrors.password}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resendApiKey">Resend API key</Label>
                <Input
                  id="resendApiKey"
                  type="password"
                  autoComplete="off"
                  value={registerValues.resendApiKey}
                  onChange={(e) =>
                    setRegisterValues((prev) => ({
                      ...prev,
                      resendApiKey: e.target.value,
                    }))
                  }
                />
                {fieldErrors.resendApiKey ? (
                  <p className="text-sm text-red-600">
                    {fieldErrors.resendApiKey}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mongodbUri">MongoDB URI</Label>
                <Input
                  id="mongodbUri"
                  type="password"
                  autoComplete="off"
                  value={registerValues.mongodbUri}
                  onChange={(e) =>
                    setRegisterValues((prev) => ({
                      ...prev,
                      mongodbUri: e.target.value,
                    }))
                  }
                />
                {fieldErrors.mongodbUri ? (
                  <p className="text-sm text-red-600">
                    {fieldErrors.mongodbUri}
                  </p>
                ) : null}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Registering
                  </span>
                ) : (
                  "Create admin"
                )}
              </Button>

              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                After registration, use the login form with your admin email and
                secure password.
              </p>
            </form>

            <div className="mt-4">
              <Button
                type="button"
                className="w-full"
                variant="secondary"
                onClick={() => setMode("login")}
              >
                Back to login
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {mode === "reset" && (
        <Card className="border-zinc-200 bg-white/60 shadow-sm min-w-2xl dark:border-zinc-800 dark:bg-zinc-900/30">
          <CardHeader>
            <CardTitle>Reset password</CardTitle>
            <CardDescription>
              Choose a new password for your admin account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitReset} className="space-y-4">
              {validationBubble ? (
                <Alert variant={"destructive"}>
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>{validationBubble}</AlertDescription>
                </Alert>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  value={resetValues.newPassword}
                  onChange={(e) =>
                    setResetValues({ newPassword: e.target.value })
                  }
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Updating
                  </span>
                ) : (
                  "Update password"
                )}
              </Button>

              <Button
                type="button"
                className="w-full"
                variant="secondary"
                onClick={() => setMode("login")}
              >
                Back to login
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
