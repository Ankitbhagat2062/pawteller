"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { quizData } from "@/lib/cms/quizpage";
import type { quizDataProps } from "@/lib/types";

const quizOptionList = quizData.map((q) => {
  // Extract quizId from url: /quiz?quiz=breed-match
  const m = q.url.match(/\?quiz=([^&]+)/);
  const quizId = (m?.[1] ?? q.url).replace(/^\/?quiz=/, "");
  return {
    quizId,
    label: q.title,
  };
});

const StepSchema = z.object({
  question: z.string().min(1).max(500),
  options: z.array(z.string().min(1).max(200)).min(1).max(20),
});

const QuizCmsSchema = z.object({
  quizId: z.string().min(1).max(200),
  seo: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(5000),
    keywordsCsv: z.string().min(1).max(5000),
  }),
  banner: z.string().min(1).max(200),
  category: z.string().max(200).optional().or(z.literal("")),
  title: z.string().min(1).max(300),
  totalQuestions: z.coerce.number().int().min(1).max(200),
  estimatedTime: z.string().min(1).max(100),
  url: z.string().min(1).max(300),
  header: z.string().min(1).max(300),
  subheader: z.string().min(1).max(5000),
  button: z.string().min(1).max(200),
  steps: z.array(StepSchema).min(1).max(100),
  dogsCsv: z.string().optional().default(""),
});

type QuizCmsFormValues = z.infer<typeof QuizCmsSchema>;

