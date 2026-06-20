import type { LucideIcon } from "lucide-react";
import { Compass, PawPrint, Search, ShieldAlert, Zap } from "lucide-react";
import { z } from "zod";
import {
  AboutPageCms,
  type AboutPageCmsProps,
  type rightProps,
} from "@/lib/cms/aboutpage";

export const aboutCmsIconNames = [
  "Compass",
  "PawPrint",
  "Search",
  "ShieldAlert",
  "Zap",
] as const;

export type AboutCmsIconName = (typeof aboutCmsIconNames)[number];

export const aboutCmsIconMap: Record<AboutCmsIconName, LucideIcon> = {
  Compass,
  PawPrint,
  Search,
  ShieldAlert,
  Zap,
};

const iconEntries = Object.entries(aboutCmsIconMap) as Array<
  [AboutCmsIconName, LucideIcon]
>;

export const AboutCtaSchema = z.object({
  label: z.string().min(1).max(200),
  href: z.string().min(1).max(500),
  ariaLabel: z.string().min(1).max(300),
});

export const AboutSeoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  keywords: z.array(z.string().min(1).max(100)).min(1).max(100),
});

const AboutIconCardSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  icon: z.enum(aboutCmsIconNames).default("PawPrint"),
});

export const AboutFaqItemSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
});

export const AboutContentSchema = z.object({
  slug: z.literal("about").default("about"),
  heroSection: z.object({
    right: z.object({
      title: z.string().min(1).max(200),
      description: z.string().min(1).max(3000),
      buttons: z.array(AboutCtaSchema).min(1).max(8),
    }),
    left: z.object({
      title: z.string().min(1).max(200),
      speed: z.string().min(1).max(500),
      Clarity: z.string().min(1).max(500),
      footertext: z.string().min(1).max(500),
      owner: z.string().min(1).max(500),
    }),
  }),
  missionSection: z.object({
    left: z.object({
      title: z.string().min(1).max(300),
      description: z.string().min(1).max(5000),
    }),
    right: z.array(AboutIconCardSchema).min(1).max(12),
  }),
  trustPrincipleSection: z.object({
    banner: z.string().min(1).max(200),
    title: z.string().min(1).max(300),
    content: z.array(AboutIconCardSchema).min(1).max(12),
  }),
  actionblockSection: z.object({
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(3000),
    cta: z.array(AboutCtaSchema).min(1).max(12),
  }),
  medicalWarningSection: AboutIconCardSchema,
  bottomCtaBand: z.object({
    banner: z.string().min(1).max(200),
    title: z.string().min(1).max(300),
    description: z.string().min(1).max(3000),
    cta: AboutCtaSchema,
  }),
});

export const AboutAdminCmsSchema = AboutContentSchema.extend({
  seo: AboutSeoSchema,
  faqItems: z.array(AboutFaqItemSchema).max(100),
});

export type SerializedAboutContent = z.infer<typeof AboutContentSchema>;
export type AboutAdminCms = z.infer<typeof AboutAdminCmsSchema>;

function iconToName(icon?: LucideIcon): AboutCmsIconName {
  return (
    iconEntries.find(([, candidate]) => candidate === icon)?.[0] ?? "PawPrint"
  );
}

function iconFromName(icon?: AboutCmsIconName): LucideIcon {
  return icon ? aboutCmsIconMap[icon] : PawPrint;
}

function serializeIconCard(card: rightProps) {
  return {
    title: card.title,
    description: card.description,
    icon: iconToName(card.icon),
  };
}

function hydrateIconCard(
  card: z.infer<typeof AboutIconCardSchema>,
): rightProps {
  return {
    title: card.title,
    description: card.description,
    icon: iconFromName(card.icon),
  };
}

export function serializeAboutPageCms(
  cms: AboutPageCmsProps = AboutPageCms,
): SerializedAboutContent {
  return {
    slug: "about",
    heroSection: cms.heroSection,
    missionSection: {
      left: cms.missionSection.left,
      right: cms.missionSection.right.map(serializeIconCard),
    },
    trustPrincipleSection: {
      ...cms.trustPrincipleSection,
      content: cms.trustPrincipleSection.content.map(serializeIconCard),
    },
    actionblockSection: cms.actionblockSection,
    medicalWarningSection: serializeIconCard(cms.medicalWarningSection),
    bottomCtaBand: cms.bottomCtaBand,
  };
}

export function hydrateAboutPageCms(
  content: SerializedAboutContent,
  seo: AboutPageCmsProps["seo"] = AboutPageCms.seo,
): AboutPageCmsProps {
  return {
    seo,
    heroSection: content.heroSection,
    missionSection: {
      left: content.missionSection.left,
      right: content.missionSection.right.map(hydrateIconCard),
    },
    trustPrincipleSection: {
      ...content.trustPrincipleSection,
      content: content.trustPrincipleSection.content.map(hydrateIconCard),
    },
    actionblockSection: content.actionblockSection,
    medicalWarningSection: hydrateIconCard(content.medicalWarningSection),
    bottomCtaBand: content.bottomCtaBand,
  };
}

export const defaultSerializedAboutContent = serializeAboutPageCms();

export const defaultAboutAdminCms: AboutAdminCms = {
  ...defaultSerializedAboutContent,
  seo: {
    title: AboutPageCms.seo.title,
    description: AboutPageCms.seo.description,
    keywords: AboutPageCms.seo.keywords,
  },
  faqItems: [],
};
