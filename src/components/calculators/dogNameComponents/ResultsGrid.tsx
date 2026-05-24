"use client";

import { ResultsGridProps } from "@/lib/types";


export function ResultsGrid({ names, onRefresh }: ResultsGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">Generated for You</h3>
        <button
          type="button"
          onClick={onRefresh}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all duration-200 dark:bg-green-600 dark:hover:bg-green-700"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {names.map((dog) => (
          <div
            key={`${dog.name}-${dog.size}-${dog.gender}`}
            className="bg-card border border-border rounded-lg p-4 text-center hover:shadow-md transition-all duration-200 dark:bg-slate-900 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-500"
          >
            <p className="text-lg md:text-xl font-bold text-foreground mb-2">
              {dog.name}
            </p>
            <p className="text-xs text-foreground/60 mb-3">{dog.size}</p>
            <div className="flex flex-wrap gap-1 justify-center">
              {dog.personalities.slice(0, 2).map((personality) => (
                <span
                  key={personality}
                  className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded dark:bg-green-900 dark:text-green-200"
                >
                  {personality}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-foreground/60 text-center mt-6">
        💡 Click the refresh button to generate new names with your current
        filters
      </p>
    </div>
  );
}
