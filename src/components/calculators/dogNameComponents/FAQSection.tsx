"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How many dog names should I consider?",
    answer:
      "We recommend generating at least 10-15 name options to choose from. This gives you plenty of variety to test and see what feels right for your new puppy or dog.",
  },
  {
    question: "Can I change my dog's name if I've been using another one?",
    answer:
      "Yes! Dogs can learn new names at any age with consistent training and positive reinforcement. It may take a few weeks for them to adjust, but it&apos;s definitely possible.",
  },
  {
    question: "What makes a good dog name?",
    answer:
      "Good dog names are short (1-2 syllables), easy to pronounce, don't sound like commands, and reflect your dog's personality. They should feel natural when you say them out loud.",
  },
  {
    question: "Should I match the name to my dog's size?",
    answer:
      "While not necessary, many people prefer matching name style to dog size. Shorter, punchier names work great for small dogs, while longer, stronger names suit larger breeds. Ultimately, choose what feels right!",
  },
  {
    question: "Are unique names better than popular ones?",
    answer:
      "It depends on your preference! Popular names are recognizable and classic, while unique names help your dog stand out. Both can work equally well as long as you love the name and your dog responds to it.",
  },
  {
    question: "How do I test if a name works for my dog?",
    answer:
      "Try calling the name out loud in different situations. See if you feel comfortable saying it at the dog park, at the vet, and at home. Your dog will also give you feedback on whether they respond to the sound of the name.",
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border dark:border-slate-700 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full py-4 md:py-5 flex items-center justify-between hover:bg-background/50 dark:hover:bg-slate-800/50 transition-colors px-4 -mx-4"
      >
        <span className="text-left font-medium text-foreground">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-foreground/50 shrink-0 ml-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-foreground/70">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="bg-card border border-border rounded-lg overflow-hidden dark:bg-slate-900 dark:border-slate-700">
        {faqItems.map((item, index) => (
          <FAQItem
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
