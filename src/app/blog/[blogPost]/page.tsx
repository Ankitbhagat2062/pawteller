import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogHeader } from "@/components/blog/blog-header";
import { CtaCard } from "@/components/blog/cta-card";
import { BlogFeaturedImage } from "@/components/blog/blog-featured-image";
import { blogPosts } from "@/lib/constant";
import type { BlogPost, BlogPostPageProps } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";


export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.url === `/blog/${slug}`);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.url.replace("/blog/", ""));
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { blogPost } = await params;


  const post = getBlogPostBySlug(blogPost);


  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  // Extract read time from totalTime (e.g., "Nutrition · 6 min" -> "6 min")
  const readTimeMatch = post.totalTime.match(/(\d+\s*min)/i);
  const readTime = readTimeMatch ? readTimeMatch[1] : "5 min";

  return {
    title: post.title,
    description: post.description,
    keywords: [post.category, "puppy", "dog", "pet care", "dog nutrition"],
    authors: [{ name: "Pet Care Experts" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: [
        {
          url: post.imageSrc,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.imageSrc],
    },
    other: {
      "article:section": post.category,
      "twitter:label1": "Reading time",
      "twitter:data1": readTime,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { blogPost } = await params;
  const post = getBlogPostBySlug(blogPost);

  if (!post) {
    notFound();
  }

  // Extract read time from totalTime (e.g., "Nutrition · 6 min" -> "6 min")
  const readTimeMatch = post.totalTime.match(/(\d+\s*min)/i);
  const readTime = readTimeMatch ? readTimeMatch[1] : "5 min";

  return (
    <main className="min-h-screen bg-background mx-auto px-4 my-4">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
        <BlogHeader category={post.category} readTime={readTime} />

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 md:mb-4 text-balance">
          {post.title}
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          {post.description}
        </p>

        <BlogFeaturedImage src={post.imageSrc} alt={post.title} />

        <BlogContent content={post.content} />

        <CtaCard />
      </div>
      <div className="mt-8 max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts
          .filter((article) => article.url !== post.url)
          .map((article) => (
            <article
              key={article.url}
              className={`mb-6 inline-block w-full break-inside-avoid rounded-2xl p-5 shadow-sm ring-1 ring-slate-200/60 transition hover:shadow-md dark:bg-slate-900 dark:ring-slate-800 
                `}
            >
            <div className="flex min-h-full flex-col justify-between">
              <div>
                <div className="overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={article.imageSrc || "/dog-1.png"}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 350px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {article.totalTime} min read
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {article.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  {article.totalTime}
                </span>
                <Link
                  href={article.url}
                  className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {"Read Article"}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
