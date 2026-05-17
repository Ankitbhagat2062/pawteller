import { Baby, Dumbbell, LineChart, PawPrint, Sparkles, Utensils } from "lucide-react";

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
    },
    {
        category: "Health",
        title: "From Puppy to Senior: Growth Milestones That Matter",
        excerpt:
            "A practical timeline of what “normal” growth can look like—and signs to discuss with your veterinarian early.",
        minutes: 8,
        date: "Updated weekly",
    },
    {
        category: "Breeds",
        title: "Understanding Breed Size: Small, Medium, and Large",
        excerpt:
            "Breed size affects growth pace and adult weight. Use these insights to set realistic expectations.",
        minutes: 5,
        date: "Updated weekly",
    },
];