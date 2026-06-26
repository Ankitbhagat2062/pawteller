"use client";

import { AlertCircle, Save, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const seoFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(120, "Max 120 chars"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(320, "Max 320 chars"),
  keywords: z
    .string()
    .min(1, "Keywords are required")
    .max(5000, "Too long")
    .refine(
      (v) =>
        v
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean).length <= 50,
      "Max 50 keywords",
    ),
});

type SeoFormValues = z.infer<typeof seoFormSchema> & {
  keywords: string; // comma separated in UI
};

type PageKey =
  | "home"
  | "about"
  | "contact"
  | "terms"
  | "privacy"
  | "quiz"
  | "dog-age"
  | "dog-food"
  | "dog-name"
  | "dog-pregnancy"
  | "dog-growth"
  | "puppy-weight"
  | "blog";

const PAGE_OPTIONS: { value: PageKey; label: string }[] = [
  { value: "home", label: "Home" },
  { value: "about", label: "About" },
  { value: "contact", label: "Contact" },
  { value: "terms", label: "Terms" },
  { value: "privacy", label: "Privacy" },
  { value: "quiz", label: "Quiz" },
  { value: "dog-age", label: "Calculator: Dog Age" },
  { value: "dog-food", label: "Calculator: Dog Food" },
  { value: "dog-name", label: "Calculator: Dog Name" },
  { value: "dog-pregnancy", label: "Calculator: Dog Pregnancy" },
  { value: "dog-growth", label: "Calculator: Dog Growth" },
  { value: "puppy-weight", label: "Calculator: Puppy Weight" },
  { value: "blog", label: "Blog (homepage list)" },
];

function buildKeywordsArray(keywordsCsv: string) {
  return keywordsCsv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function SEO({token}: {token?: string}) {
  const [pageKey, setPageKey] = useState<PageKey>("home");
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError: SetError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<SeoFormValues>({
    defaultValues: {
      title: "",
      description: "",
      keywords: "",
    },
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setApiLoading(true);
      SetError("root", { type: "manual", message: "" });

      try {
        if(!token){
           throw new Error("Admin token missing. Please log in again.");
        }
        const res = await fetch(
          `/api/admin/seo/get?pageKey=${encodeURIComponent(pageKey)}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(data?.error ?? "Failed to load SEO");
        }

        const data = (await res.json()) as {
          title: string;
          description: string;
          keywords: string[];
        };

        if (cancelled) return;
        reset({
          title: data.title ?? "",
          description: data.description ?? "",
          keywords: (data.keywords ?? []).join(", "),
        });
      } catch (e) {
        if (cancelled) return;
        SetError("root", {
          type: "manual",
          message: e instanceof Error ? e.message : "Failed to load SEO",
        });
      } finally {
        if (!cancelled) setApiLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [pageKey, reset, SetError ,token]);

  async function onSubmit(values: SeoFormValues) {
    setLoading(true);
    SetError("root", { type: "manual", message: "" });
    clearErrors();

    const parsed = seoFormSchema.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") {
          SetError(path as keyof SeoFormValues, {
            type: "manual",
            message: issue.message,
          });
        }
      });
      setLoading(false);
      return;
    }

    try {
      const authToken = token;

      if (!authToken) {
        throw new Error(
          "Admin token missing.Please Login in Again.",
        );
      }

      const payload = {
        pageKey,
        title: values.title.trim(),
        description: values.description.trim(),
        keywords: buildKeywordsArray(values.keywords),
      };

      const res = await fetch("/api/admin/seo/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as {
        success?: boolean;
        error?: string;
      } | null;

      if (!res.ok || !data?.success) {
        throw new Error(data?.error ?? "Failed to save SEO");
      }

      toast.success(
        `${PAGE_OPTIONS.find((p) => p.value === pageKey)?.label ?? pageKey} updated successfully.`,
      );

      setLoading(false);
      // After save, reload to reflect any canonical normalization
      const reloadRes = await fetch(
        `/api/admin/seo/get?pageKey=${encodeURIComponent(pageKey)}`,
      );
      if (reloadRes.ok) {
        const reloadData = (await reloadRes.json()) as {
          title: string;
          description: string;
          keywords: string[];
        };
        reset({
          title: reloadData.title ?? "",
          description: reloadData.description ?? "",
          keywords: (reloadData.keywords ?? []).join(", "),
        });
      }
    } catch (e) {
      setLoading(false);
      SetError("root", {
        type: "manual",
        message: e instanceof Error ? e.message : "Failed to save SEO",
      });
      toast.error(e instanceof Error ? e.message : "Unknown error");
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-20 pb-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> SEO CMS
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Edit SEO Title, Description, and Keywords for Pawteller pages.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select page</CardTitle>
            <CardDescription>
              Choose a page and edit SEO fields. Changes are saved to MongoDB.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label className="mb-1">Page</Label>
              <Select
                value={pageKey}
                onValueChange={(v) => setPageKey(v as PageKey)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select page" />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_OPTIONS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {apiLoading ? (
                <p className="mt-2 text-xs text-muted-foreground">Loading...</p>
              ) : null}
            </div>

            <div className="md:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Pawteller | Premium Growth & Pet Health Insights"
                    disabled={loading || apiLoading}
                    {...register("title")}
                    aria-invalid={errors.title ? "true" : "false"}
                  />
                  {errors.title ? (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.title.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Max 320 chars"
                    disabled={loading || apiLoading}
                    {...register("description")}
                    aria-invalid={errors.description ? "true" : "false"}
                  />
                  {errors.description ? (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.description.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="keyword1, keyword2, keyword3"
                    disabled={loading || apiLoading}
                    {...register("keywords")}
                    aria-invalid={errors.keywords ? "true" : "false"}
                  />
                  {errors.keywords ? (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.keywords.message}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Comma-separated. Max 50 keywords.
                    </p>
                  )}
                </div>

                {errors ? (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3">
                    <p className="text-sm text-destructive">
                      {errors?.description?.message}
                    </p>
                  </div>
                ) : null}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
                  <p className="text-xs text-muted-foreground">
                    {isDirty ? "Unsaved changes" : "All changes saved"}
                  </p>

                  <Button
                    type="submit"
                    disabled={loading || apiLoading}
                    className="inline-flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save SEO"}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground">
          Tip: keywords are stored as an array in MongoDB, but entered as
          comma-separated values.
        </div>
      </div>
    </div>
  );
}
