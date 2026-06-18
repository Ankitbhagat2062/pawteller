export type FormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export interface seoProps {
  title: string;
  description: string;
  keywords: string[];
}
export interface ImageConfig {
  src: string;
  alt: string;
}

export interface SectionProps {
  id: string;
  title: string;
  content: string;
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
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
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  banner: string;
  category?: string;
  title: string;
  totalQuestions: number;
  estimatedTime: string;
  url: string;
  header: string;
  subheader: string;
  button: string;
  steps: stepsProps[];
  dogs?: string[];
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

export interface PersonalityGroup {
  title: string;
  personality: string;
  icon: string;
}

export interface PuppyFormProps {
  onSubmit: (breed: string, ageMonths: number, weightLbs: number) => void;
  disabled?: boolean;
}

export interface ResultCardProps {
  growthInfo: GrowthInfo;
  puppyImage?: string;
}

export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export type DogGender = DogName["gender"];
export type DogSize = DogName["size"];

export type StartingLetter =
  | "All"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

export interface FilterSectionProps {
  gender: DogGender | "All";
  size: DogSize | "All";
  startingLetter: StartingLetter;
  onGenderChange: (value: DogGender | "All") => void;
  onSizeChange: (value: DogSize | "All") => void;
  onLetterChange: (value: StartingLetter) => void;
  onGenerate: () => void;
}

export interface ResultsGridProps {
  names: DogName[];
  onRefresh: () => void;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
