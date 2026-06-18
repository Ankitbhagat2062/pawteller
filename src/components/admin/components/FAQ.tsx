"use client";

import { Plus, Trash2 } from "lucide-react";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FaqPageKey } from "@/lib/cms/faqPages";
import { faqPageOptions } from "@/lib/cms/faqPages";
import type { FAQItem } from "@/lib/types";

const emptyFaq: FAQItem[] = [{ question: "", answer: "" }];

function getTokenFromStorage() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminAuthToken");
}

type FormValues = {
  items: FAQItem[];
};

export default function FAQ() {
  const [pageKey, setPageKey] = useState<FaqPageKey>("home");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return getTokenFromStorage();
  }, []);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormValues>({
    defaultValues: { items: emptyFaq },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  async function loadFaq(nextPageKey: FaqPageKey) {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const authToken = getTokenFromStorage();
      if (!authToken)
        throw new Error("Missing admin token. Please login again.");

      const res = await fetch(
        `/api/admin/faq/get?pageKey=${encodeURIComponent(nextPageKey)}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as any;
        throw new Error(data?.error ?? "Failed to load FAQ");
      }

      const data = (await res.json()) as {
        items: Array<{ question: string; answer: string }>;
      };

      const next: FAQItem[] = (data.items ?? []).map((it) => ({
        question: it.question ?? "",
        answer: it.answer ?? "",
      }));

      reset({ items: next.length ? next : emptyFaq });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load FAQ");
      reset({ items: emptyFaq });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFaq(pageKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageKey]);

  async function onSubmit(values: FormValues) {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const authToken = getTokenFromStorage() ?? token;
      if (!authToken)
        throw new Error("Missing admin token. Please login again.");

      const payload = {
        pageKey,
        items: values.items
          .filter(
            (it) =>
              it.question.trim().length > 0 || it.answer.trim().length > 0,
          )
          .map((it) => ({
            question: it.question.trim(),
            answer: it.answer.trim(),
          })),
      };

      const res = await fetch("/api/admin/faq/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as any;
        throw new Error(data?.error ?? "Failed to update FAQ");
      }

      setSuccess("FAQ saved successfully.");
      // Reload so UI reflects backend-normalized output (and clears dirty state)
      await loadFaq(pageKey);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update FAQ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>FAQ editor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-1">
              <Label className="text-sm">FAQ page</Label>
              <Select
                value={pageKey}
                onValueChange={(v) => setPageKey(v as FaqPageKey)}
              >
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {faqPageOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-4 flex flex-col gap-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Button
                    type="submit"
                    disabled={saving || loading || !isDirty}
                  >
                    {saving ? "Saving…" : "Save"}
                  </Button>
                </form>
              </div>

              {error ? (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              {success ? (
                <Alert className="mt-4">
                  <AlertTitle>Saved</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              ) : null}
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">Questions & answers</h2>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => append({ question: "", answer: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add next question
                </Button>
              </div>

              <div className="mt-4 space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Question {index + 1}</Label>
                        <Input
                          placeholder="Type the question…"
                          {...register(`items.${index}.question` as const)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm">Answer {index + 1}</Label>
                        <Input
                          placeholder="Type the answer…"
                          className="min-h-[120px]"
                          {...register(`items.${index}.answer` as const)}
                        />
                      </div>

                      {fields.length > 1 ? (
                        <div className="flex items-center justify-end">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                            className="gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              {loading ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Loading FAQ…
                </p>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
