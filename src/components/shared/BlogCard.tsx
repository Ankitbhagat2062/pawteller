import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/cms/blogpage";
import { OptionalServicesCta } from "../blog/optional-services-cta";

const BlogCard = (article: BlogPost) => {
  return (
    <article
      key={article.url}
      className={`${article?.bgColor} mb-6 inline-block w-full break-inside-avoid rounded-2xl p-5 shadow-sm ring-1 ring-slate-200/60 transition hover:shadow-md dark:bg-slate-900 dark:ring-slate-800`}
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
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-900 dark:text-emerald-200">
              {article.category}
            </span>
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
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
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
            {article?.date}
          </span>
          <Link
            href={`${article.url}`}
            aria-label={` Read article about ${article.title}`}
            className="text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
          >
            {"Read Article"}
          </Link>
        </div>
      </div>

      <OptionalServicesCta
        label={article.cta?.label}
        href={article.cta?.href}
        ariaLabel={article.cta?.ariaLabel}
      />
    </article>
  );
};

export default BlogCard;
