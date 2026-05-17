import { toc } from "@/lib/constant";
import Link from "next/link";
import React from "react";

const lastUpdated = "May 17, 2026";

export default function Terms() {
  return (
    <div className="min-h-full w-full bg-zinc-50 font-sans text-slate-900 dark:bg-zinc-950 dark:text-slate-50">
      <main id="terms" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <p className="text-sm font-extrabold tracking-wider text-emerald-800/80 dark:text-emerald-200/90">
                  On this page
                </p>
                <div className="mt-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5 dark:bg-zinc-900/20 dark:ring-white/10">
                  <ul className="space-y-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block rounded-xl px-3 py-2 text-slate-700 hover:bg-white/80 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <header>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">
                      PetCalc Legal
                    </p>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                      Terms &amp; Conditions
                    </h1>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      Last updated: <span className="text-zinc-700 dark:text-zinc-200">{lastUpdated}</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      These Terms explain how PetCalc’s calculators, guides, and website are provided.
                    </p>
                  </div>
                </div>

                {/* Mobile compact jump list */}
                <div className="mt-6 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5 dark:bg-zinc-900/20 dark:ring-white/10 lg:hidden">
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Jump to a section</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-emerald-800 ring-1 ring-black/5 transition hover:bg-white dark:bg-white/5 dark:text-emerald-200 dark:ring-white/10"
                      >
                        {item.label.split(" ")[0]}
                      </a>
                    ))}
                  </div>
                </div>
              </header>

              <div className="mt-8 space-y-10">
                <section id="acceptance" aria-labelledby="acceptance-title">
                  <h2 id="acceptance-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Acceptance of Terms
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    By accessing or using PetCalc, you agree to these Terms and to comply with all applicable laws and
                    rules. If you do not agree, please do not use the website.
                  </p>
                </section>

                <section id="calculators" aria-labelledby="calculators-title">
                  <h2 id="calculators-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Use of Calculators
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    Our calculators are tools intended to help you estimate information and explore possibilities. Results
                    depend on user input and may not reflect individual circumstances.
                  </p>
                </section>

                <section
                  id="educational-disclaimer"
                  aria-labelledby="educational-disclaimer-title"
                >
                  <h2
                    id="educational-disclaimer-title"
                    className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50"
                  >
                    Educational Information Disclaimer
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    All content on PetCalc, including calculators and educational materials, is for general informational
                    purposes only. It is not intended to diagnose, treat, cure, or prevent any condition.
                  </p>
                </section>

                <section id="no-vet-advice" aria-labelledby="no-vet-advice-title">
                  <h2 id="no-vet-advice-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    No Veterinary Advice
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    PetCalc does not provide veterinary advice. Nothing on the website creates a doctor–patient relationship
                    between you and PetCalc, its creators, or any third parties.
                  </p>
                </section>

                <section id="availability" aria-labelledby="availability-title">
                  <h2 id="availability-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Website Availability
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    We may modify, suspend, or discontinue any part of PetCalc at any time. We do not guarantee that the
                    website will be available without interruption or error.
                  </p>
                </section>

                <section id="ip" aria-labelledby="ip-title">
                  <h2 id="ip-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Intellectual Property
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    PetCalc’s content, design, trademarks, and other intellectual property are protected by applicable laws.
                    You may not copy, distribute, modify, or create derivative works from our materials without permission.
                  </p>
                </section>

                <section id="submissions" aria-labelledby="submissions-title">
                  <h2 id="submissions-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    User Submissions
                    </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    If you submit content or feedback to PetCalc, you grant us a worldwide, non-exclusive, royalty-free license
                    to use, reproduce, and distribute that material as permitted by applicable law.
                  </p>
                </section>

                <section id="third-party" aria-labelledby="third-party-title">
                  <h2 id="third-party-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Third-Party Links
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    PetCalc may link to third-party websites for convenience. We do not control those sites and are not
                    responsible for their content, policies, or availability.
                  </p>
                </section>

                <section id="limitation" aria-labelledby="limitation-title">
                  <h2 id="limitation-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Limitation of Liability
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    To the fullest extent allowed by law, PetCalc and its affiliates are not liable for damages arising from your
                    use of the website, including errors, omissions, or reliance on content.
                  </p>
                </section>

                <section id="changes" aria-labelledby="changes-title">
                  <h2 id="changes-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Changes to Terms
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    We may update these Terms from time to time. The "Last updated" date above reflects the most recent
                    revision. Continued use of the website means you accept the updated Terms.
                  </p>
                </section>

                <section id="contact" aria-labelledby="contact-title">
                  <h2 id="contact-title" className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Contact
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    For questions about these Terms, please contact us through the contact page.
                  </p>
                </section>
              </div>

              <section className="mt-10" aria-label="Related links">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
                  <p className="text-sm font-extrabold tracking-wider text-emerald-800/80 dark:text-emerald-200/90">Related</p>
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
                        className="inline-flex items-center justify-center rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-bold text-slate-800 ring-1 ring-black/5 transition hover:bg-white dark:bg-white/5 dark:text-slate-100 dark:ring-white/10"
                      >
                        Contact
                      </Link>
                      <Link
                        href="/about"
                        className="inline-flex items-center justify-center rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-bold text-slate-800 ring-1 ring-black/5 transition hover:bg-white dark:bg-white/5 dark:text-slate-100 dark:ring-white/10"
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

        <div className="min-h-30" />
      </main>
    </div>
  );
}

