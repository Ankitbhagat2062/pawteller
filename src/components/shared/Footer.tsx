"use client";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { submitVerificationForm } from "@/hooks/forms";
import { footerSections } from "@/lib/constant";
import type { FormState } from "@/lib/types";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitVerificationForm, {});
  useEffect(() => {
    if (currentState.success) {
      toast.success(currentState.message || "Subscribed successfully!");
    } else if (currentState.error) {
      toast.error(currentState.error);
    }
  }, [currentState.success, currentState.error, currentState.message]);
  return (
    <footer className="border-t border-border bg-[#2d4a3e] dark:bg-[#0f2a1f]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-2xl bg-card p-8 shadow-sm lg:p-10 ">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h2 className="text-balance text-xl font-semibold text-gray-700 dark:text-gray-50 sm:text-2xl">
                {"Stay Updated with Pet Care Tips"}
              </h2>
              <p className="mt-2 text-pretty text-gray-800 dark:text-gray-200">
                {`Get weekly insights on pet health, breed guides, and exclusive
                content delivered to your inbox.`}
              </p>
            </div>
            <form
              action={formAction}
              className="flex w-full max-w-md flex-col gap-3 bg-transparent sm:flex-row"
            >
              <Label htmlFor="email" className="sr-only">
                {"Email address"}
              </Label>

              {/* Honeypot (invisible to humans). Bots often fill it. */}
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="sr-only"
              />

              <input
                id="firstName"
                name="firstName"
                type="email"
                placeholder="John Doe"
                required
                disabled={isPending}
                className="h-12 hidden flex-1 rounded-full border border-border bg-background py-3 px-4 text-base text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:px-5"
              />
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
              aria-live="polite"
            >
              {currentState.success ? (
                <span className="inline-flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="size-4.5" aria-hidden="true" />
                  <span>{currentState.message ?? ""}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="size-4.5" aria-hidden="true" />
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
                src="/logo.png"
                alt="Pawteller logo"
                className="h-8 w-8 rounded-full"
                width={200}
                height={40}
              />
              <span className="text-lg font-semibold tracking-tight text-gray-50">
                {" Pawteller"}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-pretty text-sm text-gray-100">
              {` Your trusted companion for pet care insights, breed information,
              and tools to help your furry friend thrive.`}
            </p>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 dark:text-gray-50 ">
                {section.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-label={`Learn more about ${link.label}`}
                      className="text-sm text-gray-100 transition-colors duration-200 hover:text-white"
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
          <p className="text-sm text-gray-50">
            {" ©"} {currentYear} {"Pawteller. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/accessibility"
              aria-label="Accessibility"
              className="text-sm text-gray-50 transition-colors duration-200 hover:text-white"
            >
              {"              Accessibility"}
            </Link>
            <Link
              href="/sitemap"
              aria-label="Sitemap"
              className="text-sm text-gray-50 transition-colors duration-200 hover:text-white"
            >
              {"Sitemap"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
