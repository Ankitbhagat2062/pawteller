"use client";

import { AlertTriangle, Award, Calculator, Shield } from "lucide-react";

const iconMap = {
  Award,
  Calculator,
  Shield,
  AlertTriangle,
} as const;

export function WhySection({
  title,
  bullets,
  disclaimer,
}: {
  title: string;
  bullets: Array<{ title: string; body: string; iconName: keyof typeof iconMap }>;
  disclaimer: string;
}) {
  return (
    <section className="my-10 relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-linear-to-br from-orange-400/30 to-emerald-400/10 blur-2xl" />
        <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-linear-to-br from-emerald-500/20 to-orange-400/10 blur-2xl" />
      </div>

      <div className="relative">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-balance mb-4 sm:mb-6">
          {title}
        </h2>
        <p className="text-sm sm:text-base text-foreground/70 max-w-3xl leading-relaxed mb-6">
          Built for clarity and backed by standard energy-needs logic.
          Use it to start a smart conversation with your vet, not as a final medical instruction.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bullets.map((b) => {
            const Icon = iconMap[b.iconName];
            return (
              <div
                key={b.title}
                className="rounded-xl border border-border/60 bg-background/40 p-4 sm:p-5 shadow-sm backdrop-blur"
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-6 w-6 text-emerald-600 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {b.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4 sm:p-5">
          <div className="flex gap-3 items-start">
            <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-foreground/80 leading-relaxed">
              {disclaimer}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

