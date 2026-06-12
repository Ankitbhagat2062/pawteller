import { Dumbbell, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { FAQItem, ImageConfig, seoProps } from "../types";

export interface FeatureItem {
    id: string;
    iconName: 'PawPrint' | 'BadgeCheck'; // Type to determine which icon to render
    label: string;
}

export interface PuppyCalculatorHeroContent {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    features: FeatureItem[];
    heroImage: ImageConfig;
}

export const HERO_CONTENT: PuppyCalculatorHeroContent = {
    badge: "🐾 Puppy Weight Calculator",
    titleLine1: "Puppy Weight",
    titleLine2: "Calculator",
    description: "Estimate your puppy's adult weight and track their growth journey with our veterinarian-approved calculator.",
    features: [
        {
            id: "feat-accuracy",
            iconName: "PawPrint",
            label: "98% Breed Accuracy",
        },
        {
            id: "feat-vet-approved",
            iconName: "BadgeCheck",
            label: "Vet-Approved Algorithm",
        },
    ],
    heroImage: {
        src: "https://api.builder.io/api/v1/image/assets/TEMP/125f32ab886c10beda3bee8eb9822323b654095b?width=1000", // Swap this out with your local asset or schema later
        alt: "Happy Golden Retriever puppy",
    },
};
export interface infographicSectionProps {
    title: string;
    reasons: {
        label: string;
        time: string;
        color: string;
        textColor: string;
    }[];
}
export const infographicSection: infographicSectionProps = {
    title: "When will your puppy stop growing?",
    reasons: [
        {
            label: "Toy",
            time: "9 mo",
            color:
                "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800",
            textColor: "text-purple-700 dark:text-purple-300",
        },
        {
            label: "Small",
            time: "12 mo",
            color:
                "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
            textColor: "text-blue-700 dark:text-blue-300",
        },
        {
            label: "Medium",
            time: "15 mo",
            color: "bg-brand-light border-brand/20",
            textColor: "text-brand-dark dark:text-brand",
        },
        {
            label: "Large/Giant",
            time: "18–24 mo",
            color:
                "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800",
            textColor: "text-orange-700 dark:text-orange-300",
        },
    ]
}

export interface PredictionStep {
    n: string;
    strong: string;
    rest: string;
}

export interface GrowthRow {
    cat: string;
    weight: string;
    height: string;
    stops: string;
}

export interface GrowthInsightsContent {
    // Left Column: How it Works & Growth timeline
    howItWorksTitle: string;
    steps: PredictionStep[];
    stopGrowingTitle: string;
    stopGrowingDesc: string;
    alertNote: string;

    // Right Column: Table & Newsletter
    tableTitle: string;
    tableHeadings: { cat: string; weight: string; height: string; stops: string };
    growthRows: GrowthRow[];
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterPlaceholder: string;
    newsletterBtnText: string;
}

export interface GrowthInsightsSectionProps {
    emailInput: string;
    setEmailInput: (value: string) => void;
    onNewsletterSubmit: () => void; // Clean wrapper function instead of inlining router operations
}

export const GROWTH_INSIGHTS_CONTENT: GrowthInsightsContent = {
    howItWorksTitle: "How Puppy Weight Prediction Works",
    steps: [
        {
            n: "1",
            strong: "Breed Standard Baseline:",
            rest: " Our algorithm uses average adult weights for 300+ AKC breeds.",
        },
        {
            n: "2",
            strong: "Growth Curve Analysis:",
            rest: " We map your puppy's current weight against specific growth trajectories.",
        },
        {
            n: "3",
            strong: "Adjustment Factors:",
            rest: " We adjust for sex, birth weight (if known), and current BCS (Body Condition Score).",
        },
    ],
    stopGrowingTitle: "When Do Puppies Stop Growing?",
    stopGrowingDesc: "The age at which a dog stops growing is directly related to its final adult size. Smaller breeds reach their full skeletal size much earlier than giant breeds.",
    alertNote: "Note: Puppies reach their full height before they reach their full weight. The growth plates in their joints usually close between 12–18 months.",
    tableTitle: "Puppy Growth by Breed Size",
    tableHeadings: {
        cat: "Size Category",
        weight: "Adult Weight",
        height: "Height Range",
        stops: "Growth Stops",
    },
    growthRows: [
        {
            cat: "Small/Toy",
            weight: "2–10 kg",
            height: "15–38 cm",
            stops: "9–12 Months",
        },
        {
            cat: "Medium",
            weight: "11–25 kg",
            height: "31–58 cm",
            stops: "12–15 Months",
        },
        {
            cat: "Large",
            weight: "26–45 kg",
            height: "51–70 cm",
            stops: "15–18 Months",
        },
        {
            cat: "Giant",
            weight: "46+ kg",
            height: "71+ cm",
            stops: "18–24 Months",
        },
    ],
    newsletterTitle: "Track Growth Weekly",
    newsletterDesc: "Join 15,000+ pet parents receiving monthly health milestones and growth tracking reminders.",
    newsletterPlaceholder: "Email address",
    newsletterBtnText: "Get Tracking Reminders",
};

export interface growthSupportRecommendationProps {
    title: string;
    desc: string;
    recommendations: {
        icon: LucideIcon;
        iconBg: string;
        title: string;
        desc: string;
        link: string;
        linkColor: string;
        Color: string;
    }[];
}
export const growthSupportRecommendation: growthSupportRecommendationProps = {
    title: "Growth Support Recommendations",
    desc: `Expert-backed advice tailored to your puppy's current developmental stage.`,
    recommendations: [
        {
            icon: Sparkles,
            Color: "#EA580C",
            iconBg: "bg-orange-100 dark:bg-orange-900/30",
            title: "Optimal Feeding",
            desc: 'Puppies need specifically formulated "large breed" food to ensure calcium-to-phosphorus ratios are balanced for slower growth.',
            link: "View Feeding Chart",
            linkColor: "text-brand",
        },
        {
            icon: ShieldCheck,
            Color: "#2563EB",
            iconBg: "bg-blue-100 dark:bg-blue-900/30",
            title: "Vet Check-ups",
            desc: "Your next vital vaccination window is between 14–16 weeks. Monitor for signs of 'panosteitis' (growing pains) in larger breeds.",
            link: "Schedule Reminder",
            linkColor: "text-brand",
        },
        {
            icon: Dumbbell,
            Color: "#16A34A",
            iconBg: "bg-brand-light",
            title: "Exercise Limit",
            desc: "Follow the 5-minute rule: 5 minutes of formal exercise per month of age, twice a day. Avoid high-impact jumping until 12 months.",
            link: "Training Tips",
            linkColor: "text-brand",
        },
    ]
}
const faqItems: FAQItem[] = [
    {
        question: "How accurate is the weight prediction?",
        answer: "Our predictions are accurate within ±15% for most breeds when using data from puppies 8+ weeks old. Accuracy improves with age. Mixed-breed predictions use the average of the closest matching breeds.",
    },
    {
        question: "Does gender affect a puppy's adult weight?",
        answer: "Yes — males typically weigh 10–20% more than females in most breeds. Our algorithm factors in sex when available, and our ranges reflect the typical variation between male and female dogs.",
    },
    {
        question: "Why is my puppy growing faster than the chart?",
        answer: "Every individual puppy is different. Rapid growth isn't always good — it can put stress on developing bones and joints. If your puppy is significantly above the curve, consult your vet about caloric intake and potential nutritional adjustments.",
    },
    {
        question: "At what age do giant breeds stop growing?",
        answer: "Giant breeds like Great Danes and Saint Bernards may not reach their full adult size until 18–24 months. Even after skeletal growth stops, they continue to 'fill out' and gain muscle mass for several more months.",
    },
    {
        question: "Should I be worried if my puppy is small for their breed?",
        answer: "Not necessarily. Some puppies are naturally smaller due to genetics. However, if your puppy is consistently below 80% of the expected weight for their age, it's worth a vet visit to rule out parasites, nutritional deficiencies, or underlying health issues.",
    },
];

interface PuppyWeightPageCmsProps {
    seo: seoProps
    HERO_CONTENT: PuppyCalculatorHeroContent;
    infographicSection: infographicSectionProps,
    growthSupportRecommendation: growthSupportRecommendationProps,
    GROWTH_INSIGHTS_CONTENT: GrowthInsightsContent,
    faqSection: FAQItem[],
    backlinks: {
        emoji: string
        emojiColor: string;
        iconBg: string;
        title: string;
        desc: string;
        linkColor: string;
        href: string;
    }[]
}
export const puppyWeightPageCms: PuppyWeightPageCmsProps = {
    seo: {
        title: "Puppy Weight Calculator: Predict Adult Size",
        description:
            "Use our veterinarian-approved puppy weight calculator to estimate your puppy’s adult weight, see growth progress, and understand when your dog will stop growing.",
        keywords: [
            "puppy weight calculator",
            "predict adult weight",
            "puppy growth",
            "dog growth chart",
            "when do puppies stop growing",
            "vet approved dog calculator",
            "puppy weight by breed",
            "estimate adult size",
        ],
    },
    HERO_CONTENT,
    infographicSection,
    growthSupportRecommendation,
    GROWTH_INSIGHTS_CONTENT,
    faqSection: faqItems,
    backlinks: [
        {
            emoji: "📈",
            emojiColor: "text-brand",
            iconBg: "bg-brand-light",
            title: "Dog Growth Calculator",
            desc: "Compare your dog's growth to healthy breed standards month-by-month.",
            linkColor: "text-brand",
            href: "/calculators/dog-growth"
        },
        {
            emoji: "🍖",
            emojiColor: "text-amber-600",
            iconBg: "bg-amber-100 dark:bg-amber-900/30",
            title: "Dog Food Calculator",
            desc: "Calculate the exact calories and portions your dog needs daily.",
            linkColor: "text-amber-600",
            href: "/calculators/dog-food"
        },
        {
            emoji: "🗓️",
            emojiColor: "text-gray-500",
            iconBg: "bg-gray-100 dark:bg-gray-800",
            title: "Dog Age Calculator",
            desc: "Convert your dog's age to human years accurately based on size.",
            linkColor: "text-foreground",
            href: "/calculators/dog-age"
        },
    ]
}