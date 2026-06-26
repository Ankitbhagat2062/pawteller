"use client";

import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";
import BacklinkCalculatorCard from "@/components/shared/BacklinkCalculatorCard";
import BlogCard from "@/components/shared/BlogCard";
import { FaqSection } from "@/components/shared/FaqSection";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { blogPosts } from "@/lib/cms/blogpage";
import { backlinks } from "@/lib/cms/calculators/calculatorpage";
import {
  ACTIVITY_MULTIPLIERS,
  dogFoodPageCms,
  LIFE_STAGE_MULTIPLIERS,
} from "@/lib/cms/calculators/dogfoodpage";
import { selectBacklinkCards } from "@/lib/selectBacklinkCards";
import type { CalculatorState, Results } from "@/lib/types";
import { WhySection } from "./dogfoodcomponents/WhySection";
import { fetchFaq } from "@/db/faqCmsDb";

const calculateCalories = (state: CalculatorState): Results => {
  const { weight, lifeStage, activityLevel } = state;

  if (!weight || weight <= 0) {
    return { dailyCalories: 0, cupsPerDay: 0 };
  }

  // RER = 70 × (weight in kg)^0.75
  const weightKg = weight / 2.205;
  const rer = 70 * weightKg ** 0.75;

  const lifeStageMultiplier = LIFE_STAGE_MULTIPLIERS[lifeStage] || 1.8;
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.5;

  const dailyCalories = Math.round(
    rer * lifeStageMultiplier * activityMultiplier,
  );
  const cupsPerDay = Math.round((dailyCalories / 350) * 10) / 10;

  return { dailyCalories, cupsPerDay };
};

