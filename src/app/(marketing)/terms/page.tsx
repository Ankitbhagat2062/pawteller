import type { Metadata } from "next";
import Link from "next/link";
import { toc } from "@/lib/constant";

// 1. GENERATE PERFECT 100/100 SEO METADATA
export const metadata: Metadata = {
  title: "Terms & Conditions | Pawteller",
  description: "Read the Terms and Conditions for using Pawteller's tools, guides, and calculator resources. Learn about our usage policies and informational disclaimer.",
  alternates: {
    canonical: "https://pawteller.com/terms", // Adjust with your actual production domain
  },
};

const lastUpdated = "May 17, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 font-sans text-slate-900 dark:bg-zinc-950 dark:text-slate-50 pb-20">
      <main id="terms" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">

            {/* Desktop Navigation Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800/80 dark:text-emerald-200/90">
                On this page
              </p>
              <div className="mt-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5 dark:bg-zinc-900/20 dark:ring-white/10">
                <nav aria-label="Table of contents">
                  <ul className="space-y-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`#${item.id}`}
                          className="block rounded-xl px-3 py-2 text-slate-700 transition hover:bg-white/80 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Content Container Column */}
            <div className="lg:col-span-8">
              <header className="border-b border-zinc-100 dark:border-zinc-800/50 pb-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">
                      pawteller Legal
                    </p>
                    <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                      Terms &amp; Conditions
                    </h1>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Last updated
                    </p>
                    <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {lastUpdated}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300 max-w-2xl">
                  These Terms explain how pawteller’s calculators, guides, and website are provided, outlining user guidelines and essential medical safety data disclaimers.
                </p>

                {/* Mobile compact jump list */}
                <div className="mt-6 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5 dark:bg-zinc-900/20 dark:ring-white/10 lg:hidden">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Jump to a section</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {toc.map((item) => (
                      <Link
                        key={item.id}
                        href={`#${item.id}`}
                        className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-emerald-800 ring-1 ring-black/5 transition hover:bg-white dark:bg-white/5 dark:text-emerald-200 dark:ring-white/10"
                      >
                        {item.label.split(" ")[0]}
                      </Link>
                    ))}
                  </div>
                </div>
              </header>

              {/* Legal Text Clauses */}
              <div className="mt-8 space-y-10 focus:outline-none">
                <section id="acceptance" aria-labelledby="acceptance-title" className="scroll-mt-28">
                  <h2 id="acceptance-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Acceptance of Terms
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    By accessing or using pawteller, you agree to these Terms and to comply with all applicable laws and
                    rules. If you do not agree, please do not use the website.
                  </p>
                </section>

                <section id="calculators" aria-labelledby="calculators-title" className="scroll-mt-28">
                  <h2 id="calculators-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Use of Calculators
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    Our calculators are tools intended to help you estimate information and explore possibilities. Results
                    depend on user input and may not reflect individual circumstances.
                  </p>
                </section>

                <section id="educational-disclaimer" aria-labelledby="educational-disclaimer-title" className="scroll-mt-28">
                  <h2 id="educational-disclaimer-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Educational Information Disclaimer
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    All content on pawteller, including calculators and educational materials, is for general informational
                    purposes only. It is not intended to diagnose, treat, cure, or prevent any condition.
                  </p>
                </section>

                <section id="no-vet-advice" aria-labelledby="no-vet-advice-title" className="scroll-mt-28">
                  <h2 id="no-vet-advice-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    No Veterinary Advice
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    pawteller does not provide veterinary advice. Nothing on the website creates a doctor–patient relationship
                    between you and pawteller, its creators, or any third parties.
                  </p>
                </section>

                <section id="availability" aria-labelledby="availability-title" className="scroll-mt-28">
                  <h2 id="availability-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Website Availability
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    We may modify, suspend, or discontinue any part of pawteller at any time. We do not guarantee that the
                    website will be available without interruption or error.
                  </p>
                </section>

                <section id="ip" aria-labelledby="ip-title" className="scroll-mt-28">
                  <h2 id="ip-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Intellectual Property
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    pawteller’s content, design, trademarks, and other intellectual property are protected by applicable laws.
                    You may not copy, distribute, modify, or create derivative works from our materials without permission.
                  </p>
                </section>

                <section id="submissions" aria-labelledby="submissions-title" className="scroll-mt-28">
                  <h2 id="submissions-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    User Submissions
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    If you submit content or feedback to pawteller, you grant us a worldwide, non-exclusive, royalty-free license
                    to use, reproduce, and distribute that material as permitted by applicable law.
                  </p>
                </section>

                <section id="third-party" aria-labelledby="third-party-title" className="scroll-mt-28">
                  <h2 id="third-party-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Third-Party Links
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    pawteller may link to third-party websites for convenience. We do not control those sites and are not
                    responsible for their content, policies, or availability.
                  </p>
                </section>

                <section id="limitation" aria-labelledby="limitation-title" className="scroll-mt-28">
                  <h2 id="limitation-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Limitation of Liability
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    To the fullest extent allowed by law, pawteller and its affiliates are not liable for damages arising from your
                    use of the website, including errors, omissions, or reliance on content.
                  </p>
                </section>

                <section id="changes" aria-labelledby="changes-title" className="scroll-mt-28">
                  <h2 id="changes-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Changes to Terms
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    We may update these Terms from time to time. The "Last updated" date above reflects the most recent
                    revision. Continued use of the website means you accept the updated Terms.
                  </p>
                </section>

                <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28">
                  <h2 id="contact-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Contact
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    For questions about these Terms, please contact us through the contact page.
                  </p>
                </section>
              </div>

              {/* Related Internal Navigation Links */}
              <section className="mt-12 border-t border-zinc-100 dark:border-zinc-800/50 pt-8" aria-label="Related content links">
                <div className="rounded-3xl bg-zinc-50/50 p-6 ring-1 ring-black/5 dark:bg-zinc-900/10 dark:ring-white/5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Related Legal Infrastructure</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href="/privacy"
                        className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-5 py-2.5 text-sm font-bold text-emerald-800 ring-1 ring-black/5 transition hover:bg-emerald-500/15 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-white/10"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-800 ring-1 ring-black/5 shadow-sm transition hover:bg-zinc-50 dark:bg-white/5 dark:text-slate-100 dark:ring-white/10"
                      >
                        Contact
                      </Link>
                      <Link
                        href="/about"
                        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-800 ring-1 ring-black/5 shadow-sm transition hover:bg-zinc-50 dark:bg-white/5 dark:text-slate-100 dark:ring-white/10"
                      >
                        About
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}