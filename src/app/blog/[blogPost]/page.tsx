import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog-data";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogHeader } from "@/components/blog/blog-header";
import { CtaCard } from "@/components/blog/cta-card";
import { BlogFeaturedImage } from "@/components/blog/blog-featured-image";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

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
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Extract read time from totalTime (e.g., "Nutrition · 6 min" -> "6 min")
  const readTimeMatch = post.totalTime.match(/(\d+\s*min)/i);
  const readTime = readTimeMatch ? readTimeMatch[1] : "5 min";

  return (
    <main className="min-h-screen bg-background">
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
    </main>
  );
}
