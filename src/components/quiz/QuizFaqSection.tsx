"use client";

import { HelpCircle, MailQuestion, Sparkles } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getQuizFaqItems } from "@/lib/cms/quizpage";

export function QuizFaqSection({ quizSlug }: { quizSlug?: string }) {
  const faqItems = getQuizFaqItems(quizSlug);

  return (
    <section className="mx-auto w-full max-w-2xl pt-8">
      <div className="mb-4 flex items-center justify-center gap-2 text-primary">
        <Sparkles className="h-5 w-5" />
        <h2 className="text-xl font-semibold">FAQ</h2>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
          <span>Quick answers about your quiz results</span>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => {
            const itemId = item.id ?? item.question;
            return <AccordionItem
              key={itemId}
              value={itemId}
              className="border-b border-border last:border-b-0"
            >
              <AccordionTrigger className="px-2 sm:px-4">
                <div className="flex items-start gap-3">
                  <MailQuestion className="mt-0.5 h-4 w-4 text-primary" />
                  <span className="text-left font-medium">{item.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p className="px-2 sm:px-4 pb-2 text-foreground/70 leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          })}
        </Accordion>
      </div>
    </section>
  );
}

