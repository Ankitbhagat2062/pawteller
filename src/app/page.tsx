import Image from "next/image";
import Link from "next/link";
import IconBadge from "@/components/shared/IconBadge";
import {
  articles,
  badges,
  calculators,
  features,
  homeImages,
} from "@/lib/constant";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
}

function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div>
      {eyebrow && (
        <p className="text-sm font-semibold tracking-tight text-emerald-800 dark:text-emerald-300">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pawteller",
    url: "https://pawteller.com",
    description:
      "Premium modern pet-care platform and informational calculators.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://pawteller.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLdSchema)}</script>

      <div className="w-full font-sans text-slate-900 dark:bg-zinc-950 dark:text-slate-50">
        <main
          id="home"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/* Hero Section */}
          <section className="relative mt-6 overflow-hidden bg-[#f3ded3] px-6 pt-10 pb-9 sm:px-8 md:px-10 md:pt-8 md:pb-8 dark:rounded-3xl dark:bg-emerald-500/10 dark:pt-14 dark:pb-16">
            <div
              className="absolute inset-0 pointer-events-none hidden dark:block"
              aria-hidden="true"
            >
              <div className="absolute -right-8 top-8 h-28 w-28 rounded-[32px] bg-emerald-500/10" />
              <div className="absolute -left-10 bottom-8 h-24 w-24 rounded-[28px] bg-emerald-500/5" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <p className="hidden text-sm font-semibold tracking-normal text-emerald-800 dark:block dark:text-emerald-300">
                  Pet health made simple
                </p>

                <h1 className="max-w-3xl font-[Georgia,serif] text-[4.2rem] font-black leading-[0.9] tracking-normal text-[#271b16] dark:mt-3 dark:font-sans dark:text-5xl dark:font-extrabold dark:leading-tight dark:text-slate-50 sm:text-[5.4rem] md:text-[6.25rem]">
                  <span className="block">Smart</span>
                  <span className="block">calculators</span>
                  <span className="block">
                    for your{" "}
                    <span className="font-[Georgia,serif] font-black italic text-[#d06a49]">
                      best
                    </span>
                  </span>
                  <span className="block font-[Georgia,serif] font-black italic text-[#d06a49]">
                    friend
                    <span className="text-[#271b16]">.</span>
                  </span>
                </h1>

                <p className="mt-7 max-w-3xl text-[1.45rem] leading-9 tracking-normal text-[#6d5c54] dark:mt-4 dark:max-w-2xl dark:text-base dark:leading-7 dark:text-slate-300 md:text-[1.6rem] md:leading-10">
                  Predict your puppy&apos;s adult size. Decode dog years. Plan
                  portions. Find the perfect breed. All in one beautifully
                  simple place &mdash; backed by veterinary science.
                </p>

                <div className="mt-6 hidden flex-col gap-3 sm:flex-row sm:items-center dark:flex">
                  <Link
                    href="/calculators/dog-age"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  >
                    Calculate Dog's Age <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/calculators/dog-growth"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-850"
                  >
                    Track Puppy Growth <span aria-hidden="true">📈</span>
                  </Link>
                </div>

                <div className="mt-6 hidden flex-wrap gap-3 dark:flex">
                  {badges.map((badge) => (
                    <div
                      key={badge.label}
                      className="flex items-center rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm dark:bg-slate-900/80 dark:text-slate-300 ring-1 ring-slate-200/50 dark:ring-slate-800/50"
                    >
                      <span aria-hidden="true" className="mr-2">
                        {badge.icon}
                      </span>
                      {badge.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* HIGH PERFORMANCE MEDIA TRACK FIX */}
              <div className="hidden w-full dark:block lg:col-span-4">
                {/* On mobile devices we scroll sideways rather than dropping vertically down the screen */}
                <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:overflow-x-visible sm:pb-0">
                  {homeImages.map((image, index) => (
                    <div
                      key={image.src}
                      className="min-w-[75%] sm:min-w-0 shrink-0 snap-center overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-800 shadow-sm ring-1 ring-black/5"
                    >
                      <div className="relative aspect-16/10 w-full min-h-35">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 30vw, 250px"
                          className="object-cover object-center"
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                        Quick start
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                        Pick a tool, get clarity instantly.
                      </p>
                    </div>
                    <div
                      className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-emerald-700 dark:text-emerald-400"
                      aria-hidden="true"
                    >
                      <span>🐕</span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    {features.map((row) => (
                      <Link
                        key={row.title}
                        href={row.href}
                        className="group flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 shadow-sm transition hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900"
                      >
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          {row.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-base text-slate-400 transition group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Calculators */}
          <section className="py-14" aria-label="Featured calculators">
            <SectionHeader eyebrow="Popular Options" title="Featured Tools" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {calculators.map((calc) => {
                const Icon = calc.badge.icon;
                return (
                  <Link
                    key={calc.title}
                    href={calc.link}
                    className="group rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800"
                  >
                    <div className="flex items-start gap-4">
                      <IconBadge bg={calc.badge.bg} fg={calc.badge.fg}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </IconBadge>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
                          {calc.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {calc.description}
                        </p>
                        <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                          <span className="group-hover:underline">
                            Open calculator
                          </span>
                          <span
                            aria-hidden="true"
                            className="transition group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* AdSense Ready Lead Gen Section */}
          <section className="mb-6 rounded-3xl bg-amber-400 p-6 shadow-sm ring-1 ring-black/5 text-slate-950">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="text-sm font-bold uppercase tracking-wider text-amber-950 opacity-80">
                  Dog Breed Quiz
                </p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
                  Which Dog Breed is Right For You?
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-amber-950/80">
                  Match your lifestyle with a breed profile that fits—size,
                  temperament, energy, and growth expectations.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Link
                  href="/quiz"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-900"
                >
                  Start The Quiz Now
                </Link>
              </div>
            </div>
          </section>

          {/* Knowledge Base */}
          <section className="py-14" aria-label="Latest dog care guides">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionHeader
                  eyebrow="Latest Updates"
                  title="Latest Dog Care Guides"
                />
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Practical, expert-backed reads built to be easy to search and
                  easy to apply.
                </p>
              </div>
              <Link
                href="/blog"
                className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View all articles
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.title}
                  className={` ${article.bgColor} flex flex-col justify-between rounded-2xl p-5 shadow-sm ring-1 ring-slate-200/60 dark:bg-slate-900 dark:ring-slate-800 transition 
                  hover:shadow-md`}
                >
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
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {article.category}
                      </span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {article.minutes} min read
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold tracking-tight text-slate-900 dark:text-slate-50">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      {article.date}
                    </span>
                    <Link
                      href={`/blog/${article.category}`}
                      className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Read Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
