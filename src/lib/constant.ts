import {
  Baby,
  Dumbbell,
  LineChart,
  PawPrint,
  Sparkles,
  Utensils,
} from "lucide-react";
import type {
  BreedData,
  BreedSize,
  Category,
  DogGender,
  DogName,
  DogSize,
  FooterSection,
  PersonalityGroup,
  quizDataProps,
  StartingLetter,
} from "@/lib/types";
import type {
  BlogPost,
  CalculatorProps,
  dogLifeStageProps,
  featuredCalculatorCardProps,
  featureProps,
  GrowthInfo,
  homeImageProps,
  SectionProps,
} from "./types";

export const navItems =
  [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/calculators" },
    { label: "Blog", href: "/blog" },
    { label: "Quiz", href: "/quiz" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const;

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

export const LIFE_STAGE_MULTIPLIERS: Record<string, number> = {
  Puppy: 2.5,
  Adult: 1.8,
  Senior: 1.4,
  Pregnant: 3.0,
};

export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  Sedentary: 1.2,
  "Moderate walks": 1.5,
  "Very active": 1.8,
  "Extremely active": 2.0,
};

// Puppy weight growth data by breed (in lbs)
// Based on veterinary growth curves for typical breed development
export const BREED_DATA: Record<string, BreedData> = {
  "Labrador Retriever": {
    name: "Labrador Retriever",
    typicalRange: [55, 80],
    growthCurve: [
      1.5, 5, 10, 16, 22, 28, 34, 39, 44, 48, 52, 55, 58, 60, 62, 65, 68, 72,
      75,
    ],
  },
  "Golden Retriever": {
    name: "Golden Retriever",
    typicalRange: [55, 75],
    growthCurve: [
      1.5, 5, 10, 16, 22, 28, 34, 39, 44, 48, 52, 55, 58, 60, 62, 65, 68, 72,
      75,
    ],
  },
  "German Shepherd": {
    name: "German Shepherd",
    typicalRange: [50, 90],
    growthCurve: [
      1.5, 5, 12, 20, 30, 40, 48, 55, 62, 68, 72, 75, 78, 80, 82, 85, 87, 89,
      90,
    ],
  },
  "French Bulldog": {
    name: "French Bulldog",
    typicalRange: [28, 30],
    growthCurve: [
      0.5, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
  Beagle: {
    name: "Beagle",
    typicalRange: [24, 30],
    growthCurve: [
      0.5, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 21, 23, 24, 25, 26, 27, 28, 30,
    ],
  },
  "Poodle (Standard)": {
    name: "Poodle (Standard)",
    typicalRange: [45, 70],
    growthCurve: [
      1.5, 4, 8, 14, 20, 28, 35, 40, 45, 50, 55, 58, 61, 63, 65, 67, 68, 69, 70,
    ],
  },
  Bulldog: {
    name: "Bulldog",
    typicalRange: [40, 50],
    growthCurve: [
      1, 3, 6, 10, 14, 18, 22, 26, 30, 33, 36, 38, 40, 42, 44, 45, 46, 48, 50,
    ],
  },
  Dachshund: {
    name: "Dachshund",
    typicalRange: [16, 32],
    growthCurve: [
      0.3, 1, 2, 3.5, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 32,
    ],
  },
  "Siberian Husky": {
    name: "Siberian Husky",
    typicalRange: [45, 60],
    growthCurve: [
      1.5, 5, 10, 16, 24, 32, 38, 43, 48, 51, 54, 56, 57, 58, 58.5, 59, 59.5,
      60, 60,
    ],
  },
  Chihuahua: {
    name: "Chihuahua",
    typicalRange: [2, 6],
    growthCurve: [
      0.1, 0.3, 0.6, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.3, 5.5, 5.7, 5.8, 5.9,
      6, 6,
    ],
  },
  "Shih Tzu": {
    name: "Shih Tzu",
    typicalRange: [9, 16],
    growthCurve: [
      0.2, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15.5, 16,
    ],
  },
  "Cocker Spaniel": {
    name: "Cocker Spaniel",
    typicalRange: [25, 30],
    growthCurve: [
      0.5, 2, 4, 7, 10, 13, 16, 19, 21, 23, 24, 25, 26, 27, 27.5, 28, 28.5, 29,
      30,
    ],
  },
};

export const BREED_NAMES = Object.keys(BREED_DATA).sort();

export function calculatePuppyGrowth(
  breed: string,
  currentAgeMonths: number,
  currentWeightLbs: number,
): GrowthInfo {
  const breedData = BREED_DATA[breed];
  if (!breedData) {
    throw new Error(`Breed ${breed} not found`);
  }

  if (currentAgeMonths < 1 || currentAgeMonths > 18) {
    throw new Error("Age must be between 1 and 18 months");
  }

  if (currentWeightLbs < 0.1) {
    throw new Error("Weight must be greater than 0");
  }

  const currentBreedWeight =
    breedData.growthCurve[Math.floor(currentAgeMonths)] ||
    breedData.growthCurve[breedData.growthCurve.length - 1];

  // Calculate growth rate and predict adult weight
  const growthRate = currentWeightLbs / currentBreedWeight;
  const predictedAdultWeight = Math.round(
    breedData.growthCurve[breedData.growthCurve.length - 1] * growthRate,
  );

  const percentageGrown = Math.round(
    (currentWeightLbs /
      (breedData.growthCurve[breedData.growthCurve.length - 1] * growthRate)) *
    100,
  );

  let warningMessage: string | undefined;
  const [min, max] = breedData.typicalRange;
  if (predictedAdultWeight > max * 1.15) {
    warningMessage = "Slightly larger than typical — monitor with your vet.";
  } else if (predictedAdultWeight < min * 0.85) {
    warningMessage = "Slightly smaller than typical — consult with your vet.";
  }

  // Find when puppy reaches 95% of adult weight (maturity)
  let monthsToMaturity = 18;
  const targetWeight = predictedAdultWeight * 0.95;
  const scaledCurve = breedData.growthCurve.map((w) => w * growthRate);
  for (let i = 0; i < scaledCurve.length; i++) {
    if (scaledCurve[i] >= targetWeight) {
      monthsToMaturity = i;
      break;
    }
  }

  return {
    predictedWeight: predictedAdultWeight,
    typicalRange: breedData.typicalRange,
    percentageGrown,
    growthCurve: scaledCurve,
    monthsToMaturity,
    warningMessage,
  };
}

export const MATURITY_STAGES = [
  {
    category: "Toy",
    range: "9 mo",
    description: "Reaches adult size around 9 months",
  },
  {
    category: "Small",
    range: "12 mo",
    description: "Reaches adult size around 12 months",
  },
  {
    category: "Medium",
    range: "15 mo",
    description: "Reaches adult size around 15 months",
  },
  {
    category: "Large/Giant",
    range: "18–24 mo",
    description: "Reaches adult size around 18-24 months",
  },
];

export const dogNames: DogName[] = [
  // Male - Small
  {
    name: "Max",
    gender: "Male",
    size: "Small",
    personalities: ["Playful", "Classic"],
  },
  {
    name: "Charlie",
    gender: "Male",
    size: "Small",
    personalities: ["Friendly", "Classic"],
  },
  {
    name: "Cooper",
    gender: "Male",
    size: "Small",
    personalities: ["Smart", "Modern"],
  },
  {
    name: "Buddy",
    gender: "Male",
    size: "Small",
    personalities: ["Playful", "Friendly"],
  },
  {
    name: "Rocky",
    gender: "Male",
    size: "Small",
    personalities: ["Strong", "Classic"],
  },
  {
    name: "Leo",
    gender: "Male",
    size: "Small",
    personalities: ["Smart", "Unique"],
  },
  {
    name: "Milo",
    gender: "Male",
    size: "Small",
    personalities: ["Playful", "Modern"],
  },
  {
    name: "Theo",
    gender: "Male",
    size: "Small",
    personalities: ["Gentle", "Smart"],
  },
  {
    name: "Loki",
    gender: "Male",
    size: "Small",
    personalities: ["Playful", "Unique"],
  },
  {
    name: "Cody",
    gender: "Male",
    size: "Small",
    personalities: ["Friendly", "Modern"],
  },
  {
    name: "Zeus",
    gender: "Male",
    size: "Small",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Jasper",
    gender: "Male",
    size: "Small",
    personalities: ["Gentle", "Classic"],
  },
  {
    name: "Toby",
    gender: "Male",
    size: "Small",
    personalities: ["Playful", "Classic"],
  },
  {
    name: "Scout",
    gender: "Male",
    size: "Small",
    personalities: ["Smart", "Friendly"],
  },
  {
    name: "Bentley",
    gender: "Male",
    size: "Small",
    personalities: ["Smart", "Unique"],
  },

  // Male - Medium
  {
    name: "Tucker",
    gender: "Male",
    size: "Medium",
    personalities: ["Friendly", "Modern"],
  },
  {
    name: "Bailey",
    gender: "Male",
    size: "Medium",
    personalities: ["Playful", "Friendly"],
  },
  {
    name: "Duke",
    gender: "Male",
    size: "Medium",
    personalities: ["Strong", "Classic"],
  },
  {
    name: "Shadow",
    gender: "Male",
    size: "Medium",
    personalities: ["Gentle", "Unique"],
  },
  {
    name: "Murphy",
    gender: "Male",
    size: "Medium",
    personalities: ["Playful", "Friendly"],
  },
  {
    name: "Apollo",
    gender: "Male",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Ranger",
    gender: "Male",
    size: "Medium",
    personalities: ["Smart", "Strong"],
  },
  {
    name: "Hunter",
    gender: "Male",
    size: "Medium",
    personalities: ["Smart", "Strong"],
  },
  {
    name: "Phoenix",
    gender: "Male",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Diesel",
    gender: "Male",
    size: "Medium",
    personalities: ["Strong", "Modern"],
  },
  {
    name: "Titan",
    gender: "Male",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Storm",
    gender: "Male",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Lincoln",
    gender: "Male",
    size: "Medium",
    personalities: ["Smart", "Classic"],
  },
  {
    name: "Maverick",
    gender: "Male",
    size: "Medium",
    personalities: ["Playful", "Unique"],
  },
  {
    name: "Brady",
    gender: "Male",
    size: "Medium",
    personalities: ["Friendly", "Modern"],
  },

  // Male - Large
  {
    name: "Bear",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Gentle"],
  },
  {
    name: "Bruno",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Friendly"],
  },
  {
    name: "Thor",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Samson",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Classic"],
  },
  {
    name: "Goliath",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Hercules",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Tank",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Modern"],
  },
  {
    name: "Fortress",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Axel",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Modern"],
  },
  {
    name: "Gunner",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Modern"],
  },
  {
    name: "Kodiak",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Grizzly",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Bandit",
    gender: "Male",
    size: "Large",
    personalities: ["Playful", "Strong"],
  },
  {
    name: "Diesel",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Modern"],
  },
  {
    name: "Maverick",
    gender: "Male",
    size: "Large",
    personalities: ["Strong", "Playful"],
  },

  // Female - Small
  {
    name: "Bella",
    gender: "Female",
    size: "Small",
    personalities: ["Gentle", "Classic"],
  },
  {
    name: "Lucy",
    gender: "Female",
    size: "Small",
    personalities: ["Playful", "Classic"],
  },
  {
    name: "Daisy",
    gender: "Female",
    size: "Small",
    personalities: ["Gentle", "Classic"],
  },
  {
    name: "Molly",
    gender: "Female",
    size: "Small",
    personalities: ["Friendly", "Classic"],
  },
  {
    name: "Penny",
    gender: "Female",
    size: "Small",
    personalities: ["Playful", "Modern"],
  },
  {
    name: "Chloe",
    gender: "Female",
    size: "Small",
    personalities: ["Gentle", "Modern"],
  },
  {
    name: "Riley",
    gender: "Female",
    size: "Small",
    personalities: ["Playful", "Modern"],
  },
  {
    name: "Sophie",
    gender: "Female",
    size: "Small",
    personalities: ["Gentle", "Classic"],
  },
  {
    name: "Maggie",
    gender: "Female",
    size: "Small",
    personalities: ["Friendly", "Classic"],
  },
  {
    name: "Zoey",
    gender: "Female",
    size: "Small",
    personalities: ["Playful", "Modern"],
  },
  {
    name: "Luna",
    gender: "Female",
    size: "Small",
    personalities: ["Gentle", "Unique"],
  },
  {
    name: "Nala",
    gender: "Female",
    size: "Small",
    personalities: ["Playful", "Unique"],
  },
  {
    name: "Sadie",
    gender: "Female",
    size: "Small",
    personalities: ["Friendly", "Classic"],
  },
  {
    name: "Ivy",
    gender: "Female",
    size: "Small",
    personalities: ["Gentle", "Unique"],
  },
  {
    name: "Aurora",
    gender: "Female",
    size: "Small",
    personalities: ["Gentle", "Unique"],
  },

  // Female - Medium
  {
    name: "Abby",
    gender: "Female",
    size: "Medium",
    personalities: ["Friendly", "Classic"],
  },
  {
    name: "Mara",
    gender: "Female",
    size: "Medium",
    personalities: ["Smart", "Modern"],
  },
  {
    name: "Emma",
    gender: "Female",
    size: "Medium",
    personalities: ["Gentle", "Classic"],
  },
  {
    name: "Athena",
    gender: "Female",
    size: "Medium",
    personalities: ["Smart", "Unique"],
  },
  {
    name: "Justice",
    gender: "Female",
    size: "Medium",
    personalities: ["Smart", "Strong"],
  },
  {
    name: "Sage",
    gender: "Female",
    size: "Medium",
    personalities: ["Smart", "Unique"],
  },
  {
    name: "Nova",
    gender: "Female",
    size: "Medium",
    personalities: ["Unique", "Modern"],
  },
  {
    name: "Phoenix",
    gender: "Female",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Willow",
    gender: "Female",
    size: "Medium",
    personalities: ["Gentle", "Unique"],
  },
  {
    name: "Stella",
    gender: "Female",
    size: "Medium",
    personalities: ["Gentle", "Classic"],
  },
  {
    name: "Hazel",
    gender: "Female",
    size: "Medium",
    personalities: ["Playful", "Modern"],
  },
  {
    name: "Raven",
    gender: "Female",
    size: "Medium",
    personalities: ["Smart", "Unique"],
  },
  {
    name: "Freya",
    gender: "Female",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Zara",
    gender: "Female",
    size: "Medium",
    personalities: ["Unique", "Modern"],
  },
  {
    name: "Skylar",
    gender: "Female",
    size: "Medium",
    personalities: ["Playful", "Modern"],
  },

  // Female - Large
  {
    name: "Duchess",
    gender: "Female",
    size: "Large",
    personalities: ["Gentle", "Classic"],
  },
  {
    name: "Valkyrie",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Athena",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Smart"],
  },
  {
    name: "Diana",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Artemis",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Xena",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Hera",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Queen",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Trinity",
    gender: "Female",
    size: "Large",
    personalities: ["Smart", "Unique"],
  },
  {
    name: "Gypsy",
    gender: "Female",
    size: "Large",
    personalities: ["Playful", "Unique"],
  },
  {
    name: "Sierra",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Smart"],
  },
  {
    name: "Storm",
    gender: "Female",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Venus",
    gender: "Female",
    size: "Large",
    personalities: ["Gentle", "Unique"],
  },
  {
    name: "Juniper",
    gender: "Female",
    size: "Large",
    personalities: ["Playful", "Unique"],
  },
  {
    name: "Indigo",
    gender: "Female",
    size: "Large",
    personalities: ["Calm", "Unique"],
  },

  // Unisex - Small
  {
    name: "Bailey",
    gender: "Unisex",
    size: "Small",
    personalities: ["Friendly", "Classic"],
  },
  {
    name: "Casey",
    gender: "Unisex",
    size: "Small",
    personalities: ["Playful", "Modern"],
  },
  {
    name: "Morgan",
    gender: "Unisex",
    size: "Small",
    personalities: ["Smart", "Modern"],
  },
  {
    name: "Riley",
    gender: "Unisex",
    size: "Small",
    personalities: ["Playful", "Modern"],
  },
  {
    name: "Alex",
    gender: "Unisex",
    size: "Small",
    personalities: ["Smart", "Modern"],
  },
  {
    name: "Jordan",
    gender: "Unisex",
    size: "Small",
    personalities: ["Smart", "Modern"],
  },
  {
    name: "Quinn",
    gender: "Unisex",
    size: "Small",
    personalities: ["Unique", "Modern"],
  },
  {
    name: "River",
    gender: "Unisex",
    size: "Small",
    personalities: ["Calm", "Unique"],
  },
  {
    name: "Sky",
    gender: "Unisex",
    size: "Small",
    personalities: ["Calm", "Unique"],
  },
  {
    name: "Drew",
    gender: "Unisex",
    size: "Small",
    personalities: ["Friendly", "Modern"],
  },

  // Unisex - Medium
  {
    name: "Dakota",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Blake",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Smart", "Modern"],
  },
  {
    name: "Sage",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Smart", "Unique"],
  },
  {
    name: "Phoenix",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Storm",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Shadow",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Mysterious", "Unique"],
  },
  {
    name: "Ash",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Calm", "Unique"],
  },
  {
    name: "Winter",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Calm", "Unique"],
  },
  {
    name: "Sage",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Smart", "Unique"],
  },
  {
    name: "Justice",
    gender: "Unisex",
    size: "Medium",
    personalities: ["Smart", "Strong"],
  },

  // Unisex - Large
  {
    name: "Storm",
    gender: "Unisex",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Ranger",
    gender: "Unisex",
    size: "Large",
    personalities: ["Strong", "Smart"],
  },
  {
    name: "Scout",
    gender: "Unisex",
    size: "Large",
    personalities: ["Smart", "Playful"],
  },
  {
    name: "Hunter",
    gender: "Unisex",
    size: "Large",
    personalities: ["Strong", "Smart"],
  },
  {
    name: "Blazer",
    gender: "Unisex",
    size: "Large",
    personalities: ["Playful", "Modern"],
  },
  {
    name: "Comet",
    gender: "Unisex",
    size: "Large",
    personalities: ["Fast", "Unique"],
  },
  {
    name: "Vortex",
    gender: "Unisex",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Echo",
    gender: "Unisex",
    size: "Large",
    personalities: ["Calm", "Unique"],
  },
  {
    name: "Atlas",
    gender: "Unisex",
    size: "Large",
    personalities: ["Strong", "Unique"],
  },
  {
    name: "Zephyr",
    gender: "Unisex",
    size: "Large",
    personalities: ["Fast", "Unique"],
  },
];

