"use client";

import { Info } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import { dogAgePageCms } from "@/lib/cms/dogagepage";
import { blogPosts } from "@/lib/cms/blogpage";
import BlogCard from "../shared/BlogCard";
import { backlinks } from "@/lib/cms/calculatorpage";
import BacklinkCalculatorCard from "@/components/shared/BacklinkCalculatorCard";
import { selectBacklinkCards } from "@/lib/selectBacklinkCards";
import { FaqSection } from "@/components/shared/FaqSection";
import { useRouter } from "next/navigation";

const DogAgeCalculator = () => {
  const [dogAge, setDogAge] = useState<number>(10);
  const [dogSize, setDogSize] = useState<
    "small" | "medium" | "large" | "giant"
  >("medium");
  const [humanAge, setHumanAge] = useState<number>(64);
  const [ageCategory, setAgeCategory] = useState<string>("Senior");
  const [ageDescription, setAgeDescription] = useState<string>(
    "Your dog is entering their senior years. Regular vet checkups and a comfortable environment are important.",
  );
  const router = useRouter();
  // Dog aging formula based on veterinary research
  const calculateHumanAge = (
    age: number,
    size: string,
  ): { age: number; category: string; description: string } => {
    let humanYears = 0;
    let category = "";
    let description = "";

    if (age <= 0) {
      return {
        age: 0,
        category: "Newborn",
        description: "Your puppy is just born!",
      };
    }

    // First year is different for all sizes
    if (age === 1) {
      humanYears = 15;
      category = "Young Puppy";
      description =
        "Your dog is playful and learning quickly. This is the perfect time for training!";
    } else if (age < 3) {
      humanYears = 15 + (age - 1) * 9;
      category = "Puppy";
      description =
        "Your dog is in their prime growing years. Continue training and socialization.";
    } else {
      // Years 3+ - varies by size
      let yearlyCost = 0;
      if (size === "small") {
        yearlyCost = 4;
        humanYears = 15 + 9 + (age - 2) * yearlyCost;
      } else if (size === "medium") {
        yearlyCost = 5;
        humanYears = 15 + 9 + (age - 2) * yearlyCost;
      } else if (size === "large") {
        yearlyCost = 6;
        humanYears = 15 + 9 + (age - 2) * yearlyCost;
      } else if (size === "giant") {
        yearlyCost = 7.5;
        humanYears = 15 + 9 + (age - 2) * yearlyCost;
      }

      // Categorize by human age
      if (humanYears < 20) {
        category = "Young";
        description =
          "Your dog is energetic and playful. Provide plenty of exercise and mental stimulation.";
      } else if (humanYears < 35) {
        category = "Young Adult";
        description =
          "Your dog is in their prime years. This is an ideal time for training and activities.";
      } else if (humanYears < 50) {
        category = "Mature Adult";
        description =
          "Your dog is mature and more stable. They may prefer moderate exercise and comfort.";
      } else if (humanYears < 65) {
        category = "Senior";
        description =
          "Your dog is entering their senior years. Regular vet checkups and a comfortable environment are important.";
      } else if (humanYears < 80) {
        category = "Geriatric";
        description =
          "Your dog is a senior. Provide soft bedding, easy access to food and water, and extra attention.";
      } else {
        category = "Venerable";
        description =
          "Your dog has reached an impressive age! Focus on comfort, gentle care, and quality time together.";
      }
    }

    return { age: Math.round(humanYears), category, description };
  };

  const handleAgeChange = (value: string) => {
    const age = parseFloat(value) || 0;
    setDogAge(age);
    const result = calculateHumanAge(age, dogSize);
    setHumanAge(result.age);
    setAgeCategory(result.category);
    setAgeDescription(result.description);
  };

  const handleSizeChange = (value: string) => {
    const size = value as "small" | "medium" | "large" | "giant";
    setDogSize(size);
    const result = calculateHumanAge(dogAge, size);
    setHumanAge(result.age);
    setAgeCategory(result.category);
    setAgeDescription(result.description);
  };

  const sizeDescriptions = {
    small: "Small breeds (under 20 lbs) age slower in later years",
    medium: "Medium breeds (20-50 lbs) - standard aging curve",
    large: "Large breeds (50-90 lbs) age faster than smaller dogs",
    giant: "Giant breeds (over 90 lbs) age the fastest",
  };
  const heroSection = dogAgePageCms.heroSection
  const informationSection = dogAgePageCms.informationSection
  const faqSection = dogAgePageCms.faqSection
  const callToActionSection = dogAgePageCms.callToActionSection
  return (
    <TooltipProvider>
      <div className="min-h-screen ">
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Hero Section */}
          {heroSection && (
            <section className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-balance text-foreground mb-4">
                  {(() => {
                    const title = heroSection.title
                      ? heroSection.title
                      : "How old is your dog in human years";
                    const words: string[] = title.trim().split(/\s+/);

                    return (
                      <>
                        {(() => {
                          if (words.length === 0) {
                            return "How old is your dog in human years";
                          }

                          if (words.length === 1) {
                            // No tail-word highlighting possible.
                            return words[0];
                          }

                          if (words.length === 2) {
                            // Highlight the full 2-word tail.
                            return (
                              <>
                                <span className="italic text-primary">
                                  {words.join(" ")}
                                </span>
                                ?
                              </>
                            );
                          }

                          const lastTwoWords: string = words.slice(-2).join(" ");
                          const firstPart: string = words.slice(0, -2).join(" ");

                          return (
                            <>
                              {heroSection.title ? firstPart : `How old is your dog in`}{" "}
                              <span className="italic text-primary">
                                {lastTwoWords}
                              </span>
                              ?
                            </>
                          );
                        })()}
                      </>
                    );

                  })()}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
                  {heroSection.description ? heroSection.description : `Forget the old &quot;multiply by 7&quot; rule! Real dog aging is
                  non-linear and depends on breed size. Our calculator uses the
                  latest veterinary research to give you an accurate human-year
                  equivalent.`}
                </p>
                <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
                  {heroSection.buttons && heroSection.buttons.map((btn) => (
                    <span
                      key={btn.title}
                      className="px-3 py-1 rounded-full bg-accent/10 text-foreground"
                    >
                      {btn.title ? btn.title : `Science-backed`}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Calculator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Card */}
            <Card className="p-6 md:p-8 bg-card border-border/60 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Enter Your Dog&apos;s Details
              </h3>

              <div className="space-y-6">
                {/* Age Input */}
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Dog&apos;s age (in years)
                  </label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="50"
                    step="0.1"
                    value={dogAge}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                {/* Size Select */}
                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Adult size
                  </label>
                  <Select value={dogSize} onValueChange={handleSizeChange}>
                    <SelectTrigger
                      id="size"
                      className="w-full bg-input border-border text-foreground"
                    >
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="small">
                        Small (under 20 lbs)
                      </SelectItem>
                      <SelectItem value="medium">Medium (20-50 lbs)</SelectItem>
                      <SelectItem value="large">Large (50-90 lbs)</SelectItem>
                      <SelectItem value="giant">Giant (over 90 lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    {sizeDescriptions[dogSize]}
                  </p>
                </div>
              </div>
            </Card>

            {/* Result Card */}
            <Card className="p-6 md:p-8 bg-linear-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center">
                <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                  Human Age Equivalent
                </p>
                <div className="mb-6">
                  <p className="text-6xl md:text-7xl font-bold text-primary mb-2">
                    {humanAge}
                  </p>
                  <p className="text-xl font-semibold text-foreground">
                    {ageCategory}
                  </p>
                </div>

                {/* Description Box */}
                <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                  <div className="flex gap-3 items-start">
                    <span className="text-lg">💡</span>
                    <p className="text-sm text-foreground leading-relaxed">
                      {ageDescription}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Information Section */}
          {informationSection && (
            <section className="mt-16 space-y-8">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {informationSection.title ? informationSection.title : `Why Size Matters`}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {informationSection.description ? informationSection.description : `Different dog breeds age at different rates due to genetics and
                  physiology`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {informationSection.cards && informationSection.cards.map((item) => (
                  <Card
                    key={item.size}
                    className={`p-4 bg-linear-to-br ${item.color} border`}
                  >
                    <h4 className="font-semibold text-foreground mb-2">
                      {item.size}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {item.example}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      {item.advantage}
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          )}


          {/* Backlinks || Other Calculators and services */}
          <section className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Other calculators you may need
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continue exploring Pawteller’s tools to support your dog’s nutrition
                and growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(() => {
                // Pick 2 calculators deterministically to avoid SSR hydration mismatch (no Math.random during render)
                const eligibleCards = backlinks.filter(
                  (card) => card.cta.href !== "/calculators/dog-age",
                );

                const stableIndexSeed = `${dogAge}-${dogSize}`;
                const cards = selectBacklinkCards(eligibleCards, stableIndexSeed);

                return cards.map((card) => (
                  <BacklinkCalculatorCard key={card.title} {...card} />
                ));
              })()}

            </div>
          </section>


          {/* FAQ Section */}
          <section className="mt-16 max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqSection && <FaqSection items={faqSection} />}
            </div>
          </section>

          {/* Call to Action */}
          {callToActionSection && (
            <section className="mt-16 text-center">
              <Card className="p-8 md:p-12 bg-linear-to-r from-primary/10 to-secondary/10 border-primary/30">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {callToActionSection.title ? callToActionSection.title : `Keep Your Dog Healthy`}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {callToActionSection.description ? callToActionSection.description : `Regular veterinary checkups, proper nutrition, exercise, and
                  preventative care are essential for keeping your dog healthy
                  throughout their life.`}
                </p>
<<<<<<< HEAD
                <Button onClick={()=>router.push(`${callToActionSection.button.href}`)} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2">
                  {callToActionSection.button.label ? callToActionSection.button.label : `Schedule a Vet Checkup`}
=======
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2">
                  <Link
                    href={callToActionSection.button.href || "/contact"}
                    aria-label={callToActionSection.button.ariaLabel || callToActionSection.button.label || "Schedule a Vet Checkup"}
                  >
                    {callToActionSection.button.label ? callToActionSection.button.label : `Schedule a Vet Checkup`}
                  </Link>
>>>>>>> 9030b8d0fe31f7b32bf824e443571d559d0eb8cf
                </Button>
              </Card>
            </section>
          )}

          {/* Blog Section */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(() => {
              const healthPosts = blogPosts.filter((post) => post.category === "Growth");
              if (healthPosts.length === 0) return null;

              return healthPosts.map((article) => (
                <BlogCard key={article.url} {...article} />
              ));
            })()}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default DogAgeCalculator;
