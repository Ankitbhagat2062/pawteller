import Link from "next/link";
import React from "react";
import { PawPrint } from "lucide-react";
import { trustPrinciples } from "@/lib/constant";

const about = () => {
  return (
    <div className="min-h-full w-full bg-zinc-50 font-sans text-slate-900 dark:bg-zinc-950 dark:text-slate-50">
      <main id="about" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mt-6 rounded-3xl bg-white px-6 py-12 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                <PawPrint className="h-4 w-4" aria-hidden />
                About PetCalc
              </p>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                About PetCalc
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
                PetCalc helps dog owners make better everyday decisions with fast calculators and clear guides—so you can move forward with confidence.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/calculators/dog-age"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                  Calculate your dog’s age <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-white dark:bg-zinc-950/30 dark:border-white/10 dark:text-slate-200 dark:hover:bg-zinc-950/50"
                >
                  Read practical guides <span aria-hidden="true">📚</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-emerald-500/5 p-6 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20">
                <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-900/80 dark:text-emerald-200/90">
                  What we optimize for
                </p>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5">
                      ⚡
                    </span>
                    <span>Speed: answers in seconds</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5">
                      🧾
                    </span>
                    <span>Clarity: simple next steps</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5">
                      🔎
                    </span>
                    <span>SEO-friendly resources you can actually find</span>
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5">
                      🐾
                    </span>
                    <span>Owner confidence: built for real life</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mt-10">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                  Our mission: practical clarity for dog owners
                </h2>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                  PetCalc exists to help you go from question → numbers → next steps, quickly. Our calculators are designed to be lightweight, our guides are written to be easy to scan, and our pages are structured to be search-friendly—so you can trust you’ll find the right answer when you need it.
                </p>
              </div>

              <div className="lg:col-span-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-emerald-500/5 p-5 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20">
                    <p className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">Speed</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Quick inputs, fast outputs, and less waiting when you’re researching.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/5 p-5 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20">
                    <p className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">Clarity</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Clear explanations that translate numbers into owner-friendly decisions.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/5 p-5 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20">
                    <p className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">SEO resources</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      Structured content so you can find relevant answers through search.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/5 p-5 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20">
                    <p className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">Owner confidence</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      A calm, practical tone that helps you act with confidence—and know your limits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust principles */}
        <section className="mt-10" aria-label="Trust principles">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-tight text-emerald-800 dark:text-emerald-300">Trust principles</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                Calm, practical support—built for real owners
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPrinciples.map((card) => (
              <div
                key={card.title}
                className="min-h-47.5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    {card.title}
                  </p>
                  <span aria-hidden="true" className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-lg">
                    {card.icon}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What you can do here */}
        <section className="mt-10" aria-label="What you can do here">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">What You Can Do Here</h2>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                  Jump into the tools and guides that help you plan feeding, track growth, and understand what to ask your veterinarian.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/calculators/dog-age"
                    className="flex min-h-18 items-center justify-between rounded-2xl bg-emerald-500/5 px-4 py-4 shadow-sm ring-1 ring-emerald-900/10 transition hover:bg-emerald-500/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                  >
                    <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">Calculators</span>
                    <span aria-hidden="true" className="text-lg">→</span>
                  </Link>
                  <Link
                    href="/blog"
                    className="flex min-h-18 items-center justify-between rounded-2xl bg-emerald-500/5 px-4 py-4 shadow-sm ring-1 ring-emerald-900/10 transition hover:bg-emerald-500/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                  >
                    <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">Blog guides</span>
                    <span aria-hidden="true" className="text-lg">→</span>
                  </Link>
                  <Link
                    href="/quiz"
                    className="flex min-h-18 items-center justify-between rounded-2xl bg-emerald-500/5 px-4 py-4 shadow-sm ring-1 ring-emerald-900/10 transition hover:bg-emerald-500/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20 sm:col-span-2"
                  >
                    <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">Breed quiz</span>
                    <span aria-hidden="true" className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsible information note */}
        <section className="mt-8" aria-label="Responsible information">
          <div className="min-h-62.5 rounded-3xl bg-amber-50 p-6 shadow-sm ring-1 ring-black/5 dark:bg-amber-500/10 dark:ring-white/10 sm:p-10">
            <div className="flex gap-3">
              <span aria-hidden="true" className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/30 text-amber-900 dark:text-amber-200">
                🩺
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-slate-50">Responsible information</p>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  PetCalc tools and guides are for educational purposes. They can’t diagnose medical conditions and aren’t a replacement for veterinary care. If you’re worried about your dog’s health, contact a qualified veterinarian.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="mt-10 rounded-3xl bg-emerald-500/10 p-6 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/15 dark:ring-emerald-500/20 sm:p-10">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-900/70 dark:text-emerald-200/80">Start with a calculator</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                Quick answers you can use today
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                Choose a featured tool to get numbers and next steps—built for calm, everyday decision-making.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/calculators/dog-food"
                className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                Start with a calculator <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default about;

