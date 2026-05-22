"use client";

import { useEffect, useState } from "react";
import { getNamesByPersonality } from "@/lib/constant";
import type { DogName } from "@/lib/types";

interface PersonalityGroup {
  title: string;
  personality: string;
  icon: string;
}

const personalityGroups: PersonalityGroup[] = [
  { title: "Playful Names", personality: "Playful", icon: "🎾" },
  { title: "Smart Names", personality: "Smart", icon: "🧠" },
  { title: "Gentle Names", personality: "Gentle", icon: "💚" },
  { title: "Strong Names", personality: "Strong", icon: "💪" },
  { title: "Unique Names", personality: "Unique", icon: "✨" },
];

export function BestNamesSection() {
  const [groupedNames, setGroupedNames] = useState<Record<string, DogName[]>>(
    {},
  );

  useEffect(() => {
    const grouped: Record<string, DogName[]> = {};
    personalityGroups.forEach((group) => {
      grouped[group.personality] = getNamesByPersonality(group.personality, 5);
    });
    setGroupedNames(grouped);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">
        Best Dog Names by Personality
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {personalityGroups.map((group) => (
          <div key={group.personality} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{group.icon}</span>
              <h3 className="font-bold text-foreground text-sm">
                {group.title}
              </h3>
            </div>

            <div className="space-y-2">
              {(groupedNames[group.personality] || []).map((dog) => (
                <div
                  key={`${dog.name}-${dog.gender}-${dog.size}`}
                  className="bg-card border border-border rounded-lg p-3 hover:border-green-500 transition-colors dark:bg-slate-900 dark:border-slate-700 dark:hover:border-green-500"
                >
                  <p className="font-semibold text-foreground text-sm">
                    {dog.name}
                  </p>
                  <p className="text-xs text-foreground/60">
                    {dog.gender} • {dog.size}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
