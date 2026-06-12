import { Baby, BadgeCheck, CalendarDays, DollarSign, Dumbbell, LineChart, PawPrint, Scale, Sparkles, Utensils } from "lucide-react";
import type { FAQItem, seoProps } from "@/lib/types";
import type { LucideIcon } from 'lucide-react'
import { ctaProps } from "@/lib/cms/aboutpage";

export interface BacklinkItem {
    title: string;
    description: string;
    cta: ctaProps
    className: string;
}

export const backlinks: BacklinkItem[] = [
    {
        title: "Dog Age Calculator",
        description: "Convert dog years to human years accurately using modern veterinary aging frameworks.",
        cta: {
            label: "Calculate Dog Age",
            href: "/calculators/dog-age",
            ariaLabel: "Calculate your dog's age in human years"
        },
        className: "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-200/50 dark:border-amber-800/40 text-amber-900 dark:text-amber-100",
    },
    {
        title: "Puppy Weight Calculator",
        description: "Predict your puppy's full adult size and weight based on their current growth rate.",
        cta: {
            label: "Predict Adult Weight",
            href: "/calculators/puppy-weight",
            ariaLabel: "Predict your puppy's final adult weight"
        },
        className: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-200/50 dark:border-emerald-800/40 text-emerald-900 dark:text-emerald-100",
    },
    {
        title: "Dog Food Calculator",
        description: "Estimate daily calories and cups based on weight, life stage, and activity level.",
        cta: {
            label: "Calculate Dog Food",
            href: "/calculators/dog-food",
            ariaLabel: "Calculate how much food your dog needs"
        },
        className: "bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-200/50 dark:border-blue-800/40 text-blue-900 dark:text-blue-100",
    },
    {
        title: "Dog Pregnancy Calculator",
        description: "Track your dog's gestation timeline, key developmental milestones, and estimated due date.",
        cta: {
            label: "Track Pregnancy",
            href: "/calculators/dog-pregnancy",
            ariaLabel: "Calculate dog pregnancy due date and timeline"
        },
        className: "bg-gradient-to-br from-rose-500/10 to-pink-500/10 border-rose-200/50 dark:border-rose-800/40 text-rose-900 dark:text-rose-100",
    },
    {
        title: "Dog Name Generator",
        description: "Find the perfect name for your furry friend in seconds based on personality and appearance.",
        cta: {
            label: "Generate Names",
            href: "/calculators/name-generator",
            ariaLabel: "Generate the perfect dog name"
        },
        className: "bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 border-purple-200/50 dark:border-purple-800/40 text-purple-900 dark:text-purple-100",
    },
    {
        title: "Dog Growth Curve Tracker",
        description: "Monitor and log your puppy's week-by-week weight curve to ensure they are on a healthy path.",
        cta: {
            label: "Track Growth Curve",
            href: "/calculators/growth-curve",
            ariaLabel: "Track your puppy's growth curve week by week"
        },
        className: "bg-gradient-to-br from-cyan-500/10 to-sky-500/10 border-cyan-200/50 dark:border-cyan-800/40 text-cyan-900 dark:text-cyan-100",
    },
];

