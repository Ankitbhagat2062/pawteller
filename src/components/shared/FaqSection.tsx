"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQItem } from "@/lib/types";

export function FaqSection({ items }: { items: FAQItem[] }) {
  return (
    <section className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-balance mb-6">
          Frequently Asked Questions
        </h2>
        <div className="bg-background/30 dark:bg-slate-900/30 border border-border/60 rounded-xl overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem
                key={item.id || item.question}
                value={`dfaq-${index}`}
                className="border-b border-border/60 last:border-b-0"
              >
                <AccordionTrigger className="px-4 sm:px-6 hover:bg-background/40">
                  <span className="text-left font-semibold text-foreground">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 sm:px-6 pb-4 text-foreground/70 leading-relaxed text-sm sm:text-base">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
