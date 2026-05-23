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

export interface BlogPostPageProps {
  params: Promise<{ blogPost: string }>;
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
export interface BlogPost {
  imageSrc: string;
  title: string;
  description: string;
  url: string;
  totalTime: string;
  content: contentProps[];
  category: string;
  date?: string;
  bgColor?: string;
}
export interface contentProps {
  title: string;
  description: string;
  time?: string;
}

interface stepsProps {
  question: string;
  options: string[];
}
export interface quizDataProps {
  banner: string;
  title: string;
  totalQuestions: number;
  estimatedTime: string;
  steps: stepsProps[];
}

export interface CalculatorState {
  weight: number;
  lifeStage: string;
  activityLevel: string;
}

export interface Results {
  dailyCalories: number;
  cupsPerDay: number;
}

export interface GrowthInfo {
  predictedWeight: number;
  typicalRange: [number, number];
  percentageGrown: number;
  growthCurve: number[];
  monthsToMaturity: number;
  warningMessage?: string;
}

export interface DogName {
  name: string;
  gender: "Male" | "Female" | "Unisex";
  size: "Small" | "Medium" | "Large" | "Extra Large";
  personalities: string[];
  description?: string;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
  personalities: string[];
}

export interface BreedData {
  name: string;
  typicalRange: [number, number];
  growthCurve: number[]; // Weight at each month (0-18)
}

export type BreedSize = "small" | "medium" | "large" | "giant";

export interface PregnancyResult {
  dueDate: Date;
  daysRemaining: number;
  currentWeek: number;
  daysElapsed: number;
  careNote: string;
}
