"use client";

import * as React from "react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Pencil } from "lucide-react";
import {
  Shield,
  Lock,
  KeyRound,
  Bell,
  Mail,
  User,
  Smartphone,
  Monitor,
  Save,
  RotateCcw as RotateCcwIcon,
} from "lucide-react";

import {
  BarChart3,
  Globe,
} from "lucide-react";

type Role = "Administrator" | "Editor";

type AdminUserDoc = {
  _id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  role: Role;
  authorBio: string;
  avatarUrl?: string;
};

type ActiveSessionDevice = {
  id: string;
  deviceName: string;
  platform: "Desktop" | "Mobile";
  location: string;
  lastActiveAtISO: string;
};

const MOCK_USER: AdminUserDoc = {
  _id: "admin_001",
  fullName: "Manish Jha",
  email: "manish@pawteller.com",
  emailVerified: true,
  role: "Administrator",
  authorBio:
    "Dog-obsessed writer bringing practical tips and heartwarming stories to the Pawteller community.",
  avatarUrl: undefined,
};

const MOCK_SESSIONS: ActiveSessionDevice[] = [
  {
    id: "sess_1",
    deviceName: "Manish",
    platform: "Desktop",
    location: "San Diego, US",
    lastActiveAtISO: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: "sess_2",
    deviceName: "DESKTOP141",
    platform: "Desktop",
    location: "Remote",
    lastActiveAtISO: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
];

// --------------------
// Zod schemas (react-hook-form)
// --------------------

export const publicProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  authorBio: z
    .string()
    .max(300, "Bio must be 300 characters or fewer.")
    .optional()
    .or(z.literal("")),
});

export type PublicProfileValues = z.infer<typeof publicProfileSchema>;

