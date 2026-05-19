import type { LucideIcon } from "lucide-react";

export type badgeType = {
  bg: string;
  fg: string;
  icon: LucideIcon;
};

export interface CalculatorProps {
  title: string;
  description: string;
  link: string;
  badge: badgeType;
}

export interface ArticleProps {
  category: string;
  title: string;
  excerpt: string;
  minutes: number;
  date: string;
  imageSrc: string;
  bgColor: string;
}

export interface homeImageProps {
  src: string;
  alt: string;
}

export interface featureProps {
  title: string;
  href: string;
}

export interface SectionProps {
  id: string;
  title: string;
  content: string;
}

export interface dogLifeStageProps {
  icon: string;
  age: string;
  stage: string;
  weight: string;
  className: string;
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
}

export interface featuredCalculatorCardProps {
  title: string;
  displayTitle: string;
  description: string;
  bg: string;
  darkBg: string;
  className: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
}
