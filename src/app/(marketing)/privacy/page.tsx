import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { fetchData, SECTIONS } from "@/lib/constant";
import { seoDefaults } from "@/lib/cms/seoCms";
import { cookies } from "next/headers";

// 1. GENERATE PERFECT 100/100 SEO METADATA
export async function generateMetadata(): Promise<Metadata> {
  // Read the token securely from the browser cookies on the server side
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("adminAuthToken")?.value;
  const seo = await fetchData({ pageKey: "privacy", adminToken: adminToken }) || seoDefaults.privacy;
  return {
    title: seo.title || "Privacy Policy | Pawteller",
    description: seo.description || "Learn how Pawteller collects, secures, and handles your data safely. Read our straightforward privacy commitments and data practices.",
    keywords: seo.keywords || [
      "Pawteller",
      "privacy policy",
      "data privacy",
      "personal information",
      "how we use data",
      "data collection",
      "device data",
      "usage analytics",
      "cookies",
      "cookie policy",
      "interest-based advertising",
      "third-party services",
      "data rights",
      "access request",
      "delete my data",
      "privacy request",
      "contact support",
      "pet health information",
    ],
    alternates: {
      canonical: "https://pawteller.com/privacy",
    },
  };
}

export default function Privacy() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZVQNS9QQHG"
      ></Script>
      <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-zinc-950 dark:text-slate-50 font-sans pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="py-8 sm:py-10">
            <div className="rounded-3xl bg-white/60 p-5 ring-1 ring-slate-200/50 backdrop-blur dark:bg-white/5 dark:ring-white/10 sm:p-8">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Legal
                  </p>
                  <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                    Privacy Policy
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-700 dark:text-zinc-200">
                  <p>Last updated: January 15, 2026</p>
                  <span
                    className="hidden h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-700 sm:inline"
                    aria-hidden="true"
                  />
                  <p>Platform: Pawteller Asset Security</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Static Document Layout Directory (No Hydration Shift Layout) */}
            <aside
              className="lg:col-span-4 lg:sticky lg:top-24"
              aria-label="Policy sections navigation"
            >
              <nav className="rounded-3xl bg-white p-5 ring-1 ring-slate-200/50 dark:bg-white/5 dark:ring-white/10">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  On this page
                </p>
                <ul className="mt-4 space-y-2.5">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        aria-label={`Learn more about ${section.title}`}
                        className="block text-sm font-semibold text-slate-600 transition duration-150 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                      >
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Optimized Frame Content Container */}
            <main className="lg:col-span-8">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/60 dark:bg-white/5 dark:ring-white/10 sm:p-8">
                {/* Eliminated conflicting layout styles by managing presentation rules directly inside clean utility elements */}
                <div className="space-y-10">
                  {SECTIONS.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-28"
                    >
                      <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 border-b border-zinc-100 pb-2 dark:border-zinc-800/50">
                        {section.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-zinc-300 whitespace-pre-line">
                        {section.content}
                      </p>
                    </section>
                  ))}
                </div>

                {/* Action Frame Area */}
                <div className="mt-12 rounded-2xl bg-zinc-50 p-6 ring-1 ring-black/5 dark:bg-zinc-900/20 dark:ring-white/10">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-50">
                        Need help?
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-zinc-200">
                        Contact us for privacy questions, data requests, or
                        support.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <a
                        href="mailto:support@pawteller.com"
                        aria-label="Email us"
                        className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      >
                        Contact Support
                      </a>
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-center text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-zinc-300">
                  Not medical advice. Use with your veterinarian.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
