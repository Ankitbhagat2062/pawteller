"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { footerSections } from "@/lib/constant";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { type FormState } from "@/lib/types";
import { submitVerificationForm } from "@/hooks/forms";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitVerificationForm, {});
  if (currentState.success) {
    toast.success(currentState.message || "Subscribed successfully!");
  }

  if (currentState.error) {
    toast.error(currentState.error);
  }
  return (
    <footer className="border-t border-border bg-[#2d4a3e] dark:bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-2xl bg-card p-8 shadow-sm lg:p-10 ">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h2 className="text-balance text-xl font-semibold text-foreground sm:text-2xl">
                {"Stay Updated with Pet Care Tips"}
              </h2>
              <p className="mt-2 text-pretty text-muted-foreground">
                {`Get weekly insights on pet health, breed guides, and exclusive
                content delivered to your inbox.`}
              </p>
            </div>
            <form action={formAction} className="flex w-full max-w-md flex-col gap-3 bg-transparent sm:flex-row">

              <Label htmlFor="email" className="sr-only">
                {"Email address"}
              </Label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                disabled={isPending}
                className="h-12 flex-1 rounded-full border border-border bg-background py-3 px-4 text-base text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-5"
              />
              <Button
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md"
                disabled={isPending}
              >
                {isPending ? "Subscribing" : "Subscribe"}
                <ArrowRight />
              </Button>
            </form>
          </div>
          {(currentState.success || currentState.error) && (
            <div
              className="mx-auto mt-6 flex w-full max-w-md items-center justify-center rounded-lg border border-border/60 bg-background/70 px-4 py-3"
              role="status"
              aria-live="polite"
            >
              {currentState.success ? (
                <span className="inline-flex items-center gap-2 text-sm text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>{currentState.message ?? ""}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                  <span>{currentState.error ?? ""}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
              aria-label="Pawteller Home"
            >
              <Image
                src="/vercel.svg"
                alt="Pawteller logo"
                className="h-8 w-auto"
                width={200}
                height={40}
              />
              <span className="text-lg font-semibold tracking-tight text-foreground">
                {" Pawteller"}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-pretty text-sm text-muted-foreground">
              {` Your trusted companion for pet care insights, breed information,
              and tools to help your furry friend thrive.`}
            </p>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-label={`Learn more about ${link.label}`}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {" ©"} {currentYear} {"Pawteller. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/accessibility"
              aria-label="Accessibility"
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {"              Accessibility"}
            </Link>
            <Link
              href="/sitemap"
              aria-label="Sitemap"
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {"Sitemap"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
