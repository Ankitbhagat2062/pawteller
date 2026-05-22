"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DogGender, DogSize, StartingLetter } from "@/lib/constant";

interface FilterSectionProps {
  gender: DogGender | "All";
  size: DogSize | "All";
  startingLetter: StartingLetter;
  onGenderChange: (value: DogGender | "All") => void;
  onSizeChange: (value: DogSize | "All") => void;
  onLetterChange: (value: StartingLetter) => void;
  onGenerate: () => void;
}

export function FilterSection({
  gender,
  size,
  startingLetter,
  onGenderChange,
  onSizeChange,
  onLetterChange,
  onGenerate,
}: FilterSectionProps) {
  const alphabet = [
    "All",
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card rounded-lg border border-border p-6 md:p-8 dark:bg-slate-900 dark:border-slate-700">
        {/* Filter Header */}
        <h3 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wide">
          Filter Your Search
        </h3>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Gender Filter */}
          <div>
            <label
              htmlFor="dogGender"
              className="block text-xs font-medium text-foreground/70 mb-2"
            >
              Gender
            </label>
            <Select value={gender} onValueChange={onGenderChange}>
              <SelectTrigger
                id="dogGender"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 cursor-pointer transition-all"
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="All">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Size Filter */}
          <div>
            <label
              htmlFor="dogSize"
              className="block text-xs font-medium text-foreground/70 mb-2"
            >
              Dog Size
            </label>
            <Select value={size} onValueChange={onSizeChange}>
              <SelectTrigger
                id="dogSize"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 cursor-pointer transition-all"
              >
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="All">All Sizes</SelectItem>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Starting Letter Filter */}
          <div>
            <label
              htmlFor="startingLetter"
              className="block text-xs font-medium text-foreground/70 mb-2"
            >
              Starting Letter
            </label>
            <Select value={startingLetter} onValueChange={onLetterChange}>
              <SelectTrigger
                id="startingLetter"
                className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 cursor-pointer transition-all"
              >
                <SelectValue placeholder="Select a letter" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {alphabet.map((letter) => (
                  <SelectItem key={letter} value={letter}>
                    {letter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          type="button"
          onClick={onGenerate}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg dark:bg-green-600 dark:hover:bg-green-700"
        >
          ✨ Generate Names
        </Button>
      </div>
    </div>
  );
}
