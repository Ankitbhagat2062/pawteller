export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "pawteller",
    url: "https://pawteller.com",
    description:
      "Expert data-driven puppy growth tracking, veterinary health calculators, and pet care insights.",
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    browserRequirements: "Requires JavaScript. Requires HTML5.",
  };

  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {JSON.stringify(schema)}
    </script>
  );
}