export default function DogFood({ token }: { token: string }) {
  const [state, setState] = useState<CalculatorState>({
    weight: 30,
    lifeStage: "Adult",
    activityLevel: "Moderate walks",
  });

  const [results, setResults] = useState<Results>(calculateCalories(state));

  useEffect(() => {
    setResults(calculateCalories(state));
  }, [state]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setState((prev) => ({ ...prev, weight: value }));
  };

  const handleLifeStageChange = (value: string) => {
    setState((prev) => ({ ...prev, lifeStage: value }));
  };

  const handleActivityChange = (value: string) => {
    setState((prev) => ({ ...prev, activityLevel: value }));
  };
  const header = dogFoodPageCms.header;
  const faqSection = dogFoodPageCms.faqSection;

  // Fetch the FAQ array for this specific page layout string
  const [faqItems, setFaqItems] = useState(faqSection);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const faqData = await fetchFaq("dog-food");
      const nextFaqItems =
        Array.isArray(faqData?.items) && faqData.items.length > 0
          ? faqData.items
          : faqSection;

      if (!cancelled) setFaqItems(nextFaqItems);
    })();
    return () => {
      cancelled = true;
    };
  }, [faqSection]);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        {header && (
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5 text-orange-600 dark:text-orange-500" />
              <span className="text-sm font-semibold tracking-widest text-orange-600 dark:text-orange-500 uppercase">
                Dog Food Calculator
              </span>
            </div>

            {(() => {
              const title: string = header.title
                ? header.title
                : "How much should your dog really eat?";
              const words: string[] = title.trim().split(/\s+/);

              return (
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 text-balance">
                  {(() => {
                    if (words.length === 0) {
                      return "How much should your dog really eat?";
                    }

                    if (words.length === 1) {
                      return words[0];
                    }

                    if (words.length === 2) {
                      // Preserve the existing styling structure: highlight the last “tail” word.
                      return (
                        <>
                          {words[0]}{" "}
                          <span className="italic text-foreground/70">
                            {words[1]}
                          </span>
                        </>
                      );
                    }

                    const firstPart: string = words.slice(0, -2).join(" ");
                    const secondPart: string = words[words.length - 2];
                    const thirdPart: string = words[words.length - 1];

                    return (
                      <>
                        {firstPart}{" "}
                        <span className="italic text-foreground/70">
                          {secondPart}
                        </span>{" "}
                        {thirdPart}
                      </>
                    );
                  })()}
                </h1>
              );
            })()}

            <p className="text-lg text-foreground/70 max-w-2xl">
              {header.description
                ? header.description
                : `Calorie needs vary by weight, age and activity. Get an
              evidence-based daily portion in seconds.`}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Input Form */}
          <Card className="p-6 sm:p-8 bg-card border border-border">
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="weight"
                  className="text-sm font-semibold mb-2 block"
                >
                  Weight (lbs)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  step="0.1"
                  value={state.weight}
                  onChange={handleWeightChange}
                  className="bg-background border-border text-foreground placeholder:text-foreground/50 py-6"
                  placeholder="Enter weight"
                />
              </div>

              <div>
                <Label
                  htmlFor="lifeStage"
                  className="text-sm font-semibold mb-2 block"
                >
                  Life stage
                </Label>
                <Select
                  value={state.lifeStage}
                  onValueChange={handleLifeStageChange}
                >
                  <SelectTrigger
                    id="lifeStage"
                    className="bg-background border-border text-foreground py-6"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Puppy">Puppy</SelectItem>
                    <SelectItem value="Adult">Adult</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Pregnant">Pregnant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="activity"
                  className="text-sm font-semibold mb-2 block"
                >
                  Activity level
                </Label>
                <Select
                  value={state.activityLevel}
                  onValueChange={handleActivityChange}
                >
                  <SelectTrigger
                    id="activity"
                    className="bg-background border-border text-foreground py-6"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sedentary">Sedentary</SelectItem>
                    <SelectItem value="Moderate walks">
                      Moderate walks
                    </SelectItem>
                    <SelectItem value="Very active">Very active</SelectItem>
                    <SelectItem value="Extremely active">
                      Extremely active
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Results Card */}
          <div className="bg-linear-to-br from-emerald-700 to-emerald-800 dark:from-emerald-900 dark:to-emerald-950 rounded-2xl p-6 sm:p-8 text-white">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold tracking-wide uppercase opacity-90 mb-2">
                  Daily Calories
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-bold">
                    {results.dailyCalories}
                  </span>
                  <span className="text-2xl opacity-90">kcal</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-wide uppercase opacity-90 mb-2">
                  Cups Per Day
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-bold">
                    {results.cupsPerDay}
                  </span>
                </div>
                <p className="text-sm opacity-75 mt-2">
                  based on ~350 kcal/cup
                </p>
              </div>

              <div className="pt-4 border-t border-white/20">
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-lg mt-0.5">💡</span>
                  <p className="opacity-90">
                    Split into 2–3 meals for adults; 3–4 for puppies. Always
                    read your kibble label for accurate cup–calorie conversion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Science Section */}
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-balance">
            The science (RER × multiplier)
          </h2>
          <p className="text-foreground/70 leading-relaxed max-w-3xl">
            We start with Resting Energy Requirement — 70 × (weight in kg)
            <sup>0.75</sup> — then apply a multiplier for life stage and
            activity. This is the same approach used by veterinary nutritionists
            worldwide.
          </p>
        </div>

        {/* Backlinks || Other Calculators and services */}
        {(() => {
          // Map only 2 random calculators (exclude Dog Age itself)
          const eligibleCards = backlinks.filter(
            (card) => card.cta.href !== "/calculators/dog-food",
          );

          const stableIndexSeed = `${state.weight}-${4}`;
          const cards = selectBacklinkCards(eligibleCards, stableIndexSeed);

          return <BacklinkCalculatorCard cards={cards} />
        })()}

        {/* Why you should use this calculator */}
        <WhySection
          title={dogFoodPageCms.whySection.title}
          bullets={dogFoodPageCms.whySection.bullets}
          disclaimer={dogFoodPageCms.whySection.disclaimer}
        />

        {/* Blog */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(() => {
            const nutritionPosts = blogPosts.filter(
              (post) => post.category === "Nutrition",
            );
            if (nutritionPosts.length === 0) return null;

            // 2. Map over the array of matching blog posts
            return nutritionPosts.map((article) => (
              <BlogCard key={article.url} {...article} />
            ));
          })()}
        </div>

        {/* FAQ */}
        <FaqSection items={faqItems} />

      </div>
    </main>
  );
}
