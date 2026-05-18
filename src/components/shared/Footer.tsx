'use client";'
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}
const footerSections: FooterSection[] = [
  {
    title: "Tools",
    links: [
      { label: "Breed Calculator", href: "/calculators/breed" },
      { label: "Food Calculator", href: "/calculators/food" },
      { label: "Age Calculator", href: "/calculators/age" },
      { label: "Weight Tracker", href: "/calculators/weight" },
    ],
  },
  {
    title: "Content",
    links: [
      { label: "Breed Quiz", href: "/quiz" },
      { label: "Blog", href: "/blog" },
      { label: "Care Guides", href: "/guides" },
      { label: "Pet Health", href: "/health" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#2d4a3e] dark:bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-16 rounded-2xl bg-card p-8 shadow-sm lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h2 className="text-balance text-xl font-semibold text-foreground lg:text-2xl">
                Stay Updated with Pet Care Tips
              </h2>
              <p className="mt-2 text-pretty text-muted-foreground">
                Get weekly insights on pet health, breed guides, and exclusive
                content delivered to your inbox.
              </p>
            </div>
            <form
              className="flex w-full max-w-md flex-col gap-3 bg-transparent sm:flex-row"
              
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                required
                className="h-12 flex-1 rounded-full border border-border bg-background px-5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:opacity-90 hover:shadow-md"
              >
                Subscribe
                <ArrowIcon />
              </button>
            </form>
          </div>
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
              <img
                src="/vercel.svg"
                alt="Pawteller logo"
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Pawteller
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-pretty text-sm text-muted-foreground">
              Your trusted companion for pet care insights, breed information,
              and tools to help your furry friend thrive.
            </p>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {section.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3" role="list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
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
            © {currentYear} Pawteller. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/accessibility"
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Accessibility
            </Link>
            <Link
              href="/sitemap"
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
