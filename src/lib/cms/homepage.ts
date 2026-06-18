import { blogPosts } from "@/lib/cms/blogpage";
import type { seoProps } from "@/lib/types";
import { type CalculatorProps, calculators } from "./calculatorpage";

export interface featuredCalculatorCardProps {
  title: string;
  displayTitle: string;
  description: string;
  bg: string;
  darkBg: string;
  className: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
}

export const featuredCalculatorCards: featuredCalculatorCardProps[] = [
  {
    title: "Dog Age Calculator",
    displayTitle: "Dog Age",
    description: "Dog years -> human years",
    bg: "bg-[#f5c5a3]",
    darkBg: "dark:bg-[#3c261d]",
    className: "",
  },
  {
    title: "Puppy Weight Calculator",
    displayTitle: "Puppy Weight",
    description: "Predict adult size",
    bg: "bg-[#c6d9c6]",
    darkBg: "dark:bg-[#21372b]",
    className: "lg:row-span-2",
    imageSrc: "https://images.unsplash.com/photo-1591160690555-5debfba289f0",
    imageAlt: "Golden retriever puppy lying down",
    badge: "Most Loved",
  },
  {
    title: "Dog Food Calculator",
    displayTitle: "Food Portion",
    description: "Daily calories & cups",
    bg: "bg-[#f1d9a8]",
    darkBg: "dark:bg-[#3a301d]",
    className: "",
  },
  {
    title: "Dog Pregnancy Calculator",
    displayTitle: "Pregnancy",
    description: "Due date & timeline",
    bg: "bg-[#f2ada4]",
    darkBg: "dark:bg-[#3d2424]",
    className: "",
  },
  {
    title: "Dog Name Generator",
    displayTitle: "Name Generator",
    description: "Perfect name in seconds",
    bg: "bg-[#d6cbe8]",
    darkBg: "dark:bg-[#2d2940]",
    className: "",
  },
  {
    title: "Dog Growth Calculator",
    displayTitle: "Growth Curve",
    description: "Track week by week",
    bg: "bg-[#bcdceb]",
    darkBg: "dark:bg-[#203642]",
    className: "",
  },
] as const;

export interface dogLifeStageProps {
  icon: string;
  age: string;
  stage: string;
  weight: string;
  className: string;
}
export const dogLifeStages: dogLifeStageProps[] = [
  {
    icon: "🐶",
    age: "8 WKS",
    stage: "Puppy",
    weight: "~8 lbs",
    className: "lg:mt-0",
  },
  {
    icon: "🐕",
    age: "6 MO",
    stage: "Adolescent",
    weight: "~45 lbs",
    className: "lg:mt-8",
  },
  {
    icon: "🐕",
    age: "2 YR",
    stage: "Adult",
    weight: "~70 lbs",
    className: "lg:mt-14",
  },
] as const;

export type HomepageHeroCms = {
  id: string;
  badgeText: string;
  h1: string;
  descriptionLines: string;
  primaryCta: { label: string; href: string; ariaLabel: string };
  secondaryCta: { label: string; href: string; ariaLabel: string };
  ratingLabelPrefix: string;
  ratingCountText: string;
  ratingLabelSuffix: string;
  image: { src: string; alt: string };
  overlayLeft: { eyebrow: string; value: string; footer: string };
  overlayRight: { eyebrow: string; value: string; footer: string };
};

export type HomepageFeaturedCalculatorCmsItem = {
  calculators: typeof calculators;
  cards: typeof featuredCalculatorCards;
};

