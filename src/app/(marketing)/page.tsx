import Link from "next/link";
import { PawPrint, Dumbbell, Utensils, Baby, Sparkles, LineChart } from "lucide-react";

import ThemeToggle from "@/components/shared/ThemeToggle";
import IconBadge from "@/components/shared/IconBadge";
import LazyDogHeroImages from "@/components/marketing/LazyDogHeroImages";



function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-sm font-semibold tracking-tight text-emerald-800 dark:text-emerald-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-navy dark:text-navy-50">
        {title}
      </h2>
    </div>
  );
}

const calculators = [
  {
    title: "Dog Age Calculator",
    description: "Convert your pup’s age to life stages and milestones.",
    link: "/calculators/dog-age",
    badge: { bg: "#d1fae5", fg: "#065f46", icon: PawPrint },
  },
  {
    title: "Puppy Weight Calculator",
    description: "Estimate future weight using growth patterns.",
    link: "/calculators/puppy-weight",
    badge: { bg: "#bfdbfe", fg: "#1d4ed8", icon: Dumbbell },
  },
  {
    title: "Dog Food Calculator",
    description: "Get feeding guidance based on size and goals.",
    link: "/calculators/dog-food",
    badge: { bg: "#fde68a", fg: "#92400e", icon: Utensils },
  },
  {
    title: "Dog Pregnancy Calculator",
    description: "Track weeks and key stages from conception.",
    link: "/calculators/dog-pregnancy",
    badge: { bg: "#fbcfe8", fg: "#9d174d", icon: Baby },
  },
  {
    title: "Dog Name Generator",
    description: "Find a name that fits your dog’s personality.",
    link: "/calculators/dog-name",
    badge: { bg: "#dcfce7", fg: "#166534", icon: Sparkles },
  },
  {
    title: "Dog Growth Calculator",
    description: "Visualize growth pace and next milestones.",
    link: "/calculators/dog-growth",
    badge: { bg: "#c7d2fe", fg: "#3730a3", icon: LineChart },
  },
];

const articles = [
  {
    category: "Nutrition",
    title: "How to Calculate Daily Calories for Growing Dogs",
    excerpt:
      "A simple way to estimate calories by weight, activity, and growth stage—then adjust with your vet’s guidance.",
    minutes: 6,
    date: "Updated weekly",
  },
  {
    category: "Health",
    title: "From Puppy to Senior: Growth Milestones That Matter",
    excerpt:
      "A practical timeline of what “normal” growth can look like—and signs to discuss with your veterinarian early.",
    minutes: 8,
    date: "Updated weekly",
  },
  {
    category: "Breeds",
    title: "Understanding Breed Size: Small, Medium, and Large",
    excerpt:
      "Breed size affects growth pace and adult weight. Use these insights to set realistic expectations.",
    minutes: 5,
    date: "Updated weekly",
  },
];