export const categories: Category[] = [
  {
    id: "playful",
    title: "Playful Names",
    icon: "🎾",
    description: "Fun and energetic names perfect for active, spirited pups",
    personalities: ["Playful", "Energetic", "Fun"],
  },
  {
    id: "smart",
    title: "Smart Names",
    icon: "🧠",
    description: "Clever names for intelligent and quick-witted dogs",
    personalities: ["Smart", "Clever", "Intelligent"],
  },
  {
    id: "gentle",
    title: "Gentle Names",
    icon: "💚",
    description: "Soft and kind names for calm and peaceful companions",
    personalities: ["Gentle", "Calm", "Kind"],
  },
  {
    id: "strong",
    title: "Strong Names",
    icon: "💪",
    description: "Powerful names for bold and confident dogs",
    personalities: ["Strong", "Bold", "Confident"],
  },
  {
    id: "unique",
    title: "Unique Names",
    icon: "✨",
    description: "One-of-a-kind names that make your dog stand out",
    personalities: ["Unique", "Rare", "Special"],
  },
];
export function generateDogNames(
  gender: DogGender | "All" = "All",
  size: DogSize | "All" = "All",
  startingLetter: StartingLetter = "All",
  count: number = 8,
): DogName[] {
  let filtered = [...dogNames];

  if (gender !== "All") {
    filtered = filtered.filter((dog) => dog.gender === gender);
  }

  if (size !== "All") {
    filtered = filtered.filter((dog) => dog.size === size);
  }

  if (startingLetter !== "All") {
    filtered = filtered.filter(
      (dog) =>
        dog.name.charAt(0).toUpperCase() === startingLetter.toUpperCase(),
    );
  }

  // Shuffle and return top count
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getNamesByPersonality(
  personality: string,
  count: number = 5,
): DogName[] {
  const filtered = dogNames.filter((dog) =>
    dog.personalities.includes(personality),
  );
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const GESTATION_DAYS: Record<BreedSize, number> = {
  small: 63,
  medium: 63,
  large: 63,
  giant: 65,
};

export const BREED_SIZE_LABELS: Record<BreedSize, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
  giant: "Giant",
};

export const TIMELINE_WEEKS = [
  {
    week: "W1",
    title: "Conception & Early Growth",
    description:
      "Fertilization occurs in the oviducts. You may notice mild morning sickness. Maintain normal exercise but avoid intense training.",
    tips: ["Normal feeding", "Monitor for behavior changes"],
  },
  {
    week: "W4",
    title: "Embryos Implanted",
    description:
      "The most critical stage. Puppies can be felt by a vet via palpation. Nipple development becomes visible.",
    tips: ["Vet confirmation", "Clear discharge is normal"],
  },
  {
    week: "W9",
    title: "Whelping Is Near",
    description:
      'Puppies are fully formed. Mother becomes restless and starts "nesting". Monitor rectal temperature for drop.',
    tips: ["Prepare whelping box", "Contact vet if over 65 days"],
  },
];

export const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Can I feed my dog puppy food during pregnancy?",
    answer:
      "Yes, from week 6 onwards, it's often recommended to switch to high-quality puppy food as it contains more calories and calcium needed for the developing puppies and milk production.",
  },
  {
    id: "faq-2",
    question: "How many puppies will my dog have?",
    answer:
      "Litter size depends heavily on breed and individual health. Small breeds typically have 1–4 puppies, while large breeds can have 6–12 or more. An ultrasound around day 25 or X-ray after day 55 can give an accurate count.",
  },
  {
    id: "faq-3",
    question: "Should I exercise my pregnant dog?",
    answer:
      "Light to moderate exercise is beneficial in early pregnancy. Avoid strenuous activity and rough play, especially in the final three weeks. Gentle walks are ideal throughout pregnancy.",
  },
  {
    id: "faq-4",
    question: "How do I know if labor has started?",
    answer:
      "Signs include restlessness, nesting behavior, loss of appetite, and a drop in rectal temperature below 100°F (37.8°C). Active labor begins with visible contractions and straining.",
  },
];

