import { PawPrint } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pb-14 m-10" aria-label="Footer">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                <PawPrint className="h-5 w-5" aria-hidden />
              </div>
              <div>
                <p className="text-lg font-extrabold tracking-tight text-navy dark:text-navy-50">
                  pawteller
                </p>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Reliable pet insights, fast.
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-navy/70 dark:text-navy-50/70">
              Built for dog owners who want clarity. Our calculators and guides
              help you act confidently—today.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {[
                { label: "X", txt: "𝕏" },
                { label: "Facebook", txt: "f" },
                { label: "Instagram", txt: "⌁" },
                { label: "YouTube", txt: "▶" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-50 text-navy/70 ring-1 ring-black/5 transition hover:bg-white dark:bg-white/5 dark:text-navy-50/70 dark:ring-white/10"
                >
                  <span aria-hidden>{s.txt}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-8 md:flex md:justify-end">
            <div className="grid w-full gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-extrabold text-navy dark:text-navy-50">
                  Calculators
                </p>
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
                <p className="text-sm font-extrabold text-navy dark:text-navy-50">
                  Resources
                </p>
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
                <p className="text-sm font-extrabold text-navy dark:text-navy-50">
                  Company
                </p>
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
          <span>
            © {new Date().getFullYear()} pawteller. All rights reserved.
          </span>
          <span>Not medical advice. Use with your veterinarian.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
