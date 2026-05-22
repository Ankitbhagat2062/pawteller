"use client";

import { useEffect, useState } from "react";
import { generateDogNames } from "@/lib/constant";
import type { DogName } from "@/lib/types";
import { BestNamesSection } from "./BestNameSection";
import { CategoriesSection } from "./CategoriesSection";
import { FAQSection } from "./FAQSection";
import { FilterSection } from "./FilterSection";
import { HowToChooseSection } from "./HowToChooseSection";
import { ResultsGrid } from "./ResultsGrid";

export function DogNameGenerator() {
  const [gender, setGender] = useState<string>("All");
  const [size, setSize] = useState<string>("All");
  const [startingLetter, setStartingLetter] = useState<string>("All");
  const [results, setResults] = useState<DogName[]>([]);

  const handleGenerate = () => {
    const newNames = generateDogNames(gender, size, startingLetter, 8);
    setResults(newNames);
  };
  // Generate initial names on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleSizeChange = (value: string) => {
    setSize(value);
  };

  const handleLetterChange = (value: string) => {
    setStartingLetter(value);
  };

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

        {/* FAQ Section */}
        <FAQSection />
      </div>
    </div>
  );
}