export const faqItems: FAQItem[] = [
    {
<<<<<<< HEAD
        question: "How accurate are Pawteller’s dog calculator results?",
        answer:
            "Our calculators provide educational, estimate-based guidance—not a diagnosis. Results can vary based on breed variation, the accuracy of your inputs, and your dog’s health history. For best outcomes, use the results as a starting point and confirm details with your veterinarian.",
    },
    {
        question: "What information do I need to get the best results?",
        answer:
            "Use the most accurate data you have: your dog’s current age (or gestation week), weight (including the units), and life stage where relevant. If you’re unsure, choose the closest option and review the calculator’s explanation so you understand how the estimate is generated.",
    },
    {
        question: "Why do some calculators show a range instead of one number?",
        answer:
            "Dogs don’t grow or develop at exactly the same pace, and real-world outcomes depend on genetics, nutrition, activity, and health. A range helps reflect normal variation and gives you a more realistic planning window.",
    },
    {
        question: "Can I use these calculators for mixed breeds or non-standard sizes?",
        answer:
            "Yes—most tools work for mixed breeds, especially when you base results on your dog’s current weight and realistic growth expectations. If the calculator uses breed size groups, select the closest size category and treat the outcome as an estimate until a vet can confirm.",
    },
    {
        question: "Are the feeding and calorie suggestions meant to replace my vet’s plan?",
        answer:
            "No. Feeding guidance is educational and meant to help you plan and ask better questions. If your dog is underweight, overweight, has medical conditions, or is on a prescription diet, follow your veterinarian’s recommendations.",
    },
    {
        question: "When should I contact a veterinarian instead of relying on a calculator?",
        answer:
            "Contact a veterinarian if you notice concerning symptoms (vomiting, lethargy, abnormal discharge, breathing trouble), if pregnancy dates are uncertain, or if your puppy’s growth seems far outside expected progress. Calculators can guide questions, but they can’t replace professional evaluation.",
=======
        question: "How accurate are the calculator results?",
        answer:
            "Our calculators use veterinary-informed formulas and biological averages to provide reliable estimates. However, individual dogs vary based on breed, health, and genetics. Always consult your veterinarian for personalized guidance.",
    },
    {
        question: "Do I need to create an account to use the calculators?",
        answer:
            "No account is required. All calculators are completely free and accessible without signing up. Simply enter your dog's information and get instant results.",
    },
    {
        question: "What information do I need to use these calculators?",
        answer:
            "Each calculator has different requirements. Generally, you'll need basic information like your dog's age, weight, breed size, or specific dates depending on the calculator you're using. All required fields are clearly labeled.",
    },
    {
        question: "Can I use these calculators for puppies and adult dogs?",
        answer:
            "Yes! We have specialized calculators for different life stages. The Puppy Weight Calculator is designed for growing puppies, while the Dog Age Calculator works for all ages. Each tool is optimized for its specific purpose.",
    },
    {
        question: "How should I interpret the calculator results?",
        answer:
            "Results are educational estimates to help you understand your dog's development and care needs. Use them as a starting point for conversations with your vet, not as a replacement for professional veterinary advice.",
    },
    {
        question: "Are there any limits on how many times I can use the calculators?",
        answer:
            "No limits! Use the calculators as many times as you need. They're designed to help you track your dog's growth, plan feeding schedules, and monitor milestones throughout your pet's life.",
>>>>>>> 9030b8d0fe31f7b32bf824e443571d559d0eb8cf
    },
];


export type badgeType = {
    bg: string;
    fg: string;
    icon: LucideIcon;
};

