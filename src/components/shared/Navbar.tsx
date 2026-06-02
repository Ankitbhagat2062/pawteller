"use client";

import { PawPrint, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { navItems } from "@/lib/constant";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur dark:bg-black/70">
      <div className="mx-auto w-full max-w-360 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
              <PawPrint className="h-5 w-5" aria-hidden />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-extrabold tracking-tight text-navy dark:text-navy-50">
                Pawteller
              </p>
              <p className="text-[8px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Fast, SEO-focused calculators
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={`Navigate to ${label}`}
                className="text-sm font-semibold text-navy/80 hover:text-navy dark:text-navy-50/80 dark:hover:text-navy-50"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <div className="flex md:hidden">
              <button
                type="button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen((v) => !v)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/8 bg-white dark:border-white/10 dark:bg-black"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" aria-hidden />
                ) : (
                  <span aria-hidden>☰</span>
                )}
              </button>
            </div>

            <ThemeToggle />

            {/* Desktop CTA */}
            <Link
              href="/calculators"
              aria-label="Browse calculators for your dog (growth, age, nutrition)"
              className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 md:inline-flex"
            >
              Start Calculator
              <span aria-hidden className="text-base">
                {" →"}
              </span>
            </Link>

            {/* Mobile CTA */}
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 md:hidden"
              aria-label="Browse calculators for your dog"
            >
              Start
            </Link>
          </div>
        </div>

        {/* Mobile nav (smooth toggle) */}
        <div
          id="mobile-menu"
          className={
            "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out " +
            (isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0")
          }
        >
          <nav
            aria-label="Mobile primary"
            className="mt-4 flex flex-col gap-2 pb-2"
          >
            {navItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={`Navigate to ${label}`}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-navy/80 hover:bg-slate-100 hover:text-navy dark:text-navy-50/80 dark:hover:bg-white/5 dark:hover:text-navy-50"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

