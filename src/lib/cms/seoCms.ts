import type { seoProps } from "@/lib/types";
import { AboutPageCms } from "./aboutpage";
import { blogPageSeo } from "./blogpage";
import { calculatorPageCms } from "./calculatorpage";
import { homepageCms } from "./homepage";
import { quizData } from "./quizpage";

export type SeoPageKey =
  | "home"
  | "about"
  | "contact"
  | "terms"
  | "privacy"
  | "quiz"
  | "dog-age"
  | "dog-food"
  | "dog-name"
  | "dog-pregnancy"
  | "dog-growth"
  | "puppy-weight"
  | "blog";

// Static defaults (used when MongoDB has no entry yet)
export const seoDefaults: Record<SeoPageKey, seoProps> = {
  home: homepageCms.seo,
  about: AboutPageCms.seo,
  blog: blogPageSeo,
  quiz: quizData[0]?.seo ?? {
    title: "Dog Quiz | Pawteller",
    description: "Take our interactive dog quiz.",
    keywords: ["dog quiz"],
  },
  // Calculators
  "dog-age": calculatorPageCms.seo,
  "dog-food": calculatorPageCms.seo,
  "dog-name": calculatorPageCms.seo,
  "dog-pregnancy": calculatorPageCms.seo,
  "dog-growth": calculatorPageCms.seo,
  "puppy-weight": calculatorPageCms.seo,
  // These pages don’t have CMS files in repo yet—use reasonable placeholders.
  contact: {
    title: "Contact Pawteller | Pet Care Questions",
    description:
      "Contact Pawteller for dog care questions, calculator help, and content feedback.",
    keywords: ["contact pawteller", "dog care questions"],
  },
  terms: {
    title: "Terms of Service | Pawteller",
    description:
      "Read Pawteller terms of service for using our pet calculators and guides.",
    keywords: ["terms", "terms of service", "pawteller"],
  },
  privacy: {
    title: "Privacy Policy | Pawteller",
    description:
      "Review Pawteller privacy policy about your data and subscriptions.",
    keywords: ["privacy policy", "pawteller", "data"],
  },
};
