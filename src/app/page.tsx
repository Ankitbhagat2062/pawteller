import {
  ArrowRight,
  Cake,
  PawPrint,
  Scale,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  blogPosts,
  calculators,
  dogLifeStages,
  featuredCalculatorCards,
} from "@/lib/constant";
import type {
  CalculatorProps,
  dogLifeStageProps,
  SectionHeaderProps,
} from "@/lib/types";
import Script from "next/script";

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
      {/* JSON-LD + gtag should be in head for best practice; using Next Script with ids */}
      <Script
        id="jsonld-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLdSchema)}
      </Script>
      <div className="w-full font-sans text-slate-900 dark:bg-zinc-950 dark:text-slate-50">
        <main
          id="home"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/* Hero Section */}
          <section className="relative rounded-2xl left-1/2 mt-6 w-full -translate-x-1/2 overflow-hidden bg-[#f3ded3] px-6 py-16 sm:px-8 md:px-12 lg:px-16 lg:py-20 dark:rounded-3xl dark:bg-emerald-500/10">
            <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <p className="inline-flex h-7 items-center gap-2 rounded-full bg-[#ead8cd] px-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-[#3f342f] dark:bg-emerald-500/10 dark:text-emerald-300">
                  <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
                  {"For dog parents who care deeply"}
                </p>

                <h1 className="mt-8 max-w-2xl font-[Georgia,serif] text-[4rem] font-black leading-[0.9] tracking-normal text-[#2a1b15] sm:text-[5.25rem] lg:text-[5.6rem]">
                  <span className="block">Smart</span>
                  <span className="block">calculators</span>
                  <span className="block">
                    {"for your"}{" "}
                    <span className="font-[Georgia,serif] font-black italic text-[#d36c4a]">
                      {"best"}
                    </span>
                  </span>
                  <span className="block font-[Georgia,serif] font-black italic text-[#d36c4a]">
                    {"friend"}
                    <span className="text-[#2a1b15]">.</span>
                  </span>
                </h1>

                <p className="mt-7 max-w-xl text-lg leading-8 text-[#5f5049] md:text-xl md:leading-9">
                  {"Predict your puppy"}&apos;
                  {`s adult size. Decode dog years. Plan
                  portions. Find the perfect breed. All in one beautifully`}
                  {" simple place"} &mdash; {"backed by veterinary science."}
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/calculators/puppy-weight"
                    aria-label="Calculate your dog’s growth"
                    className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#df7959] px-7 text-sm font-bold text-white shadow-[0_12px_24px_rgba(170,88,61,0.24)] transition hover:bg-[#cf6848]"
                  >
                    {"Start with Puppy Weight"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/quiz" aria-label="start a quiz and predict your puppy's adult size"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-[#d2c5bd] bg-[#fbf8f3] px-7 text-sm font-bold text-[#2a1b15] shadow-sm transition hover:bg-white"
                  >
                    {"Find My Breed Match"}
                  </Link>
                </div>

                <div className="mt-10 flex flex-col gap-3 text-sm text-[#6b5d56] sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex items-center gap-1 text-[#d36c4a]">
                    <span className="sr-only">Five star rating</span>
                    {["one", "two", "three", "four", "five"].map((star) => (
                      <Star
                        key={`hero-star-${star}`}
                        className="h-4 w-4 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p>
                    {"                    Loved by"}{" "}
                    <span className="font-extrabold text-[#2a1b15]">
                      12,000+
                    </span>{" "}
                    {" dog parents"}
                  </p>
                </div>
              </div>

              <div className="relative lg:col-span-6">
                <div className="relative ml-auto aspect-5/6 w-full max-w-147.5 overflow-hidden rounded-[28px] bg-[#ead8cd] shadow-[0_28px_80px_rgba(52,45,40,0.22)] sm:aspect-6/7 lg:min-h-176.25">
                  <Image
                    src="https://images.unsplash.com/photo-1523480717984-24cba35ae1ef"
                    alt="Golden retriever sitting on a beach"
                    fill
                    sizes="(max-width: 1024px) 100vw, 590px"
                    className="object-cover object-center"
                    priority
                    loading="eager"
                  />
                </div>

                <div className="absolute left-0 top-8 rounded-2xl bg-[#fbf8f3]/95 px-5 py-4 text-[#2a1b15] shadow-[0_18px_34px_rgba(52,45,40,0.2)] ring-1 ring-white/60 sm:-left-10 lg:-left-14">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#6b5d56]">
                    <Scale
                      className="h-4 w-4 text-[#d36c4a]"
                      aria-hidden="true"
                    />
                    {"Adult weight"}
                  </p>
                  <p className="mt-2 font-[Georgia,serif] text-3xl leading-none">
                    {" 62 lbs"}
                  </p>
                  <p className="mt-1 text-xs text-[#7b6b63]">at 18 months</p>
                </div>

                <div className="absolute -right-2 bottom-10 rounded-2xl bg-[#315846] px-5 py-4 text-white shadow-[0_18px_34px_rgba(34,52,43,0.28)] sm:-right-6 lg:-right-9">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/78">
                    <Cake className="h-4 w-4" aria-hidden="true" />
                    {" Human age"}
                  </p>
                  <p className="mt-2 font-[Georgia,serif] text-4xl leading-none">
                    {" 36 yrs"}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    {"Buddy is a young adult"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Calculators */}
          <section
            className="py-14 rounded-2xl"
            aria-label="Featured calculators"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[285px] lg:gap-5">
              {calculators.map((calc: CalculatorProps) => {
                const Icon = calc.badge.icon;
                const card = featuredCalculatorCards.find(
                  (item) => item.title === calc.title,
                );
                const displayTitle = card?.displayTitle ?? calc.title;
                const displayDescription =
                  card?.description ?? calc.description;

                return (
                  <Link
                    key={calc.title}
                    href={calc.link}
                    aria-label={`Open ${displayTitle} calculator`}
                    className={`group relative flex min-h-55 overflow-hidden rounded-[20px] p-7 text-[#17372f] ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:min-h-62.5 lg:min-h-0 dark:text-[#e8f1eb] dark:ring-white/10 dark:hover:shadow-none ${card?.bg ?? "bg-white"} ${card?.darkBg ?? "dark:bg-slate-900"} ${card?.className ?? ""}`}
                  >
                    {card?.badge && (
                      <span className="absolute right-5 top-4 rounded-full bg-[#17372f] px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.24em] text-white dark:bg-[#fbf6ed] dark:text-[#17372f]">
                        {card.badge}
                      </span>
                    )}

                    <div className="flex h-full w-full flex-col justify-between">
                      <div>
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f7f3ea] text-[#17372f] shadow-sm dark:bg-white/12 dark:text-[#fbf6ed] dark:ring-1 dark:ring-white/10">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>

                        <div className="mt-7">
                          <h3 className="font-[Georgia,serif] text-3xl leading-none tracking-normal text-[#1c120d] dark:text-[#fbf6ed]">
                            {displayTitle}
                          </h3>
                          <p className="mt-2 text-sm font-medium leading-5 tracking-[0.04em] text-[#3f342f] dark:text-[#d4c9bb]">
                            {displayDescription}
                          </p>
                        </div>
                      </div>

                      {card?.imageSrc && (
                        <div className="my-7 overflow-hidden rounded-xl bg-[#edf1e7] ring-1 ring-black/5 dark:bg-white/8 dark:ring-white/10">
                          <div className="relative aspect-4/3 w-full">
                            <Image
                              src={card.imageSrc}
                              alt={`${card.imageAlt}`}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                              className="object-cover"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}

                      <p className="inline-flex items-center gap-2 text-xs font-extrabold text-[#17372f] dark:text-[#a6d4bd]">
                        <span>{"Try it"}</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section
            className="relative rounded-2xl left-1/2 w-full -translate-x-1/2 bg-[#294e3f] px-6 py-16 text-[#fbf6ed] sm:px-8 md:py-20 lg:px-16"
            aria-labelledby="dog-life-stage-title"
          >
            <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.95fr)] lg:items-center">
              <div className="max-w-145">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.42em] text-[#e77855]">
                  {" The story of every dog"}
                </p>
                <h2
                  id="dog-life-stage-title"
                  className="mt-5 max-w-140 font-[Georgia,serif] text-4xl leading-[0.98] tracking-normal text-[#fbf6ed] sm:text-5xl lg:text-[3.35rem]"
                >
                  {"From tiny paws to wise old soul"} &mdash; we&apos;ll{" "}
                  {`be your
                  guide.`}
                </h2>
                <p className="mt-6 max-w-145 text-base leading-7 text-[#fbf6ed]/82">
                  {`Dogs grow up fast. One month they fit in your palm, the next
                  they`}
                  &apos;
                  {`re hogging the couch. Pawteller turns the science of
                  dog development into beautiful, easy-to-understand answers`}
                  &mdash;
                  {` so you can spend less time worrying and more time
                  playing fetch.`}
                </p>
                <Button
                  asChild
                  className="mt-9 h-12 rounded-full bg-[#e57655] px-7 text-sm font-bold text-white shadow-none hover:bg-[#d96848]"
                >
                  <Link href="/quiz" aria-label="start a quiz to know about how dog grows different than human">
                    {"Find your perfect breed match"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:min-h-64 lg:items-start lg:gap-3">
                {dogLifeStages.map((item: dogLifeStageProps) => (
                  <article
                    key={item.stage}
                    className={`flex aspect-[1.08/1] min-h-36 flex-col rounded-[14px] bg-[#fbf6ed] p-5 text-[#17120f] shadow-none sm:min-h-43 lg:min-h-43 ${item.className}`}
                  >
                    <span className="text-3xl leading-none" aria-hidden="true">
                      {item.icon}
                    </span>
                    <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#17120f]/55">
                      {item.age}
                    </p>
                    <h3 className="mt-1 font-[Georgia,serif] text-xl leading-none tracking-normal text-[#17120f]">
                      {item.stage}
                    </h3>
                    <p className="mt-2 text-sm leading-none text-[#17120f]/65">
                      {item.weight}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* AdSense Ready Lead Gen Section */}
          <section className="m-6 rounded-3xl bg-amber-400 p-6 shadow-sm ring-1 ring-black/5 text-slate-950">
            <div className="grid gap-6 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <p className="text-sm font-bold uppercase tracking-wider text-amber-950 opacity-80">
                  {"Dog Breed Quiz"}
                </p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
                  {"Which Dog Breed is Right For You?"}
                </h2>
                <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-amber-950/80">
                  {`                  Match your lifestyle with a breed profile that fits—size,
                  temperament, energy, and growth expectations.`}
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <Link
                  href="/quiz" aria-label="Start the quiz to find which dog breed is best for you"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-900"
                >
                  {" Start The Quiz Now"}
                </Link>
              </div>
            </div>
          </section>

          <section
            className="py-10 sm:py-12 lg:py-14"
            aria-labelledby="breed-quiz-feature-title"
          >
            <div className="overflow-hidden rounded-[28px] bg-[#f3eadb] px-6 py-10 shadow-none ring-1 ring-transparent sm:rounded-[34px] sm:px-10 sm:py-12 md:px-14 lg:px-16 lg:py-15 xl:px-20 dark:bg-[#17261f] dark:ring-white/8">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,1fr)] lg:items-center lg:gap-16">
                <div className="max-w-md text-center sm:text-left">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[#d76d47] dark:text-[#f09a75]">
                    {"Free quiz - 2 minutes"}
                  </p>
                  <h2
                    id="breed-quiz-feature-title"
                    className="mt-4 font-[Georgia,serif] text-4xl leading-[0.96] tracking-normal text-[#2a1b15] sm:text-5xl lg:text-[2.85rem] dark:text-[#fbf6ed]"
                  >
                    {"Which dog breed fits"}{" "}
                    <span className="italic text-[#315846] dark:text-[#a6d4bd]">
                      {"your life?"}
                    </span>
                  </h2>
                  <p className="mt-5 text-sm leading-6 text-[#493a34] sm:max-w-sm sm:text-[0.95rem] dark:text-[#d7cdbd]">
                    {"Answer 6 quick questions about your lifestyle and we"}
                    &apos;ll
                    {`                    match you with your top 3 breeds, personalized to your home,
                    energy and family.`}
                  </p>
                  <Button
                    asChild
                    className="mt-8 h-11 rounded-full bg-[#315846] px-6 text-xs font-medium text-white shadow-[0_10px_20px_rgba(49,88,70,0.16)] hover:bg-[#294b3b] dark:bg-[#f09a75] dark:text-[#1d140f] dark:shadow-none dark:hover:bg-[#f3a984]"
                  >
                    <Link href="/quiz" aria-label="random quiz to find whether you dog isbest for you or not">
                      {"Take the quiz"}
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>

                <div className="relative aspect-4/3 min-h-56 w-full overflow-hidden rounded-2xl bg-[#e4dbc9] ring-1 ring-black/5 sm:aspect-16/10 md:min-h-80 lg:min-h-84 dark:bg-[#22382d] dark:ring-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1560743641-3914f2c45636"
                    alt="Two happy dogs sitting together in tall grass"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 492px"
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>
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
                  {` Practical, expert-backed reads built to be easy to search and
                  easy to apply.`}
                </p>
              </div>
              <Link
                href="/blog" aria-label="start reading blog about the dog"
                className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {"View all articles"}
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(() => {
                const selectedArticles = [...blogPosts]
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 3);

                return selectedArticles.map((article) => (
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
                          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            {article.category}
                          </span>
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
                          {article?.date}
                        </span>
                        <Link
                          href={`${article.url}`} aria-label={` Read article about ${article.title}`}
                          className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          {"Read Article"}
                        </Link>
                      </div>
                    </div>
                  </article>
                ));
              })()}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
