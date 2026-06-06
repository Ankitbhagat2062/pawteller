import {
    calculators,
    dogLifeStages,
    featuredCalculatorCards,
    blogPosts,
} from "@/lib/constant";

export type HomepageSeoCms = {
    title: string;
    description: string;
    keywords: string[];
};

export type HomepageHeroCms = {
    badgeText: string;
    h1Lines: [
        { text: string; italic?: boolean; highlight?: boolean },
        { text: string; italic?: boolean; highlight?: boolean },
        { text: string; italic?: boolean; highlight?: boolean },
        { text: string; italic?: boolean; highlight?: boolean },
        { text: string; italic?: boolean; highlight?: boolean },
    ];
    descriptionLines: string;
    primaryCta: { label: string; href: string; ariaLabel: string };
    secondaryCta: { label: string; href: string, ariaLabel: string };
    ratingLabelPrefix: string;
    ratingCountText: string;
    ratingLabelSuffix: string;
    image: { src: string; alt: string };
    overlayLeft: { eyebrow: string; value: string; footer: string };
    overlayRight: { eyebrow: string; value: string; footer: string };
};

export type HomepageFeaturedCalculatorCmsItem = {
    calculators: typeof calculators;
    cards: typeof featuredCalculatorCards;
};

export type HomepageCms = {
    seo: HomepageSeoCms & {
        jsonLd?: Record<string, unknown>;
    };
    hero: HomepageHeroCms;
    featuredCalculators: {
        calculators: typeof calculators;
        cards: typeof featuredCalculatorCards;
    };
    dogLifes: {
        left: {
            eyebrow: string;
            title: string;
            description: string;
            cta: { label: string; href: string; ariaLabel?: string };
        };
        right: {
            dogLifeStages: typeof dogLifeStages;
        };
    };
    breedQuizCtas: {
        leadGen: {
            eyebrow: string;
            title: string;
            description: string;
            cta: { label: string; href: string; ariaLabel?: string };
        };
        feature: {
            eyebrow: string;
            title: string;
            titleEmphasis: string;
            description: string;
            cta: { label: string; href: string; ariaLabel?: string };
            image: { src: string; alt: string };
        };
    };
    knowledgeBase: {
        eyebrow: string;
        title: string;
        description: string;
        viewAllHref: string;
        viewAllLabel: string;
    };
    blogPosts: typeof blogPosts;
};

export const homepageCms: HomepageCms = {
    seo: {
        title: "Pawteller | Premium Growth & Pet Health Insights",
        description:
            "Accurate dog growth calculators, vet-informed insights, and interactive health tracking features.",
        keywords: ["dog growth", "puppy weight", "dog age calculator", "breed quiz", "pet health"],
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Pawteller",
            url: "https://pawteller.com",
            description:
                "Premium modern pet-care platform and informational calculators.",
            potentialAction: {
                "@type": "SearchAction",
                target: "https://pawteller.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
            },
        },
    },
    hero: {
        badgeText: "For dog parents who care deeply",
        h1Lines: [
            { text: "Smart" },
            { text: "calculators" },
            { text: "for your", highlight: false },
            { text: "best", italic: true, highlight: true },
            { text: "friend", italic: true, highlight: true },
        ],
        descriptionLines:
            "Predict your puppy's adult size. Decode dog years. Plan portions. Find the perfect breed. All in one beautifully simple place — backed by veterinary science.",
        primaryCta: { label: "Start with Puppy Weight", href: "/calculators/puppy-weight", ariaLabel: "Start using the puppy weight calculator" },
        secondaryCta: { label: "Dog Nutrition Quiz", href: "/quiz?quiz=breed-match", ariaLabel: "Start the quiz to find out about your Dogs' Health and Nutrition" },
        ratingLabelPrefix: "Loved by",
        ratingCountText: "12,000+",
        ratingLabelSuffix: " dog parents",
        image: {
            src: "https://images.unsplash.com/photo-1523480717984-24cba35ae1ef",
            alt: "Golden retriever sitting on a beach",
        },
        overlayLeft: {
            eyebrow: "Adult weight",
            value: "62 lbs",
            footer: "at 18 months",
        },
        overlayRight: {
            eyebrow: "Human age",
            value: "36 yrs",
            footer: "Buddy is a young adult",
        },
    },
    featuredCalculators: {
        calculators,
        cards: featuredCalculatorCards,
    },
    dogLifes:{
        left: {
            eyebrow: "The story of every dog",
            title: "From tiny paws to wise old soul — we'll be your guide.",
            description:"Dogs grow up fast. One month they fit in your palm, the next they're hogging the couch. Pawteller turns the science of dog development into beautiful, easy-to-understand answers— so you can spend less time worrying and more time playing fetch.",
             cta: { label: "Dog Age Quiz", href: "/quiz?quiz=breed-match", ariaLabel: "Explore dog life stages to get tailored insights and care tips for every chapter of your dog's journey" },
        },
        right: {
            dogLifeStages,
        }
    },
    breedQuizCtas: {
        leadGen: {
            eyebrow: "Dog Breed Quiz",
            title: "Which Dog Breed is Right For You?",
            description:
                "Match your lifestyle with a breed profile that fits—size, temperament, energy, and growth expectations.",
            cta: { label: "Start The Quiz Now", href: "/quiz?quiz=breed-match" },
        },
        feature: {
            eyebrow: "Free quiz - 2 minutes",
            title: "Which dog breed fits",
            titleEmphasis: "your life?",
            description:
                "Answer 6 quick questions about your lifestyle and we'll match you with your top 3 breeds, personalized to your home, energy and family.",
            cta: { label: "The Compatibility Check", href: "/quiz?quiz=breed-match", ariaLabel: "Find Out whether you and your dog actually personality matches?" },
            image: {
                src: "https://images.unsplash.com/photo-1560743641-3914f2c45636",
                alt: "Two happy dogs sitting together in tall grass",
            },
        },
    },
    knowledgeBase: {
        eyebrow: "Latest Updates",
        title: "Latest Dog Care Guides",
        description:
            "Practical, expert-backed reads built to be easy to search and easy to apply.",
        viewAllHref: "/blog",
        viewAllLabel: "View all articles",
    },
    blogPosts,
};

