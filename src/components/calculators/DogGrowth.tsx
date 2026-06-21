"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FooterSection } from "@/components/calculators/doggrowthcomponents/DogGrowthFooterSection";
import { MaturitySection } from "@/components/calculators/doggrowthcomponents/MaturitySection";
import { PuppyForm } from "@/components/calculators/doggrowthcomponents/PuppyForm";
import { ResultCard } from "@/components/calculators/doggrowthcomponents/ResultCard";
import BacklinkCalculatorCard from "@/components/shared/BacklinkCalculatorCard";
import { FaqSection } from "@/components/shared/FaqSection";
import { backlinks } from "@/lib/cms/calculators/calculatorpage";
import {
  calculatePuppyGrowth,
  dogGrowthPageCms,
} from "@/lib/cms/calculators/dogGrowthpage";
import type { GrowthInfo } from "@/lib/types";
import { fetchFaq } from "@/db/faqCmsDb";
import { cookies } from "next/headers";

const PUPPY_IMAGE =
  "https://plus.unsplash.com/premium_photo-1726783313963-634203cb6402?q=80&w=1201&auto=format&fit=crop";

export default async function DogGrowth() {
  const [growthInfo, setGrowthInfo] = useState<GrowthInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // 1. Keep handleCalculate as a plain, clean function
  const handleCalculate = (
    breed: string,
    ageMonths: number,
    weightLbs: number,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = calculatePuppyGrowth(breed, ageMonths, weightLbs);
      setGrowthInfo(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setGrowthInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // 2. Initialize with default calculation on mount safely
  useEffect(() => {
    if (!initialized) {
      // Run the logic inline to avoid dependency reference updates
      setLoading(true);
      setError(null);
      try {
        const result = calculatePuppyGrowth("Labrador Retriever", 3, 25);
        setGrowthInfo(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setGrowthInfo(null);
      } finally {
        setLoading(false);
      }
      setInitialized(true);
    }
  }, [initialized]); // Only tracks the initialized boolean flag
  const headerSection = dogGrowthPageCms.header;
  const seoContent = dogGrowthPageCms.seoContent;
  const cookieStore = await cookies();
  const token = cookieStore.get("adminAuthToken")?.value;

  // Fetch the FAQ array for this specific page layout string
  const faqData = await fetchFaq("dog-age", token);
  const faqItems = faqData?.items ? faqData : dogGrowthPageCms.faqSection; // Fallback to an empty array if empty or missing

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {headerSection && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-orange-600 dark:text-orange-400">
                <span>🐕</span>
                <span>PUPPY WEIGHT CALCULATOR</span>
              </div>
              {(() => {
                const title: string = headerSection.title
                  ? headerSection.title
                  : "How big will your puppy get?";
                const words: string[] = title.trim().split(/\s+/);
                const firstPart: string = words.slice(0, -2).join(" ");
                const secondPart: string = words[words.length - 2];
                const thirdPart: string = words[words.length - 1];
                return (
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground">
                    {firstPart}{" "}
                    <em className="not-italic font-normal">{secondPart}</em>{" "}
                    {thirdPart}
                  </h1>
                );
              })()}
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {headerSection.description
                  ? headerSection.description
                  : ` Predict your puppy's adult weight in seconds. We use breed-specific growth
              curves built from veterinary data to give you the most accurate forecast —
              plus a beautiful chart to watch their journey.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
              <PuppyForm onSubmit={handleCalculate} disabled={loading} />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {loading && (
              <div className="rounded-2xl bg-muted p-12 flex items-center justify-center min-h-96">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Calculating...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-2xl bg-red-50 dark:bg-red-950 p-6 border border-red-200 dark:border-red-800">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            {growthInfo && !loading && (
              <ResultCard growthInfo={growthInfo} puppyImage={PUPPY_IMAGE} />
            )}
          </div>
        </div>

        {/* Maturity Section */}
        <div className="mb-12 md:mb-16">
          <MaturitySection />
        </div>

        {/* Footer */}
        <FooterSection />
      </div>

      {/* Backlinks || Other Calculators and services */}
      {(() => {
        // Map only 2 random calculators (exclude Dog Age itself)
        const eligibleCards = backlinks.filter(
          (card) => card.cta.href !== "/calculators/dog-growth",
        );

        const stableIndexSeed = growthInfo
          ? `${growthInfo.predictedWeight}-${growthInfo.monthsToMaturity}-${growthInfo.percentageGrown}`
          : "fallback-4";
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

      {/* Additional SEO Content */}
      <div className="border-t my-10 border-border bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {seoContent && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                  {seoContent.title
                    ? seoContent.title
                    : `How Our Calculator Works`}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {seoContent.description
                    ? seoContent.description
                    : `Our puppy weight calculator uses breed-specific growth curves developed from
                veterinary research. By inputting your puppy's current age, weight, and breed,
                we can accurately predict their adult size. The calculation takes into account
                the unique growth patterns of different dog sizes, from tiny Chihuahuas to
                large German Shepherds.`}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-4">
                  {seoContent.tips.title
                    ? seoContent.tips.title
                    : `Tips for Puppy Growth`}
                </h3>
                <ul className="text-muted-foreground space-y-2 leading-relaxed">
                  {seoContent.tips.shortTips?.map((tip) => (
                    <li key={tip.title}>• {tip.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      {faqItems.length > 0 && <FaqSection items={faqItems} />}
    </div>
  );
}
