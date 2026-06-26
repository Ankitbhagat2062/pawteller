import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogFeaturedImage } from "@/components/blog/blog-featured-image";
import { BlogHeader } from "@/components/blog/blog-header";
import { CtaCard } from "@/components/blog/cta-card";
import type { BlogPost, BlogPostPageProps } from "@/lib/cms/blogpage";
import { blogPosts } from "@/lib/cms/blogpage";
import { backlinks, faqItems } from "@/lib/cms/calculators/calculatorpage";
import BacklinkCalculatorCard from "@/components/shared/BacklinkCalculatorCard";
import { FaqSection } from "@/components/shared/FaqSection";
import BlogCard from "@/components/shared/BlogCard";
import { fetchBlog } from "@/db/blogCmsDb";

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { blogPost } = await params;
  const specificBlog = await fetchBlog(blogPost);
  const blogs: BlogPost[] = specificBlog ? specificBlog?.posts : blogPosts;
  const post = blogs.find((p) => p.url.replace("/blog/", "") === blogPost);

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
  const specificBlog = await fetchBlog(blogPost);
  const blogs: BlogPost[] = specificBlog ? specificBlog?.posts : blogPosts;
  const post = blogs.find((p) => p.url.replace("/blog/", "") === blogPost);

  if (!post) {
    notFound();
  }

  // Extract read time from totalTime (e.g., "Nutrition · 6 min" -> "6 min")
  const readTimeMatch = post.totalTime.match(/(\d+\s*min)/i);
  const readTime = readTimeMatch ? readTimeMatch[1] : "5 min";
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MRMZHPN5';

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      ></Script>
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

        {/* Backlinks || Other Calculators and services */}
        {(() => {
          const stableIndexSeed = blogPosts[0]?.url ?? "fallback-4";
          let hash = 0;
          for (let i = 0; i < stableIndexSeed.length; i++) {
            hash = (hash * 31 + stableIndexSeed.charCodeAt(i)) >>> 0;
          }

          const start =
            backlinks.length === 0 ? 0 : hash % backlinks.length;
          const cards = [
            backlinks[start],
            backlinks[(start + 1) % backlinks.length],
          ].filter(Boolean);

          return <BacklinkCalculatorCard cards={cards} />
        })()}

        {/* Related Blog Posts */}
        <div className="mt-8 max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs
            .filter((article) => article.url !== post.url)
            .map((article) => (
              <BlogCard key={article.url} {...article} />
            ))}
        </div>

        {/* FAQ */}
        {faqItems.length > 0 ? (
          <section
            className="mt-10"
            aria-label="About frequently asked questions"
          >
            <FaqSection items={faqItems} />
          </section>
        ) : null}
      </main>
    </>
  );
}
