"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Safely delay interactivity signals until hydration completes
  useEffect(() => {
    setMounted(true);
  }, []);

  // HIGH-PERFORMANCE SKELETON: Uses absolute matching geometry dimensions
  // and no font/emoji characters to completely eliminate layout shifting (CLS).
  if (!mounted) {
    return (
      <div 
        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50"
        aria-hidden="true"
      >
        <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle dark and light theme mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-800 shadow-sm transition-colors duration-200 hover:bg-white hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-50"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 scale-100" aria-hidden="true" />
      )}
    </button>
  );
}