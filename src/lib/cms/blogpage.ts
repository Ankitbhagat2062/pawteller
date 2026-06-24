import type { contentProps, seoProps } from "@/lib/types";

export interface BlogContentProps {
  content: contentProps[];
}

export interface BlogHeaderProps {
  category: string;
  readTime: string;
}

export interface BlogPost {
  imageSrc: string;
  title: string;
  description: string;
  url: string;
  totalTime: string;
  content: contentProps[];
  category: string;
  date?: string;
  bgColor?: string;
  cta?: {
    label?: string;
    href?: string;
    ariaLabel?: string;
  };
}


export interface BlogPostPageProps {
  params: Promise<{ blogPost: string }>;
}
export const blogPosts: BlogPost[] = [
  {
    title: "How fast do puppies grow? A week-by-week guide",
    description:
      "From wobbly first steps to full-grown floof — here's exactly what to expect in every stage.",
    imageSrc: "https://images.unsplash.com/photo-1591160690555-5debfba289f0",
    url: "/blog/puppy-growth-tracker",
    totalTime: "Featured · Growth · 6 min",
    content: [
      {
        title: "The newborn phase",
        description:
          "Newborn puppies are blind, deaf, and entirely dependent on their mother. They spend 90% of their time sleeping and the other 10% nursing. By week 2, eyes start to open.",
        time: "Week 1-2",
      },
      {
        title: "First steps",
        description:
          "Tiny legs start working. Puppies begin to walk, play, and respond to sound. Solid food is introduced around 4 weeks.",
        time: "Week 3-4",
      },
      {
        title: "The socialization window",
        description:
          "This is the most important developmental window of your puppy’s life. Positive exposure to people, sounds, and other animals shapes who they’ll become.",
        time: "Week 5-8",
      },
      {
        time: "Month 3–6",
        title: "The growth sprint",
        description:
          "Puppies hit their biggest growth phase. Large breeds may gain 2–4 lbs per week. Use our Puppy Weight Calculator to track their curve.",
      },
      {
        time: "Month 6–12",
        title: "Adolescent dog",
        description:
          " Growth slows. Sexual maturity arrives. Training matters now more than ever — puppies test boundaries like teenagers.",
      },
      {
        time: "Year 1–2 ",
        title: " Adult dog",
        description:
          "Most small/medium breeds are fully grown by 12 months. Large/giant breeds may grow until 18–24 months.",
      },
    ],
    category: "Growth",
    date: "Updated Weekly",
    bgColor: "bg-[#F5C6A5]",
  },
  {
    title: "Decoding dog years: the science behind aging",
    description:
      "Why the “multiply by 7” rule is wrong, and what to use instead.",
    imageSrc: "https://images.unsplash.com/photo-1523480717984-24cba35ae1ef",
    url: "/blog/dog-years-to-human-years",
    totalTime: "Health · 4 min",
    category: "Growth",
    date: "Updated Weekly",
    bgColor: "bg-[#C6D9C6]",
    content: [
      {
        title: "The 7-year myth",
        description:
          "The popular “1 dog year = 7 human years” rule comes from rough lifespan averages — not biology. Dogs don’t age linearly.",
      },
      {
        title: "The real formula",
        description:
          "Year 1 ≈ 15 human years. Year 2 adds 9. After that, small breeds age ~4 years/year, medium ~5, large ~6, giant ~7. Our Dog Age Calculator uses this veterinary framework.",
      },
      {
        title: "Why bigger dogs age faster",
        description:
          "Researchers think it’s tied to faster cell division and shorter telomere length in large breeds. A Great Dane at 6 is biologically similar to a Chihuahua at 10.",
      },
      {
        title: "When to call your dog “senior”",
        description:
          "Small breeds: 10–11. Medium: 8–9. Large: 7–8. Giant: 5–6. Senior care — joint support, slower food, more vet visits — should start then.",
      },
    ],
  },
  {
    title: "Choosing the right breed: 7 questions to ask first",
    description:
      "Before falling for that adorable face, run through this checklist.",
    imageSrc: "https://images.unsplash.com/photo-1560743641-3914f2c45636",
    url: "/blog/puppy-training-basics",
    totalTime: "Training · Behavior · 8 min",
    category: "Lifestyle",
    date: "Updated Weekly",
    bgColor: "bg-[#F1D9A8]",
    content: [
      {
        title: "1. How much daily exercise can you guarantee?",
        description:
          "A Border Collie needs 2+ hours daily. A Bulldog is happy with 30 minutes. Mismatch = unhappy dog + frustrated human.",
      },
      {
        title: "2. How much space do you have?",
        description:
          "Apartments suit small/medium low-energy breeds. Big yards suit working breeds.",
      },
      {
        title: "3. Allergy or shedding concerns?",
        description:
          "Poodles, Bichons, and Schnauzers shed minimally. Huskies and Golden Retrievers shed constantly.",
      },
      {
        title: "4. Family situation?",
        description:
          "Some breeds adore kids (Labs, Goldens, Beagles). Others prefer adult-only homes.",
      },
      {
        title: "5. Experience level?",
        description:
          "First-time owner? Skip Akitas and Cane Corsos. Start with a Cavalier King Charles or Lab.",
      },
      {
        title: "6. Time budget?",
        description:
          "Long-coated breeds need weekly grooming. Working breeds need daily mental stimulation.",
      },
      {
        title: "7. Lifespan expectations?",
        description:
          "Small breeds often live 14–16 years. Giants average 7–9. Plan emotionally and financially.",
      },
    ],
  },
  {
    title: "Feeding your puppy: portions that actually work",
    description: "A simple framework for calculating calories at every stage.",
    imageSrc: "https://images.unsplash.com/photo-1444212477490-ca407925329e",
    url: "/blog/feeding-your-puppy",
    totalTime: "Nutrition 🕐  5 min",
    category: "Nutrition",
    date: "Updated Weekly",
    bgColor: "bg-[#F1D9A8]",
    content: [
      {
        title: "Start with RER",
        description:
          "Resting Energy Requirement = 70 × (weight in kg)^0.75. That’s the baseline calories your dog burns just existing.",
      },
      {
        title: "Then multiply by life-stage factor",
        description:
          "Puppies under 4 months: RER × 3. Puppies 4–9 months: RER × 2.5. Puppies 9–12 months: RER × 2. Active adults: RER × 1.6. Couch potatoes: RER × 1.4.",
      },
      {
        title: "Convert to cups",
        description:
          "Most dry kibble is around 350 kcal/cup. Always check your bag — premium foods can be 400+. Our Dog Food Calculator handles this for you.",
      },
      {
        title: "How many meals?",
        description:
          "Puppies under 4 months: 4 small meals. Older puppies: 3 meals. Adults: 2 meals. Splitting reduces tummy upset and stabilizes energy.",
      },
    ],
  },
];

export const blogPageSeo: seoProps = {
  title: "Expert Pet Care Guides, Tips & Calculators | Pawteller",
  description:
    "Explore data-driven insights, veterinarian-vetted puppy growth tracking tips, dog nutrition guides, and care advice to keep your pup healthy.",
  keywords: [
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
};
