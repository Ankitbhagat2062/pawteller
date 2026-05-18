import { SECTIONS } from "@/lib/constant";
import Link from "next/link";

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const lastUpdated = formatDate(new Date("2026-01-15T00:00:00.000Z"));

export default function Page() {
  return (
    <div className="flex-1">
      <div className="mx-auto w-full max-w-1440 px-4 sm:px-6 lg:px-8">
        <header className="py-8 sm:py-10">
          <div className="rounded-3xl bg-white/60 p-5 ring-1 ring-black/5 backdrop-blur dark:bg-white/5 dark:ring-white/10 sm:p-8">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-200">
                  Legal
                </p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-navy dark:text-navy-50 sm:text-4xl">
                  Privacy Policy
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-navy/80 dark:text-navy-50/80">
                <span>
                  Last updated: <span className="text-navy dark:text-navy-50">{lastUpdated}</span>
                </span>
                <span className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-200">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  We keep it simple.
                </span>
              </div>

              <p className="max-w-3xl text-base leading-7 text-navy/80 dark:text-navy-50/80">
                PetCalc helps you learn about your dog’s care. This policy explains
                what information we collect, how we use it, and how you can manage
                your preferences.
              </p>
            </div>
          </div>
        </header>

        <div className="pb-10 sm:pb-14">
          <div className="grid gap-8 lg:grid-cols-12">
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24">
                <nav
                  aria-label="Table of contents"
                  className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold text-navy dark:text-navy-50">On this page</p>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-200">
                      Jump
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {SECTIONS.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="block rounded-xl px-3 py-2 text-sm font-semibold text-navy/80 transition hover:bg-emerald-500/10 hover:text-navy dark:text-navy-50/80 dark:hover:bg-emerald-400/10 dark:hover:text-navy-50"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-2xl bg-emerald-500/10 p-4 ring-1 ring-emerald-500/20 dark:bg-emerald-400/10 dark:ring-emerald-400/20">
                    <p className="text-xs font-semibold leading-5 text-navy/80 dark:text-navy-50/80">
                      Tip: You can use the links above to quickly find the section you need.
                    </p>
                  </div>
                </nav>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="lg:hidden">
                <label className="block">
                  <span className="sr-only">Jump to a privacy policy section</span>
                  <select
                    aria-label="Jump to a privacy policy section"
                    defaultValue=""
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value) return;
                      const el = document.getElementById(value);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="w-full appearance-none rounded-2xl bg-white p-4 text-sm font-semibold text-navy shadow-sm ring-1 ring-black/5 outline-none transition focus:ring-2 focus:ring-emerald-500/40 dark:bg-white/5 dark:text-navy-50 dark:ring-white/10"
                  >
                    <option value="" disabled>
                      Jump to…
                    </option>
                    {SECTIONS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-200">
                  {"Choose a section to scroll."}
                </div>
              </div>

              <main className="mt-8" aria-label="Privacy policy">
                <div className="space-y-10">
                  {SECTIONS.map((s) => (
                    <section
                      key={s.id}
                      id={s.id}
                      aria-labelledby={`${s.id}-title`}
                      className="scroll-mt-28"
                    >
                      <h2
                        id={`${s.id}-title`}
                        className="text-xl font-extrabold tracking-tight text-navy dark:text-navy-50 sm:text-2xl"
                      >
                        {s.title}
                      </h2>

                      <div className="mt-3 max-w-3xl space-y-4 text-base leading-7 text-navy/80 dark:text-navy-50/80">
                        {s.id === "information-we-collect" && (
                          <>
                            <p>
                              We may collect information you provide directly (for example when you use calculators or submit a request),
                              as well as information your device/browser provides automatically (such as general usage data).
                            </p>
                            <p>
                              Where applicable, we only collect what we need to operate PetCalc and improve user experience.
                            </p>
                          </>
                        )}

                        {s.id === "how-we-use-information" && (
                          <>
                            <p>
                              We use information to run the site, deliver features you request, troubleshoot problems, and maintain security.
                            </p>
                            <p>
                              We may also use data to understand how visitors use PetCalc so we can improve content clarity and performance.
                            </p>
                          </>
                        )}

                        {s.id === "email-subscriptions" && (
                          <>
                            <p>
                              If you subscribe to emails, we send messages related to PetCalc updates. You can unsubscribe at any time.
                            </p>
                            <p>
                              We don’t sell your email address. We use it to communicate with you about the services you requested.
                            </p>
                          </>
                        )}

                        {s.id === "analytics" && (
                          <>
                            <p>
                              We may use analytics tools to understand site usage, measure performance, and learn what content is most helpful.
                            </p>
                            <p>
                              Analytics helps us keep pages fast and reduce confusion so you can find answers quickly.
                            </p>
                          </>
                        )}

                        {s.id === "advertising" && (
                          <>
                            <p>
                              We may show ads or allow ad partners to display ads based on general browsing behavior.
                            </p>
                            <p>
                              We aim to keep advertising aligned with a helpful, low-friction user experience.
                            </p>
                          </>
                        )}

                        {s.id === "cookies" && (
                          <>
                            <p>
                              Cookies are small files stored on your device. They help the site function and remember preferences.
                            </p>
                            <p>
                              You can usually control cookies through your browser settings. Disabling cookies may affect some features.
                            </p>
                          </>
                        )}

                        {s.id === "third-party-services" && (
                          <>
                            <p>
                              We may use third-party services (such as analytics or hosting providers). These providers may process data on our behalf.
                            </p>
                            <p>
                              Third-party services are governed by their own privacy policies.
                            </p>
                          </>
                        )}

                        {s.id === "data-rights" && (
                          <>
                            <p>
                              Depending on where you live, you may have rights related to your personal data (such as access, correction, deletion,
                              or opting out of certain processing).
                            </p>
                            <p>
                              If you want to exercise your rights, contact us using the information below.
                            </p>
                          </>
                        )}

                        {s.id === "contact" && (
                          <>
                            <p>
                              Questions about this policy? Reach out and we’ll respond as soon as possible.
                            </p>
                            <p>
                              Email: <span className="font-bold text-emerald-700 dark:text-emerald-200">support@petcalc.com</span>
                            </p>
                          </>
                        )}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="mt-12 rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm dark:bg-white/5 dark:ring-white/10 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-navy dark:text-navy-50">Need help?</p>
                      <p className="mt-1 text-sm leading-6 text-navy/80 dark:text-navy-50/80">
                        Contact us for privacy questions, data requests, or subscription support.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href="mailto:support@petcalc.com"
                        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      >
                        Contact
                      </a>
                      <Link
                        href="/contact"
                        className="hidden text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-200 sm:inline"
                      >
                        More ways to reach us
                      </Link>
                    </div>
                  </div>
                </div>

                <p className="mt-6 max-w-3xl text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Not medical advice. Use with your veterinarian.
                </p>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