function csvToArray(csv?: string) {
  return (csv ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildDefaultFromQuiz(
  q: quizDataProps,
  quizId: string,
): QuizCmsFormValues {
  return {
    quizId,
    seo: {
      title: q.seo.title,
      description: q.seo.description,
      keywordsCsv: q.seo.keywords.join(", "),
    },
    banner: q.banner,
    category: q.category ?? "",
    title: q.title,
    totalQuestions: q.totalQuestions,
    estimatedTime: q.estimatedTime,
    url: q.url,
    header: q.header,
    subheader: q.subheader,
    button: q.button,
    steps: q.steps.map((s) => ({
      question: s.question,
      options: s.options,
    })),
    dogsCsv: (q.dogs ?? []).join(", "),
  };
}

export default function Quiz() {
  const [quizId, setQuizId] = useState<string>(quizOptionList[0]?.quizId ?? "");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = useMemo(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminAuth.token") ?? null;
  }, []);

  const defaultQuiz = useMemo(() => {
    const match = quizOptionList.find((x) => x.quizId === quizId);
    const q = match
      ? (quizData.find((it) => it.url.includes(match.quizId)) ?? quizData[0])
      : quizData[0];

    return buildDefaultFromQuiz(q, quizId);
  }, [quizId]);

  const form = useForm<QuizCmsFormValues>({
    defaultValues: defaultQuiz,
    mode: "onChange",
  });

  const { register, reset, handleSubmit, watch, formState } = form;

  async function loadQuiz(nextQuizId: string) {
    setLoading(true);
    setError(null);
    try {
      const authToken = localStorage.getItem("adminAuth.token") ?? token;
      if (!authToken)
        throw new Error("Admin token missing. Please login again.");

      const res = await fetch(
        `/api/admin/quiz/get?quizId=${encodeURIComponent(nextQuizId)}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          cache: "no-store",
        },
      );

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Failed to load quiz");
      }

      const data = (await res.json()) as {
        quizId: string;
        seo: { title: string; description: string; keywords: string[] };
        banner: string;
        category?: string;
        title: string;
        totalQuestions: number;
        estimatedTime: string;
        url: string;
        header: string;
        subheader: string;
        button: string;
        steps: Array<{ question: string; options: string[] }>;
        dogs: string[];
      };

      reset({
        quizId: data.quizId,
        seo: {
          title: data.seo.title ?? "",
          description: data.seo.description ?? "",
          keywordsCsv: (data.seo.keywords ?? []).join(", "),
        },
        banner: data.banner ?? "",
        category: data.category ?? "",
        title: data.title ?? "",
        totalQuestions: data.totalQuestions ?? 0,
        estimatedTime: data.estimatedTime ?? "",
        url: data.url ?? "",
        header: data.header ?? "",
        subheader: data.subheader ?? "",
        button: data.button ?? "",
        steps: (data.steps ?? []).map((s) => ({
          question: s.question ?? "",
          options: s.options ?? [],
        })),
        dogsCsv: (data.dogs ?? []).join(", "),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load quiz");
      reset(defaultQuiz);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!quizId) return;
    void loadQuiz(quizId);
  }, [quizId, loadQuiz]);

  const stepsWatch = watch("steps");

  async function onSubmit(values: QuizCmsFormValues) {
    setSaving(true);
    setError(null);
    try {
      const authToken = localStorage.getItem("adminAuth.token") ?? token;
      if (!authToken)
        throw new Error("Admin token missing. Please login again.");

      const payload = {
        quizId: values.quizId,
        seo: {
          title: values.seo.title.trim(),
          description: values.seo.description.trim(),
          keywords: csvToArray(values.seo.keywordsCsv),
        },
        banner: values.banner.trim(),
        category: (values.category ?? "").trim() || undefined,
        title: values.title.trim(),
        totalQuestions: values.totalQuestions,
        estimatedTime: values.estimatedTime.trim(),
        url: values.url.trim(),
        header: values.header.trim(),
        subheader: values.subheader.trim(),
        button: values.button.trim(),
        steps: values.steps.map((s) => ({
          question: s.question.trim(),
          options: s.options.map((o) => o.trim()),
        })),
        dogs: csvToArray(values.dogsCsv).slice(0, 1000),
      };

      const res = await fetch("/api/admin/quiz/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Failed to update quiz");
      }

      toast.success("Quiz saved successfully.");
      await loadQuiz(values.quizId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save quiz");
      toast.error(e instanceof Error ? e.message : "Failed to save quiz");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-10 pb-10">
      <Card>
        <CardHeader>
          <CardTitle>Quiz CMS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Label className="text-sm">Quiz</Label>
              <Select value={quizId} onValueChange={(v) => setQuizId(v)}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select quiz" />
                </SelectTrigger>
                <SelectContent>
                  {quizOptionList.map((opt) => (
                    <SelectItem key={opt.quizId} value={opt.quizId}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <Button
                  type="submit"
                  disabled={saving || loading || !formState.isDirty}
                  className="w-full"
                >
                  {saving ? "Saving…" : "Save quiz"}
                </Button>

                {error ? (
                  <Alert variant="destructive" className="mt-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}

                {loading ? (
                  <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
                ) : null}
              </form>

              <p className="mt-4 text-xs text-muted-foreground">
                This editor updates quiz content stored in MongoDB.
              </p>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <Accordion type="single" collapsible defaultValue="seo">
                    <AccordionItem value="seo">
                      <AccordionTrigger>SEO</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <Label>SEO title</Label>
                            <Input
                              {...register("seo.title")}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Estimated time</Label>
                            <Input
                              {...register("estimatedTime")}
                              className="mt-2"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>SEO description</Label>
                            <Input
                              {...register("seo.description")}
                              className="mt-2"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>SEO keywords (comma-separated)</Label>
                            <Input
                              {...register("seo.keywordsCsv")}
                              className="mt-2"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion type="single" collapsible defaultValue="content">
                    <AccordionItem value="content">
                      <AccordionTrigger>Quiz Content</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <Label>Banner</Label>
                            <Input {...register("banner")} className="mt-2" />
                          </div>
                          <div>
                            <Label>Category</Label>
                            <Input
                              {...register("category")}
                              className="mt-2"
                              placeholder="(optional)"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Title</Label>
                            <Input {...register("title")} className="mt-2" />
                          </div>
                          <div>
                            <Label>Total questions</Label>
                            <Input
                              type="number"
                              {...register("totalQuestions", {
                                valueAsNumber: true,
                              })}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>URL</Label>
                            <Input {...register("url")} className="mt-2" />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Header</Label>
                            <Input {...register("header")} className="mt-2" />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Subheader</Label>
                            <Input
                              {...register("subheader")}
                              className="mt-2"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Button text</Label>
                            <Input {...register("button")} className="mt-2" />
                          </div>

                          <div className="md:col-span-2">
                            <Label>Dogs list (comma-separated)</Label>
                            <Input {...register("dogsCsv")} className="mt-2" />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion type="single" collapsible defaultValue="steps">
                    <AccordionItem value="steps">
                      <AccordionTrigger>Steps (Questions)</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {stepsWatch.map((step, stepIndex) => (
                            <div
                              key={stepIndex}
                              className="rounded-xl border border-border bg-card p-4 space-y-4"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label>Question {stepIndex + 1}</Label>
                                  <Input
                                    {...register(
                                      `steps.${stepIndex}.question` as const,
                                    )}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Options count</Label>
                                  <Input
                                    value={step.options.length}
                                    readOnly
                                    className="mt-2"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Options</Label>
                                {step.options.map((_, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <Input
                                      {...register(
                                        `steps.${stepIndex}.options.${optIndex}` as const,
                                      )}
                                      className="flex-1"
                                    />
                                    {step.options.length > 1 ? (
                                      <Trash2
                                        className="h-4 w-4 text-destructive cursor-pointer"
                                        onClick={() => {
                                          toast.error(
                                            "Option removal is not available in this UI.",
                                          );
                                        }}
                                      />
                                    ) : null}
                                  </div>
                                ))}
                                <p className="text-xs text-muted-foreground">
                                  Option removal is limited. Add/rename by
                                  editing fields.
                                </p>
                              </div>
                            </div>
                          ))}

                          <p className="text-sm text-muted-foreground">
                            Steps are loaded from MongoDB. This UI currently
                            supports editing content; adding/removing steps is
                            intentionally omitted for stability.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <input type="hidden" {...register("quizId")} />

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-muted-foreground">
                      {formState.isDirty
                        ? "Unsaved changes"
                        : "All changes saved"}
                    </p>
                    <Button
                      type="submit"
                      disabled={saving || loading || !formState.isDirty}
                    >
                      {saving ? "Saving…" : "Save changes"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
