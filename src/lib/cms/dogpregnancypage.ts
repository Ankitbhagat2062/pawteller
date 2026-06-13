import { BreedSize, FAQItem, ImageConfig, seoProps } from "@/lib/types";
import { ctaProps } from "@/lib/cms/aboutpage";

export type LayoutOrientation = "text-left" | "image-left";

export interface TipCardData {
    label: string;
    text: string;
}

export interface AlertItem {
    id: string;
    title: string;
    description: string;
}

export interface CMSSectionBlock {
    id: string;
    layout: LayoutOrientation;
    title: string;
    // Using ReactNode allows you to pass strong tags or formatters while hardcoded, 
    // but this can easily switch to 'string[]' once your backend/CMS returns HTML strings or Markdown paragraphs.
    paragraphs: {
        p: string;
        days?: string;
        p2?: string
    }[];
    image: ImageConfig;
    tipCard: TipCardData | null;
    alerts: AlertItem[];
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
export interface timelineweeksProps {
    week: string;
    title: string;
    description: string
    tips: string[]
}
export interface timelineProps {
    title: string;
    description: string;
    timeline: timelineweeksProps[];
    button: { label: string; href: string }
}
export const TIMELINE_WEEKS: timelineweeksProps[] = [
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

export const FAQ_ITEMS: FAQItem[] = [
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

const heroSection: {
    title: string;
    h1: string;
    description: string;
} = {
    title: "Veterinary Verified Logic",
    h1:"Dog Pregnancy Calculator",
    description: `Estimate your dog's due date, track pregnancy milestones
	week-by-week, and prepare for your puppy's arrival with expert
	guidance.`,
}
const timelineSection: timelineProps = {
    title: "Dog Pregnancy Timeline",
    description: `Track the amazing development of your puppies from fertilization
              to birth with our week-by-week guide.`,
    timeline: TIMELINE_WEEKS,
    button: { label: "View Full 9-Week Guide", href: "/blog" }
}

export const SECTIONS_DATA: CMSSectionBlock[] = [
    {
        id: "gestation-period",
        layout: "text-left", // Controls the responsive image/text order
        title: "How Long Are Dogs Pregnant?",
        paragraphs: [
            {
                days: "63 days",
                p: "The average gestation period for dogs is ",
                p2: "(about 9 weeks), though it can vary from 58 to 68 days.",
            },
            {
                p: "Variance often depends on the dog's breed and size. Smaller breeds often have slightly shorter pregnancies, while larger dogs may carry for the full term or slightly longer.",
            }
        ],
        tipCard: {
            label: "Pro Tip:",
            text: "Calculating from the date of ovulation is more accurate than mating date, as sperm can live inside the female for several days."
        },
        image: {
            src: "https://api.builder.io/api/v1/image/assets/TEMP/0b5edf462e891ce094fd72356a06ea7e60ad8477?width=1072",
            alt: "Pregnant golden retriever resting comfortably on a soft rug"
        },
        alerts: [] // No alerts for this section
    },
    {
        id: "vet-contact",
        layout: "image-left",
        title: "When To Contact A Vet",
        paragraphs: [
            {
                p: "While dog pregnancy is a natural process, there are signs that require immediate professional attention to ensure the safety of both mother and puppies."
            }
        ],
        tipCard: null,
        image: {
            src: "https://api.builder.io/api/v1/image/assets/TEMP/0f83f1a70d226ad853b44bf47e3d08159d468a55?width=1072",
            alt: "Veterinarian examining a dog"
        },
        // Dynamic alerts list (Replace PREGNANCY_OVERDUE_DAYS with a static number or handle it via props)
        alerts: [
            {
                id: "discharge",
                title: "Abnormal Discharge",
                description: "Bloody or foul-smelling discharge before the due date."
            },
            {
                id: "overdue",
                title: "Overdue Pregnancy",
                description: "If the pregnancy lasts more than 68 days from mating." // Hardcoded fallback for now
            },
            {
                id: "labor",
                title: "Prolonged Labor",
                description: "Extreme straining for more than 45 mins without a puppy."
            }
        ]
    }
];

const backlinkSection: { title: string; cta: ctaProps[] } = {
    title: "Explore Other Dog Tools",
    cta: [
        {
            label: "Dog Growth Calculator",
            href: "/calculators/dog-growth",
            ariaLabel: "Go to the Dog Growth Calculator",
        },
        {
            label: "Puppy Weight Predictor",
            href: "/calculators/puppy-weight",
            ariaLabel: "Go to the Puppy Weight Predictor",
        },
        {
            label: "Dog Name Generator",
            href: "/calculators/dog-name",
            ariaLabel: "Go to the Dog Name Generator",
        },
    ]
}

const disclaimerSection: { desc: string } = {
    desc: `Disclaimer: This calculator provides estimates based on typical
            biological averages. Dog pregnancy can be complex and varies by
            individual health and breed factors. We strongly recommend a
            professional veterinary consultation, ultrasound, or X-ray to
            confirm pregnancy status, puppy count, and overall health.
        `,
}

export interface dogPregnancyCmsProps {
    seo: seoProps;
    heroSection: {
        title: string;
        h1:string;
        description: string;
    };
    timelineSection: timelineProps;
    vetSection: CMSSectionBlock[];
    faqSection: FAQItem[];
    backlinkSection: { title: string; cta: ctaProps[] };
    disclaimerSection: { desc: string; }
}
export const dogPregnancyCms: dogPregnancyCmsProps = {
    seo: {
        title:
            "Dog Pregnancy Calculator: Estimate Due Date & Gestation | Pawteller",
        description:
            "Use Pawteller’s dog pregnancy calculator to estimate your dog’s due date, track week-by-week milestones, and know when to contact a vet. Based on veterinary gestation averages.",
        keywords: [
            "dog pregnancy calculator",
            "dog due date calculator",
            "dog gestation calculator",
            "how long are dogs pregnant",
            "dog whelping timeline",
            "dog pregnancy week by week",
            "pregnant dog care",
            "veterinary pregnancy milestones",
            "ultrasound timing pregnancy dogs",
            "signs of labor in dogs",
        ],
    },
    heroSection,
    timelineSection,
    vetSection: SECTIONS_DATA,
    faqSection: FAQ_ITEMS,
    backlinkSection,
    disclaimerSection
}