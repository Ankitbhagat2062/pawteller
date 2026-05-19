import { PawPrint } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur dark:bg-black/70">
      <div className="mx-auto flex w-full max-w-360 items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
            <PawPrint className="h-5 w-5" aria-hidden />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-extrabold tracking-tight text-navy dark:text-navy-50">
              {"Pawteller"}
            </p>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {"              Fast, SEO-focused calculators"}
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {["Home", "Calculators", "Blog", "Quiz", "About", "Contact"].map(
            (label) => {
              const href =
                label === "Home"
                  ? "/"
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
            },
          )}
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
            {"Start Calculator"}
            <span aria-hidden className="text-base">
              {" →"}
            </span>
          </Link>

          <Link
            href="/calculators"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 md:hidden"
            aria-label="Start Calculator"
          >
            {"Start"}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
