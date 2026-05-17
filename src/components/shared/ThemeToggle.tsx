"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/8 bg-white/60 dark:border-white/10 dark:bg-black/20"
      >
        <span aria-hidden>🌓</span>
      </button>
    );
  }

  const resolvedTheme = theme === "system" ? undefined : theme;

  return (
    <button
      type="button"
      aria-label="Toggle dark/light mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-black/8 bg-white/60 text-navy shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-black/20 dark:text-navy-50"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-5 w-5" aria-hidden />
      ) : (
        <Moon className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}

