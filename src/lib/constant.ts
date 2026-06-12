
import type {
  FooterSection,
  SectionProps,
} from "@/lib/types";

export const navItems =
  [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/calculators" },
    { label: "Blog", href: "/blog" },
    { label: "Quiz", href: "/quiz?quiz=breed-match" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as const;

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
      { label: "Breed Quiz", href: "/quiz?quiz=breed-match" },
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
// terms
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
// privacy
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

