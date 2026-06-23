"use client";

import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import type { BlogPost } from "@/lib/cms/blogpage";

function TextArea(props: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={
        props.className ??
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      }
    />
  );
}

const BLOG_SLUGS = [
  { value: "blog-home", label: "Blog homepage (list)" },
] as const;

type BlogSlug = (typeof BLOG_SLUGS)[number]["value"];

type ContentItem = BlogPost["content"][number];

type HyperLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

type HyperLinkFormValues = HyperLink & { enabled?: boolean };

const HyperLinkSchema = z.object({
  enabled: z.boolean().optional().default(false),
  label: z.string().max(200).optional().default(""),
  href: z.string().max(500).optional().default(""),
  ariaLabel: z.string().max(200).optional().default(""),
}).superRefine((value, ctx) => {
  if (
    value.enabled &&
    (!value.label.trim() || !value.href.trim() || !value.ariaLabel.trim())
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Fill all CTA fields when CTA is enabled.",
    });
  }
});

const ContentItemSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(8000),
  time: z.string().max(200).optional(),
});

const BlogPostSchema = z.object({
  imageSrc: z.string().min(1).max(2000),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  url: z.string().min(1).max(500),
  totalTime: z.string().min(1).max(200),
  content: z.array(ContentItemSchema).min(1).max(50),
  category: z.string().min(1).max(200),
  date: z.string().max(200).optional().default(""),
  bgColor: z.string().max(200).optional().default(""),
  cta: HyperLinkSchema,
});

const BlogCmsFormSchema = z.object({
  slug: z.string().min(1).max(200),
  posts: z.array(BlogPostSchema).min(1).max(50),
});

type BlogCmsFormValues = z.infer<typeof BlogCmsFormSchema>;

type ServerShape = {
  slug: string;
  posts: BlogPost[];
};

function emptyContentItem(): ContentItem {
  return {
    title: "",
    description: "",
    time: "",
  };
}

function emptyHyperLink(): HyperLinkFormValues {
  return {
    enabled: false,
    label: "",
    href: "",
    ariaLabel: "",
  };
}

function emptyPost(): BlogPost & { cta: HyperLinkFormValues } {
  return {
    imageSrc: "",
    title: "",
    description: "",
    url: "",
    totalTime: "",
    category: "",
    date: "",
    bgColor: "",
    cta: {
      label: "",
      href: "",
      ariaLabel: "",
    },
    content: [emptyContentItem()],
  };
}

