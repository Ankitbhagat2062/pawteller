"use client";

import { useEffect, useState } from "react";
import { BestNamesSection } from "@/components/calculators/dogNameComponents/BestNameSection";
import { CategoriesSection } from "@/components/calculators/dogNameComponents/CategoriesSection";
import { FilterSection } from "@/components/calculators/dogNameComponents/FilterSection";
import HowToChooseSection from "@/components/calculators/dogNameComponents/HowToChooseSection";
import { ResultsGrid } from "@/components/calculators/dogNameComponents/ResultsGrid";
import { FaqSection } from "@/components/shared/FaqSection";
import { DogNameFaqItems, generateDogNames } from "@/lib/cms/calculators/dognamepage";
import type { DogGender, DogName, DogSize, StartingLetter } from "@/lib/types";
import BacklinkCalculatorCard from "@/components/shared/BacklinkCalculatorCard";
import { backlinks } from "@/lib/cms/calculators/calculatorpage";
import { fetchFaq } from "@/db/faqCmsDb";

const INITIAL_GENDER: DogGender | "All" = "All";
const INITIAL_SIZE: DogSize | "All" = "All";
const INITIAL_STARTING_LETTER: StartingLetter = "All";

// generateDogNames only supports sizes present in the current seed data (Small | Medium | Large).
function toSupportedSize(
  size: DogSize | "All",
): "Small" | "Medium" | "Large" | "All" {
  return (size === "Extra Large" ? "Large" : size) as
    | "Small"
    | "Medium"
    | "Large"
    | "All";
}

export async function DogNameGenerator({token}:{token:string}) {
  const [gender, setGender] = useState<DogGender | "All">(INITIAL_GENDER);
  const [size, setSize] = useState<DogSize | "All">(INITIAL_SIZE);
  const [startingLetter, setStartingLetter] = useState<StartingLetter>(
    INITIAL_STARTING_LETTER,
  );
  const [results, setResults] = useState<DogName[]>([]);

  const handleGenerate = () => {
    const safeSize = toSupportedSize(size);
    const newNames = generateDogNames(gender, safeSize, startingLetter, 8);
    setResults(newNames);
  };

  // Generate initial names on mount
  useEffect(() => {
    const safeInitialSize = toSupportedSize(INITIAL_SIZE);
    setResults(
      generateDogNames(
        INITIAL_GENDER,
        safeInitialSize,
        INITIAL_STARTING_LETTER,
        8,
      ),
    );
  }, []);

  const handleGenderChange = (value: DogGender | "All") => {
    setGender(value);
  };

  const handleSizeChange = (value: DogSize | "All") => {
    setSize(value);
  };

  const handleLetterChange = (value: StartingLetter) => {
    setStartingLetter(value);
  };

  // Fetch the FAQ array for this specific page layout string
  const faqData = await fetchFaq("dog-name", token);
  const faqItems = faqData?.items ? faqData : DogNameFaqItems; // Fallback to the default FAQ items if empty or missing
  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Dog Name <span className="text-green-500">Generator</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Find the perfect name for your furry friend. Whether you want
            something playful, strong, unique, or classic, our generator has you
            covered!
          </p>
        </div>

        {/* Filter and Results Section */}
        <div className="space-y-8">
          <FilterSection
            gender={gender}
            size={size}
            startingLetter={startingLetter}
            onGenderChange={handleGenderChange}
            onSizeChange={handleSizeChange}
            onLetterChange={handleLetterChange}
            onGenerate={handleGenerate}
          />

          {results.length > 0 && (
            <ResultsGrid names={results} onRefresh={handleGenerate} />
          )}
        </div>

        {/* Categories Section */}
        <CategoriesSection />

        {/* Best Names by Personality */}
        <BestNamesSection />

        {/* How to Choose Section */}
        <HowToChooseSection />

        {/* Backlinks || Other Calculators and services */}
        {(() => {
          // Map only 2 stable calculators (exclude Dog Name itself)
          const eligibleCards = backlinks.filter(
            (card) => card.cta.href !== "/calculators/dog-name",
          );

          const stableIndexSeed =
            eligibleCards.map((card) => card.title).sort().join("|") ||
            "dog-name-generator";
          let hash = 0;
          for (let i = 0; i < stableIndexSeed.length; i++) {
            hash = (hash * 31 + stableIndexSeed.charCodeAt(i)) >>> 0;
          }

          const start =
            eligibleCards.length === 0 ? 0 : hash % eligibleCards.length;
          const cards = [
            eligibleCards[start],
            eligibleCards[(start + 1) % eligibleCards.length],
          ].filter(Boolean);

          return <BacklinkCalculatorCard cards={cards} />
        })()}

        {/* FAQ Section */}
        <FaqSection items={faqItems} />
      </div>
    </div>
  );
}
