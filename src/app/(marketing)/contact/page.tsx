import type { Metadata } from "next";
import Link from "next/link";
import { PawPrint, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. GENERATE PERFECT 100/100 SEO METADATA HIERARCHY
export const metadata: Metadata = {
  title: "Contact Us | pawteller",
  description: "Have questions, feedback, or content suggestions? Get in touch with the pawteller team for reliable pet calculator support and partnership options.",
  alternates: {
    canonical: "https://pawteller.com/contact",
  },
};

export default function Contact() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">
      {/* Hero Header Area */}
      <section
        aria-label="Contact hero"
        className="mt-6 min-h-62.5 rounded-3xl bg-white px-6 py-12 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:px-10"
      >
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <PawPrint className="h-4 w-4" aria-hidden />
            Contact pawteller
          </p>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
            Contact pawteller
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-zinc-300 md:text-lg">
            Have questions, feedback, partnerships, or content suggestions? Send us a note and
            we will get back to you with clear next steps.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#contact-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition duration-150 hover:bg-emerald-700"
            >
              Send a message <span aria-hidden className="ml-1">→</span>
            </Link>
            <Link
              href="/calculators"
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 text-sm font-bold text-slate-800 shadow-sm transition duration-150 hover:bg-white dark:bg-white/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Try a calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Form and Support Section Grid */}
      <section className="mt-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Contact Form Card */}
          <div className="lg:col-span-7">
            <div
              id="contact-form"
              className="min-h-105 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10 dark:bg-white/5 dark:ring-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Message us
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                    Quick form, clear labels. We read every message.
                  </p>
                </div>

                <div className="hidden items-center gap-2 rounded-2xl bg-emerald-500/10 px-3 py-2 text-sm font-bold text-emerald-900 dark:text-emerald-200 sm:flex">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Fast routing
                </div>
              </div>

              <form className="mt-7" method="post" aria-label="Contact form">
                <div className="grid gap-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-slate-900 dark:text-slate-50"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-slate-900 dark:text-slate-50"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                    />
                  </div>

                  {/* Topic Dropdown Framework */}
                  <div>
                    <label
                      htmlFor="topic"
                      className="text-sm font-semibold text-slate-900 dark:text-slate-50"
                    >
                      Topic
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      required
                      className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-50 h-11"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="general">General questions</option>
                      <option value="feedback">Content feedback</option>
                      <option value="partnerships">Partnerships</option>
                      <option value="suggestions">Content suggestions</option>
                    </select>
                  </div>

                  {/* Message Input Frame */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-slate-900 dark:text-slate-50"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="mt-2 block w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-50"
                      placeholder="Tell us what you would like help with (or what we can improve)."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-1 w-full rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition duration-150 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/25"
                  >
                    Send Message
                  </Button>

                  <p className="text-xs font-semibold leading-5 text-slate-500 dark:text-zinc-400">
                    By sending, you agree to be contacted about your request. pawteller is not a
                    medical provider.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Contextual Blocks */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7 dark:bg-white/5 dark:ring-white/10">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                  >
                    <Users className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                      General Questions
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                      Ask about using calculators, reading guides, or getting started.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7 dark:bg-white/5 dark:ring-white/10">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                      Content Feedback
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                      Help us improve clarity, tone, or structure—so it is easier to act.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7 dark:bg-white/5 dark:ring-white/10">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
                  >
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                      Partnerships
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                      Interested in collaboration? Share your idea and goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Context Component */}
      <section className="mt-10" aria-label="Frequently asked questions">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10 dark:bg-white/5 dark:ring-white/10">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                Quick answers
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                Before you message, here are the most common contact topics.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    q: "Do you provide veterinary advice?",
                    a: "pawteller content is educational only. If you are worried about your dog, contact a qualified veterinarian.",
                  },
                  {
                    q: "How fast will you respond?",
                    a: "Most messages get a reply within a few days (often sooner).",
                  },
                  {
                    q: "Can I suggest a calculator or article?",
                    a: "Yes—use the form and choose Content suggestions. We review ideas regularly.",
                  },
                ].map((item) => (
                  <article
                    key={item.q}
                    className="rounded-2xl bg-emerald-500/5 p-5 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                  >
                    <p className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                      {item.q}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-zinc-300">
                      {item.a}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Internal Navigation Elements */}
      <section className="mt-10" aria-label="Related links">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-10 dark:bg-white/5 dark:ring-white/10">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                Related links
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
                Explore more pawteller resources.
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="grid gap-4 sm:grid-cols-3">
                <Link
                  href="/about"
                  className="flex min-h-16 items-center justify-between rounded-2xl bg-emerald-500/5 px-4 py-4 shadow-sm ring-1 ring-emerald-900/10 transition duration-150 hover:bg-emerald-500/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                >
                  <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                    About
                  </span>
                  <span aria-hidden className="text-lg">→</span>
                </Link>

                <Link
                  href="/blog"
                  className="flex min-h-16 items-center justify-between rounded-2xl bg-emerald-500/5 px-4 py-4 shadow-sm ring-1 ring-emerald-900/10 transition duration-150 hover:bg-emerald-500/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                >
                  <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                    Blog
                  </span>
                  <span aria-hidden className="text-lg">→</span>
                </Link>

                <Link
                  href="/calculators"
                  className="flex min-h-16 items-center justify-between rounded-2xl bg-emerald-500/5 px-4 py-4 shadow-sm ring-1 ring-emerald-900/10 transition duration-150 hover:bg-emerald-500/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                >
                  <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                    Featured Calculators
                  </span>
                  <span aria-hidden className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exact spacing geometry allocation to ensure structural stability */}
      <div className="h-10" aria-hidden="true" />
    </main>
  );
}