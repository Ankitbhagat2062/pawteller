import type { LucideIcon } from "lucide-react";
import {
  Baby,
  BadgeCheck,
  CalendarDays,
  DollarSign,
  Dumbbell,
  LineChart,
  PawPrint,
  Scale,
  Sparkles,
  Utensils,
} from "lucide-react";
import { z } from "zod";
import {
  calculatorPageCms,
  type calculatorPageCmsProps,
} from "@/lib/cms/calculatorpage";

export const calculatorCmsIconNames = [
  "Baby",
  "BadgeCheck",
  "CalendarDays",
  "DollarSign",
  "Dumbbell",
  "LineChart",
  "PawPrint",
  "Scale",
  "Sparkles",
  "Utensils",
] as const;

export type CalculatorCmsIconName = (typeof calculatorCmsIconNames)[number];

export const calculatorCmsIconMap: Record<CalculatorCmsIconName, LucideIcon> = {
  Baby,
  BadgeCheck,
  CalendarDays,
  DollarSign,
  Dumbbell,
  LineChart,
  PawPrint,
  Scale,
  Sparkles,
  Utensils,
};

const iconEntries = Object.entries(calculatorCmsIconMap) as Array<
  [CalculatorCmsIconName, LucideIcon]
>;

const CtaSchema = z.object({
  label: z.string().min(1).max(200),
  href: z.string().min(1).max(500),
  ariaLabel: z.string().min(1).max(300),
});

const IconNameSchema = z.enum(calculatorCmsIconNames);

const SeoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  keywords: z.array(z.string().min(1).max(100)).min(1).max(100),
});

const HeroSchema = z.object({
  logo: z.object({ title: z.string().min(1).max(200) }),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  cta: z.array(CtaSchema).min(1).max(6),
  buttons: z
    .array(
      z.object({
        label: z.string().min(1).max(200),
        icon: IconNameSchema,
        className: z.string().max(300).default(""),
      }),
    )
    .min(1)
    .max(8),
  image: z.object({
    src: z.string().min(1).max(2000),
    alt: z.string().min(1).max(300),
  }),
});

const CalculatorSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  link: z.string().min(1).max(500),
  badge: z.object({
    bg: z.string().min(1).max(80),
    fg: z.string().min(1).max(80),
    icon: IconNameSchema,
  }),
});

const CalculatorSectionSchema = z.object({
  p: z.string().min(1).max(100),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  cta: CtaSchema,
  calculators: z.array(CalculatorSchema).min(1).max(30),
});

const WhyUseSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  reasons: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(1200),
        icon: IconNameSchema,
        className: z.string().max(300).default(""),
      }),
    )
    .min(1)
    .max(12),
  feature: z.object({
    banner: z.string().min(1).max(200),
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(3000),
    cta: z.array(CtaSchema).min(1).max(6),
  }),
});

const FaqSchema = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(3000),
  faqItems: z
    .array(
      z.object({
        id: z.string().max(100).optional(),
        question: z.string().min(1).max(500),
        answer: z.string().min(1).max(5000),
      }),
    )
    .min(1)
    .max(50),
});

const BacklinkSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(1000),
  cta: z.array(CtaSchema).min(1).max(12),
  footer: z.object({
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(2000),
    cta: CtaSchema,
  }),
});

const SeoBlockSchema = z.object({
  title: z.string().min(1).max(300),
  description: z.string().min(1).max(5000),
  services: z
    .array(z.object({ title: z.string().min(1).max(200) }))
    .min(1)
    .max(20),
  footer: z.object({
    p: z.string().min(1).max(200),
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(3000),
    cta: z.array(CtaSchema).min(1).max(8),
  }),
});

export const CalculatorCmsSchema = z.object({
  slug: z.literal("calculators-home").default("calculators-home"),
  seo: SeoSchema,
  heroSection: HeroSchema,
  calculatorSection: CalculatorSectionSchema,
  whyUsecalculatorSection: WhyUseSchema,
  faqSection: FaqSchema,
  backlinkblogSection: BacklinkSchema,
  seoblockSection: SeoBlockSchema,
});

export type SerializedCalculatorPageCms = z.infer<typeof CalculatorCmsSchema>;

function iconToName(icon: LucideIcon): CalculatorCmsIconName {
  return (
    iconEntries.find(([, candidate]) => candidate === icon)?.[0] ?? "PawPrint"
  );
}

function iconFromName(icon: CalculatorCmsIconName): LucideIcon {
  return calculatorCmsIconMap[icon] ?? PawPrint;
}

export function serializeCalculatorPageCms(
  cms: calculatorPageCmsProps = calculatorPageCms,
): SerializedCalculatorPageCms {
  return {
    slug: "calculators-home",
    seo: cms.seo,
    heroSection: {
      ...cms.heroSection,
      buttons: cms.heroSection.buttons.map((button) => ({
        ...button,
        icon: iconToName(button.icon),
      })),
    },
    calculatorSection: {
      ...cms.calculatorSection,
      calculators: cms.calculatorSection.calculators.map((calculator) => ({
        ...calculator,
        badge: {
          ...calculator.badge,
          icon: iconToName(calculator.badge.icon),
        },
      })),
    },
    whyUsecalculatorSection: {
      ...cms.whyUsecalculatorSection,
      reasons: cms.whyUsecalculatorSection.reasons.map((reason) => ({
        ...reason,
        icon: iconToName(reason.icon),
      })),
    },
    faqSection: cms.faqSection,
    backlinkblogSection: cms.backlinkblogSection,
    seoblockSection: cms.seoblockSection,
  };
}

export function hydrateCalculatorPageCms(
  cms: SerializedCalculatorPageCms,
): calculatorPageCmsProps {
  return {
    seo: cms.seo,
    heroSection: {
      ...cms.heroSection,
      buttons: cms.heroSection.buttons.map((button) => ({
        ...button,
        icon: iconFromName(button.icon),
      })),
    },
    calculatorSection: {
      ...cms.calculatorSection,
      calculators: cms.calculatorSection.calculators.map((calculator) => ({
        ...calculator,
        badge: {
          ...calculator.badge,
          icon: iconFromName(calculator.badge.icon),
        },
      })),
    },
    whyUsecalculatorSection: {
      ...cms.whyUsecalculatorSection,
      reasons: cms.whyUsecalculatorSection.reasons.map((reason) => ({
        ...reason,
        icon: iconFromName(reason.icon),
      })),
    },
    faqSection: cms.faqSection,
    backlinkblogSection: cms.backlinkblogSection,
    seoblockSection: cms.seoblockSection,
  };
}

export const defaultSerializedCalculatorPageCms = serializeCalculatorPageCms();
