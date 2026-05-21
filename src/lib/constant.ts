import {
  Baby,
  Dumbbell,
  LineChart,
  PawPrint,
  Sparkles,
  Utensils,
} from "lucide-react";
import type {
  BlogPost,
  CalculatorProps,
  dogLifeStageProps,
  featuredCalculatorCardProps,
  featureProps,
  homeImageProps,
  SectionProps,
} from "./types";
import type { quizDataProps } from "@/lib/types";

export const calculators: CalculatorProps[] = [
  {
    title: "Dog Age Calculator",
    description: "Convert your pup’s age to life stages and milestones.",
    link: "/calculators/dog-age",
    badge: { bg: "#d1fae5", fg: "#065f46", icon: PawPrint },
  },
  {
    title: "Puppy Weight Calculator",
    description: "Estimate future weight using growth patterns.",
    link: "/calculators/puppy-weight",
    badge: { bg: "#bfdbfe", fg: "#1d4ed8", icon: Dumbbell },
  },
  {
    title: "Dog Food Calculator",
    description: "Get feeding guidance based on size and goals.",
    link: "/calculators/dog-food",
    badge: { bg: "#fde68a", fg: "#92400e", icon: Utensils },
  },
  {
    title: "Dog Pregnancy Calculator",
    description: "Track weeks and key stages from conception.",
    link: "/calculators/dog-pregnancy",
    badge: { bg: "#fbcfe8", fg: "#9d174d", icon: Baby },
  },
  {
    title: "Dog Name Generator",
    description: "Find a name that fits your dog’s personality.",
    link: "/calculators/dog-name",
    badge: { bg: "#dcfce7", fg: "#166534", icon: Sparkles },
  },
  {
    title: "Dog Growth Calculator",
    description: "Visualize growth pace and next milestones.",
    link: "/calculators/dog-growth",
    badge: { bg: "#c7d2fe", fg: "#3730a3", icon: LineChart },
  },
];

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
    category: "Health",
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

export const badges = [
  { icon: "🧠", label: "Vet-informed guidance" },
  { icon: "⚡", label: "Lightweight & fast" },
  { icon: "🔎", label: "SEO-friendly reads" },
];

export const homeImages: homeImageProps[] = [
  { src: "/dog-1.png", alt: "Happy dog tracking visualization" },
  { src: "/dog-2.png", alt: "Puppy standard weight progress layout" },
  { src: "/dog-3.png", alt: "Active dog health checks outdoors" },
];

export const features: featureProps[] = [
  { title: "Dog Age", href: "/calculators/dog-age" },
  { title: "Puppy Growth", href: "/calculators/dog-growth" },
  { title: "Feeding Guidelines", href: "/calculators/dog-food" },
];

export const trustPrinciples: {
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    title: "Simple Tools",
    description:
      "Fast calculators that answer the question you came for—no clutter.",
    icon: "⚡",
  },
  {
    title: "Clear Guidance",
    description:
      "Plain-language steps so you know what to do next (and when to ask your vet).",
    icon: "🧭",
  },
  {
    title: "Built For Dog Owners",
    description:
      "Every guide is written with daily routines in mind: food, growth, and care decisions.",
    icon: "🐶",
  },
  {
    title: "Always Improving",
    description:
      "We keep refining content for clarity and search—so you can find what you need quickly.",
    icon: "🔎",
  },
] as const;

export const toc: { id: string; label: string }[] = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "calculators", label: "Use of Calculators" },
  {
    id: "educational-disclaimer",
    label: "Educational Information Disclaimer",
  },
  { id: "no-vet-advice", label: "No Veterinary Advice" },
  { id: "availability", label: "Website Availability" },
  { id: "ip", label: "Intellectual Property" },
  { id: "submissions", label: "User Submissions" },
  { id: "third-party", label: "Third-Party Links" },
  { id: "limitation", label: "Limitation of Liability" },
  { id: "changes", label: "Changes to Terms" },
  { id: "contact", label: "Contact" },
];

export const SECTIONS: SectionProps[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, such as when you create an account (if applicable), submit a form, contact us, or subscribe to emails. We may also collect information automatically, such as device and usage data (for example, pages viewed, approximate location, and browser type).",
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    content:
      "We use the information we collect to operate and improve Pawteller, provide calculators and content, personalize user experience, respond to questions and requests, and send transactional or requested communications. We also use information to monitor performance and security and to prevent fraudulent or harmful activity.",
  },
  {
    id: "email-subscriptions",
    title: "Email Subscriptions",
    content:
      "If you subscribe to emails, we may send you newsletters, updates, and relevant content. You can unsubscribe at any time by using the unsubscribe link in the email or by contacting us. We only use your email for the purposes described at the time of subscription.",
  },
  {
    id: "analytics",
    title: "Analytics",
    content:
      "We use analytics tools to understand how visitors interact with our site. These tools help us measure usage, improve content, and identify issues. Analytics data is typically aggregated or de-identified, though it may still be linked to device identifiers depending on the provider.",
  },
  {
    id: "advertising",
    title: "Advertising",
    content:
      "We may display advertisements or work with advertising partners. These partners may use cookies or similar technologies to deliver ads based on your interests and to measure ad performance. You can usually manage ad targeting through your browser settings or the opt-out options provided by the advertising partners.",
  },
  {
    id: "cookies",
    title: "Cookies",
    content:
      "We use cookies and similar technologies to make the site work properly, remember preferences, and analyze traffic. You can control cookies through your browser settings. Disabling cookies may affect certain features and parts of the site.",
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content:
      "We may use third-party vendors and service providers (such as hosting, analytics, and communication services). These third parties may process data on our behalf according to their terms and privacy practices. We aim to select providers that help protect data and use it only for the services they provide.",
  },
  {
    id: "data-rights",
    title: "Data Rights",
    content:
      "Depending on your location, you may have rights regarding your personal information, such as access, correction, deletion, portability, or objection to certain processing. To make a request, contact us using the information in the Contact section. We may need to verify your identity before fulfilling certain requests.",
  },
  {
    id: "contact",
    title: "Contact",
    content:
      "Questions about this Privacy Policy, privacy requests, or data concerns can be sent to: support@pawteller.com. We will respond as soon as reasonably possible.",
  },
] as const;

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

export const quizData: quizDataProps = {
  banner: "The Breed Match Quiz",
  title: "Which dog breed fits your life?",
  totalQuestions: 6,
  estimatedTime: "2 minutes",
  steps: [
    {
      question: "What's your home like?",
      options: ["Apartment", "House with yard"],
    },
    {
      question: "How active is your lifestyle?",
      options: ["Mostly chill", "Daily walks", "Always on the move"],
    },
    {
      question: "Kids at home?",
      options: ["Yes, little ones", "No kids"],
    },
    {
      question: "First-time dog owner?",
      options: ["First-timer", "Experienced"],
    },
    {
      question: "Shedding tolerance?",
      options: ["Low shed please", "Shedding is fine"],
    },
    {
      question: "Preferred size?",
      options: ["Small", "Medium", "Large", "Any size"],
    },
  ],
};
