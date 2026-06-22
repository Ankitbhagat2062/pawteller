import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const NotFound = () => {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MRMZHPN5';

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      ></Script>

      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-white/70 shadow-[0_30px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/5 dark:bg-zinc-950/40 dark:shadow-none">
          {/* Premium glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-90 [background:radial-gradient(1000px_circle_at_10%_10%,rgba(220, 53, 69,0.10),transparent_45%),radial-gradient(900px_circle_at_90%_30%,rgba(16,185,129,0.14),transparent_40%),radial-gradient(700px_circle_at_20%_90%,rgba(59,130,246,0.10),transparent_45%)] dark:opacity-100"
          />

          {/* Top accent bar */}
          <div className="relative h-1 w-full bg-linear-to-r from-emerald-500 via-blue-500 to-rose-500 opacity-70" />

          <div className="relative grid gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <section>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">
                <Image
                  src="/logo.png"
                  alt="Pawteller logo"
                  className="h-5 w-5 rounded-full w-auto"
                  width={200}
                  height={40}
                  aria-hidden="true"
                />
                <span>Calculator not found</span>
              </div>

              <h1 className="mt-5 font-[Georgia,serif] text-4xl font-black leading-[1.05] tracking-normal text-slate-900 dark:text-slate-50 sm:text-5xl">
                We couldn&apos;t find that calculator.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
                The link may be outdated, or the calculator slug may have
                changed. Head back to the calculators hub and pick the one you
                need.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/calculators"
                  aria-label="Back to calculators"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to Calculators
                </Link>

                <Link
                  href="/"
                  aria-label="Go to Pawteller homepage"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white/60 px-6 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-zinc-950/30 dark:text-slate-50 hover:dark:bg-zinc-950/50"
                >
                  Home
                </Link>
              </div>

              <dl className="mt-9 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-900/5 dark:bg-zinc-950/20 dark:ring-white/10">
                  <dt className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Fast
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Instant answers
                  </dd>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-900/5 dark:bg-zinc-950/20 dark:ring-white/10">
                  <dt className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Premium
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Clean UI
                  </dd>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-slate-900/5 dark:bg-zinc-950/20 dark:ring-white/10">
                  <dt className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Theme-ready
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Light & dark
                  </dd>
                </div>
              </dl>
            </section>

            {/* Visual panel */}
            <aside className="relative">
              <div className="rounded-[24px] bg-white/60 p-5 ring-1 ring-slate-900/5 backdrop-blur dark:bg-zinc-950/30 dark:ring-white/10">
                <div
                  aria-hidden="true"
                  className="grid aspect-4/3 w-full place-items-center overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,rgba(16,185,129,0.18),rgba(59,130,246,0.12),rgba(244,63,94,0.10))] dark:bg-[linear-gradient(135deg,rgba(16,185,129,0.14),rgba(59,130,246,0.10),rgba(244,63,94,0.10))]"
                >
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-slate-900/5 dark:bg-zinc-950/50 dark:ring-white/10">
                      <Image
                        src="/logo.png"
                        alt="Pawteller logo"
                        className="h-8 w-8 rounded-full text-emerald-600 dark:text-emerald-300"
                        width={200}
                        height={40}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Tip: browse by goal
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                      Choose from growth, nutrition, age & more.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Dog Age", "Puppy Weight", "Nutrition", "Breed Quiz"].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200"
                      >
                        {chip}
                      </span>
                    ),
                  )}
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5 dark:bg-zinc-900/30 dark:ring-white/10">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    Need help?
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Use the calculator list to find the right one.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