export type HomepageCms = {
  seo: seoProps & {
    jsonLd?: Record<string, unknown>;
  };
  hero: HomepageHeroCms;
  featuredCalculators: {
    calculators: CalculatorProps[];
    cards: featuredCalculatorCardProps[];
  };
  dogLifes: {
    left: {
      eyebrow: string;
      title: string;
      description: string;
      cta: { label: string; href: string; ariaLabel?: string };
    };
    right: {
      dogLifeStages: typeof dogLifeStages;
    };
  };
  breedQuizCtas: {
    feature: {
      eyebrow: string;
      title: string;
      titleEmphasis: string;
      description: string;
      cta: { label: string; href: string; ariaLabel?: string };
      image: { src: string; alt: string };
    };
  };
  knowledgeBase: {
    eyebrow: string;
    title: string;
    description: string;
    viewAllHref: string;
    viewAllLabel: string;
  };
  blogPosts: typeof blogPosts;
};

export const homepageCms: HomepageCms = {
  seo: {
    title: "Pawteller | Premium Growth & Pet Health Insights",
    description:
      "Accurate dog growth calculators, vet-informed insights, and interactive health tracking features.",
    keywords: [
      "dog growth",
      "puppy weight",
      "dog age calculator",
      "breed quiz",
      "pet health",
    ],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Pawteller",
      url: "https://pawteller.com",
      description:
        "Premium modern pet-care platform and informational calculators.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://pawteller.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  },
  hero: {
    id: "section-hero-1",
    badgeText: "For dog parents who care deeply",
    h1: "Smart Calculators for your best friend",
    descriptionLines:
      "Predict your puppy's adult size. Decode dog years. Plan portions. Find the perfect breed. All in one beautifully simple place — backed by veterinary science.",
    primaryCta: {
      label: "Start with Puppy Weight",
      href: "/calculators/puppy-weight",
      ariaLabel: "Start using the puppy weight calculator",
    },
    secondaryCta: {
      label: "Dog Nutrition Quiz",
      href: "/quiz?quiz=breed-match",
      ariaLabel:
        "Start the quiz to find out about your Dogs' Health and Nutrition",
    },
    ratingLabelPrefix: "Loved by",
    ratingCountText: "12,000+",
    ratingLabelSuffix: " dog parents",
    image: {
      src: "https://images.unsplash.com/photo-1523480717984-24cba35ae1ef",
      alt: "Golden retriever sitting on a beach",
    },
    overlayLeft: {
      eyebrow: "Adult weight",
      value: "62 lbs",
      footer: "at 18 months",
    },
    overlayRight: {
      eyebrow: "Human age",
      value: "36 yrs",
      footer: "Buddy is a young adult",
    },
  },
  featuredCalculators: {
    calculators: calculators,
    cards: featuredCalculatorCards,
  },
  dogLifes: {
    left: {
      eyebrow: "The story of every dog",
      title: "From tiny paws to wise old soul — we'll be your guide.",
      description:
        "Dogs grow up fast. One month they fit in your palm, the next they're hogging the couch. Pawteller turns the science of dog development into beautiful, easy-to-understand answers— so you can spend less time worrying and more time playing fetch.",
      cta: {
        label: "Dog Age Quiz",
        href: "/quiz?quiz=breed-match",
        ariaLabel:
          "Explore dog life stages to get tailored insights and care tips for every chapter of your dog's journey",
      },
    },
    right: {
      dogLifeStages,
    },
  },
  breedQuizCtas: {
    feature: {
      eyebrow: "Free quiz - 2 minutes",
      title: "Which dog breed fits",
      titleEmphasis: "your life?",
      description:
        "Answer 6 quick questions about your lifestyle and we'll match you with your top 3 breeds, personalized to your home, energy and family.",
      cta: {
        label: "The Compatibility Check",
        href: "/quiz?quiz=breed-match",
        ariaLabel:
          "Find Out whether you and your dog actually personality matches?",
      },
      image: {
        src: "https://images.unsplash.com/photo-1560743641-3914f2c45636",
        alt: "Two happy dogs sitting together in tall grass",
      },
    },
  },
  knowledgeBase: {
    eyebrow: "Latest Updates",
    title: "Latest Dog Care Guides",
    description:
      "Practical, expert-backed reads built to be easy to search and easy to apply.",
    viewAllHref: "/blog",
    viewAllLabel: "View all articles",
  },
  blogPosts,
};
