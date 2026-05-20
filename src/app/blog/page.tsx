import type { Metadata } from "next";
import BlogListingPage from "@/components/shared/BlogListing";
import Script from "next/script";

// 🚀 100/100 LIGHTHOUSE SEO METADATA FOR THE BLOG
export const metadata: Metadata = {
  title: "Expert Pet Care Guides, Tips & Calculators | pawteller",
  description:
    "Explore data-driven insights, veterinarian-vetted puppy growth tracking tips, dog nutrition guides, and care advice to keep your pup healthy.",

  // Prevents duplicate URL content indexing penalties
  alternates: {
    canonical: "https://pawteller.com/blog",
  },

  // Rich visual configuration for social media platforms (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "Expert Pet Care Guides & Data Insights | pawteller",
    description: "Explore data-driven insights, puppy growth tracking tips, and expert dog care advice.",
    url: "https://pawteller.com/blog",
    siteName: "pawteller",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pawteller.com/dog-1.png", // Create a clean 1200x630 image and put it in your public folder
        width: 1200,
        height: 630,
        alt: "pawteller Blog - Expert Pet Insights and Calculators",
      },
    ],
  },

  // High-performance rich link card previews on X (formerly Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Expert Pet Care Guides & Data Insights | pawteller",
    description: "Explore data-driven insights, puppy growth tracking tips, and expert dog care advice.",
    images: ["https://pawteller.com/dog-2.png"],
  },

  // Explicit crawler instruction directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Blog() {
  return (
    <>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-ZVQNS9QQHG"></Script>
      <BlogListingPage />;
    </>
  )
}