'use client';

export function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Dog Age Calculator',
    url: 'https://dogagecalculator.com',
    description: 'Calculate your dog\'s age in human years using veterinary science. Accurate dog age converter based on breed size.',
    applicationCategory: 'HealthApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '250'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: 'Pet Care Experts',
      url: 'https://dogagecalculator.com'
    },
    datePublished: '2024-01-01',
    dateModified: '2024-05-20',
    inLanguage: 'en-US'
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is the "multiply by 7" rule accurate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, this outdated rule oversimplifies dog aging. Dogs age much faster in their first two years, then the rate slows down. Additionally, breed size significantly affects how quickly dogs age.'
        }
      },
      {
        '@type': 'Question',
        name: 'Why do large dogs age faster than small dogs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Larger dogs have faster metabolisms and shorter lifespans. They reach physical maturity quickly and experience more rapid cellular aging.'
        }
      },
      {
        '@type': 'Question',
        name: 'When is my dog considered a senior?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A dog is typically considered a senior between 45-65 human years old (approximately 7-10 dog years depending on size).'
        }
      },
      {
        '@type': 'Question',
        name: 'How often should I take my senior dog to the vet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Senior dogs should visit the veterinarian at least twice a year for wellness exams. More frequent visits may be needed if your dog has health conditions.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
