"use client";

import { ChevronDown } from "lucide-react";

interface FilterSectionProps {
  gender: string;
  size: string;
  startingLetter: string;
  onGenderChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onLetterChange: (value: string) => void;
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
            <div className="relative">
              <select
                id="dogGender"
                value={gender}
                onChange={(e) => onGenderChange(e.target.value)}
                className="w-full appearance-none bg-background border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 cursor-pointer transition-all"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
            </div>
          </div>

          {/* Size Filter */}
          <div>
            <label
              htmlFor="dogSize"
              className="block text-xs font-medium text-foreground/70 mb-2"
            >
              Dog Size
            </label>
            <div className="relative">
              <select
                id="dogSize"
                value={size}
                onChange={(e) => onSizeChange(e.target.value)}
                className="w-full appearance-none bg-background border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 cursor-pointer transition-all"
              >
                <option value="All">All Sizes</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
            </div>
          </div>

          {/* Starting Letter Filter */}
          <div>
            <label
              htmlFor="startingLetter"
              className="block text-xs font-medium text-foreground/70 mb-2"
            >
              Starting Letter
            </label>
            <div className="relative">
              <select
                id="startingLetter"
                value={startingLetter}
                onChange={(e) => onLetterChange(e.target.value)}
                className="w-full appearance-none bg-background border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 cursor-pointer transition-all"
              >
                {alphabet.map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          onClick={onGenerate}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg dark:bg-green-600 dark:hover:bg-green-700"
        >
          ✨ Generate Names
        </button>
      </div>
    </div>
  );
}
