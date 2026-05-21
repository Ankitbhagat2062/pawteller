"use client";

export function SchemaOrg() {
  const baseUrl = "https://pawteller.com";

  // Brand-wide schema (site/app). Keep it stable and accurate.
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Pawteller",
    url: baseUrl,
    description:
      "Smart, science-informed pet calculators and expert dog care insights to help dog parents estimate growth, interpret dog years, and plan nutrition and wellness.",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    inLanguage: "en-US",
    browserRequirements: "Requires JavaScript enabled",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: "Pet Care Experts",
      url: baseUrl,
    },
    datePublished: "2024-01-01",
    dateModified: "2024-05-20",
  };

  // Site search links (helps crawlers discover internal content patterns)
  const searchSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pawteller",
    url: baseUrl,
    description:
      "Use Pawteller tools and guides to quickly estimate dog growth and understand dog health topics.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // FAQ schema: relevant to dog year conversion / aging questions.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: 'Is the "multiply by 7" rule accurate?',
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The “multiply by 7” rule is an oversimplification. Dogs age faster in their first couple of years, and aging rates vary by breed size and development stage.",
        },
      },
      {
        "@type": "Question",
        name: "Why do large dogs age differently than small dogs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because breed size affects growth speed, metabolism, and overall lifespan. Larger breeds typically reach maturity sooner, which can change how dog years map to human years.",
        },
      },
      {
        "@type": "Question",
        name: "When is a dog considered a senior?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many guidelines place senior status roughly in the 45–65 human-year range, but the exact timing can vary depending on size and health.",
        },
      },
      {
        "@type": "Question",
        name: "How often should senior dogs see the vet?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A common recommendation is at least twice a year for wellness exams for senior dogs. Your veterinarian may recommend more frequent visits if your dog has conditions or changing symptoms.",
        },
      },
      {
        "@type": "Question",
        name: "Do dog year calculators replace veterinary advice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Dog year calculators are informational tools. They can help you understand aging trends, but diagnosis, treatment, and medical decisions should be made with a licensed veterinarian.",
        },
      },
    ],
  };

  // Avoid schema markup collisions by keeping each type in its own script tag.
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
