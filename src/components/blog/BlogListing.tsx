
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/shared/BlogCard";
import { type BlogPost, blogPosts } from "@/lib/cms/blogpage";
import { fetchBlog } from "@/db/blogCmsDb";
import BacklinkCalculatorCard from "@/components/shared/BacklinkCalculatorCard";
import { backlinks, faqItems } from "@/lib/cms/calculators/calculatorpage";
import { FaqSection } from "@/components/shared/FaqSection";

function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="group overflow-hidden rounded-lg bg-blog-bg transition-shadow hover:shadow-lg dark:bg-blog-bg"
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <Link
        href={post.url}
        className="flex flex-col md:flex-row"
        aria-label={`Read article: ${post.title}`}
      >
        {/* Image Container */}
        <div className="relative aspect-4/3 w-full overflow-hidden md:aspect-square md:w-2/5 lg:w-1/2">
          <Image
            src={post.imageSrc}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            itemProp="image"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-1 flex-col justify-center gap-3 p-6 md:gap-4 md:p-8 lg:p-10">
          {/* Banner/Category */}
          <span className="text-xs font-semibold uppercase tracking-widest text-blog-accent">
            {post.totalTime}
          </span>

          {/* Title */}
          <h3
            className="font-serif text-2xl font-normal leading-tight text-blog-heading md:text-3xl lg:text-4xl"
            itemProp="headline"
          >
            <span className="text-balance">{post.title}</span>
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed text-muted-foreground md:text-base"
            itemProp="description"
          >
            {post.description}
          </p>

          {/* Read More Link */}
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blog-heading transition-colors group-hover:text-blog-accent">
            Read article
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
export default async function BlogListing() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("adminAuthToken")?.value;
  const specificBlog = await fetchBlog("how-to-train-your-dog", adminToken);
  const blogs: BlogPost[] = specificBlog ? specificBlog?.posts : blogPosts;
  const featuredPost = blogs.length
    ? (() => {
      const seed = blogs[0]?.url ?? "fallback";
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
      }
      return blogs[hash % blogs.length];
    })()
    : undefined;
  return (
    <section
      className="bg-background text-foreground px-4 py-12 mx-auto md:px-6 md:py-16 lg:px-8 lg:py-20"
      aria-labelledby="blog-section-title"
    >
      {/* Header */}
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <header className="mb-10 md:mb-14">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-blog-accent">
            The Pawmetric Journal
          </span>
          <h1
            id="blog-section-title"
            className="mb-4 font-serif text-4xl font-normal leading-tight text-blog-heading md:text-5xl lg:text-6xl"
          >
            <span className="text-balance">
              Stories, science, and <em className="italic">love</em> for dogs.
            </span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Honest, well-researched articles to help you raise a happier,
            healthier dog.
          </p>
        </header>

        {/* Blog Posts Grid */}
        <div
          className="flex flex-col gap-6 md:gap-8"
          role="feed"
          aria-label="Blog articles"
        >
          {featuredPost ? (
            <FeaturedBlogCard key={featuredPost.url} post={featuredPost} />
          ) : null}
        </div>
      </div>

      {/* Backlinks || Other Calculators and services */}
      {(() => {
        const stableIndexSeed = blogs[0]?.url ?? "fallback-4";
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

      {/* Blog Posts Grid */}
      <div className="mt-8 max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs
          .filter((article) => article.url !== featuredPost?.url)
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
    </section>
  );
}
