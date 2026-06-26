"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";


import { Lock, Mail } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const changeEmailSchema = z.object({
  newEmailAddress: z.string().trim().email("Enter a valid email address."),
  currentPassword: z.string().min(1, "Current password is required."),
});

type ChangeEmailValues = z.infer<typeof changeEmailSchema>;

const strongPasswordSchema = z
  .string()
  .min(12, "New password must be at least 12 characters.")
  .max(200, "New password is too long.")
  .regex(/[a-z]/, "Must include at least one lowercase letter.")
  .regex(/[A-Z]/, "Must include at least one uppercase letter.")
  .regex(/\d/, "Must include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Must include at least one symbol.")
  .refine((v) => !/(.)\1\1/.test(v), {
    message: "Avoid repeated patterns (e.g. AAA).",
  });

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: strongPasswordSchema,
    confirmNewPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((v) => v.newPassword === v.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match.",
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

function passwordStrength(pw: string) {
  const lengthScore = Math.min(40, pw.length * 4);
  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSymbol = /[^A-Za-z0-9]/.test(pw);
  const variety = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
  const varietyScore = variety * 15;
  const repeatsPenalty = /(.)\1\1/.test(pw) ? 10 : 0;
  const score = Math.max(0, Math.min(100, lengthScore + varietyScore - repeatsPenalty));

  let label: "Weak" | "Fair" | "Good" | "Strong" = "Weak";
  if (score >= 85) label = "Strong";
  else if (score >= 65) label = "Good";
  else if (score >= 45) label = "Fair";

  return { score, label };
}

export default function Settings({ token }: { token?: string }) {
  const [currentAdminEmail] = useState<string>("alex@pawteller.com");
  const adminToken = token; // TODO wire

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const emailForm = useForm<ChangeEmailValues>({
    mode: "onSubmit",
    defaultValues: {
      newEmailAddress: "",
      currentPassword: "",
    },
  });

  const passwordForm = useForm<ChangePasswordValues>({
    mode: "onSubmit",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const newPw = passwordForm.watch("newPassword") ?? "";
  const strength = passwordStrength(newPw);

  async function onChangeEmailSubmit(values: ChangeEmailValues) {
    setEmailLoading(true);
    try {
      const parsed = changeEmailSchema.safeParse(values);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
        return;
      }

      const res = await fetch("/api/admin/request-email-change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
        },
        body: JSON.stringify({
          newEmailAddress: parsed.data.newEmailAddress,
          currentPassword: parsed.data.currentPassword,
        }),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? "Failed to request email change.");
        return;
      }

      toast.success("Check your inbox to confirm the email change.");
      setIsEmailDialogOpen(false);
      emailForm.reset();
    } catch {
      toast.error("Unexpected error while requesting email change.");
    } finally {
      setEmailLoading(false);
    }
  }

  async function onChangePasswordSubmit(values: ChangePasswordValues) {
    setPasswordLoading(true);
    try {
      const parsed = changePasswordSchema.safeParse(values);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
        return;
      }

      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
        },
        body: JSON.stringify({
          currentPassword: parsed.data.currentPassword,
          newPassword: parsed.data.newPassword,
          confirmNewPassword: parsed.data.confirmNewPassword,
        }),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? "Failed to update password.");
        return;
      }

      toast.success("Password updated successfully.");
      passwordForm.reset();
    } catch {
      toast.error("Unexpected error while updating password.");
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className="w-full px-4 py-8 md:px-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm md:text-base text-muted-foreground">Manage your admin credentials securely.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1) Change Email Address */}
        <Card className="dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Change Email Address
            </CardTitle>
            <CardDescription>Update your login email with verification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Label className="text-sm text-muted-foreground">Current email</Label>
                  <div className="font-medium break-all">{currentAdminEmail}</div>
                </div>
                <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                  <DialogTrigger asChild>
                    <Button type="button">Update Email</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Update Email</DialogTitle>
                      <DialogDescription>
                        Enter your new email address and your current password to request a change.
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      className="grid gap-4"
                      onSubmit={emailForm.handleSubmit(onChangeEmailSubmit)}
                    >
                      <div className="grid gap-2">
                        <Label htmlFor="newEmailAddress">New Email Address</Label>
                        <Input
                          id="newEmailAddress"
                          type="email"
                          placeholder="name@example.com"
                          disabled={emailLoading}
                          {...emailForm.register("newEmailAddress")}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="••••••••"
                          disabled={emailLoading}
                          autoComplete="current-password"
                          {...emailForm.register("currentPassword")}
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" disabled={emailLoading}>
                            Cancel
                          </Button>
                        </DialogTrigger>
                        <Button type="submit" disabled={emailLoading}>
                          {emailLoading ? "Requesting…" : "Confirm Change"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                A confirmation link will be sent to the <span className="font-medium">new email</span>. Your email
                won’t update until you click the link.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2) Change Password */}
        <Card className="dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Change Password
            </CardTitle>
            <CardDescription>Use a strong password to protect your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={passwordForm.handleSubmit(onChangePasswordSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="cp-current">Current Password</Label>
                <Input
                  id="cp-current"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={passwordLoading}
                  {...passwordForm.register("currentPassword")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cp-new">New Password</Label>
                <Input
                  id="cp-new"
                  type="password"
                  placeholder="At least 12 characters"
                  autoComplete="new-password"
                  disabled={passwordLoading}
                  {...passwordForm.register("newPassword")}
                />
              </div>

              {/* visual password strength indicator */}
              <div className="rounded-xl border bg-muted/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">Password strength</div>
                  <Badge variant="secondary" className="font-medium capitalize">
                    {strength.label}
                  </Badge>
                </div>
                <div className="mt-3">
                  <Progress value={strength.score} />
                  <div className="mt-2 text-xs text-muted-foreground">
                    Use a mix of letters, numbers, and symbols.
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="cp-confirm">Confirm New Password</Label>
                <Input
                  id="cp-confirm"
                  type="password"
                  placeholder="Repeat new password"
                  autoComplete="new-password"
                  disabled={passwordLoading}
                  {...passwordForm.register("confirmNewPassword")}
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" disabled={passwordLoading}>
                  {passwordLoading ? "Updating…" : "Update Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

