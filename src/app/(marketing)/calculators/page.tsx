import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  ChevronRight,
  DollarSign,
  PawPrint,
  Scale,
  Sparkles,
  Utensils,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { calculators, faqItems } from "@/lib/constant";
import { SchemaOrg } from "@/lib/seo-schema";

export const metadata: Metadata = {
  title: "Dog Growth & Health Calculators | pawteller",
  description:
    "Use pawteller’s vet-informed dog calculators to estimate growth, convert dog age to human years, plan nutrition, and track key life stages. Fast, mobile-friendly, SEO-first.",
  keywords: [
    "dog growth calculator",
    "dog age calculator",
    "puppy weight calculator",
    "dog food calculator",
    "dog pregnancy calculator",
    "dog name generator",
    "pet care calculators",
    "veterinary pet care",
    "dog years to human years",
    "feeding calculator",
  ],
  authors: [{ name: "Pet Care Team" }],
  alternates: {
    canonical: "https://pawteller.com/calculators",
  },
  openGraph: {
    title: "Dog Growth & Health Calculators | pawteller",
    description:
      "Explore science-informed calculators for dog age, puppy growth, feeding, and pregnancy milestones.",
    type: "website",
    locale: "en_US",
    url: "https://pawteller.com/calculators",
    images: [
      {
        url: "https://pawteller.com/dog-2.png",
        width: 1200,
        height: 630,
        alt: "pawteller calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Growth & Health Calculators | pawteller",
    description:
      "Fast dog growth and nutrition calculators for smarter pet care decisions.",
    images: ["https://pawteller.com/dog-2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function CalculatorsPage() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZVQNS9QQHG"
      />
      <SchemaOrg />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mt-4 rounded-[28px] overflow-hidden bg-[#f3ded3] px-6 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20 dark:bg-emerald-500/10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#ead8cd] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#3f342f] dark:bg-emerald-500/10 dark:text-emerald-200">
                <PawPrint className="h-4 w-4" aria-hidden="true" />
                <span>Pet care calculators</span>
              </div>

              <h1 className="mt-7 font-[Georgia,serif] text-4xl font-black leading-[1.02] tracking-normal
               text-[#2a1b15] dark:text-[#e6bdae] sm:text-[3.9rem]">
                Find the right tool for your dog’s next
                <span className="block italic text-[#d36c4a]">milestone.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5f5049] sm:text-lg sm:leading-8 dark:text-zinc-200">
                Fast, mobile-friendly calculators for dog age conversion, puppy
                growth, feeding guidance, pregnancy timelines, and name
                ideas—built to help you make confident decisions between vet
                visits.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/calculators/puppy-weight"
                  aria-label="Start the Puppy Weight Calculator"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-7 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Scale className="h-4 w-4" aria-hidden="true" />
                  Start with Puppy Weight
                </Link>
                <Link
                  href="/blog"
                  aria-label="Read Pawteller blog guides"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#d2c5bd] bg-white/60 px-7 text-sm font-bold text-[#2a1b15] shadow-sm transition hover:bg-white dark:bg-zinc-950/30 dark:border-white/10 dark:text-zinc-100"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Read the guides
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#6b5d56] dark:text-zinc-300">
                <p className="inline-flex items-center gap-2">
                  <BadgeCheck
                    className="h-4 w-4 text-emerald-600 dark:text-emerald-300"
                    aria-hidden="true"
                  />
                  Vet-informed explanations
                </p>
                <p className="inline-flex items-center gap-2">
                  <Sparkles
                    className="h-4 w-4 text-rose-600 dark:text-rose-300"
                    aria-hidden="true"
                  />
                  Clean UX + SEO-ready pages
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-[28px] bg-[#ead8cd] ring-1 ring-black/5 dark:bg-zinc-900/40">
                <Image
                  src="https://images.unsplash.com/photo-1591160690555-5debfba289f0"
                  alt="Happy golden retriever puppy for pawteller calculators"
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover object-center"
                  priority
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Grid */}
        <section className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
                Tools
              </p>
              <h2 className="mt-2 font-[Georgia,serif] text-3xl font-bold tracking-normal text-slate-900 dark:text-slate-50">
                Browse all calculators
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Each calculator is designed for quick input, clear results, and
                easy next steps.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/quiz?quiz=breed-match"
                aria-label="Take the quiz to find out if your dog is a secret genius"
                className="inline-flex items-center gap-2 rounded-full bg-[#315846] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#294b3b]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {`Dog's IQ quiz`}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[240px]">
            {calculators.map((calc) => {
              const BadgeIcon = calc.badge.icon;
              return (
                <Card
                  key={calc.title}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border-border bg-white/70 p-6 shadow-none transition hover:-translate-y-0.5 hover:shadow-md dark:bg-zinc-950/30"
                >
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">
                      <BadgeIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Calculator</span>
                    </span>

                    <h3 className="mt-4 font-[Georgia,serif] text-2xl font-bold text-slate-900 dark:text-slate-50">
                      {calc.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {calc.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      href={calc.link}
                      aria-label={`Open ${calc.title} calculator`}
                      className="inline-flex items-center gap-2 text-sm font-extrabold text-blue-700 transition hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
                    >
                      Try now
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 ring-1 ring-slate-900/5 dark:bg-white/10 dark:text-slate-50">
                      <BadgeIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Why Use Calculators */}
        <section className="mt-14 rounded-[28px] bg-[#294e3f] px-6 py-12 text-[#fbf6ed] sm:px-8 sm:py-14 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <h2 className="font-[Georgia,serif] text-3xl font-bold leading-tight tracking-normal sm:text-4xl">
                Why use dog calculators?
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#fbf6ed]/85 sm:text-base">
                Pawteller calculators turn common pet-care questions into quick,
                structured answers—so you can plan feeding, understand growth
                milestones, and keep your routine consistent.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                <li className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <Utensils
                    className="mt-0.5 h-5 w-5 text-[#e77855]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-bold">Clear nutrition & planning</p>
                    <p className="mt-1 text-xs leading-6 text-[#fbf6ed]/80">
                      Portions, calories, and timing you can act on immediately.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <Scale
                    className="mt-0.5 h-5 w-5 text-emerald-300"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-bold">Growth milestones</p>
                    <p className="mt-1 text-xs leading-6 text-[#fbf6ed]/80">
                      Estimate puppy adult weight and see what to expect next.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <CalendarDays
                    className="mt-0.5 h-5 w-5 text-sky-300"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-bold">Timeline-friendly</p>
                    <p className="mt-1 text-xs leading-6 text-[#fbf6ed]/80">
                      Pregnancy and development checkpoints for less guessing.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <DollarSign
                    className="mt-0.5 h-5 w-5 text-rose-300"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-bold">Less wasted effort</p>
                    <p className="mt-1 text-xs leading-6 text-[#fbf6ed]/80">
                      Faster answers to reduce uncertainty and extra searches.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="min-h-62.5 rounded-[24px] bg-white/10 p-6 ring-1 ring-white/10">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em]">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Featured workflow
                </p>
                <h3 className="mt-4 font-[Georgia,serif] text-2xl font-bold">
                  Use a calculator → read a guide → book the vet
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#fbf6ed]/85">
                  Get an estimate first, then confirm details using the related
                  articles and professional advice.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/blog"
                    aria-label="View Pawteller blog guides"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#294e3f] shadow-sm transition hover:bg-[#f3eadb]"
                  >
                    <BookOpen className="h-4 w-4" aria-hidden="true" />
                    Browse guides
                  </Link>
                  <Link
                    href="/contact"
                    aria-label="Contact Pawteller"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-transparent px-4 py-2 text-sm font-bold text-white/90 transition hover:bg-white/10"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    Ask a question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">
                FAQ
              </p>
              <h2 className="mt-2 font-[Georgia,serif] text-3xl font-bold tracking-normal text-slate-900 dark:text-slate-50">
                Questions about dog calculators
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Quick answers to help you choose the right tool and understand
                what the results mean.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-emerald-300"
                aria-hidden="true"
              >
                ?
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.slice(0, 4).map((item, idx) => (
                <AccordionItem key={item.question} value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Ads + Backlinks + Blog */}
        <section className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Ads */}
          <div className="lg:col-span-7">
            <div className="min-h-62.5 rounded-[24px] bg-muted p-6 ring-1 ring-border dark:bg-zinc-900/40">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Ad space
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="min-h-50 rounded-2xl bg-background/60 p-4 ring-1 ring-border dark:bg-zinc-950/30">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Sidebar / Mid-page Slot
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Reserve space for Google AdSense to avoid layout shift.
                  </p>
                </div>
                <div className="min-h-50 rounded-2xl bg-background/60 p-4 ring-1 ring-border dark:bg-zinc-950/30">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    In-Content Slot
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Keep at least 250px height for CLS stability.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Backlinks + Blog */}
          <div className="lg:col-span-5">
            <div className="min-h-62.5 rounded-[24px] bg-white/70 p-6 ring-1 ring-border dark:bg-zinc-950/30">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Backlinks & internal links
              </p>
              <h3 className="mt-3 font-[Georgia,serif] text-2xl font-bold text-slate-900 dark:text-slate-50">
                Keep exploring
              </h3>

              <div className="mt-5 space-y-3">
                <Link
                  href="/calculators/dog-age"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-background dark:text-slate-50"
                >
                  <span>Dog Age Calculator</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/calculators/dog-food"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-background dark:text-slate-50"
                >
                  <span>Dog Food Calculator</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/calculators/dog-growth"
                  className="flex items-center justify-between rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-background dark:text-slate-50"
                >
                  <span>Dog Growth Calculator</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-6 rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/20">
                <p className="inline-flex items-center gap-2 text-sm font-extrabold text-emerald-800 dark:text-emerald-200">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Read related guides
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                  Pair calculators with articles for context, tips, and next
                  steps.
                </p>
                <div className="mt-3">
                  <Button
                    asChild
                    variant="link"
                    className="h-auto p-0 text-emerald-700 hover:text-emerald-800 dark:text-emerald-200 dark:hover:text-emerald-100"
                  >
                    <Link href="/blog" aria-label="Go to blog">
                      Browse the blog
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closing SEO block */}
        <section className="mt-14 pb-10">
          <Card className="rounded-[24px] border-border bg-background/40 p-6 shadow-none dark:bg-zinc-950/20">
            <div className="grid gap-8 md:grid-cols-12 md:items-start">
              <div className="md:col-span-7">
                <h2 className="font-[Georgia,serif] text-2xl font-bold text-slate-900 dark:text-slate-50">
                  SEO-friendly calculator hub
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  Use these tools to understand your dog’s development and care
                  needs. Results are educational only and do not replace
                  professional veterinary advice.
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  <li className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <span
                      className="h-2 w-2 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    Dog growth prediction
                  </li>
                  <li className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <span
                      className="h-2 w-2 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    Feeding guidance
                  </li>
                  <li className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <span
                      className="h-2 w-2 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    Dog age conversion
                  </li>
                  <li className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                    <span
                      className="h-2 w-2 rounded-full bg-emerald-500"
                      aria-hidden="true"
                    />
                    Pregnancy timeline
                  </li>
                </ul>
              </div>

              <div className="md:col-span-5">
                <div className="min-h-62.5 rounded-2xl bg-muted/50 p-5 ring-1 ring-border dark:bg-zinc-900/40">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                    Newsletter & subscription
                  </p>
                  <p className="mt-3 text-sm font-bold text-slate-900 dark:text-slate-50">
                    Get weekly pet care tips
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                    Subscribe for calculator updates and simple, searchable
                    guides.
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700"
                      aria-label="Read pet care tips"
                    >
                      Read the latest
                    </Link>
                    <Link
                      href="/privacy"
                      className="inline-flex items-center justify-center rounded-full border border-border bg-background/40 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-background dark:text-slate-50"
                      aria-label="View privacy policy"
                    >
                      Privacy policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}
