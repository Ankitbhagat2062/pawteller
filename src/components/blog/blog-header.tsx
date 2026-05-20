import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import ThemeToggle from "../shared/ThemeToggle";

interface BlogHeaderProps {
  category: string;
  readTime: string;
}

export function BlogHeader({ category, readTime }: BlogHeaderProps) {
  return (
    <header className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>All articles</span>
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          {category}
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="inline-flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {readTime}
        </span>
      </div>
    </header>
  );
}