export const personalityGroups: PersonalityGroup[] = [
  { title: "Playful Names", personality: "Playful", icon: "🎾" },
  { title: "Smart Names", personality: "Smart", icon: "🧠" },
  { title: "Gentle Names", personality: "Gentle", icon: "💚" },
  { title: "Strong Names", personality: "Strong", icon: "💪" },
  { title: "Unique Names", personality: "Unique", icon: "✨" },
];

import type { FAQItem } from "@/lib/types";

export const faqItems: FAQItem[] = [
  {
    question: "How many dog names should I consider?",
    answer:
      "We recommend generating at least 10-15 name options to choose from. This gives you plenty of variety to test and see what feels right for your new puppy or dog.",
  },
  {
    question: "Can I change my dog's name if I've been using another one?",
    answer:
      "Yes! Dogs can learn new names at any age with consistent training and positive reinforcement. It may take a few weeks for them to adjust, but it's definitely possible.",
  },
  {
    question: "What makes a good dog name?",
    answer:
      "Good dog names are short (1-2 syllables), easy to pronounce, don't sound like commands, and reflect your dog's personality. They should feel natural when you say them out loud.",
  },
  {
    question: "Should I match the name to my dog's size?",
    answer:
      "While not necessary, many people prefer matching name style to dog size. Shorter, punchier names work great for small dogs, while longer, stronger names suit larger breeds. Ultimately, choose what feels right!",
  },
  {
    question: "Are unique names better than popular ones?",
    answer:
      "It depends on your preference! Popular names are recognizable and classic, while unique names help your dog stand out. Both can work equally well as long as you love the name and your dog responds to it.",
  },
  {
    question: "How do I test if a name works for my dog?",
    answer:
      "Try calling the name out loud in different situations. See if you feel comfortable saying it at the dog park, at the vet, and at home. Your dog will also give you feedback on whether they respond to the sound of the name.",
  },
];

export const footerSections: FooterSection[] = [
  {
    title: "Tools",
    links: [
      { label: "Breed Calculator", href: "/calculators/dog-name" },
      { label: "Food Calculator", href: "/calculators/dog-food" },
      { label: "Age Calculator", href: "/calculators/dog-age" },
      { label: "Weight Tracker", href: "/calculators/puppy-weight" },
    ],
  },
  {
    title: "Content",
    links: [
      { label: "Breed Quiz", href: "/quiz" },
      { label: "Blog", href: "/blog" },
      { label: "Care Guides", href: "/guides" },
      { label: "Pet Health", href: "/health" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];
