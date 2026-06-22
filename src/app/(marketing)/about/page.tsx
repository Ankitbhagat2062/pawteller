import { FileText, Flame, Heart, Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FaqSection } from "@/components/shared/FaqSection";
import { getAboutPageCms } from "@/db/aboutCmsDb";
import type {
  AboutPageBottomCtaBandProps,
  ctaProps,
  rightProps,
} from "@/lib/cms/aboutpage";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const aboutPageCms = await getAboutPageCms();
  const seo = aboutPageCms.seo;

  return {
    title: seo.title || "About Pawteller | Reliable & Fast Dog Insights",
    description:
      seo.description ||
      "Learn more about Pawteller's mission. We provide ultra-fast calculators, custom quiz funnels, and bite-sized practical guides for everyday dog owners.",
    keywords: seo.keywords || [],
    alternates: {
      canonical: "https://pawteller.com/about",
    },
  };
}

export default async function AboutPage() {
  const aboutPageCms = await getAboutPageCms();
  const jsonLdSchema = aboutPageCms.seo.jsonLd ?? {};
  const heroSection = aboutPageCms.heroSection;
  const missionSection = aboutPageCms.missionSection;
  const trustPrincipleSection = aboutPageCms.trustPrincipleSection;
  const actionblockSection = aboutPageCms.actionblockSection;
  const medicalWarningSection = aboutPageCms.medicalWarningSection;
  const bottomCtaBandSection = aboutPageCms.bottomCtaBand;
  const faqItems = aboutPageCms.faqItems;
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MRMZHPN5';
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      ></Script>
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', '${GTM_ID}',);
        `}
      </Script>
      <Script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLdSchema)}
      </Script>
      <div className="min-h-screen w-full font-sans text-slate-900 dark:bg-zinc-950 dark:text-slate-50">
        <main
          id="about"
          className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
        >
          {/* Hero Section */}
          {heroSection && (
            <section className="rounded-3xl bg-white px-6 py-12 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:px-10">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
                {(() => {
                  const right = heroSection.right
                    ? Array.isArray(heroSection.right)
                      ? heroSection.right
                      : [heroSection.right]
                    : [];
                  return right.map(({ title, description, buttons }) => (
                    <div key={title} className="lg:col-span-7">
                      <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        <Image
                          src="/logo.png"
                          alt="Pawteller logo"
                          className="h-5 w-5 rounded-full w-auto"
                          width={200}
                          height={40}
                          aria-hidden="true"
                        />
                        {title}
                      </p>

                      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
                        {title}
                      </h1>

                      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 md:text-lg">
                        {description}
                      </p>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                        {buttons?.map((btn: ctaProps) => (
                          <Link
                            key={`${btn.label}-${btn.href ?? "default-cta"}`}
                            href={btn.href || "/calculators/dog-age"}
                            aria-label={
                              btn.ariaLabel || "Calculate your dog’s age"
                            }
                            className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                          >
                            {btn.label} <span aria-hidden="true">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ));
                })()}

                {/* Performance Optimized List: Lucide Icons avoid CLS Layout Shifts */}
                <div className="lg:col-span-5">
                  {(() => {
                    const left = heroSection.left
                      ? Array.isArray(heroSection.left)
                        ? heroSection.left
                        : [heroSection.left]
                      : [];
                    return left.map(
                      (left: {
                        title: string;
                        speed: string;
                        Clarity: string;
                        footertext: string;
                        owner: string;
                      }) => (
                        <div
                          key={left.title}
                          className="rounded-3xl bg-emerald-500/5 p-6 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                        >
                          <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-100">
                            {left.title}
                          </p>
                          <ul className="mt-4 space-y-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
                            <li className="flex items-start gap-3">
                              <span
                                className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                                aria-hidden
                              >
                                <Flame className="h-3.5 w-3.5" />
                              </span>
                              <span>{left.speed}</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span
                                className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                                aria-hidden
                              >
                                <FileText className="h-3.5 w-3.5" />
                              </span>
                              <span>{left.Clarity}</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span
                                className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                                aria-hidden
                              >
                                <Search className="h-3.5 w-3.5" />
                              </span>
                              <span>{left.footertext}</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span
                                className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400"
                                aria-hidden
                              >
                                <Heart className="h-3.5 w-3.5" />
                              </span>
                              <span>{left.owner}</span>
                            </li>
                          </ul>
                        </div>
                      ),
                    );
                  })()}
                </div>
              </div>
            </section>
          )}

          {/* Mission Section */}
          {missionSection && (
            <section className="mt-10">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-10">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                  {(() => {
                    const left = missionSection.left
                      ? Array.isArray(missionSection.left)
                        ? missionSection.left
                        : [missionSection.left]
                      : [];

                    return left.map(({ title, description }: rightProps) => (
                      <div key={title} className="lg:col-span-6">
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                          {title}
                        </h2>
                        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                          {description}
                        </p>
                      </div>
                    ));
                  })()}

                  <div className="lg:col-span-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {missionSection.right?.map((mission: rightProps) => (
                        <div
                          key={mission.title}
                          className="rounded-2xl bg-emerald-500/5 p-5 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                        >
                          <div className="flex items-center justify-between gap-2 text-sm font-extrabold ">
                            <p>{mission.title}</p>
                            <span
                              aria-hidden="true"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-lg dark:bg-emerald-400/10"
                            >
                              {mission.icon && (
                                <mission.icon className="h-5 w-5" />
                              )}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {mission.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Trust Principles Section */}
          {trustPrincipleSection && (
            <section className="mt-10" aria-label="Trust principles">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                {(() => {
                  const header = trustPrincipleSection
                    ? Array.isArray(trustPrincipleSection)
                      ? trustPrincipleSection
                      : [trustPrincipleSection]
                    : [];
                  return header.map(({ banner, title }) => (
                    <div key={banner}>
                      <p className="text-sm font-semibold tracking-tight text-emerald-800 dark:text-emerald-300">
                        {banner}
                      </p>
                      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                        {title}
                      </h2>
                    </div>
                  ));
                })()}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {trustPrincipleSection.content?.map((card) => (
                  <div
                    key={card.title}
                    className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                          {card.title}
                        </p>
                        <span
                          aria-hidden="true"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-lg dark:bg-emerald-400/10"
                        >
                          {card.icon && <card.icon className="w-5 h-5" />}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Action Blocks Section */}
          {actionblockSection && (
            <section className="mt-10" aria-label="What you can do here">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10 sm:p-10">
                <div className="grid gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                      {actionblockSection.title}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                      {actionblockSection.description}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {actionblockSection.cta?.map((cta: ctaProps) => (
                        <Link
                          key={cta.label}
                          href={cta.href}
                          aria-label={cta.ariaLabel}
                          className="flex items-center justify-between rounded-2xl bg-emerald-500/5 px-4 py-4 shadow-sm ring-1 ring-emerald-900/10 transition hover:bg-emerald-500/10 dark:bg-emerald-500/10 dark:ring-emerald-500/20"
                        >
                          <span className="text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
                            {cta.label}
                          </span>
                          <span aria-hidden="true" className="text-lg">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Responsible Medical Warning Note */}
          {medicalWarningSection && (
            <section className="mt-10" aria-label="Responsible information">
              <div className="rounded-3xl bg-amber-50 p-6 shadow-sm ring-1 ring-black/5 dark:bg-amber-500/10 dark:ring-white/10 sm:p-10">
                {(() => {
                  const medical = medicalWarningSection
                    ? Array.isArray(medicalWarningSection)
                      ? medicalWarningSection
                      : [medicalWarningSection]
                    : [];

                  return medical.map((card: rightProps) => (
                    <div key={card.title} className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300"
                      >
                        {card.icon && <card.icon className="h-5 w-5" />}
                      </span>
                      <div>
                        <p className="text-sm font-extrabold text-slate-900 dark:text-slate-50">
                          {card.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </section>
          )}

          {/* Bottom CTA Band */}
          {bottomCtaBandSection && (
            <section className="mt-10 rounded-3xl bg-emerald-500/10 p-6 shadow-sm ring-1 ring-emerald-900/10 dark:bg-emerald-500/15 dark:ring-emerald-500/20 sm:p-10">
              {(() => {
                const bottom = bottomCtaBandSection
                  ? Array.isArray(bottomCtaBandSection)
                    ? bottomCtaBandSection
                    : [bottomCtaBandSection]
                  : [];

                return bottom.map((bottom: AboutPageBottomCtaBandProps) => (
                  <div
                    key={bottom.banner}
                    className="grid gap-6 md:grid-cols-12 md:items-center"
                  >
                    <div className="md:col-span-8">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-900 dark:text-white">
                        {bottom.banner}
                      </p>
                      <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                        {bottom.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-50">
                        {bottom.description}
                      </p>
                    </div>
                    <div className="md:col-span-4 md:text-right">
                      <Link
                        href={bottom.cta.href}
                        aria-label={bottom.cta.ariaLabel}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                      >
                        {bottom.cta.label} <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                ));
              })()}
            </section>
          )}

          {faqItems.length > 0 ? (
            <section
              className="mt-10"
              aria-label="About frequently asked questions"
            >
              <FaqSection items={faqItems} />
            </section>
          ) : null}
        </main>
      </div>
    </>
  );
}
