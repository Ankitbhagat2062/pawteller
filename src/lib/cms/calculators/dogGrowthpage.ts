import type { BreedData, FAQItem, GrowthInfo, seoProps } from "@/lib/types";

// Based on veterinary growth curves for typical breed development
export const BREED_DATA: Record<string, BreedData> = {
  "Labrador Retriever": {
    name: "Labrador Retriever",
    typicalRange: [55, 80],
    growthCurve: [
      1.5, 5, 10, 16, 22, 28, 34, 39, 44, 48, 52, 55, 58, 60, 62, 65, 68, 72,
      75,
    ],
  },
  "Golden Retriever": {
    name: "Golden Retriever",
    typicalRange: [55, 75],
    growthCurve: [
      1.5, 5, 10, 16, 22, 28, 34, 39, 44, 48, 52, 55, 58, 60, 62, 65, 68, 72,
      75,
    ],
  },
  "German Shepherd": {
    name: "German Shepherd",
    typicalRange: [50, 90],
    growthCurve: [
      1.5, 5, 12, 20, 30, 40, 48, 55, 62, 68, 72, 75, 78, 80, 82, 85, 87, 89,
      90,
    ],
  },
  "French Bulldog": {
    name: "French Bulldog",
    typicalRange: [28, 30],
    growthCurve: [
      0.5, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
  Beagle: {
    name: "Beagle",
    typicalRange: [24, 30],
    growthCurve: [
      0.5, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 21, 23, 24, 25, 26, 27, 28, 30,
    ],
  },
  "Poodle (Standard)": {
    name: "Poodle (Standard)",
    typicalRange: [45, 70],
    growthCurve: [
      1.5, 4, 8, 14, 20, 28, 35, 40, 45, 50, 55, 58, 61, 63, 65, 67, 68, 69, 70,
    ],
  },
  Bulldog: {
    name: "Bulldog",
    typicalRange: [40, 50],
    growthCurve: [
      1, 3, 6, 10, 14, 18, 22, 26, 30, 33, 36, 38, 40, 42, 44, 45, 46, 48, 50,
    ],
  },
  Dachshund: {
    name: "Dachshund",
    typicalRange: [16, 32],
    growthCurve: [
      0.3, 1, 2, 3.5, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 32,
    ],
  },
  "Siberian Husky": {
    name: "Siberian Husky",
    typicalRange: [45, 60],
    growthCurve: [
      1.5, 5, 10, 16, 24, 32, 38, 43, 48, 51, 54, 56, 57, 58, 58.5, 59, 59.5,
      60, 60,
    ],
  },
  Chihuahua: {
    name: "Chihuahua",
    typicalRange: [2, 6],
    growthCurve: [
      0.1, 0.3, 0.6, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.3, 5.5, 5.7, 5.8, 5.9,
      6, 6,
    ],
  },
  "Shih Tzu": {
    name: "Shih Tzu",
    typicalRange: [9, 16],
    growthCurve: [
      0.2, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 15.5, 16,
    ],
  },
  "Cocker Spaniel": {
    name: "Cocker Spaniel",
    typicalRange: [25, 30],
    growthCurve: [
      0.5, 2, 4, 7, 10, 13, 16, 19, 21, 23, 24, 25, 26, 27, 27.5, 28, 28.5, 29,
      30,
    ],
  },
};

export const BREED_NAMES = Object.keys(BREED_DATA).sort();

export function calculatePuppyGrowth(
  breed: string,
  currentAgeMonths: number,
  currentWeightLbs: number,
): GrowthInfo {
  const breedData = BREED_DATA[breed];
  if (!breedData) {
    throw new Error(`Breed ${breed} not found`);
  }

  if (currentAgeMonths < 1 || currentAgeMonths > 18) {
    throw new Error("Age must be between 1 and 18 months");
  }

  if (currentWeightLbs < 0.1) {
    throw new Error("Weight must be greater than 0");
  }

  const currentBreedWeight =
    breedData.growthCurve[Math.floor(currentAgeMonths)] ||
    breedData.growthCurve[breedData.growthCurve.length - 1];

  // Calculate growth rate and predict adult weight
  const growthRate = currentWeightLbs / currentBreedWeight;
  const predictedAdultWeight = Math.round(
    breedData.growthCurve[breedData.growthCurve.length - 1] * growthRate,
  );

  const percentageGrown = Math.round(
    (currentWeightLbs /
      (breedData.growthCurve[breedData.growthCurve.length - 1] * growthRate)) *
      100,
  );

  let warningMessage: string | undefined;
  const [min, max] = breedData.typicalRange;
  if (predictedAdultWeight > max * 1.15) {
    warningMessage = "Slightly larger than typical — monitor with your vet.";
  } else if (predictedAdultWeight < min * 0.85) {
    warningMessage = "Slightly smaller than typical — consult with your vet.";
  }

  // Find when puppy reaches 95% of adult weight (maturity)
  let monthsToMaturity = 18;
  const targetWeight = predictedAdultWeight * 0.95;
  const scaledCurve = breedData.growthCurve.map((w) => w * growthRate);
  for (let i = 0; i < scaledCurve.length; i++) {
    if (scaledCurve[i] >= targetWeight) {
      monthsToMaturity = i;
      break;
    }
  }

  return {
    predictedWeight: predictedAdultWeight,
    typicalRange: breedData.typicalRange,
    percentageGrown,
    growthCurve: scaledCurve,
    monthsToMaturity,
    warningMessage,
  };
}

export const MATURITY_STAGES = [
  {
    category: "Toy",
    range: "9 mo",
    description: "Reaches adult size around 9 months",
  },
  {
    category: "Small",
    range: "12 mo",
    description: "Reaches adult size around 12 months",
  },
  {
    category: "Medium",
    range: "15 mo",
    description: "Reaches adult size around 15 months",
  },
  {
    category: "Large/Giant",
    range: "18–24 mo",
    description: "Reaches adult size around 18-24 months",
  },
];

export interface dogGrowthPageCmsProps {
  seo: seoProps;
  header: {
    title: string;
    description: string;
  };
  seoContent: {
    title: string;
    description: string;
    tips: {
      title: string;
      shortTips: { title: string }[];
    };
  };
  faqSection: FAQItem[];
}

export const faqSection: FAQItem[] = [
  {
    id: "gfaq-1",
    question: "How accurate is the puppy growth calculator?",
    answer:
      "The calculator uses established veterinary growth curves based on adult weight classifications (toy, small, medium, large, and giant). While it provides a highly accurate statistical baseline for standard development, individual growth spurts can vary depending on genetics, diet, and gender.",
  },
  {
    id: "gfaq-2",
    question: "At what age do puppies completely stop growing?",
    answer:
      "It depends heavily on the breed size. Toy and small breeds often reach their full adult size between 9 to 12 months. Medium breeds take about 12 months, while large and giant breeds (like Golden Retrievers or Great Danes) can continue filling out and growing structurally until they are 18 to 24 months old.",
  },
  {
    id: "gfaq-3",
    question:
      "What should I do if my puppy is tracking above or below the curve?",
    answer:
      "Slight deviations are normal, but a sudden spike or drop across growth percentiles warrants a check-in with your vet. Growing too fast can put dangerous stress on a large breed's developing joints, while falling behind could indicate nutritional gaps or underlying parasite issues.",
  },
  {
    id: "gfaq-4",
    question: "How does spaying or neutering affect my puppy's growth?",
    answer:
      "Early spaying or neutering removes sex hormones that signal the growth plates in a puppy's bones to close. Doing this too early can cause the bones to grow slightly longer than normal, which is why modern veterinary guidelines often recommend waiting until large or giant breeds are structurally mature.",
  },
];
export const dogGrowthPageCms: dogGrowthPageCmsProps = {
  seo: {
    title: "Dog Growth Calculator: Predict Adult Weight by Breed | Pawteller",
    description:
      "Use Pawteller’s dog growth calculator to predict your puppy’s adult weight. Enter breed, age, and current weight to see a clear growth forecast and milestone guidance.",
    keywords: [
      "dog growth calculator",
      "puppy weight calculator",
      "predict adult weight",
      "breed growth chart",
      "puppy growth predictor",
      "dog growth curve",
      "how big will my puppy get",
      "vet-informed puppy weight",
      "puppy milestone calculator",
      "adult weight estimate",
    ],
  },
  header: {
    title: "How big will your puppy get",
    description: `Predict your puppy's adult weight in seconds. We use breed-specific growth
              curves built from veterinary data to give you the most accurate forecast —
              plus a beautiful chart to watch their journey.`,
  },
  seoContent: {
    title: "How Our Calculator Works",
    description: `Our puppy weight calculator uses breed-specific growth curves developed from
                veterinary research. By inputting your puppy's current age, weight, and breed,
                we can accurately predict their adult size. The calculation takes into account
                the unique growth patterns of different dog sizes, from tiny Chihuahuas to
                large German Shepherds.`,
    tips: {
      title: "Tips for Puppy Growth",
      shortTips: [
        {
          title: `Monitor your puppy's weight regularly for accurate predictions`,
        },
        {
          title:
            "Large breed puppies need special nutrition for healthy development",
        },
        {
          title:
            "Growth rates vary — consult your veterinarian for breed-specific advice",
        },
        { title: "Most puppies reach their adult weight between 9-24 months" },
      ],
    },
  },
  faqSection,
};
