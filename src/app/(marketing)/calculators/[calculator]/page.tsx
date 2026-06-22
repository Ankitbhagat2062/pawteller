import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import DogAge from "@/components/calculators/DogAge";
import DogFood from "@/components/calculators/DogFood";
import DogGrowth from "@/components/calculators/DogGrowth";
import DogName from "@/components/calculators/DogName";
import DogPregnancy from "@/components/calculators/DogPregnancy";
import PuppyWeight from "@/components/calculators/PuppyWeight";
import { cookies } from "next/headers";
import fetchSeo from "@/db/seoCmsDb";
import { seoDefaults } from "@/lib/cms/seoCms";

const SLUG_TO_COMPONENT = {
  "dog-age": DogAge,
  "dog-growth": DogGrowth,
  "dog-food": DogFood,
  "dog-pregnancy": DogPregnancy,
  "puppy-weight": PuppyWeight,
  "dog-name": DogName,
} as const;

// 1. DYNAMIC METADATA GENERATOR
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { calculator } = await params;
  const normalizedSlug = calculator?.toLowerCase() as CalculatorSlug | undefined;

  // If it's not a valid calculator slug, return empty metadata (handled by notFound later)
  if (!normalizedSlug || !(normalizedSlug in SLUG_TO_COMPONENT)) {
    return {};
  }

  // Get token on server side if present
  const cookieStore = await cookies();
  const token = cookieStore.get("adminAuthToken")?.value;

  // Fetch SEO configuration from DB using the pageKey (e.g. "dog-age")
  const seoData = await fetchSeo(normalizedSlug, token);

  // Fallback chain: Live DB data -> Static config defaults
  const fallbackSeo = seoDefaults[normalizedSlug] || {
    title: "Dog Calculator | Pawteller",
    description: "Explore Pawteller's scientific pet tools.",
    keywords: ["dog calculator"],
  };

  const title = seoData?.title || fallbackSeo.title;
  const description = seoData?.description || fallbackSeo.description;
  const keywords = seoData?.keywords || fallbackSeo.keywords;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Pet Care Team" }],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://www.pawteller.com/${normalizedSlug}`,
    },
    icons: {
      icon: [
        { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
  };
}
type CalculatorSlug = keyof typeof SLUG_TO_COMPONENT;

type PageProps = {
  params: Promise<{
    calculator?: string;
  }>;
};
export default async function CalculatorPage({ params }: PageProps) {
  const { calculator } = await params;
  const normalizedSlug = calculator?.toLowerCase() as
    | CalculatorSlug
    | undefined;

  const Component = normalizedSlug
    ? SLUG_TO_COMPONENT[normalizedSlug]
    : undefined;
    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MRMZHPN5';

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
      ></Script>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {Component ? (
          <section className="">
            <Component />
          </section>
        ) : (
          notFound()
        )}
      </main>
    </>
  );
}
