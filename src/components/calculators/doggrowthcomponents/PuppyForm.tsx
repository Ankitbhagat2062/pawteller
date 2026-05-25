"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BREED_NAMES } from "@/lib/constant";
import type { PuppyFormProps } from "@/lib/types";

export function PuppyForm({ onSubmit, disabled }: PuppyFormProps) {
  const [breed, setBreed] = useState("Labrador Retriever");
  const [ageMonths, setAgeMonths] = useState(3);
  const [weightLbs, setWeightLbs] = useState(25);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(18, Number(e.target.value) || 0));
    setAgeMonths(value);
    onSubmit(breed, value, weightLbs);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0.1, Number(e.target.value) || 0);
    setWeightLbs(value);
    onSubmit(breed, ageMonths, value);
  };

  const handleBreedChange = (value: string) => {
    setBreed(value);
    onSubmit(value, ageMonths, weightLbs);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="breed" className="text-sm font-medium text-foreground">
          Breed
        </Label>
        <Select
          value={breed}
          onValueChange={handleBreedChange}
          disabled={disabled}
        >
          <SelectTrigger
            id="breed"
            className="w-full bg-background border-input text-foreground"
          >
            <SelectValue placeholder="Select a breed" />
          </SelectTrigger>
          <SelectContent className="bg-background border-input">
            {BREED_NAMES.map((breedName) => (
              <SelectItem
                key={breedName}
                value={breedName}
                className="text-foreground"
              >
                {breedName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" className="text-sm font-medium text-foreground">
          Current age (months)
        </Label>
        <Input
          id="age"
          type="number"
          min="1"
          max="18"
          value={ageMonths}
          onChange={handleAgeChange}
          disabled={disabled}
          className="w-full bg-background border-input text-foreground placeholder-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight" className="text-sm font-medium text-foreground">
          Current weight (lbs)
        </Label>
        <Input
          id="weight"
          type="number"
          min="0.1"
          step="0.1"
          value={weightLbs}
          onChange={handleWeightChange}
          disabled={disabled}
          className="w-full bg-background border-input text-foreground placeholder-muted-foreground"
        />
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-2">
        <span className="inline-block">📊</span>
        Updates instantly as you type
      </p>
    </div>
  );
}
