import { FAQItem, seoProps } from "@/lib/types";
import { ctaProps } from "./aboutpage";

export interface heroSectionProps {
    title: string;
    description: string;
    buttons: { title: string }[];
}
export interface informationSectionProps {
    title: string;
    description: string;
    cards: {
        size: string;
        example: string;
        advantage: string;
        color: string;
    }[];
}
export interface callToActionSectionProps {
    title: string;
    description: string;
    button: {
        label: string;
        href: string;
        ariaLabel?: string;
    };
}

export interface DogAgePageCmsProps {
    seo: seoProps;
    heroSection: heroSectionProps;
    informationSection: informationSectionProps;
    faqSection: FAQItem[];
    callToActionSection: callToActionSectionProps;
}

export const dogAgePageCms: DogAgePageCmsProps = {
    seo: {
        title: "Dog Age Calculator (Convert Dog Years to Human Years) | pawteller",
        description:
            "Use pawteller’s dog age calculator to convert your dog’s age into human years. Choose small, medium, large, or giant size for a more accurate life-stage estimate.",
        keywords: [
            "dog age calculator",
            "convert dog years to human years",
            "dog years to human years",
            "dog life stage calculator",
            "human age equivalent for dogs",
            "dog aging by size",
            "small dog age to human years",
            "large dog age to human years",
            "giant dog years to human years",
            "dog senior years calculator",
        ],
    },
    heroSection: {
        title: "How old is your dog in human years",
        description: `Forget the old "multiply by 7" rule! Real dog aging is non-linear and depends on breed size. Our calculator uses the latest veterinary research to give you an accurate human-year equivalent.`,
        buttons: [
            { title: "Science-backed" },
            { title: "Veterinary approved" },
            { title: "Size-accurate" },
        ]
    },
    informationSection: {
        title: "Why Size Matters",
        description: "Different dog breeds age at different rates due to genetics and physiology",
        cards: [
            {
                size: "Small",
                example: "Chihuahua, Yorkshire Terrier",
                advantage: "Live longer lives, aging slower in later years",
                color:
                    "from-blue-500/20 to-blue-600/20 border-blue-200/50 dark:border-blue-800/50",
            },
            {
                size: "Medium",
                example: "Beagle, Cocker Spaniel",
                advantage: "Balanced aging pattern, standard lifespan",
                color:
                    "from-green-500/20 to-green-600/20 border-green-200/50 dark:border-green-800/50",
            },
            {
                size: "Large",
                example: "Golden Retriever, German Shepherd",
                advantage: "Mature faster, shorter overall lifespan",
                color:
                    "from-orange-500/20 to-orange-600/20 border-orange-200/50 dark:border-orange-800/50",
            },
            {
                size: "Giant",
                example: "Great Dane, Saint Bernard",
                advantage: "Age fastest, require extra care",
                color:
                    "from-red-500/20 to-red-600/20 border-red-200/50 dark:border-red-800/50",
            },
        ]
    },
    faqSection: [
        {
            question: "Is the &quot;multiply by 7&quot; rule accurate?",
            answer: "No, this outdated rule oversimplifies dog aging. Dogs age much faster in their first two years, then the rate slows down. Additionally, breed size significantly affects how quickly dogs age.",
        },
        {
            question: "Why do large dogs age faster than small dogs?",
            answer: "Larger dogs have faster metabolisms and shorter lifespans. They reach physical maturity quickly and experience more rapid cellular aging, which is why a 10-year-old Great Dane is much older in human terms than a 10-year-old Chihuahua.",
        },
        {
            question: "When is my dog considered a senior?",
            answer: "A dog is typically considered a senior between 45-65 human years old (approximately 7-10 dog years depending on size). This is when preventative veterinary care becomes especially important.",
        },
        {
            question: "How often should I take my senior dog to the vet?",
            answer: "Senior dogs should visit the veterinarian at least twice a year for wellness exams. More frequent visits may be needed if your dog has health conditions.",
        },
    ],
    callToActionSection: {
        title: "Keep Your Dog Healthy",
        description: `Regular veterinary checkups, proper nutrition, exercise, and
                preventative care are essential for keeping your dog healthy
                throughout their life.`,
        button: {
            label: "Schedule a Vet Checkup",
            href: "/contact",
            ariaLabel: "Schedule a veterinary checkup for your dog"
        },
    }
};