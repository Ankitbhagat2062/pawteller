import type { LucideIcon } from "lucide-react";
import { Zap, Compass, Search, PawPrint, ShieldAlert } from "lucide-react";


export type AboutPageSeoCms = {
    title: string;
    description: string;
    keywords: string[];
};
export type AboutPageHeroCta = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type rightProps = {
    title: string;
    description: string;
    icon?: LucideIcon;
}
export type ctaProps = {
    label: string;
    href: string;
    ariaLabel: string;
}
export type AboutPageHeroSectionProps = {
    right: {
        title: string;
        description: string;
        buttons: ctaProps[];
    };
    left: {
        title: string;
        speed: string;
        Clarity: string;
        footertext: string;
        owner: string;
    };
};
export interface AboutPageMissionSectionProps {
    left: rightProps
    right: rightProps[]
}
export interface AboutPageTrustPrincipleSectionProps {
    banner: string;
    title: string;
    content: rightProps[];
}
export interface AboutPageActionBlockProps {
    title: string;
    description: string;
    cta: ctaProps[]
}
export interface AboutPageBottomCtaBandProps {
    banner: string;
    title: string;
    description: string;
    cta: ctaProps;
}
export type AboutPageCmsProps = {
    seo: AboutPageSeoCms & {
        jsonLd?: Record<string, unknown>;
    };
    heroSection: AboutPageHeroSectionProps;
    missionSection: AboutPageMissionSectionProps;
    trustPrincipleSection: AboutPageTrustPrincipleSectionProps;
    actionblockSection: AboutPageActionBlockProps;
    medicalWarningSection: rightProps;
    bottomCtaBand: AboutPageBottomCtaBandProps;
}

const heroSection: AboutPageHeroSectionProps = {
    right: {
        title: "About Pawteller",
        description: "Pawteller helps dog owners make better everyday decisions with fast calculators and clear guides—so you can move forward with confidence.",
        buttons: [
            { label: "Calculate your dog’s age ", href: "/calculators/dog-age", ariaLabel: "Calculate your dog’s age" },
            { label: "Read practical guides", href: "/blog", ariaLabel: "Read Practical Guides" }
        ],
    },
    left: {
        title: "What we optimize for",
        speed: "Speed: answers in seconds",
        Clarity: "Clarity : simple next steps",
        footertext: "SEO - friendly resources you can actually find",
        owner: "Owner confidence: built for real life"
    },
}

const missionSection: AboutPageMissionSectionProps = {
    left: {
        title: "Our mission: practical clarity for dog owners",
        description: "Pawteller exists to help you go from question → numbers → next steps, quickly. Our calculators are designed to be lightweight, our guides are written to be easy to scan, and our pages are structured to be search-friendly—so you can trust you’ll find the right answer when you need it.",
    },
    right: [
        {
            title: "Speed",
            description: "Quick inputs, fast outputs, and less waiting when you’re researching.",
            icon: Zap,
        },

        {
            title: "Clarity",
            description: "Clear explanations that translate numbers into owner-friendly decisions.",
            icon: Compass,
        },

        {
            title: "SEO resources",
            description: "Structured content so you can find relevant answers through search.",
            icon: Search,
        },
        {
            title: "Owner confidence",
            description: "A calm, practical tone that helps you act with confidence—and know your limits.",
            icon: PawPrint,
        },
    ],
}

export const trustPrinciples: rightProps[] = [
    {
        title: "Simple Tools",
        description:
            "Fast calculators that answer the question you came for—no clutter.",
        icon: Zap,

    },
    {
        title: "Clear Guidance",
        description:
            "Plain-language steps so you know what to do next (and when to ask your vet).",
        icon: Compass,

    },
    {
        title: "Built For Dog Owners",
        description:
            "Every guide is written with daily routines in mind: food, growth, and care decisions.",
        icon: PawPrint,

    },
    {
        title: "Always Improving",
        description:
            "We keep refining content for clarity and search—so you can find what you need quickly.",
        icon: Search,

    },
] as const;
const trustPrincipleSection: AboutPageTrustPrincipleSectionProps = {
    banner: "Trust principles",
    title: "Calm, practical support—built for real owners",
    content: trustPrinciples,
}

const actionblockSection: AboutPageActionBlockProps = {
    title: "What You Can Do Here",
    description: "Jump into the tools and guides that help you plan feeding, track growth, and understand what to ask your veterinarian.",
    cta: [
        { label: "Calculators", href: "/calculators/dog-food", ariaLabel: "Calculate your Dog Food" },
        { label: "Blog guides", href: "/blog", ariaLabel: "Explore our Blogs about Dog health , food , growth , age and more" },
        { label: "Breed match quiz", href: "/quiz?quiz=breed-match", ariaLabel: "Quiz to find your perfect breed match" }
    ],
}

const bottomCtaBand: AboutPageBottomCtaBandProps = {
    banner: "Start with a calculator",
    title: "Quick answers you can use today",
    description: "Choose a featured tool to get numbers and next steps—built for calm, everyday decision-making.",
    cta: { label: "Start with a calculator", href: "/calculators/dog-growth", ariaLabel: "Calculate the growth of your dog" }
}

export const AboutPageCms: AboutPageCmsProps = {
    seo: {
        title: "About Pawteller | Fast Dog Growth Calculators & Vet-Informed Guides",
        description:
            "Learn about Pawteller’s mission to help dog owners make confident decisions with fast calculators, clear guides, and vet-informed insights—built for everyday use.",
        keywords: [
            "about Pawteller",
            "dog health insights",
            "dog growth calculator",
            "puppy weight",
            "dog age calculator",
            "vet-informed pet care",
            "breed quiz",
            "pet health guides",
        ],
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "About Pawteller",
            url: "https://pawteller.com/about",
            description:
                "About Pawteller: fast dog growth calculators and clear, vet-informed guidance for daily dog care.",
            isPartOf: {
                "@type": "WebSite",
                name: "Pawteller",
                url: "https://pawteller.com",
            },
            about: [
                "dog health",
                "puppy weight",
                "dog growth",
                "dog age",
                "pet care guides",
            ],
        },
    },
    heroSection,
    missionSection,
    trustPrincipleSection,
    actionblockSection,
    medicalWarningSection: {
        title: "Responsible information",
        description: "Pawteller tools and guides are for educational purposes. They can’t diagnose medical conditions and aren’t a replacement for veterinary care. If you’re worried about your dog’s health, contact a qualified veterinarian.",
        icon:ShieldAlert
    },
    bottomCtaBand,
}

