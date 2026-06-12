import { FAQItem, seoProps } from "@/lib/types";
import {FlaskConical, IceCreamBowl, Scale, type LucideIcon } from "lucide-react";


export const LIFE_STAGE_MULTIPLIERS: Record<string, number> = {
  Puppy: 2.5,
  Adult: 1.8,
  Senior: 1.4,
  Pregnant: 3.0,
};

export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  Sedentary: 1.2,
  "Moderate walks": 1.5,
  "Very active": 1.8,
  "Extremely active": 2.0,
};
export interface dogFoodPageCmsProps {
  seo: seoProps;
  header: {
    title: string;
    description: string;
  }
  whySection: {
    title: string;
    bullets:
    {
      title: string;
      body: string;
      icon: LucideIcon;
    }[];
    disclaimer: string;
  },
  faqSection: FAQItem[];
}
export const dogFoodPageCms: dogFoodPageCmsProps = {
  seo: {
    title: "Dog Food Calculator: How Many Cups & Calories Per Day",
    description: "Use our dog food calculator to estimate daily calories and cups per day based on weight, life stage (puppy, adult, senior, pregnant) and activity level. Includes transparent ~350 kcal/cup conversion.",
    keywords: ["dog food calculator", "dog calorie calculator", "cups per day", "how much to feed a dog", "puppy feeding guide", "senior dog nutrition", "weight based feeding", "RER formula", "veterinary nutrition"],
  },
  header:{
    title:"How much should your dog really eat?",
    description:"Calorie needs vary by weight, age and activity. Get an evidence-based daily portion in seconds."
  },
  whySection: {
    title: "Why this calculator works",
    bullets: [
      {
        title: "Starts with a science-based baseline",
        body: "We use Resting Energy Requirement (RER): 70 × (kg)^0.75 — a standard veterinary approach to estimate energy needs from body size.",
        icon: FlaskConical,
      },
      {
        title: "Adjusts for life stage & activity",
        body: "We apply multipliers for puppy/adult/senior and for activity level (sedentary → extremely active) to better match real-world feeding needs.",
        icon: Scale,
      },
      {
        title: "Turns calories into cups (with transparency)",
        body: "We convert kcal to “cups per day” using a commonly used estimate (~350 kcal per cup). Your kibble label may differ, so always verify the packaging for final accuracy.",
        icon: IceCreamBowl,
      },
    ],
    disclaimer:
      "This tool provides educational estimates and does not replace veterinary advice. Individual dogs can require different amounts based on metabolism, body condition, breed, and health status.",
  },
  faqSection: [
    {
      id: "dfaq-1",
      question: "Is the calorie number based on scientific veterinary formulas?",
      answer:
        "Yes. The calculator uses RER (70 × (kg)^0.75) as the baseline, then applies multipliers for life stage and activity level—an approach consistent with how veterinary nutrition assessments estimate energy needs.",
    },
    {
      id: "dfaq-2",
      question: "Why do “cups per day” vary between brands?",
      answer:
        "Because kibble density differs. The calculator uses ~350 kcal/cup as a practical conversion, but you should always compare to your bag’s kcal per cup (or kcal per 1/2 cup) and adjust accordingly.",
    },
    {
      id: "dfaq-3",
      question: "Should I feed the result exactly?",
      answer:
        "Start with the estimate, then fine-tune. If your dog is gaining weight, reduce portions; if losing weight, increase. Aim for a healthy body condition score and consult your vet if weight changes are significant or rapid.",
    },
    {
      id: "dfaq-4",
      question: "Does this account for pregnancy or senior dogs?",
      answer:
        "Yes. Pregnancy and senior feeding typically require different energy needs, so we apply higher or lower multipliers based on the selected life stage. For pregnancy and medical conditions, follow your veterinarian’s guidance.",
    },
  ],
};