export const securitySchema = z
  .object({
    currentPassword: z.string().min(8, "Current password must be at least 8 characters."),
    newPassword: z.string().min(10, "New password must be at least 10 characters."),
    confirmNewPassword: z.string().min(10, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords do not match.",
  });

export type SecurityValues = z.infer<typeof securitySchema>;

export const notificationsSchema = z.object({
  emailComments: z.boolean(),
  emailDraftApprovals: z.boolean(),
  inAppComments: z.boolean(),
  inAppDraftApprovals: z.boolean(),
});

export type NotificationsValues = z.infer<typeof notificationsSchema>;

// --------------------
// Helpers
// --------------------

function avatarFallback(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "P";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return (first + last).toUpperCase();
}

function formatRelative(iso: string) {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.floor(diffMs / (1000 * 60));
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

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
  if (score >= 80) label = "Strong";
  else if (score >= 60) label = "Good";
  else if (score >= 40) label = "Fair";

  return { score, label };
}

function isSameSimpleObject(a: unknown, b: unknown) {
  return JSON.stringify(a) === JSON.stringify(b);
}
type TabKey = "public" | "security" | "notifications";

type AccountFormValues = {
  fullName: string;
  authorBio: string;
};

export default function Account({ token }: { token?: string }) {
  const router = useRouter();
  const { theme } = useTheme();

  // Used for typesafety: next-themes `theme` is `string | undefined`.
  const themeName = theme ?? "light";


  const [user, setUser] = useState<AdminUserDoc>(MOCK_USER);
  const [sessions, setSessions] = useState<ActiveSessionDevice[]>(MOCK_SESSIONS);

  const [activeTab, setActiveTab] = useState<TabKey>("public");

  const [initialNotifs] = useState<NotificationsValues>({
    emailComments: true,
    emailDraftApprovals: false,
    inAppComments: true,
    inAppDraftApprovals: true,
  });
  const [notifs, setNotifs] = useState<NotificationsValues>(initialNotifs);

  const publicForm = useForm<AccountFormValues>({
    mode: "onChange",
    defaultValues: {
      fullName: user.fullName,
      authorBio: user.authorBio,
    },
  });

  // keep form in sync when mock user changes
  React.useEffect(() => {
    publicForm.reset({
      fullName: user.fullName,
      authorBio: user.authorBio,
    });
  }, [user, publicForm]);

  const publicValues = publicForm.watch();

  const initialPublicValues:PublicProfileValues = MOCK_USER

  const securityForm = useForm<SecurityValues>({
    mode: "onSubmit",
  });


  const notifDirty = !isSameSimpleObject(notifs, initialNotifs)
  const publicDirty = !isSameSimpleObject(publicValues, initialPublicValues);

  const dirty = publicDirty || notifDirty;

  const passwordPw = securityForm.watch("newPassword") ?? "";
  const strength = passwordStrength(passwordPw);

  async function sendSecurityAlertStub(payload: {
    type: "password_changed" | "session_revoked" | 'profile_updated';
    toEmail: string;
    meta?: Record<string, string>;
  }) {
    toast.message(`Security alert stub: ${payload.type} → ${payload.toEmail}`, {
      description: payload.meta ? JSON.stringify(payload.meta) : undefined,
    });
  }

  async function handleRevoke(sessionId: string) {
    const target = sessions.find((s) => s.id === sessionId);
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    toast.success("Access revoked.");

    await sendSecurityAlertStub({
      type: "session_revoked",
      toEmail: user.email,
      meta: { sessionId, deviceName: target?.deviceName ?? "" },
    });
  }

  function handleDiscard() {
    publicForm.reset({
      fullName: user.fullName,
      authorBio: user.authorBio,
    });
    setNotifs(initialNotifs);
    toast.message("Changes discarded.");
  }

  async function handleSave() {
    const ok = await publicForm.trigger();
    if (!ok) {
      toast.error("Fix validation errors before saving.");
      return;
    }

    if (!dirty) {
      toast.message("No changes to save.");
      return;
    }

    const values = publicForm.getValues();

    const updatedUser: AdminUserDoc = {
      ...user,
      fullName: values.fullName,
      authorBio: values.authorBio ?? "",
    };

    setUser(updatedUser);
    toast.success("Settings saved.");

    // Stubbed email security alert
    await sendSecurityAlertStub({
      type: "profile_updated",
      toEmail: updatedUser.email,
      meta: { tab: activeTab, themeName },
    });
  }

  async function onChangePasswordSubmit(values: SecurityValues) {
    // Correct way to statically resolve types for a dynamic import
    const axiosModule = await import("axios");
    const axios = axiosModule.default;

    try {
      await axios.post(
        "/api/admin/change-password",
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );

      toast.success("Password updated.");

      await sendSecurityAlertStub({
        type: "password_changed",
        toEmail: user.email,
        meta: { strength: strength.label },
      });

      securityForm.reset();
    } catch (err: unknown) {
      const axErr = err as any;
      const apiError =
        axErr?.response?.data?.error ?? axErr?.message ?? "Failed to update password";

      const parsed = typeof apiError === "string" ? apiError : "Failed to update password";

      toast.error("Password update failed.", {
        description: parsed,
      });

      // Map common API errors to the relevant field when possible.
      if (String(parsed).toLowerCase().includes("current password")) {
        securityForm.setError("currentPassword", { message: parsed });
      } else if (String(parsed).toLowerCase().includes("match")) {
        securityForm.setError("confirmNewPassword", { message: parsed });
      } else {
        securityForm.setError("newPassword", { message: parsed });
      }
    }
  }



  return (
    <div className="w-full">
      {/* Header Area */}
      <div className="px-4 py-8 md:px-6 md:py-10">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={() => router.push("/admin/dashboard")}
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </button>
          <span aria-hidden>›</span>
          <button
            type="button"
            onClick={() => router.push("/admin/settings")}
            className="hover:text-foreground transition-colors"
          >
            Settings
          </button>
          <span aria-hidden>›</span>
          <span className="text-foreground/80">Account</span>
        </nav>

        <div className="mt-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Account Settings</h1>
          <p className="mt-1 text-sm md:text-base text-muted-foreground">
            Update your pet-writer profile, manage your credentials, and configure notifications.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="px-4 pb-28 md:px-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Left Column */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 sticky top-6">
              {/* Profile Card */}
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="h-30 w-30 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-muted/40 flex items-center justify-center">
                          {user.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={user.avatarUrl}
                              alt={`${user.fullName} avatar`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Avatar className="h-full w-full">
                              <AvatarFallback className="text-xl">{avatarFallback(user.fullName)}</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium focus:opacity-100"
                        onClick={() => toast.message("Change Photo stub (wire to upload flow).")}
                        aria-label="Change photo"
                      >
                        <span className="inline-flex items-center gap-2">
                          <Pencil className="h-4 w-4" /> Change Photo
                        </span>
                      </button>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{user.fullName}</div>

                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="capitalize">
                              {user.role}
                            </Badge>
                            {user.emailVerified ? (
                              <Badge variant="outline" className="gap-1">
                                <span className="inline-flex items-center">✓</span> Verified
                              </Badge>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="line-clamp-3">{user.authorBio}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Vertical Navigation (Tabs) */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)} orientation="vertical">
                <TabsList className="grid grid-cols-1 w-1/5">
                  <TabsTrigger value="public" className="justify-start">
                    <span className="inline-flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" /> Public Profile
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start">
                    <span className="inline-flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Security & Password
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start">
                    <span className="inline-flex items-center gap-2">
                      <Bell className="h-4 w-4" /> Notifications
                    </span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="public" className="mt-6">
                  {/* Public Profile form */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Public Profile
                      </CardTitle>
                      <CardDescription>Keep your author identity accurate and up to date.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="grid gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-3">
                          <Label>Full Name</Label>
                          <Input {...publicForm.register("fullName")} placeholder="Alex Thompson" />
                          {publicForm.formState.errors.fullName ? (
                            <p className="text-sm text-destructive">{publicForm.formState.errors.fullName.message}</p>
                          ) : null}
                        </div>



                        <div className="grid gap-3">
                          <Label>Author Bio</Label>
                          <Textarea
                            {...publicForm.register("authorBio")}
                            placeholder="Write a short bio that helps readers connect with you..."
                            rows={5}
                          />
                          {publicForm.formState.errors.authorBio ? (
                            <p className="text-sm text-destructive">{publicForm.formState.errors.authorBio.message}</p>
                          ) : null}
                        </div>
                        <div className="rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
                          <div className="flex items-start gap-3">
                            <Globe className="h-4 w-4 mt-0.5" />
                            <div>
                              <div className="font-medium text-foreground">Preview tip</div>
                              <div>Changes appear on your public author page after you save.</div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {publicDirty ? (
                    <div className="mt-4">
                      <Alert className="border-muted">
                        <AlertTitle>Unsaved changes</AlertTitle>
                        <AlertDescription>Use the bottom bar to discard or save your updates.</AlertDescription>
                      </Alert>
                    </div>
                  ) : null}
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                  <div className="space-y-6">
                    {/* Change Password */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Lock className="h-4 w-4" /> Change Password
                        </CardTitle>
                        <CardDescription>Keep your Pawteller account secure.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form
                          className="grid gap-6"
                          onSubmit={securityForm.handleSubmit(onChangePasswordSubmit)}
                        >
                          <div className="grid gap-3">
                            <Label>Current Password</Label>
                            <Input
                              {...securityForm.register("currentPassword")}
                              type="password"
                              placeholder="••••••••"
                              autoComplete="current-password"
                            />
                            {securityForm.formState.errors.currentPassword ? (
                              <p className="text-sm text-destructive">
                                {securityForm.formState.errors.currentPassword.message}
                              </p>
                            ) : null}
                          </div>

                          <div className="grid gap-3">
                            <Label>New Password</Label>
                            <Input
                              {...securityForm.register("newPassword")}
                              type="password"
                              placeholder="At least 10 characters"
                              autoComplete="new-password"
                            />
                            {securityForm.formState.errors.newPassword ? (
                              <p className="text-sm text-destructive">
                                {securityForm.formState.errors.newPassword.message}
                              </p>
                            ) : null}
                          </div>

                          {/* strength indicator */}
                          <div className="rounded-xl border bg-muted/30 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="text-sm font-medium">Password strength</div>
                              <Badge
                                variant="secondary"
                                className="font-medium capitalize"
                              >
                                {strength.label}
                              </Badge>
                            </div>
                            <div className="mt-3">
                              <div className="h-2 w-full rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full transition-all"
                                  style={{ width: `${strength.score}%` }}
                                  aria-hidden
                                  data-strength={strength.label}
                                />
                              </div>
                              <p className="mt-2 text-xs text-muted-foreground">
                                Aim for a strong mix of letters, numbers, and symbols.
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-3">
                            <Label>Confirm New Password</Label>
                            <Input
                              {...securityForm.register("confirmNewPassword")}
                              type="password"
                              placeholder="Repeat new password"
                              autoComplete="new-password"
                            />
                            {securityForm.formState.errors.confirmNewPassword ? (
                              <p className="text-sm text-destructive">
                                {securityForm.formState.errors.confirmNewPassword.message}
                              </p>
                            ) : null}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                            <Button type="submit" className="sm:w-auto">
                              <span className="inline-flex items-center gap-2">
                                <RotateCcwIcon className="h-4 w-4" /> Update Password
                              </span>
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>

                    {/* Active Sessions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <KeyRound className="h-4 w-4" /> Active Sessions
                        </CardTitle>
                        <CardDescription>Manage where your account is currently signed in.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {sessions.length === 0 ? (
                          <div className="text-sm text-muted-foreground">No active sessions.</div>
                        ) : (
                          <div className="grid gap-4">
                            {sessions.map((s) => {
                              const Icon = s.platform === "Mobile" ? Smartphone : Monitor;
                              return (
                                <div
                                  key={s.id}
                                  className="flex items-start justify-between gap-4 rounded-xl border bg-background/60 p-4"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="mt-0.5 rounded-lg bg-muted/30 p-2">
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <div className="font-medium">{s.deviceName}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {s.platform} • {s.location}
                                      </div>
                                      <div className="mt-1 text-xs text-muted-foreground">Last active {formatRelative(s.lastActiveAtISO)}</div>
                                    </div>
                                  </div>

                                  <Button
                                    variant="outline"
                                    onClick={() => handleRevoke(s.id)}
                                    className="shrink-0"
                                  >
                                    Revoke Access
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <div className="mt-5 rounded-xl border bg-muted/30 p-4 text-sm text-muted-foreground">
                          <div className="flex items-start gap-3">
                            <Shield className="h-4 w-4 mt-0.5" />
                            <div>
                              Revoke access if you suspect unauthorized sign-ins.
                              <div className="mt-1">You’ll receive a security notification email.</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="notifications" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-4 w-4" /> Notifications
                      </CardTitle>
                      <CardDescription>Control email and in-app alerts for Pawteller.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="rounded-xl border bg-muted/30 p-4 space-y-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <Label className="font-medium">Email Alerts</Label>
                              <div className="text-sm text-muted-foreground">Comments & review requests</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <Label className="text-sm">Comments</Label>
                              <div className="text-xs text-muted-foreground">Notify when someone comments on your posts.</div>
                            </div>
                            <Switch
                              checked={notifs.emailComments}
                              onCheckedChange={(v) => setNotifs((p) => ({ ...p, emailComments: v }))}
                            />
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <Label className="text-sm">Draft Approvals</Label>
                              <div className="text-xs text-muted-foreground">Notify when a draft is approved.</div>
                            </div>
                            <Switch
                              checked={notifs.emailDraftApprovals}
                              onCheckedChange={(v) =>
                                setNotifs((p) => ({ ...p, emailDraftApprovals: v }))
                              }
                            />
                          </div>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-4 space-y-4">
                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <Label className="font-medium">In-App Alerts</Label>
                              <div className="text-sm text-muted-foreground">Stay in flow while you write</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <Label className="text-sm">Comments</Label>
                              <div className="text-xs text-muted-foreground">Show alerts when new comments arrive.</div>
                            </div>
                            <Switch
                              checked={notifs.inAppComments}
                              onCheckedChange={(v) => setNotifs((p) => ({ ...p, inAppComments: v }))}
                            />
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <Label className="text-sm">Draft Approvals</Label>
                              <div className="text-xs text-muted-foreground">Show alerts when drafts are approved.</div>
                            </div>
                            <Switch
                              checked={notifs.inAppDraftApprovals}
                              onCheckedChange={(v) =>
                                setNotifs((p) => ({ ...p, inAppDraftApprovals: v }))
                              }
                            />
                          </div>
                        </div>

                        <Alert className="border-muted">
                          <Mail className="h-4 w-4" />
                          <AlertTitle>Security & account alerts</AlertTitle>
                          <AlertDescription>
                            Password changes and session revocations always trigger security emails.
                            (Resend integration is stubbed in this component.)
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </aside>

          {/* Right Column */}
          <section className="lg:col-span-8">
            {/* Sticky bottom actions bar */}
            <div className="space-y-6">
              {/* Tabs are rendered in left for vertical nav; content already within TabsContent blocks */}
              <div className="hidden" aria-hidden />
            </div>
          </section>
        </div>

      </div>
      {/* Bottom Actions Bar */}
      <div
        className={
          "fixed inset-x-0 bottom-0 z-40 border-t bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70" +
          (dirty ? " translate-y-0" : " translate-y-full")
        }
      >
        <div className="px-4 py-4 md:px-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              {dirty ? "You have unsaved changes." : ""}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleDiscard} disabled={!dirty}>
                Discard Changes
              </Button>
              <Button onClick={handleSave} disabled={!dirty}>
                <span className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* tiny inline style for strength bar colors */}
        <style jsx>{`
          /* strength bar colors */
          [data-strength="Weak"] { background: transparent; }
        `}</style>
      </div>
    </div>
  );
}