export interface CalculatorProps {
    title: string;
    description: string;
    link: string;
    badge: badgeType;
}

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
export interface heroSectionProps {
    logo: { title: string };
    title: string;
    description: string;
    cta: ctaProps[];
    buttons: {
        label: string;
        icon: LucideIcon;
        className: string;
    }[];
    image: { src: string; alt: string }
}
export interface calculatorSectionProps {
    p: string;
    title: string;
    description: string;
    cta: ctaProps;
    calculators: CalculatorProps[]
}
export interface whyUseCalculatorSectionProps {
    title: string;
    description: string;
    reasons: {
        title: string;
        description: string;
        icon: LucideIcon;
        className: string;
    }[];
    feature: {
        banner: string;
        title: string;
        description: string;
        cta: ctaProps[];
    }
}
export interface faqSectionProps {
    id: string;
    title: string;
    description: string;
    faqItems: FAQItem[];
}
export interface backlinkblogSectionProps {
    title: string;
    description: string;
    cta: ctaProps[];
    footer: {
        title: string,
        description: string;
        cta: ctaProps
    };
}
export interface seoblockSectionProps {
    title: string;
    description: string;
    services: { title: string }[],
    footer: {
        p: string;
        title: string;
        description: string;
        cta: ctaProps[];
    }
}
export interface calculatorPageCmsProps {
    seo: seoProps;
    heroSection: heroSectionProps;
    calculatorSection: calculatorSectionProps;
    whyUsecalculatorSection: whyUseCalculatorSectionProps;
    faqSection: faqSectionProps;
    backlinkblogSection: backlinkblogSectionProps;
    seoblockSection: seoblockSectionProps;
}
export const calculatorPageCms: calculatorPageCmsProps = {
    seo: {
        title: "Dog Growth & Health Calculators | Pawteller",
        description: "Use Pawteller’s vet-informed dog calculators to estimate growth, convert dog age to human years, plan nutrition, and track key life stages. Fast, mobile-friendly, SEO-first.",
        keywords: [
            "dog growth calculator",
            "dog age calculator",
            "puppy weight calculator",
            "dog food calculator",
            "dog pregnancy calculator",
            "dog name generator",
            "pet care calculators",
            "veterinary pet care",
            "dog years to human years",
            "feeding calculator",
        ],
    },
    heroSection: {
        logo: { title: "Pet care calculators" },
        title: "Find the right tool for your dog’s next",
        description: "Fast, mobile-friendly calculators for dog age conversion, puppy growth, feeding guidance, pregnancy timelines, and name ideas—built to help you make confident decisions between vet visits.",
        cta: [
            { label: "Start with Puppy Weight", href: "/calculators/puppy-weight", ariaLabel: "Start the Puppy Weight Calculator" },
            { label: "Read the guides", href: "/blog", ariaLabel: "Read Pawteller blog guides" }
        ],
        buttons: [
            { label: "Vet-informed explanations", icon: BadgeCheck, className: "text-emerald-600 dark:text-emerald-300" },
            { label: "Clean UX + SEO-ready pages", icon: Sparkles, className: "text-rose-600 dark:text-rose-300" }
        ],
        image: { src: "https://images.unsplash.com/photo-1591160690555-5debfba289f0", alt: "Happy golden retriever puppy for Pawteller calculators" }
    },
    calculatorSection: {
        p: "Tools",
        title: "Browse all calculators",
        description: "Each calculator is designed for quick input, clear results, and easy next steps.",
        cta: { href: "/quiz?quiz=breed-match", label: "Dog's IQ quiz", ariaLabel: "Take the quiz to find out if your dog is a secret genius" },
        calculators
    },
    whyUsecalculatorSection: {
        title: "Why use dog calculators?",
        description: "Pawteller calculators turn common pet-care questions into quick, structured answers—so you can plan feeding, understand growth milestones, and keep your routine consistent.",
        reasons: [
            { title: "Clear nutrition & planning", description: "Portions, calories, and timing you can act on immediately.", icon: Utensils, className: "text-[#e77855]" },
            { title: "Growth milestones", description: "Estimate puppy adult weight and see what to expect next.", icon: Scale, className: "text-emerald-300" },
            { title: "Timeline-friendly", description: "Pregnancy and development checkpoints for less guessing.", icon: CalendarDays, className: "text-sky-300" },
            { title: "Less wasted effort", description: "Faster answers to reduce uncertainty and extra searches.", icon: DollarSign, className: "text-rose-300" },
        ],
        feature: {
            banner: "Featured Workflow",
            title: "Use a calculator → read a guide → book the vet",
            description: " Get an estimate first, then confirm details using the related articles and professional advice.",
            cta: [
                { label: "Browse guides", href: "/blog", ariaLabel: "View Pawteller blog guides" },
                { label: "Ask a question", href: "/contact", ariaLabel: "Contact Pawteller" }
            ]
        }
    },
    faqSection: {
        id: "FAQ",
        title: "Questions about Dog Calculators",
        description: "Quick answers to help you choose the right tool and understand what the results mean.",
        faqItems
    },
    backlinkblogSection: {
        title: "Backlinks & internal links",
        description: "Keep exploring",
        cta: [
            { label: "Dog Age Calculator", href: "/calculators/dog-age", ariaLabel: "Calculate your dog's age" },
            { label: "Dog Food Calculator", href: "/calculators/dog-food", ariaLabel: "Calculate your dog's food" },
            { label: "Dog Growth Calculator", href: "/calculators/dog-growth", ariaLabel: "Calculate your Dog growth" }
        ],
        footer: {
            title: "Read related guides",
            description: "Pair calculators with articles for context, tips, and next steps.",
            cta: { href: "/blog", label: " Browse the blog", ariaLabel: "Go to Blog Page" }
        }
    },
    seoblockSection: {
        title: " SEO-friendly calculator hub",
        description: "Use these tools to understand your dog’s development and care needs. Results are educational only and do not replace professional veterinary advice.",
        services: [
            { title: "Dog growth prediction" },
            { title: "Feeding guidance" },
            { title: "Dog age conversion" },
            { title: "Pregnancy timeline" },
        ],
        footer: {
            p: "Newsletter & subscription",
            title: "Get weekly pet care tips",
            description: "Subscribe for calculator updates and simple, searchable guides.",
            cta: [
                { label: "Read the latest", href: "/blog", ariaLabel: "Read pet care tips" },
                { label: "Privacy policy", href: "/privacy", ariaLabel: "View privacy policy" }
            ]
        }
    }
}