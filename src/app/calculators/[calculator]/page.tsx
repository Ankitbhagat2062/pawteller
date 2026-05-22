import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import DogAge from "@/components/calculators/DogAge";
import DogFood from "@/components/calculators/DogFood";
import DogGrowth from "@/components/calculators/DogGrowth";
import DogName from "@/components/calculators/DogName";
import DogPregnancy from "@/components/calculators/DogPregnancy";
import PuppyWeight from "@/components/calculators/PuppyWeight";

const SLUG_TO_COMPONENT = {
  "dog-age": DogAge,
  "dog-growth": DogGrowth,
  "dog-food": DogFood,
  "dog-pregnancy": DogPregnancy,
  "puppy-weight": PuppyWeight,
  "dog-name": DogName,
} as const;

type CalculatorSlug = keyof typeof SLUG_TO_COMPONENT;

type PageProps = {
  params: Promise<{
    calculator?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Dog Age Calculator | Convert Your Dog's Age to Human Years",
  description:
    "Accurate dog age calculator using modern veterinary science. Convert your dog's age to human years based on breed size. Learn how dog aging works scientifically.",
  keywords: [
    "dog age calculator",
    "dog years to human years",
    "dog age converter",
    "pet age calculator",
    "veterinary science",
  ],
  authors: [{ name: "Pet Care Team" }],
  openGraph: {
    title: "Dog Age Calculator | Convert Your Dog's Age to Human Years",
    description:
      "Discover your dog's human age equivalent with our scientific dog age calculator based on veterinary research.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dog Age Calculator",
    description:
      "Find out how old your dog is in human years using science-based calculations.",
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
    canonical: "https://www.pawteller.com",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function CalculatorPage({ params }: PageProps) {
  const { calculator } = await params;
  const normalizedSlug = calculator?.toLowerCase() as
    | CalculatorSlug
    | undefined;

  const Component = normalizedSlug
    ? SLUG_TO_COMPONENT[normalizedSlug]
    : undefined;
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZVQNS9QQHG"
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
