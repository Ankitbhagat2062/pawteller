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
  GrowthInfo,
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


export const LIFE_STAGE_MULTIPLIERS: Record<string, number> = {
  'Puppy': 2.5,
  'Adult': 1.8,
  'Senior': 1.4,
  'Pregnant': 3.0,
}

export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  'Sedentary': 1.2,
  'Moderate walks': 1.5,
  'Very active': 1.8,
  'Extremely active': 2.0,
}

export interface BreedData {
  name: string
  typicalRange: [number, number]
  growthCurve: number[] // Weight at each month (0-18)
}

// Puppy weight growth data by breed (in lbs)
// Based on veterinary growth curves for typical breed development
export const BREED_DATA: Record<string, BreedData> = {
  'Labrador Retriever': {
    name: 'Labrador Retriever',
    typicalRange: [55, 80],
    growthCurve: [1.5, 5, 10, 16, 22, 28, 34, 39, 44, 48, 52, 55, 58, 60, 62, 65, 68, 72, 75],
  },
  'Golden Retriever': {
    name: 'Golden Retriever',
    typicalRange: [55, 75],
    growthCurve: [1.5, 5, 10, 16, 22, 28, 34, 39, 44, 48, 52, 55, 58, 60, 62, 65, 68, 72, 75],
  },
  'German Shepherd': {
    name: 'German Shepherd',
    typicalRange: [50, 90],
    growthCurve: [1.5, 5, 12, 20, 30, 40, 48, 55, 62, 68, 72, 75, 78, 80, 82, 85, 87, 89, 90],
  },
  'French Bulldog': {
    name: 'French Bulldog',
    typicalRange: [28, 30],
    growthCurve: [0.5, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27, 28, 29, 30],
  },
  'Beagle': {
    name: 'Beagle',
    typicalRange: [24, 30],
    growthCurve: [0.5, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 21, 23, 24, 25, 26, 27, 28, 30],
  },
  'Poodle (Standard)': {
    name: 'Poodle (Standard)',
    typicalRange: [45, 70],
    growthCurve: [1.5, 4, 8, 14, 20, 28, 35, 40, 45, 50, 55, 58, 61, 63, 65, 67, 68, 69, 70],
  },
  'Bulldog': {
    name: 'Bulldog',
    typicalRange: [40, 50],
    growthCurve: [1, 3, 6, 10, 14, 18, 22, 26, 30, 33, 36, 38, 40, 42, 44, 45, 46, 48, 50],
  },
  'Dachshund': {
    name: 'Dachshund',
    typicalRange: [16, 32],
    growthCurve: [0.3, 1, 2, 3.5, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 32],
  },
  'Siberian Husky': {
    name: 'Siberian Husky',
    typicalRange: [45, 60],
    growthCurve: [1.5, 5, 10, 16, 24, 32, 38, 43, 48, 51, 54, 56, 57, 58, 58.5, 59, 59.5, 60, 60],
  },
  'Chihuahua': {
    name: 'Chihuahua',
    typicalRange: [2, 6],
    growthCurve: [0.1, 0.3, 0.6, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.3, 5.5, 5.7, 5.8, 5.9, 6, 6],
  },
  'Shih Tzu': {
    name: 'Shih Tzu',
    typicalRange: [9, 16],
    growthCurve: [0.2, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15.5, 16],
  },
  'Cocker Spaniel': {
    name: 'Cocker Spaniel',
    typicalRange: [25, 30],
    growthCurve: [0.5, 2, 4, 7, 10, 13, 16, 19, 21, 23, 24, 25, 26, 27, 27.5, 28, 28.5, 29, 30],
  },
}

export const BREED_NAMES = Object.keys(BREED_DATA).sort()

export function calculatePuppyGrowth(
  breed: string,
  currentAgeMonths: number,
  currentWeightLbs: number
): GrowthInfo {
  const breedData = BREED_DATA[breed]
  if (!breedData) {
    throw new Error(`Breed ${breed} not found`)
  }

  if (currentAgeMonths < 1 || currentAgeMonths > 18) {
    throw new Error('Age must be between 1 and 18 months')
  }

  if (currentWeightLbs < 0.1) {
    throw new Error('Weight must be greater than 0')
  }

  const currentBreedWeight = breedData.growthCurve[Math.floor(currentAgeMonths)] || breedData.growthCurve[breedData.growthCurve.length - 1]
  
  // Calculate growth rate and predict adult weight
  const growthRate = currentWeightLbs / currentBreedWeight
  const predictedAdultWeight = Math.round(breedData.growthCurve[breedData.growthCurve.length - 1] * growthRate)
  
  const percentageGrown = Math.round((currentWeightLbs / (breedData.growthCurve[breedData.growthCurve.length - 1] * growthRate)) * 100)
  
  let warningMessage: string | undefined
  const [min, max] = breedData.typicalRange
  if (predictedAdultWeight > max * 1.15) {
    warningMessage = 'Slightly larger than typical — monitor with your vet.'
  } else if (predictedAdultWeight < min * 0.85) {
    warningMessage = 'Slightly smaller than typical — consult with your vet.'
  }

  // Find when puppy reaches 95% of adult weight (maturity)
  let monthsToMaturity = 18
  const targetWeight = predictedAdultWeight * 0.95
  const scaledCurve = breedData.growthCurve.map(w => w * growthRate)
  for (let i = 0; i < scaledCurve.length; i++) {
    if (scaledCurve[i] >= targetWeight) {
      monthsToMaturity = i
      break
    }
  }

  return {
    predictedWeight: predictedAdultWeight,
    typicalRange: breedData.typicalRange,
    percentageGrown,
    growthCurve: scaledCurve,
    monthsToMaturity,
    warningMessage,
  }
}

export const MATURITY_STAGES = [
  { category: 'Toy', range: '9 mo', description: 'Reaches adult size around 9 months' },
  { category: 'Small', range: '12 mo', description: 'Reaches adult size around 12 months' },
  { category: 'Medium', range: '15 mo', description: 'Reaches adult size around 15 months' },
  { category: 'Large/Giant', range: '18–24 mo', description: 'Reaches adult size around 18-24 months' },
]
