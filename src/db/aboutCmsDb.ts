import { cache } from "react";
import { getCalculatorPageCms } from "@/db/calculatorCmsDb";
import {
  type AboutAdminCms,
  AboutContentSchema,
  defaultAboutAdminCms,
  defaultSerializedAboutContent,
  hydrateAboutPageCms,
} from "@/hooks/aboutCms";
import { AboutPageCms } from "@/lib/cms/aboutpage";
import connectDB from "@/lib/mongodb";
import type { FAQItem } from "@/lib/types";
import AboutCmsModel from "@/models/aboutCms";
import FaqPageModel from "@/models/faq";
import SeoPageModel from "@/models/seo";
import { error } from "console";

export type AboutPageCmsWithFaq = ReturnType<typeof hydrateAboutPageCms> & {
  faqItems: FAQItem[];
};
function mapFaqItems(faq: { items: Array<{ question: string; answer: string }> } | null): FAQItem[] {
  return faq?.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  })) ?? [];
}
export const getAboutPageCms = cache(async (): Promise<AboutPageCmsWithFaq> => {
  try {
    await connectDB();

    const [aboutContent, seo, faq] = await Promise.all([
      AboutCmsModel.findOne({ slug: "about" }).lean(),
      SeoPageModel.findOne({ pageKey: "about" }).lean(),
      FaqPageModel.findOne({ pageKey: "about" }).lean(),
    ]);

    const parsed = AboutContentSchema.safeParse(aboutContent);
    const content = parsed.success
      ? parsed.data
      : defaultSerializedAboutContent;

    return {
      ...hydrateAboutPageCms(content, {
        title: seo?.title ?? AboutPageCms.seo.title,
        description: seo?.description ?? AboutPageCms.seo.description,
        keywords: seo?.keywords ?? AboutPageCms.seo.keywords,
        jsonLd: AboutPageCms.seo.jsonLd,
      }),
      faqItems: mapFaqItems(faq),
    };
  } catch {
    return {
      ...AboutPageCms,
      faqItems: [],
    };
  }
});

export async function getAboutAdminCms(): Promise<
  AboutAdminCms & {
    calculatorOptions: Array<{
      title: string;
      href: string;
      description: string;
    }>;
  }
> {
  try {
    await connectDB();

    const [aboutContent, seo, faq, calculatorPageCms] = await Promise.all([
      AboutCmsModel.findOne({ slug: "about" }).lean(),
      SeoPageModel.findOne({ pageKey: "about" }).lean(),
      FaqPageModel.findOne({ pageKey: "about" }).lean(),
      getCalculatorPageCms(),
    ]);

    const parsed = AboutContentSchema.safeParse(aboutContent);
    const content = parsed.success
      ? parsed.data
      : defaultSerializedAboutContent;

    return {
      ...content,
      seo: {
        title: seo?.title ?? AboutPageCms.seo.title,
        description: seo?.description ?? AboutPageCms.seo.description,
        keywords: seo?.keywords ?? AboutPageCms.seo.keywords,
      },
      faqItems: mapFaqItems(faq),
      calculatorOptions: calculatorPageCms.calculatorSection.calculators.map(
        (calculator) => ({
          title: calculator.title,
          href: calculator.link,
          description: calculator.description,
        }),
      ),
    };
  } catch (error) {
    console.error('[getAboutPageCms] Failed to load About CMS from database:', error);
    const calculatorPageCms = await getCalculatorPageCms();

    return {
      ...defaultAboutAdminCms,
      calculatorOptions: calculatorPageCms.calculatorSection.calculators.map(
        (calculator) => ({
          title: calculator.title,
          href: calculator.link,
          description: calculator.description,
        }),
      ),
    };
  }
}
