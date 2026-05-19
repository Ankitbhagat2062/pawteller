
type badgeType = {
  bg: string;
  fg: string;
  icon: React.ComponentType<any>;
}

interface CalculatorProps {
  title: string;
  description: string;
  link: string;
  badge: badgeType;
}

interface ArticleProps {
  category: string;
  title: string;
  excerpt: string;
  minutes: number;
  date: string;
  imageSrc: string;
  bgColor: string;
}

interface homeImageProps {
  src: string;
  alt: string;
}

interface featureProps {
  title: string;
  href: string;
}

interface SectionProps {
  id: string;
  title: string;
  content: string;
}

interface dogLifeStageProps {
  icon: string;
  age: string;
  stage: string;
  weight: string;
  className: string;
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
}

interface featuredCalculatorCardProps {
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
