import { AboutPageCms } from "@/lib/cms/aboutpage";
import { blogPageSeo } from "@/lib/cms/blogpage";
import { calculatorPageCms } from "@/lib/cms/calculators/calculatorpage";
import { homepageCms } from "@/lib/cms/homepage";
import { quizData } from "@/lib/cms/quizpage";
import type { seoProps } from "@/lib/types";
import { dogAgePageCms } from "./calculators/dogagepage";
import { puppyWeightPageCms } from "./calculators/puppyweight";
import { dogGrowthPageCms } from "./calculators/dogGrowthpage";
import { dogFoodPageCms } from "./calculators/dogfoodpage";
import { DogNamePageCms } from "./calculators/dognamepage";
import { dogPregnancyCms } from "./calculators/dogpregnancypage";

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
  | "blog"
  | "calculator";

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
  calculator: calculatorPageCms.seo,
  // Calculators
  "dog-age":dogAgePageCms.seo,
  "dog-food": dogFoodPageCms.seo,
  "dog-name": DogNamePageCms.seo,
  "dog-pregnancy": dogPregnancyCms.seo,
  "dog-growth": dogGrowthPageCms.seo,
  "puppy-weight": puppyWeightPageCms.seo,
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