export default function Blog({ token }: { token?: string }) {
  const [slug, setSlug] = useState<BlogSlug>(BLOG_SLUGS[0].value);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
    watch,
  } = useForm<BlogCmsFormValues>({
    defaultValues: {
      slug,
      posts: [emptyPost() as unknown as BlogPost],
    },
    mode: "onChange",
  });

  const posts = watch("posts");

  const loadBlog = useCallback(
    async (nextSlug: BlogSlug) => {
      setLoading(true);

      setError(null);
      setSuccess(null);

      try {
        const authToken = token;
        if (!authToken) throw new Error("Missing admin token. Login again.");

        const res = await fetch(
          `/api/admin/blog/get?slug=${encodeURIComponent(nextSlug)}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
            cache: "no-store",
          },
        );

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error ?? "Failed to load blog");
        }

        const data = (await res.json()) as ServerShape;

        const normalized: BlogCmsFormValues = {
          slug: data.slug as BlogSlug,
          posts: (data.posts ?? []).map((p) => ({
            ...p,
            date: p.date ?? "",
            bgColor: p.bgColor ?? "",
            cta: {
              enabled: Boolean(p.cta?.href || p.cta?.label || p.cta?.ariaLabel),
              label: p.cta?.label ?? "",
              href: p.cta?.href ?? "",
              ariaLabel: p.cta?.ariaLabel ?? "",
            },
            content: (p.content ?? []).length
              ? p.content
              : [emptyContentItem()],
          })) as unknown as BlogCmsFormValues["posts"],
        };

        reset(normalized);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load blog");
        reset({ slug: nextSlug, posts: [emptyPost() as unknown as BlogPost] });
      } finally {
        setLoading(false);
      }
    },
    [token, reset],
  );

  useEffect(() => {
    void loadBlog(slug);
  }, [slug, loadBlog]);

  async function onSubmit(values: BlogCmsFormValues) {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const authToken = token;
      if (!authToken) throw new Error("Missing admin token. Login again.");

      const parsed = BlogCmsFormSchema.safeParse(values);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      }

      const payload = {
        slug: values.slug,
        posts: values.posts.map((p) => ({
          ...p,
          date: p.date ?? "",
          bgColor: p.bgColor ?? "",
          content: p.content.map((c) => ({
            ...c,
            time: c.time ?? "",
          })),
          cta: p.cta?.enabled
            ? {
              label: p.cta.label ?? "",
              href: p.cta.href ?? "",
              ariaLabel: p.cta.ariaLabel ?? "",
            }
            : undefined,
        })),
      };

      const res = await fetch("/api/admin/blog/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to update blog");
      }

      toast.success("Blog saved successfully.");
      setSuccess("Blog saved successfully.");
      await loadBlog(slug);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to update blog";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  function addPost() {
    const next = [...(posts ?? []), emptyPost() as unknown as BlogPost];
    reset({ slug, posts: next as unknown as BlogCmsFormValues["posts"] });

    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }

  function removePost(index: number) {
    const next = (posts ?? []).filter((_, i) => i !== index);
    if (!next.length) {
      reset({ slug, posts: [emptyPost() as unknown as BlogPost] });
      return;
    }
    reset({ slug, posts: next as unknown as BlogCmsFormValues["posts"] });
  }

  function addContentItem(postIndex: number) {
    const nextPosts = [...(posts ?? [])];
    nextPosts[postIndex] = {
      ...nextPosts[postIndex],
      content: [...(nextPosts[postIndex].content ?? []), emptyContentItem()],
    };
    reset({ slug, posts: nextPosts as unknown as BlogCmsFormValues["posts"] });
  }

  function removeContentItem(postIndex: number, contentIndex: number) {
    const nextPosts = [...(posts ?? [])];
    const nextContent = (nextPosts[postIndex].content ?? []).filter(
      (_, i) => i !== contentIndex,
    );

    nextPosts[postIndex] = {
      ...nextPosts[postIndex],
      content: nextContent.length ? nextContent : [emptyContentItem()],
    };

    reset({ slug, posts: nextPosts as unknown as BlogCmsFormValues["posts"] });
  }

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Blog CMS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className=" grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-1 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Blog section</Label>
                <Select value={slug} onValueChange={(v) => setSlug(v as BlogSlug)}>
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Select blog section" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_SLUGS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <Button
                  type="submit"
                  disabled={saving || loading || !isDirty}
                  className="w-full"
                >
                  {saving ? "Saving…" : "Save blog"}
                </Button>

                {error ? (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}

                {success ? (
                  <Alert>
                    <AlertTitle>Saved</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                ) : null}

                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading…</p>
                ) : null}
              </form>

              <p className="text-xs text-muted-foreground">
                This editor updates blog posts stored in MongoDB. Per-post rendering
                uses the same BlogPost structure as <code>src/lib/cms/blogpage.ts</code>.
              </p>

              <Button
                type="button"
                variant="secondary"
                onClick={addPost}
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Add post
              </Button>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {(posts ?? []).map((post, postIndex) => (
                <div
                  key={post.url || `${postIndex}`}
                  className="rounded-xl border border-border bg-card p-4 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-semibold">
                        Post {postIndex + 1}
                      </h3>
                      <p className="text-xs text-muted-foreground">Edit fields below.</p>
                    </div>
                    {posts && posts.length > 1 ? (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removePost(postIndex)}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        {...register(`posts.${postIndex}.title`)}
                        placeholder="Post title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Total time</Label>
                      <Input
                        {...register(`posts.${postIndex}.totalTime`)}
                        placeholder="Featured · Growth · 6 min"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        {...register(`posts.${postIndex}.category`)}
                        placeholder="Growth / Nutrition / Lifestyle"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Background color class</Label>
                      <Input
                        {...register(`posts.${postIndex}.bgColor`)}
                        placeholder="bg-[#F5C6A5]"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Image URL</Label>
                      <Input
                        {...register(`posts.${postIndex}.imageSrc`)}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        {...register(`posts.${postIndex}.url`)}
                        placeholder="/blog/puppy-growth-tracker"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Date label</Label>
                      <Input
                        {...register(`posts.${postIndex}.date`)}
                        placeholder="Updated Weekly"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <TextArea
                        {...register(`posts.${postIndex}.description`)}
                        placeholder="Short summary shown on cards"
                        className="min-h-30 w-full rounded-2xl p-4"
                      />
                    </div>

                    {/* Optional CTA / Hyperlink */}
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex items-center justify-between gap-3">
                        <Label className="text-sm">Optional: link to explore other services</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            {...register(`posts.${postIndex}.cta.enabled`)}
                            className="h-4 w-4"
                          />
                          <span className="text-xs text-muted-foreground">Enable</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Link label</Label>
                      <Input
                        {...register(`posts.${postIndex}.cta.label`)}
                        placeholder="Explore calculators"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Href</Label>
                      <Input
                        {...register(`posts.${postIndex}.cta.href`)}
                        placeholder="/calculators"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>aria-label</Label>
                      <Input
                        {...register(`posts.${postIndex}.cta.ariaLabel`)}
                        placeholder="Explore other services"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label className="text-sm">Content blocks</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => addContentItem(postIndex)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add block
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {(post.content ?? []).map((_item, contentIndex) => (
                        <div
                          key={`${postIndex}-${contentIndex}-${_item?.title ?? ""}-${_item?.time ?? ""}`}
                          className="rounded-lg border border-border bg-background/60 p-4 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <Label className="text-sm">Block {contentIndex + 1}</Label>
                              <p className="text-xs text-muted-foreground">
                                Heading + description
                              </p>
                            </div>
                            {post.content && post.content.length > 1 ? (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeContentItem(postIndex, contentIndex)}
                              >
                                <Trash2 className="h-4 w-4" />
                                Remove
                              </Button>
                            ) : null}
                          </div>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Time label</Label>
                              <Input
                                {...register(
                                  `posts.${postIndex}.content.${contentIndex}.time`,
                                )}
                                placeholder="Week 1-2 / Month 3–6"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Title</Label>
                              <Input
                                {...register(
                                  `posts.${postIndex}.content.${contentIndex}.title`,
                                )}
                                placeholder="The newborn phase"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label>Description</Label>
                              <TextArea
                                {...register(
                                  `posts.${postIndex}.content.${contentIndex}.description`,
                                )}
                                placeholder="Paragraph text"
                                className="min-h-30 w-full rounded-2xl p-4"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {loading ? null : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

