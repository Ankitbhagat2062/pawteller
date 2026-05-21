import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { blogPosts } from "@/lib/constant";

function BlogCard({ post }: { post: BlogPost }) {
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
const featuredPost =
    blogPosts.length > 0
      ? blogPosts[Math.floor(Math.random() * blogPosts.length)]
      : undefined;
export default function BlogListing() {
  return (
    <section
      className="bg-blog-bg px-4 py-12 mx-auto md:px-6 md:py-16 lg:px-8 lg:py-20"
      aria-labelledby="blog-section-title"
    >
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
         {featuredPost ? <BlogCard key={featuredPost.url} post={featuredPost} /> : null}
        </div>
      </div>
      <div className="mt-8 max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts
          .filter((article) => article.url !== featuredPost?.url)
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
                    href={article.url} aria-label={`Read articles about ${article.title}`}
                    className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {"Read Article"}
                  </Link>
                </div>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}
