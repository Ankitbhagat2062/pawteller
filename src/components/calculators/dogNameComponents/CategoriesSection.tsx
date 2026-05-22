"use client";

import { categories } from "@/lib/constant";

export function CategoriesSection() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground text-center mb-4">
        Browse by Personality
      </h2>
      <p className="text-foreground/70 text-center mb-12">
        Find the perfect name that matches your dog&apos;s unique personality
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-green-500 transition-all duration-200 dark:bg-slate-900 dark:border-slate-700 dark:hover:border-green-500 cursor-pointer group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
              {category.icon}
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              {category.title}
            </h3>
            <p className="text-sm text-foreground/60">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
