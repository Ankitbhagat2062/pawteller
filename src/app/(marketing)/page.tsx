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
import { homepageCms, HomepageHeroCms } from "@/lib/cms/homepage";
import type { SectionHeaderProps } from "@/lib/types";
import Script from "next/script";
import BlogCard from "@/components/shared/BlogCard";
import { CalculatorProps } from "@/lib/cms/calculatorpage";

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
const heroSection = homepageCms.hero ?
  (Array.isArray(homepageCms.hero) ?
    homepageCms.hero :
    [homepageCms.hero]) :
  [];
const featureSection= homepageCms.featuredCalculators
const featuredCalculatorCards = homepageCms.featuredCalculators.cards
const dogLifeStages = homepageCms.dogLifes.right.dogLifeStages
const dogLifesLeft = homepageCms.dogLifes.left ? (Array.isArray(homepageCms.dogLifes.left) ?
  homepageCms.dogLifes.left :
  [homepageCms.dogLifes.left]) :
  [];
const breedQuiz = homepageCms.breedQuizCtas ? (Array.isArray(homepageCms.breedQuizCtas.feature) ?
  homepageCms.breedQuizCtas.feature :
  [homepageCms.breedQuizCtas.feature]) :
  [];
export default function Home() {
  const jsonLdSchema = homepageCms.seo.jsonLd ?? {};

  return (
    <>
      {/* JSON-LD gtag should be in head for best practice; using Next Script with ids */}
      <Script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLdSchema)}
      </Script>
      <div className="w-full font-sans text-slate-900 dark:bg-zinc-950 dark:text-slate-50">
        <main
          id="home"
          className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <h2 className="sr-only">Homepage</h2>

          {/* Hero Section */}
          {heroSection && (
            heroSection.map((hero: HomepageHeroCms) => (
              <section key={hero.id} className="relative rounded-2xl left-1/2 mt-6 w-full -translate-x-1/2 overflow-hidden bg-[#f3ded3] px-6 py-16 sm:px-8 md:px-12 lg:px-16 lg:py-20 dark:rounded-3xl dark:bg-emerald-500/10">
                <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-6">
                    <p className="inline-flex h-7 items-center gap-2 rounded-full bg-[#ead8cd] px-4 text-[0.5rem] sm:text-[0.72rem] font-medium 
                uppercase tracking-[0.28em] text-[#3f342f] dark:bg-emerald-500/10 dark:text-emerald-300">
                      <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
                      {hero.badgeText}
                    </p>
                    {(() => {
                      const title = hero.h1 ? hero.h1 : "Smart Calculators for your best friend";
                      const ArrayOfParts: string[] = title.trim().split(/\s+/); // Removes the full match element

                      if (title) {
                        return <h1 className="mt-8 max-w-2xl font-[Georgia,serif] text-[3rem] font-black leading-[0.9] tracking-normal 
                text-[#2a1b15] dark:text-[#ad7e6b] sm:text-[5.25rem] lg:text-[5.6rem]">
                          <span className="block">{ArrayOfParts[0] ?? ''}</span>
                          <span className="block">{ArrayOfParts[1] ?? ''}</span>
                          <span className="block">
                            {ArrayOfParts[2] ?? ''}
                            {" "}
                            <span className={`font-[Georgia,serif] font-black italic text-[#315846] dark:text-[#a6d4bd]`}>
                              {ArrayOfParts[3] ?? ''}
                            </span>
                          </span>
                          <span className={`block font-[Georgia,serif] text-[0.9em] font-black italic text-[#315846] dark:text-[#a6d4bd]`}>
                            {ArrayOfParts[4] ?? ''} {ArrayOfParts[5] ?? ''}
                            <span className="text-[#2a1b15]">.</span>
                          </span>
                        </h1>
                      }
                    })()}

                    <p className="mt-7 max-w-xl text-lg leading-8 text-[#3b2f28] dark:text-[#efece8] md:text-xl md:leading-9">
                      {hero.descriptionLines}
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Link
                        href={hero.primaryCta.href}
                        aria-label={`${hero.primaryCta.ariaLabel}`}
                        className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#C1441E] px-7 text-sm 
                    font-bold text-white shadow-[0_12px_24px_rgba(170,88,61,0.24)] transition hover:bg-[#cf6848]"
                      >
                        {hero.primaryCta.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link
                        href={hero.secondaryCta.href}
                        aria-label={`${hero.secondaryCta.ariaLabel}`}
                        className="inline-flex h-12 items-center justify-center rounded-full border border-[#d2c5bd] bg-[#fbf8f3] px-7 text-sm font-bold text-[#2a1b15] shadow-sm transition hover:bg-white"
                      >
                        {hero.secondaryCta.label}
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
                        {`${hero.ratingLabelPrefix}`}{" "}
                        <span className="font-extrabold text-[#2a1b15] dark:text-[#a6d4bd]">
                          {hero.ratingCountText}
                        </span>{" "}
                        {`${hero.ratingLabelSuffix}`}
                      </p>
                    </div>
                  </div>

                  <div className="relative lg:col-span-6">
                    <div className="relative ml-auto aspect-5/6 w-full max-w-147.5 overflow-hidden rounded-[28px] bg-[#ead8cd] shadow-[0_28px_80px_rgba(52,45,40,0.22)] sm:aspect-6/7 lg:min-h-176.25">
                      <Image
                        src={`${hero.image.src}`}
                        alt={`${hero.image.alt}`}
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
                        {`${hero.overlayLeft.eyebrow}`}
                      </p>
                      <p className="mt-2 font-[Georgia,serif] text-3xl leading-none">
                        {`${hero.overlayLeft.value}`}
                      </p>
                      <p className="mt-1 text-xs text-[#7b6b63]">
                        {`${hero.overlayLeft.footer}`}
                      </p>
                    </div>

                    <div className="absolute -right-2 bottom-10 rounded-2xl bg-[#315846] px-5 py-4 text-white shadow-[0_18px_34px_rgba(34,52,43,0.28)] sm:-right-6 lg:-right-9">
                      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/78">
                        <Cake className="h-4 w-4" aria-hidden="true" />
                        {`${hero.overlayRight.eyebrow}`}
                      </p>
                      <p className="mt-2 font-[Georgia,serif] text-4xl leading-none">
                        {`${hero.overlayRight.value}`}
                      </p>
                      <p className="mt-1 text-xs text-white/70">
                        {`${hero.overlayRight.footer}`}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))
          )}

          {/* Featured Calculators */}
          {featureSection && (
            <section
              className="py-14 rounded-2xl"
              aria-label="Featured calculators"
              aria-labelledby="featured-calculators-title"
            >
              <h2
                id="featured-calculators-title"
                className="sr-only"
              >
                Featured calculators
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[285px] lg:gap-5">
                {featureSection?.calculators && featureSection.calculators.map((calc: CalculatorProps) => {
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
          )}

          {homepageCms.dogLifes && (
            <section
              className="relative rounded-2xl left-1/2 w-full -translate-x-1/2 bg-[#294e3f] px-6 py-16 text-[#fbf6ed] sm:px-8 md:py-20 lg:px-16"
              aria-labelledby="dog-life-stage-title"
            >
              <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.95fr)] lg:items-center">
                {dogLifesLeft && (
                  dogLifesLeft.map((dog: { eyebrow: string; title: string; description: string; cta: { label: string; href: string; ariaLabel?: string } }) => (
                    <div key={dog.eyebrow} className="max-w-145">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.42em] text-[#F1D9A8]">
                        {`${dog.eyebrow}`}
                      </p>
                      <h2
                        id="dog-life-stage-title"
                        className="mt-5 max-w-140 font-[Georgia,serif] text-4xl leading-[0.98] tracking-normal text-[#ffffff] sm:text-5xl lg:text-[3.35rem]"
                      >
                        {`${dog.title}`}
                      </h2>
                      <p className="mt-6 max-w-145 text-base leading-7 text-[#fbf6ed]/82">
                        {`${dog.description}`}
                      </p>
                      <Button
                        asChild
                        className="mt-9 h-12 rounded-full bg-[#f3eadb] px-7 text-sm font-bold text-[#1A110B] shadow-none hover:bg-[#E5D7BF]"
                      >
                        <Link
                          href={`${dog.cta.href}`}
                          aria-label={`${dog.cta.ariaLabel}`}
                        >
                          {`${dog.cta.label}`}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  ))
                )}

                <div className="grid gap-4 sm:grid-cols-3 lg:gap-3 lg:auto-rows-fr lg:items-stretch">
                  {dogLifeStages.map((item) => (
                    <article key={item.stage}
                      className={`flex flex-col rounded-[14px] bg-[#fbf6ed] p-5 
                      text-[#17120f] shadow-none min-h-20 sm:min-h-43 lg:min-h-43 ${item.className} overflow-hidden`}

                    >
                      <span className="text-3xl leading-none" aria-hidden="true">
                        {item.icon}
                      </span>
                      <p className="mt-5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#000000]">
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
          )}

          {/* Ads Space goes here */}
          <section className="m-6 rounded-3xl flex items-center justify-center bg-amber-100 p-6 shadow-sm ring-1 ring-black/5 text-slate-950 min-h-62.5">
            Ads Space Goes here
          </section>

          {/* Breed Quiz Cta's */}
          {breedQuiz && (
            <section
              className="py-10 sm:py-12 lg:py-14"
              aria-labelledby="breed-quiz-feature-title"
            >
              {breedQuiz.map((quiz: {
                eyebrow: string;
                title: string;
                titleEmphasis: string;
                description: string;
                cta: { label: string; href: string; ariaLabel?: string };
                image: { src: string; alt: string };
              }) => (
                <div key={quiz.eyebrow} className="overflow-hidden rounded-[28px] bg-[#e4c99a] px-6 py-10 shadow-none ring-1 ring-transparent sm:rounded-[34px]
             sm:px-10 sm:py-12 md:px-14 lg:px-16 lg:py-15 xl:px-20 dark:bg-[#17261f] dark:ring-white/8">
                  <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,1fr)] lg:items-center lg:gap-16">
                    <div className="max-w-md text-center sm:text-left">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-slate-800 dark:text-[#FF7F4D]">
                        {`${quiz.eyebrow}`}
                      </p>
                      <h2
                        id="breed-quiz-feature-title"
                        className="mt-4 font-[Georgia,serif] text-4xl leading-[0.96] tracking-normal text-[#2a1b15] sm:text-5xl lg:text-[2.85rem] dark:text-[#fbf6ed]"
                      >
                        {`${quiz.title}`}{" "}
                        <span className="italic text-[#315846] dark:text-[#a6d4bd]">
                          {`${quiz.titleEmphasis}`}
                        </span>
                      </h2>
                      <p className="mt-5 text-sm leading-6 text-[#493a34] sm:max-w-sm sm:text-[0.95rem] dark:text-[#d7cdbd]">
                        {`${quiz.description}`}
                      </p>
                      <Button
                        asChild
                        className="mt-8 h-11 rounded-full bg-[#315846] px-6 text-xs font-medium text-white shadow-[0_10px_20px_rgba(49,88,70,0.16)] hover:bg-[#294b3b] dark:bg-[#f09a75] dark:text-[#1d140f] dark:shadow-none dark:hover:bg-[#f3a984]"
                      >
                        <Link
                          href={`${quiz.cta.href}`}
                          aria-label={`${quiz.cta.ariaLabel}`}
                        >
                          {`${quiz.cta.label}`}
                          <Sparkles className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>

                    <div className="relative aspect-4/3 min-h-56 w-full overflow-hidden rounded-2xl bg-[#e4dbc9] ring-1 ring-black/5 sm:aspect-16/10 md:min-h-80 lg:min-h-84 dark:bg-[#22382d] dark:ring-white/10">
                      <Image
                        src={`${quiz.image.src}`}
                        alt={`${quiz.image.alt}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 492px"
                        className="object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Knowledge Base */}
          {(() => {
            const knowledgeBaseItems = homepageCms.knowledgeBase
              ? (Array.isArray(homepageCms.knowledgeBase)
                ? homepageCms.knowledgeBase
                : [homepageCms.knowledgeBase])
              : [];
            const blogPosts = homepageCms.blogPosts ?
              (Array.isArray(homepageCms.blogPosts) ?
                homepageCms.blogPosts :
                [homepageCms.blogPosts]) :
              [];
            return (
              <section className="py-14" aria-label="Latest dog care guides">
                {
                  knowledgeBaseItems && (knowledgeBaseItems.map((
                    { eyebrow, title, description, viewAllHref, viewAllLabel }
                      : { eyebrow: string, title: string, description: string, viewAllHref: string, viewAllLabel: string }) => (
                    <div key={title} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div>
                        <SectionHeader
                          eyebrow={`${eyebrow}`}
                          title={`${title}`}
                        />
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {`${description}`}
                        </p>
                      </div>
                      <Link
                        href={viewAllHref}
                        aria-label="View all dog care articles"
                        className="text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:underline"
                      >
                        {`${viewAllLabel}`}
                      </Link>
                    </div>
                  )))
                }
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {(() => {
                    if (blogPosts.length === 0) return null;
                    const dayOfYear = Math.floor(
                      Date.now() / (1000 * 60 * 60 * 24),
                    );
                    const startIndex = dayOfYear % blogPosts.length;
                    const selectedArticles = [
                      blogPosts[startIndex % blogPosts.length],
                      blogPosts[(startIndex + 1) % blogPosts.length],
                      blogPosts[(startIndex + 2) % blogPosts.length],
                    ];

                    return selectedArticles.map((article) => (
                      <BlogCard key={article.url} {...article} />
                    ));
                  })()}
                </div>
              </section>
            )
          })()}
        </main>
      </div>
    </>
  );
}
