"use client";

import { ChevronDown } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/constant";

export function FAQSection() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12">
        Frequently Asked Questions
      </h2>

      <div className="bg-card border border-border rounded-lg overflow-hidden dark:bg-slate-900 dark:border-slate-700">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-${index}`}
              className="border-b border-border dark:border-slate-700 last:border-b-0"
            >
              <AccordionTrigger
                className="w-full flex items-center justify-between hover:bg-background/50 dark:hover:bg-slate-800/50 transition-colors px-4 sm:px-6"
              >
                <span className="text-left font-medium text-foreground">
                  {item.question}
                </span>
              </AccordionTrigger>

              <AccordionContent>
                <section className="px-4 sm:px-6 pb-4 text-foreground/70">
                  <p className="leading-relaxed">{item.answer}</p>
                </section>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