export default function Home() {
  return (
    <div className="min-h-full w-full bg-zinc-50 font-sans text-navy dark:bg-black dark:text-navy-50">
      {/* Top navigation */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur dark:bg-black/70">
        <div className="mx-auto flex w-full max-w-360 items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
              <PawPrint className="h-5 w-5" aria-hidden />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-extrabold tracking-tight text-navy dark:text-navy-50">PetCalc</p>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Fast, SEO-focused calculators</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {[
              "Home",
              "Calculators",
              "Blog",
              "Quiz",
              "About",
              "Contact",
            ].map((label) => {
              const href =
                label === "Home"
                  ? "#home"
                  : label === "Calculators"
                    ? "/calculators"
                    : label === "Blog"
                      ? "/blog"
                      : label === "Quiz"
                        ? "/quiz"
                        : label === "About"
                          ? "/about"
                          : "/contact";
              return (
                <Link
                  key={label}
                  href={href}
                  className="text-sm font-semibold text-navy/80 hover:text-navy dark:text-navy-50/80 dark:hover:text-navy-50"
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex md:hidden">
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/8 bg-white dark:border-white/10 dark:bg-black"
              >
                <span aria-hidden>☰</span>
              </button>
            </div>

            <ThemeToggle />

            <Link
              href="/calculators"
              className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 md:inline-flex"
            >
              Start Calculator
              <span aria-hidden className="text-base">
                →
              </span>
            </Link>

            <Link
              href="/calculators"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 md:hidden"
              aria-label="Start Calculator"
            >
              Start
            </Link>
          </div>
        </div>
      </header>

      <main id="home" className="mx-auto w-full max-w-360 px-8">
        {/* Hero */}
        <section className="relative mt-6 overflow-hidden rounded-3xl bg-emerald-400/25 px-6 pt-10 pb-14 md:px-10 md:pt-14 md:pb-16">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            {/* Subtle pet-focused cue (no heavy imagery) */}
            <div className="absolute -right-8 top-8 h-28 w-28 rounded-[32px] bg-emerald-400/20" />
            <div className="absolute -left-10 bottom-8 h-24 w-24 rounded-[28px] bg-emerald-500/15" />
          </div>

          <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">

              <p className="text-sm font-semibold tracking-tight text-emerald-800 dark:text-emerald-300">Pet health made simple</p>

              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-navy dark:text-navy-50 md:text-5xl">

                Everything You Need to Understand Your Dog's Growth
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-navy/70 dark:text-navy-50/70 md:text-lg">
                Accurate dog calculators, expert articles, and personalized insights—so you can make confident decisions for every stage of your best friend’s life.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/calculators/dog-age"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-bold text-white shadow-sm transition hover:bg-navy/90"
                >
                  Calculate Dog's Age <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/calculators/dog-growth"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-navy/15 bg-white/70 px-6 text-sm font-bold text-navy shadow-sm transition hover:bg-white dark:bg-white/5 dark:border-white/15"
                >
                  Track Puppy Growth <span aria-hidden>📈</span>
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { icon: "🧠", label: "Vet-informed guidance" },
                  { icon: "⚡", label: "Lightweight & fast" },
                  { icon: "🔎", label: "SEO-friendly reads" },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-navy/80 shadow-sm dark:bg-white/5 dark:text-navy-50/80 ring-1 ring-black/5"
                  >
                    <span aria-hidden className="mr-2">
                      {t.icon}
                    </span>
                    {t.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <LazyDogHeroImages />
              <div className="mt-6 rounded-3xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-navy dark:text-navy-50">Quick start</p>
                    <p className="mt-1 text-xs font-semibold text-navy/60 dark:text-navy-50/60">Pick a tool, get clarity instantly.</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/15 px-3 py-2 text-emerald-800 dark:text-emerald-200">
                    <span aria-hidden>🐕</span>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  {[
                    { t: "Dog Age", href: "/calculators/dog-age" },
                    { t: "Puppy Growth", href: "/calculators/dog-growth" },
                    { t: "Feeding", href: "/calculators/dog-food" },
                  ].map((row) => (
                    <Link
                      key={row.t}
                      href={row.href}
                      className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 shadow-sm transition hover:bg-white dark:bg-white/5"
                    >
                      <span className="text-sm font-bold text-navy dark:text-navy-50">{row.t}</span>
                      <span aria-hidden className="text-base text-navy/60 dark:text-navy-50/60">
                        →
                      </span>
                    </Link>
                  ))}
                </div>

                <p className="mt-4 text-xs leading-5 text-navy/60 dark:text-navy-50/60">
                  Built for caring dog owners—simple answers that help you plan with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Calculators */}
        <section className="py-14" aria-label="Featured calculators">
          <SectionHeader eyebrow="Popular" title="Featured Calculators" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((c) => {
              const Icon = c.badge.icon;
              return (
                <Link
                  key={c.title}
                  href={c.link}
                  className="group rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10"
                >
                  <div className="flex items-start gap-4">
                    <IconBadge bg={c.badge.bg} fg={c.badge.fg}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </IconBadge>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-extrabold tracking-tight text-navy dark:text-navy-50">{c.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-navy/70 dark:text-navy-50/70">{c.description}</p>
                      <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-300">
                        <span className="group-hover:underline">Open calculator</span>
                        <span aria-hidden className="transition group-hover:translate-x-0.5">
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

        {/* Yellow quiz CTA band */}
        <section className="mb-6 rounded-3xl bg-[#facc15] p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-sm font-semibold text-navy">Dog Breed Quiz</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy md:text-3xl">Which Dog Breed is Right For You?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-navy/70">
                Match your lifestyle with a breed profile that fits—size, temperament, energy, and growth expectations.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/quiz"
                className="inline-flex h-12 items-center justify-center rounded-full bg-navy px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-navy/90"
              >
                Start The Quiz Now
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Dog Care Guides */}
        <section className="py-14" aria-label="Latest dog care guides">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionHeader eyebrow="Latest" title="Latest Dog Care Guides" />
              <p className="mt-3 text-sm leading-6 text-navy/70 dark:text-navy-50/70">Practical, expert-backed reads built to be easy to search and easy to apply.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-navy/70 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:text-navy-50/70 dark:ring-white/10">
                Category
              </span>
              <Link href="/blog" className="text-sm font-bold text-blue-700 dark:text-blue-300 hover:underline">
                View all articles
              </Link>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.title}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md dark:bg-white/5 dark:ring-white/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-900 dark:text-emerald-200">
                    {a.category}
                  </span>
                  <span className="text-xs font-semibold text-navy/50 dark:text-navy-50/50">{a.minutes} min</span>
                </div>

                <h3 className="mt-3 text-base font-extrabold tracking-tight text-navy dark:text-navy-50">{a.title}</h3>
                <p className="mt-2 text-sm leading-6 text-navy/70 dark:text-navy-50/70">{a.excerpt}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-navy/50 dark:text-navy-50/50">{a.date}</span>
                  <Link href="/blog" className="text-sm font-bold text-blue-700 dark:text-blue-300 hover:underline">
                    Read
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-14" aria-label="Footer">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
            <div className="grid gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                    <PawPrint className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-lg font-extrabold tracking-tight text-navy dark:text-navy-50">PetCalc</p>
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Reliable pet insights, fast.</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-navy/70 dark:text-navy-50/70">
                  Built for dog owners who want clarity. Our calculators and guides help you act confidently—today.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  {[
                    { label: "X", txt: "𝕏" },
                    { label: "Facebook", txt: "f" },
                    { label: "Instagram", txt: "⌁" },
                    { label: "YouTube", txt: "▶" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href="#"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-50 text-navy/70 ring-1 ring-black/5 transition hover:bg-white dark:bg-white/5 dark:text-navy-50/70 dark:ring-white/10"
                    >
                      <span aria-hidden>{s.txt}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="md:col-span-8 md:flex md:justify-end">
                <div className="grid w-full gap-6 sm:grid-cols-3">
                  <div>
                    <p className="text-sm font-extrabold text-navy dark:text-navy-50">Calculators</p>
                    <ul className="mt-3 space-y-2 text-sm font-semibold text-navy/70 dark:text-navy-50/70">
                      {[
                        ["Dog Age", "/calculators/dog-age"],
                        ["Puppy Growth", "/calculators/dog-growth"],
                        ["Dog Food", "/calculators/dog-food"],
                        ["Dog Pregnancy", "/calculators/dog-pregnancy"],
                      ].map(([t, href]) => (
                        <li key={t}>
                          <Link href={href} className="hover:underline">
                            {t}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-navy dark:text-navy-50">Resources</p>
                    <ul className="mt-3 space-y-2 text-sm font-semibold text-navy/70 dark:text-navy-50/70">
                      {[
                        ["Blog", "/blog"],
                        ["Quiz", "/quiz"],
                        ["About", "/about"],
                        ["Contact", "/contact"],
                      ].map(([t, href]) => (
                        <li key={t}>
                          <Link href={href} className="hover:underline">
                            {t}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-navy dark:text-navy-50">Company</p>
                    <ul className="mt-3 space-y-2 text-sm font-semibold text-navy/70 dark:text-navy-50/70">
                      {[
                        ["Privacy", "/privacy"],
                        ["Terms", "/terms"],
                        ["Support", "#"],
                        ["Careers", "#"],
                      ].map(([t, href]) => (
                        <li key={t}>
                          <a href={href} className="hover:underline">
                            {t}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs font-semibold text-zinc-500 dark:border-white/10 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
              <span>© {new Date().getFullYear()} PetCalc. All rights reserved.</span>
              <span>Not medical advice. Use with your veterinarian.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

