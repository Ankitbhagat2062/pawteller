"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideNavLinks } from "@/lib/admin/constants";
import { cn } from "@/lib/utils";

const AsideWrapper = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 hidden md:flex w-1/5 md:flex-col md:gap-2">
      <div className="rounded-xl border bg-background/60 p-3 backdrop-blur">
        <nav className="flex flex-col gap-1">
          {sideNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AsideWrapper;
