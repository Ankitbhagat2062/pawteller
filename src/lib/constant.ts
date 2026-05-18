import {
  Baby,
  Dumbbell,
  LineChart,
  PawPrint,
  Sparkles,
  Utensils,
} from "lucide-react";

export const calculators = [
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

export const articles = [
  {
    category: "Nutrition",
    title: "How to Calculate Daily Calories for Growing Dogs",
    excerpt:
      "A simple way to estimate calories by weight, activity, and growth stage—then adjust with your vet’s guidance.",
    minutes: 6,
    date: "Updated weekly",
    imageSrc: "/dog-1.png",
  },
  {
    category: "Health",
    title: "From Puppy to Senior: Growth Milestones That Matter",
    excerpt:
      "A practical timeline of what “normal” growth can look like—and signs to discuss with your veterinarian early.",
    minutes: 8,
    date: "Updated weekly",
    imageSrc: "/dog-2.png",
  },
  {
    category: "Breeds",
    title: "Understanding Breed Size: Small, Medium, and Large",
    excerpt:
      "Breed size affects growth pace and adult weight. Use these insights to set realistic expectations.",
    minutes: 5,
    date: "Updated weekly",
    imageSrc: "/dog-3.png",
  },
];

export const badges = [
  { icon: "🧠", label: "Vet-informed guidance" },
  { icon: "⚡", label: "Lightweight & fast" },
  { icon: "🔎", label: "SEO-friendly reads" },
];

export const homeImages = [
  { src: "/dog-1.png", alt: "Happy dog tracking visualization" },
  { src: "/dog-2.png", alt: "Puppy standard weight progress layout" },
  { src: "/dog-3.png", alt: "Active dog health checks outdoors" },
];

export const features = [
  { title: "Dog Age", href: "/calculators/dog-age" },
  { title: "Puppy Growth", href: "/calculators/dog-growth" },
  { title: "Feeding Guidelines", href: "/calculators/dog-food" },
];

export const trustPrinciples = [
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

export const toc = [
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

export const SECTIONS = [
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
