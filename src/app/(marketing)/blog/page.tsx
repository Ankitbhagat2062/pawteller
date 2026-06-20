import type { Metadata } from "next";
import Script from "next/script";
import BlogListingPage from "@/components/blog/BlogListing";
import { blogPageSeo } from "@/lib/cms/blogpage";
import { fetchData } from "@/lib/constant";
import { cookies } from "next/headers";
import { seoDefaults } from "@/lib/cms/seoCms";

// 🚀 100/100 LIGHTHOUSE SEO METADATA FOR THE BLOG
export async function generateMetadata(): Promise<Metadata> {
  // Read the token securely from the browser cookies on the server side
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("adminToken")?.value;
  const seo = await fetchData({ pageKey: "blog", adminToken: adminToken }) || seoDefaults.blog || blogPageSeo;
  return {
    title: seo.title || "Expert Pet Care Guides, Tips & Calculators | Pawteller",
    description:
      seo.description ||
      "Explore data-driven insights, veterinarian-vetted puppy growth tracking tips, dog nutrition guides, and care advice to keep your pup healthy.",
    keywords: seo.keywords || [
      "pet care guides",
      "dog care tips",
      "puppy growth tracker",
      "puppy growth calculator",
      "dog nutrition",
      "vet-vetted dog advice",
      "dog health tips",
      "puppy weight calculator",
      "dog years calculator",
      "dog age calculator",
      "breed-specific care",
      "new puppy checklist",
      "dog wellness",
      "science-based pet care",
      "pawteller blog",
    ],
    // Prevents duplicate URL content indexing penalties
    alternates: {
      canonical: "https://pawteller.com/blog",
    },

    // Rich visual configuration for social media platforms (Facebook, LinkedIn, Discord)
    openGraph: {
      title: seo.title || "Expert Pet Care Guides & Data Insights | Pawteller",
      description:
        seo.description ||
        "Explore data-driven insights, puppy growth tracking tips, and expert dog care advice.",
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
      title: seo.title || "Expert Pet Care Guides & Data Insights | Pawteller",
      description:
        seo.description ||
        "Explore data-driven insights, puppy growth tracking tips, and expert dog care advice.",
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
}
export default async function Blog() {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-ZVQNS9QQHG"
      ></Script>
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZVQNS9QQHG');
        `}
      </Script>
      <BlogListingPage />
    </>
  );
}
