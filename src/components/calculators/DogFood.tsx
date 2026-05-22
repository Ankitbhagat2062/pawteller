"use client";

import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { ACTIVITY_MULTIPLIERS, LIFE_STAGE_MULTIPLIERS } from "@/lib/constant";
import type { CalculatorState, Results } from "@/lib/types";

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

export default function DogFood() {
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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-orange-600 dark:text-orange-500" />
            <span className="text-sm font-semibold tracking-widest text-orange-600 dark:text-orange-500 uppercase">
              Dog Food Calculator
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 text-balance">
            How much should your dog{" "}
            <span className="italic text-foreground/70">really</span> eat?
          </h1>

          <p className="text-lg text-foreground/70 max-w-2xl">
            Calorie needs vary by weight, age and activity. Get an
            evidence-based daily portion in seconds.
          </p>
        </div>

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
          <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 dark:from-emerald-900 dark:to-emerald-950 rounded-2xl p-6 sm:p-8 text-white">
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            variant="default"
            className="bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold"
          >
            Predict adult weight
          </Button>
          <Button
            variant="outline"
            className="border-border bg-background text-foreground hover:bg-muted px-6 py-2 rounded-full font-semibold"
          >
            Dog age
          </Button>
        </div>
      </div>
    </main>
  );
}
