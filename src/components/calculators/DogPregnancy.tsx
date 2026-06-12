"use client";
import {
  CalendarDays,
  CheckCircle2,
  PawPrint,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BREED_SIZE_LABELS,
  dogPregnancyCms,
  GESTATION_DAYS,
  SECTIONS_DATA,
} from "@/lib/cms/dogpregnancypage";
import type { BreedSize, PregnancyResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/shared/FaqSection";

function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
}

function formatLong(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const PREGNANCY_OVERDUE_DAYS = 65;

function getCareNote(daysElapsed: number): string {
  if (daysElapsed <= 7)
    return "Your dog is in the very early stages. Keep her routine stress-free. Most pregnancies last between 58–68 days, with 63 being the average. Consult your vet for an ultrasound around Day 25.";
  if (daysElapsed <= 21)
    return "Embryos are developing rapidly. Maintain a normal feeding routine and avoid intense exercise. A vet checkup is recommended.";
  if (daysElapsed <= 35)
    return "This is a critical growth stage. Schedule a vet visit for palpation or ultrasound confirmation. Nipple development becomes visible.";
  if (daysElapsed <= 49)
    return "Puppies are growing fast! Increase food intake gradually. Clear discharge is normal at this stage.";
  if (daysElapsed <= 56)
    return "Almost there! Begin preparing the whelping box. Monitor rectal temperature daily and watch for nesting behavior.";
  return `Birth is imminent. Prepare your whelping area and keep your vet's number handy. Contact vet if pregnancy exceeds ${PREGNANCY_OVERDUE_DAYS} days.`;
}

function computeResult(
  matingDateStr: string,
  breedSize: BreedSize,
): PregnancyResult {
  const matingDate = new Date(`${matingDateStr}T00:00:00`);
  const dueDate = addDaysToDate(matingDate, GESTATION_DAYS[breedSize]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysElapsed = Math.max(0, daysBetween(matingDate, today));
  const daysRemaining = Math.max(0, daysBetween(today, dueDate));
  const currentWeek = Math.min(
    9,
    Math.max(1, Math.ceil((daysElapsed + 1) / 7)),
  );
  return {
    dueDate,
    daysRemaining,
    currentWeek,
    daysElapsed,
    careNote: getCareNote(daysElapsed),
  };
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <CheckCircle2
      className={cn("shrink-0", className)}
      aria-hidden="true"
      color="#00C2A8"
      size={16}
    />
  );
}

export default function DogPregnancy() {
  const [matingDate, setMatingDate] = useState(getTodayString());
  const [breedSize, setBreedSize] = useState<BreedSize>("small");
  const [result, setResult] = useState<PregnancyResult | null>(null);
  const router = useRouter();
  function handleEstimate() {
    if (!matingDate) return;
    setResult(computeResult(matingDate, breedSize));
  }

  const displayDate = matingDate
    ? formatLong(new Date(`${matingDate}T00:00:00`))
    : "Select a date";
  const disclaimerSection = dogPregnancyCms.disclaimerSection
  const heroSection = dogPregnancyCms.heroSection
  const timelineSection = dogPregnancyCms.timelineSection
  const faqSection = dogPregnancyCms.faqSection
  const backlinkSection = dogPregnancyCms.backlinkSection
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-950">
      {/* ── HERO ── */}
      <section className="relative bg-[#E6F7F5] dark:bg-teal-950 overflow-hidden py-20 px-6 flex items-center justify-center min-h-105">
        {/* Decorative heart */}
        <div className="absolute right-[8%] top-[12%] opacity-20 pointer-events-none select-none hidden md:block">
          <PawPrint
            aria-hidden="true"
            size={120}
            color="#FF85A2"
            className="shrink-0"
          />
        </div>
        {/* Decorative calendar */}
        <div className="absolute left-[6%] bottom-[8%] opacity-10 pointer-events-none select-none hidden md:block">
          <CalendarDays
            aria-hidden="true"
            size={140}
            color="#00C2A8"
            className="shrink-0"
          />
        </div>
        {heroSection && (
          <div className="relative max-w-3xl w-full mx-auto text-center space-y-5">
            {/* Vet badge */}
<<<<<<< HEAD
=======
            {(() => {
              const title: string = heroSection.title ? heroSection.title : "Veterinary Verified Logic Dog Pregnancy Calculator";
              const words: string[] = title.trim().split(/\s+/);
              const firstPart: string = words.length < 3 ? words.join(" ") : words.slice(0, -3).join(" ");
              const secondPart: string = words.length < 3 ? "" : words.slice(-3).join(" ");
              return <>
>>>>>>> 9030b8d0fe31f7b32bf824e443571d559d0eb8cf
                <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-teal-900/60 backdrop-blur-sm rounded-full px-4 py-1.5">
                  <ShieldAlert
                    aria-hidden="true"
                    size={14}
                    color="#00C2A8"
                    className="shrink-0"
                  />
                  <span className="text-[#00C2A8] text-xs font-bold tracking-widest uppercase">
                    {heroSection.title}
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1A2B3C] dark:text-white leading-tight tracking-tight">
                  {heroSection.h1}
                </h1>
            <p className="text-lg md:text-xl font-medium text-[#1A2B3C] dark:text-gray-200 leading-relaxed max-w-2xl mx-auto">
              {heroSection.description ? heroSection.description : `Estimate your dog's due date, track pregnancy milestones
						week-by-week, and prepare for your puppy's arrival with expert
						guidance.`}
            </p>
          </div>
        )}
      </section>

      {/* ── CALCULATOR FORM ── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Form card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mating Date */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="mating-date"
                    className="text-[#1A2B3C] dark:text-white text-lg font-bold"
                  >
                    Mating Date
                  </label>
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-600 bg-[#F9FAFB] dark:bg-gray-700 overflow-hidden">
                    <span className="text-[#1A2B3C] dark:text-white text-lg font-medium flex-1 truncate">
                      {displayDate}
                    </span>
                  </div>
                  <input
                    type="date"
                    id="mating-date"
                    value={matingDate}
                    onChange={(e) => setMatingDate(e.target.value)}
                    max={getTodayString()}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-[#6B7280] dark:text-gray-400 text-sm">
                  Select the day the mating occurred.
                </p>
              </div>

              {/* Breed Size */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#1A2B3C] dark:text-white text-lg font-bold">
                    Breed Size
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(["small", "medium", "large", "giant"] as BreedSize[]).map(
                    (size) => (
                      <Button
                        key={size}
                        type="button"
                        onClick={() => setBreedSize(size)}
                        className={cn(
                          "py-3 rounded-xl border-2 text-sm font-bold text-center transition-colors",
                          breedSize === size
                            ? "border-[#00C2A8] bg-[#E6F7F5] text-[#00C2A8] dark:bg-teal-900/50"
                            : "border-gray-200 dark:border-gray-600 text-[#6B7280] dark:text-gray-400 hover:border-[#00C2A8]/50",
                        )}
                      >
                        {BREED_SIZE_LABELS[size]}
                      </Button>
                    ),
                  )}
                </div>
                <p className="text-[#6B7280] dark:text-gray-400 text-sm">
                  Size impacts gestation variance slightly.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button
                type="button"
                onClick={handleEstimate}
                className="w-full py-5 rounded-3xl bg-[#00C2A8] hover:bg-[#00a896] active:bg-[#009080] text-white text-xl font-bold text-center transition-colors shadow-[0_20px_25px_-5px_rgba(0,194,168,0.2),0_8px_10px_-6px_rgba(0,194,168,0.2)]"
              >
                Estimate Due Date
              </Button>
            </div>
          </div>

          {/* Results card */}
          {result && (
            <div className="relative bg-[#1A2B3C] dark:bg-[#0d1825] rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-8 sm:p-10">
              {/* Glow blob */}
              <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#00C2A8]/20 blur-[48px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-start gap-4 mb-8">
                <div>
                  <h2 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
                    Estimated Due Date
                  </h2>
                  <p className="text-[#00C2A8] text-sm font-bold tracking-[1.4px] uppercase mt-1">
                    Pregnancy Forecast
                  </p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="col-span-2 md:col-span-1 rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col items-center gap-2">
                  <span className="text-white/50 text-xs font-bold tracking-widest uppercase">
                    Due Date
                  </span>
                  <span className="text-white text-xl sm:text-2xl font-black text-center leading-tight">
                    {formatShort(result.dueDate)}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col items-center gap-2">
                  <span className="text-white/50 text-xs font-bold tracking-widest uppercase text-center">
                    Days Remaining
                  </span>
                  <span className="text-[#FF85A2] text-4xl font-black">
                    {result.daysRemaining}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col items-center gap-2">
                  <span className="text-white/50 text-xs font-bold tracking-widest uppercase text-center">
                    Current Week
                  </span>
                  <span className="text-[#00C2A8] text-4xl font-black">
                    {result.currentWeek}
                  </span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col items-center gap-2">
                  <span className="text-white/50 text-xs font-bold tracking-widest uppercase text-center">
                    Days Elapsed
                  </span>
                  <span className="text-white text-4xl font-black">
                    {result.daysElapsed}
                  </span>
                </div>
              </div>

              {/* Care note */}
              <div className="flex gap-3 items-start">
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  <span className="text-white font-bold">Care Note:</span>{" "}
                  {result.careNote}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-[#F9FAFB] dark:bg-gray-900 py-24 px-4">
        {timelineSection && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A2B3C] dark:text-white tracking-tight">
                {timelineSection.title ? timelineSection.title : `Dog Pregnancy Timeline`}
              </h2>
              <p className="text-[#6B7280] dark:text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                {timelineSection.description ? timelineSection.description : `Track the amazing development of your puppies from fertilization
                to birth with our week-by-week guide.`}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {timelineSection.timeline && timelineSection.timeline.map((item) => (
                <div
                  key={item.week}
                  className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm p-7 flex flex-col gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E6F7F5] dark:bg-teal-900/50 flex items-center justify-center shrink-0">
                    <span className="text-[#00C2A8] text-xl font-black">
                      {item.week}
                    </span>
                  </div>
                  <h3 className="text-[#1A2B3C] dark:text-white text-xl font-extrabold mt-1">
                    {item.title}
                  </h3>
                  <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="space-y-2 mt-1">
                    {item.tips.map((tip) => (
                      <li key={tip} className="flex items-center gap-2">
                        <CheckIcon className="text-[#00C2A8]" />
                        <span className="text-[#1A2B3C] dark:text-gray-200 text-xs font-bold">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              {timelineSection.button && (
                <Button
                  onClick={() => router.push(`${timelineSection.button.href}`)}
                  type="button"
                  className="px-8 py-3 rounded-full border-2 border-[#00C2A8] text-[#00C2A8] text-base font-bold bg-white dark:bg-transparent hover:bg-[#E6F7F5] dark:hover:bg-teal-900/40 transition-colors"
                >
                  {timelineSection.button.label}
                </Button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ── HOW LONG / VET SECTIONS ── */}
      <section className="py-24 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto space-y-24">
          {SECTIONS_DATA.map((section) => {
            const isImageLeft = section.layout === "image-left";

            return (
              <div
                key={section.id}
                className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                {/* Image Container */}
                <div
                  className={`rounded-3xl overflow-hidden aspect-4/3 
                  ${isImageLeft ? 'order-2 md:order-1' : 'order-2'} 
                  ${isImageLeft ? 'shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]' : 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]'}`}
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={536}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text Content Container */}
                <div className={`space-y-6 ${isImageLeft ? 'order-1 md:order-2' : 'order-1'}`}>
                  <h2 className="text-3xl sm:text-4xl font-black text-[#1A2B3C] dark:text-white leading-tight">
                    {section.title}
                  </h2>

                  {/* Dynamic Paragraphs */}
                  <div className="space-y-4 text-[#1A2B3C]/80 dark:text-gray-300 text-lg leading-relaxed">
                    {section.paragraphs.map((para) => (
                      <p key={para.days ?? para.p}>
<<<<<<< HEAD

=======
>>>>>>> 9030b8d0fe31f7b32bf824e443571d559d0eb8cf
                        {para.p}
                        {(para.days && para.p2) && (
                          <>
                            <strong className="font-bold">{para.days}</strong>
                            {para.p2}
                          </>
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Optional Tip Card */}
                  {section.tipCard && (
                    <div className="rounded-3xl border border-[#00C2A8]/20 bg-[#E6F7F5] dark:bg-teal-950 p-6 space-y-2">
                      <p className="text-[#00C2A8] text-lg font-bold">{section.tipCard.label}</p>
                      <p className="text-[#1A2B3C]/80 dark:text-gray-300 text-sm leading-relaxed">
                        {section.tipCard.text}
                      </p>
                    </div>
                  )}

                  {/* Optional Alerts List */}
                  {section.alerts && section.alerts.length > 0 && (
                    <div className="space-y-3 pt-2">
                      {section.alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex gap-4 items-start p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-[#F9FAFB] dark:bg-gray-800"
                        >
                          <div>
                            <h4 className="text-[#1A2B3C] dark:text-white font-bold text-base">
                              {alert.title}
                            </h4>
                            <p className="text-[#6B7280] dark:text-gray-400 text-sm">
                              {alert.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ── FAQ ── */}
<<<<<<< HEAD
      <section className="bg-[#E6F7F5] dark:bg-teal-950 py-24 px-4" >
=======
      <section className="bg-[#E6F7F5] dark:bg-teal-950 py-24 px-4">
>>>>>>> 9030b8d0fe31f7b32bf824e443571d559d0eb8cf
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A2B3C] dark:text-white text-center tracking-tight mb-12">
            Frequently Asked Questions
          </h2>
          {faqSection && (
            <FaqSection items={faqSection} />
          )}
        </div>
      </section>

      {/* ── EXPLORE TOOLS ── */}
      <section className="py-16 px-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
        {backlinkSection && (
          <div className="max-w-6xl mx-auto">
            <p className="text-[#1A2B3C]/40 dark:text-gray-500 text-xs font-black tracking-[4px] uppercase text-center mb-8">
              {backlinkSection.title ? backlinkSection.title : `Explore Other Dog Tools`}
            </p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {backlinkSection.cta && backlinkSection.cta.map((cta) => (
                <Link key={cta.label} aria-label={cta.ariaLabel}
                  href={cta.href}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#E6F7F5] dark:bg-teal-900/50 flex items-center justify-center shrink-0"></div>
                  <span className="text-[#1A2B3C] dark:text-white text-base font-bold group-hover:text-[#00C2A8] transition-colors">
                    {cta.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── DISCLAIMER ── */}
      {disclaimerSection && <section className="py-10 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#9CA3AF] dark:text-gray-500 text-xs leading-relaxed">
            {disclaimerSection.desc ? disclaimerSection.desc : `Disclaimer: This calculator provides estimates based on typical
            biological averages. Dog pregnancy can be complex and varies by
            individual health and breed factors. We strongly recommend a
            professional veterinary consultation, ultrasound, or X-ray to
            confirm pregnancy status, puppy count, and overall health.`}
          </p>
        </div>
      </section>}
    </div>
  );
}
