import Link from "next/link";
import { Button } from "@/components/ui/button";

export function OptionalServicesCta({
  label,
  href,
  ariaLabel,
}: {
  label?: string;
  href?: string;
  ariaLabel?: string;
}) {
  if (!href || !label) return null;

  return (
    <aside className="mt-8 rounded-xl border border-border bg-card p-5">
      <Button asChild variant="secondary" className="w-full justify-center">
        <Link href={href} aria-label={ariaLabel ?? label}>
          {label}
        </Link>
      </Button>
    </aside>
  );
}

