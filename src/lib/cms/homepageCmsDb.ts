import { cache } from "react";
import { getCalculatorPageCms } from "@/db/calculatorCmsDb";
import { blogPosts } from "@/lib/cms/blogpage";
import {
  defaultHomepageContent,
  type HomepageCms,
  HomepageContentSchema,
  homepageCms,
} from "@/lib/cms/homepage";
import connectDB from "@/lib/mongodb";
import FaqPageModel from "@/models/faq";
import HomepageCmsModel from "@/models/homepageCms";
import SeoPageModel from "@/models/seo";

export const getHomepageCms = cache(async (): Promise<HomepageCms> => {
  try {
    await connectDB();

    const [homepageContent, seo, calculatorPageCms] = await Promise.all([
      HomepageCmsModel.findOne({ slug: "home" }).lean(),
      SeoPageModel.findOne({ pageKey: "home" }).lean(),
      getCalculatorPageCms(),
    ]);

    const parsed = HomepageContentSchema.safeParse(homepageContent);
    const content = parsed.success ? parsed.data : defaultHomepageContent;

    return {
      seo: {
        title: seo?.title ?? homepageCms.seo.title,
        description: seo?.description ?? homepageCms.seo.description,
        keywords: seo?.keywords ?? homepageCms.seo.keywords,
        jsonLd: homepageCms.seo.jsonLd,
      },
      hero: content.hero,
      featuredCalculators: {
        calculators: calculatorPageCms.calculatorSection.calculators,
        cards: content.featuredCalculatorCards,
      },
      dogLifes: content.dogLifes,
      breedQuizCtas: content.breedQuizCtas,
      knowledgeBase: content.knowledgeBase,
      blogPosts,
    };
  } catch {
    const calculatorPageCms = await getCalculatorPageCms();

    return {
      ...homepageCms,
      featuredCalculators: {
        calculators: calculatorPageCms.calculatorSection.calculators,
        cards: homepageCms.featuredCalculators.cards,
      },
    };
  }
});

export async function getHomepageAdminCms() {
  try {
    await connectDB();

    const [homepageContent, seo, faq, calculatorPageCms] = await Promise.all([
      HomepageCmsModel.findOne({ slug: "home" }).lean(),
      SeoPageModel.findOne({ pageKey: "home" }).lean(),
      FaqPageModel.findOne({ pageKey: "home" }).lean(),
      getCalculatorPageCms(),
    ]);

    const parsed = HomepageContentSchema.safeParse(homepageContent);

    return {
      ...(parsed.success ? parsed.data : defaultHomepageContent),
      seo: seo
        ? {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
          }
        : homepageCms.seo,
      faqItems:
        faq?.items.map((item) => ({
          question: item.question,
          answer: item.answer,
        })) ?? [],
      calculatorSection: calculatorPageCms.calculatorSection,
    };
  } catch {
    const calculatorPageCms = await getCalculatorPageCms();

    return {
      ...defaultHomepageContent,
      seo: homepageCms.seo,
      faqItems: [],
      calculatorSection: calculatorPageCms.calculatorSection,
    };
  }
}
