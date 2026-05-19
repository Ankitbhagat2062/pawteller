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
export interface contentProps {
  title: string;
  description: string;
  time?: string;
}
export interface BlogPost {
  imageSrc: string;
  title: string;
  description: string;
  url: string;
  totalTime: string;
  content: contentProps[],
  category:string,
  date?:string,
  bgColor?:string
}