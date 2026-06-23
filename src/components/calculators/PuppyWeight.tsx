"use client";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  HeartPulse,
  Mars,
  Sparkles,
  Venus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { FaqSection } from "@/components/shared/FaqSection";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { submitVerificationForm } from "@/hooks/forms";
import {
  type FeatureItem,
  GROWTH_INSIGHTS_CONTENT,
  type GrowthRow,
  growthSupportRecommendation,
  HERO_CONTENT,
  infographicSection,
  type PredictionStep,
  puppyWeightPageCms,
} from "@/lib/cms/calculators/puppyweight";
import type { FormState } from "@/lib/types";
import { backlinks } from "@/lib/cms/calculators/calculatorpage";
import BacklinkCalculatorCard from "@/components/shared/BacklinkCalculatorCard";
import { fetchFaq } from "@/db/faqCmsDb";
import BlogCard from "../shared/BlogCard";
import { BlogPost, blogPosts } from "@/lib/cms/blogpage";
import fetchBlog from "@/db/blogCmsDb";

// ─── Data ────────────────────────────────────────────────────────────────────

type SizeCategory = "toy" | "small" | "medium" | "large" | "giant";

interface Breed {
  name: string;
  minKg: number;
  maxKg: number;
  size: SizeCategory;
}

const BREEDS: Breed[] = [
  { name: "Chihuahua", minKg: 1.5, maxKg: 3, size: "toy" },
  { name: "Yorkshire Terrier", minKg: 2, maxKg: 3.5, size: "toy" },
  { name: "Pomeranian", minKg: 1.5, maxKg: 3.5, size: "toy" },
  { name: "Shih Tzu", minKg: 4, maxKg: 7.5, size: "small" },
  { name: "Dachshund", minKg: 4, maxKg: 9, size: "small" },
  { name: "French Bulldog", minKg: 8, maxKg: 13, size: "small" },
  { name: "Cavalier King Charles", minKg: 5.5, maxKg: 8, size: "small" },
  { name: "Beagle", minKg: 9, maxKg: 14, size: "medium" },
  { name: "Border Collie", minKg: 14, maxKg: 20, size: "medium" },
  { name: "Bulldog", minKg: 18, maxKg: 25, size: "medium" },
  { name: "Siberian Husky", minKg: 16, maxKg: 27, size: "medium" },
  { name: "Golden Retriever", minKg: 27, maxKg: 34, size: "large" },
  { name: "Labrador Retriever", minKg: 25, maxKg: 36, size: "large" },
  { name: "German Shepherd", minKg: 22, maxKg: 40, size: "large" },
  { name: "Rottweiler", minKg: 35, maxKg: 60, size: "large" },
  { name: "Great Dane", minKg: 50, maxKg: 80, size: "giant" },
  { name: "Saint Bernard", minKg: 54, maxKg: 82, size: "giant" },
  { name: "Mastiff", minKg: 54, maxKg: 100, size: "giant" },
];

// Growth percentage at key age months for each size
const GROWTH_CURVE: Record<SizeCategory, Record<number, number>> = {
  toy: {
    0: 0,
    1: 10,
    2: 22,
    3: 38,
    4: 53,
    5: 65,
    6: 75,
    7: 80,
    8: 85,
    9: 90,
    10: 93,
    11: 96,
    12: 98,
    15: 99,
    18: 100,
  },
  small: {
    0: 0,
    1: 10,
    2: 20,
    3: 35,
    4: 48,
    5: 60,
    6: 72,
    7: 77,
    8: 82,
    9: 87,
    10: 90,
    11: 93,
    12: 96,
    15: 99,
    18: 100,
  },
  medium: {
    0: 0,
    1: 10,
    2: 20,
    3: 30,
    4: 43,
    5: 55,
    6: 65,
    7: 71,
    8: 78,
    9: 82,
    10: 86,
    11: 89,
    12: 92,
    15: 97,
    18: 100,
  },
  large: {
    0: 0,
    1: 8,
    2: 15,
    3: 25,
    4: 35,
    5: 45,
    6: 55,
    7: 62,
    8: 70,
    9: 75,
    10: 79,
    11: 83,
    12: 86,
    15: 92,
    18: 96,
  },
  giant: {
    0: 0,
    1: 5,
    2: 10,
    3: 18,
    4: 25,
    5: 33,
    6: 43,
    7: 50,
    8: 58,
    9: 64,
    10: 70,
    11: 74,
    12: 79,
    15: 86,
    18: 92,
  },
};

const SIZE_LABELS: Record<SizeCategory, string> = {
  toy: "Toy Breed",
  small: "Small Breed",
  medium: "Medium Breed",
  large: "Large Breed",
  giant: "Giant Breed",
};

const SIZE_STOP_GROWING: Record<SizeCategory, string> = {
  toy: "9–12 months",
  small: "10–12 months",
  medium: "12–15 months",
  large: "15–18 months",
  giant: "18–24 months",
};

function interpolateGrowth(size: SizeCategory, ageMonths: number): number {
  const curve = GROWTH_CURVE[size];
  const keys = Object.keys(curve)
    .map(Number)
    .sort((a, b) => a - b);
  if (ageMonths <= 0) return 0;
  if (ageMonths >= keys[keys.length - 1]) return curve[keys[keys.length - 1]];
  for (let i = 0; i < keys.length - 1; i++) {
    if (ageMonths >= keys[i] && ageMonths <= keys[i + 1]) {
      const t = (ageMonths - keys[i]) / (keys[i + 1] - keys[i]);
      return curve[keys[i]] + t * (curve[keys[i + 1]] - curve[keys[i]]);
    }
  }
  return 0;
}

interface PredictionResult {
  predictedMin: number;
  predictedMax: number;
  predictedMid: number;
  percentGrown: number;
  size: SizeCategory;
  sizeLabel: string;
  status: "On Track" | "Above Average" | "Below Average";
  statusColor: string;
  vetInsight: string;
  breedName: string;
  stopGrowing: string;
}

type Sex = "male" | "female" | "unknown";

function calculatePrediction(
  breedName: string,
  ageMonths: number,
  currentWeightKg: number,
  sex: Sex,
): PredictionResult | null {
  const breed = BREEDS.find((b) => b.name === breedName);

  if (!breed || ageMonths <= 0 || currentWeightKg <= 0) return null;

  const percentGrown = interpolateGrowth(breed.size, ageMonths);
  if (percentGrown <= 0) return null;

  const sexFactor = sex === "male" ? 1.12 : sex === "female" ? 0.94 : 1;

  const predictedMidBase = currentWeightKg / (percentGrown / 100);
  const predictedMid = predictedMidBase * sexFactor;
  const breedMid = (breed.minKg + breed.maxKg) / 2;
  const ratio = predictedMid / breedMid;

  let status: PredictionResult["status"] = "On Track";

  let statusColor = "text-brand";
  if (ratio > 1.15) {
    status = "Above Average";
    // Use darker, higher-contrast colors for better accessibility
    statusColor = "text-orange-700 dark:text-orange-300";
  } else if (ratio < 0.85) {
    status = "Below Average";
    statusColor = "text-blue-700 dark:text-blue-300";
  }

  const predictedMin = Math.max(0.5, predictedMid * 0.9);
  const predictedMax = predictedMid * 1.1;

  let vetInsight = "";
  if (ageMonths < 4) {
    vetInsight = `At ${ageMonths} month${ageMonths !== 1 ? "s" : ""}, your puppy is in a rapid growth phase. Ensure proper nutrition with a puppy-formula diet and schedule vaccinations.`;
  } else if (ageMonths < 8) {
    vetInsight = `At ${ageMonths} months, your puppy has reached approximately ${Math.round(percentGrown)}% of their adult weight. This is a critical period for joint development — avoid high-impact exercise.`;
  } else if (ageMonths < 14) {
    vetInsight = `At ${ageMonths} months, your puppy is ${Math.round(percentGrown)}% grown. Growth plates are still developing — continue monitoring weight monthly and consult your vet if concerned.`;
  } else {
    vetInsight = `At ${ageMonths} months, your ${SIZE_LABELS[breed.size].toLowerCase()} is approximately ${Math.round(percentGrown)}% of their adult size. Transition to adult dog food if not already done.`;
  }

  if (status === "Above Average") {
    vetInsight +=
      " Note: Your puppy is tracking slightly larger than typical for the breed — monitor with your vet.";
  }

  return {
    predictedMin: Math.round(predictedMin * 10) / 10,
    predictedMax: Math.round(predictedMax * 10) / 10,
    predictedMid: Math.round(predictedMid * 10) / 10,
    percentGrown: Math.round(percentGrown),
    size: breed.size,
    sizeLabel: SIZE_LABELS[breed.size],
    status,
    statusColor,
    vetInsight,
    breedName,
    stopGrowing: SIZE_STOP_GROWING[breed.size],
  };
}

// ─── Growth Chart ─────────────────────────────────────────────────────────────

function GrowthChart({
  size,
  currentAgeMonths,
  currentWeightKg,
  predictedAdultKg,
}: {
  size: SizeCategory;
  currentAgeMonths: number;
  currentWeightKg: number;
  predictedAdultKg: number;
}) {
  const W = 640;
  const H = 320;
  const pad = { top: 20, right: 20, bottom: 50, left: 44 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const maxAge = 18;
  const maxWeight = Math.max(predictedAdultKg * 1.15, currentWeightKg * 1.3);
  const ySteps = 6;
  const yStep = Math.ceil(maxWeight / ySteps / 5) * 5;
  const yMax = yStep * ySteps;

  const toX = (month: number) => pad.left + (month / maxAge) * chartW;
  const toY = (kg: number) => pad.top + chartH - (kg / yMax) * chartH;

  // Standard curve points
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18];
  const stdPoints = months.map((m) => ({
    x: toX(m),
    y: toY((interpolateGrowth(size, m) / 100) * predictedAdultKg),
  }));

  const stdPath = stdPoints
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");

  const stdFillPath = [
    ...stdPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`),
    `L${toX(maxAge)},${toY(0)}`,
    `L${toX(0)},${toY(0)}`,
    "Z",
  ].join(" ");

  // Current puppy dot
  const puppyX = toX(currentAgeMonths);
  const puppyY = toY(currentWeightKg);

  // Y-axis labels
  const yLabels: number[] = [];
  for (let i = 0; i <= ySteps; i++) yLabels.push(i * yStep);

  // X-axis labels
  const xLabels = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Puppy growth curve chart"
    >
      {/* Grid lines */}
      {yLabels.map((v) => (
        <line
          key={v}
          x1={pad.left}
          y1={toY(v)}
          x2={W - pad.right}
          y2={toY(v)}
          stroke="currentColor"
          strokeOpacity={0.08}
          strokeWidth={1}
          className="text-foreground"
        />
      ))}
      {xLabels.map((m) => (
        <line
          key={m}
          x1={toX(m)}
          y1={pad.top}
          x2={toX(m)}
          y2={pad.top + chartH}
          stroke="currentColor"
          strokeOpacity={0.08}
          strokeWidth={1}
          className="text-foreground"
        />
      ))}

      {/* Standard curve fill */}
      <path d={stdFillPath} fill="#20C997" fillOpacity={0.07} />

      {/* Standard curve line */}
      <path
        d={stdPath}
        fill="none"
        stroke="#20C997"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Current puppy line (from birth to current) */}
      {currentAgeMonths > 0 && (
        <>
          <line
            x1={toX(0)}
            y1={toY(0)}
            x2={puppyX}
            y2={puppyY}
            stroke="#3B82F6"
            strokeWidth={3}
            strokeLinecap="round"
          />
          {/* Current position dot */}
          <circle cx={puppyX} cy={puppyY} r={6} fill="#3B82F6" />
          <circle
            cx={puppyX}
            cy={puppyY}
            r={10}
            fill="#3B82F6"
            fillOpacity={0.2}
          />
        </>
      )}

      {/* Y-axis labels */}
      {yLabels.map((v) => (
        <text
          key={v}
          x={pad.left - 8}
          y={toY(v) + 4}
          textAnchor="end"
          fontSize={11}
          fill="currentColor"
          className="text-muted-foreground"
          opacity={0.7}
        >
          {v}
        </text>
      ))}

      {/* X-axis labels */}
      {xLabels.map((m) => (
        <text
          key={m}
          x={toX(m)}
          y={H - 8}
          textAnchor="middle"
          fontSize={11}
          fill="currentColor"
          className="text-muted-foreground"
          opacity={0.7}
        >
          {m === 0 ? "Birth" : `${m}mo`}
        </text>
      ))}

      {/* Y-axis unit label */}
      <text
        x={pad.left - 32}
        y={pad.top + chartH / 2}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        opacity={0.5}
        transform={`rotate(-90, ${pad.left - 32}, ${pad.top + chartH / 2})`}
      >
        kg
      </text>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PuppyWeight({ token }: { token: string }) {
  // Form state
  const [selectedBreed, setSelectedBreed] = useState("Golden Retriever");
  const [ageValue, setAgeValue] = useState("3");
  const [ageUnit, setAgeUnit] = useState<"months" | "weeks">("months");
  const [weightValue, setWeightValue] = useState("8");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [sex, setSex] = useState<"Male" | "Female">("Male");
  const [email, setEmail] = useState("");

  // Result state
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Fetch the FAQ array for this specific page layout string
  const [faqItems, setFaqItems] = useState(
    () => puppyWeightPageCms.faqSection ?? [],
  );
  const [blogs, setBlogs] = useState(
    () => blogPosts ?? [],
  );

  useEffect(() => {
    let isCurrent = true;

    void (async () => {
      const faqData = await fetchFaq("puppy-weight", token);
      const specificBlog = await fetchBlog("how-to-train-your-dog", token);

      if (!isCurrent) return;

      setFaqItems(
        Array.isArray(faqData?.items)
          ? faqData.items
          : (puppyWeightPageCms.faqSection ?? []),
      );
      setBlogs(
        Array.isArray(specificBlog?.posts)
          ? specificBlog.posts
          : (blogPosts ?? []),
      );
    })();
    return () => {
      isCurrent = false;
    };
  }, [token]);
  const handleCalculate = () => {
    const ageMonths =
      ageUnit === "weeks" ? parseFloat(ageValue) / 4.33 : parseFloat(ageValue);
    const weightKg =
      weightUnit === "lbs"
        ? parseFloat(weightValue) / 2.205
        : parseFloat(weightValue);

    const sexParam: "male" | "female" | "unknown" =
      sex === "Male" ? "male" : "female";

    const res = calculatePrediction(
      selectedBreed,
      ageMonths,
      weightKg,
      sexParam,
    );

    setResult(res);
    setHasCalculated(true);
  };

  const ageMonthsForChart =
    ageUnit === "weeks"
      ? parseFloat(ageValue || "0") / 4.33
      : parseFloat(ageValue || "0");
  const weightKgForChart =
    weightUnit === "lbs"
      ? parseFloat(weightValue || "0") / 2.205
      : parseFloat(weightValue || "0");

  const iconMap = {
    PawPrint: (
      <Image
        src="/logo.png"
        alt="Pawteller logo"
        className="h-5 w-5 rounded-full"
        width={200}
        height={40}
        aria-hidden="true"
      />
    ),
    BadgeCheck: <BadgeCheck className="w-4.5 h-4 text-white/80" />,
  };
  const { badge, titleLine1, titleLine2, description, features, heroImage } =
    HERO_CONTENT;
  const {
    howItWorksTitle,
    steps,
    stopGrowingTitle,
    stopGrowingDesc,
    alertNote,
    tableTitle,
    tableHeadings,
    growthRows,
    newsletterTitle,
    newsletterDesc,
    newsletterPlaceholder,
    newsletterBtnText,
  } = GROWTH_INSIGHTS_CONTENT;
  const [currentState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(submitVerificationForm, {});
  useEffect(() => {
    if (currentState.success) {
      toast.success(currentState.message || "Subscribed successfully!");
    } else if (currentState.error) {
      toast.error(currentState.error);
    }
  }, [currentState.success, currentState.error, currentState.message]);
  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* ── Hero ── */}
      {HERO_CONTENT && (
        <section className="pt-18">
          <div
            className="relative overflow-hidden"
            style={{
              background:
                "radial-gradient(130% 54% at 50% 50%, #34D399 0%, #10b981 100%)",
            }}
          >
            <div className="max-w-360 mx-auto px-5 md:px-10 lg:px-24 py-16 lg:py-20">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                {/* Left Content Column */}
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">
                      {badge}
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-extrabold text-white leading-[1.05] tracking-tight">
                      {titleLine1}
                      <br />
                      {titleLine2}
                    </h1>
                  </div>
                  <p className="text-white/90 text-lg lg:text-xl font-medium leading-relaxed max-w-105">
                    {description}
                  </p>

                  {/* Mapping features row */}
                  <div className="flex flex-wrap gap-5">
                    {features.map((feature: FeatureItem) => (
                      <div key={feature.id} className="flex items-center gap-2">
                        {iconMap[feature.iconName]}
                        <span className="text-white/80 text-sm font-medium">
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Hero Image Column */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-105 aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Wave divider */}
            <div
              className="absolute bottom-0 left-0 right-0 h-8 bg-background"
              style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }}
            />
          </div>
        </section>
      )}

      {/* ── Ad Banner ── */}
      <div className="bg-muted/50 border-y border-border py-3 flex items-center justify-center">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
          Advertisement Space
        </span>
      </div>

      {/* ── Calculator Section ── */}
      <section
        id="calculator"
        className="max-w-360 mx-auto px-2 sm:px-5 md:px-10 lg:px-24 py-14 lg:py-20"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-card border border-border rounded-3xl p-5 lg:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-xl bg-brand-light flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-brand" />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                Enter Puppy Details
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              {/* Breed */}
              <div>
                <label
                  htmlFor="selectedBreed"
                  className="block text-sm font-semibold text-muted-foreground mb-2"
                >
                  Select Breed
                </label>
                <select
                  id="selectedBreed"
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand/40 appearance-none cursor-pointer"
                >
                  {BREEDS.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age + Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="ageValue"
                    className="block text-sm font-semibold text-muted-foreground mb-2"
                  >
                    Current Age
                  </label>
                  <input
                    id="ageValue"
                    type="number"
                    value={ageValue}
                    onChange={(e) => setAgeValue(e.target.value)}
                    min="0"
                    step="0.5"
                    placeholder="e.g. 12"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ageUnit"
                    className="block text-sm font-semibold text-muted-foreground mb-2"
                  >
                    Unit
                  </label>
                  <select
                    value={ageUnit}
                    id="ageUnit"
                    onChange={(e) =>
                      setAgeUnit(e.target.value as "months" | "weeks")
                    }
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand/40 appearance-none cursor-pointer"
                  >
                    <option value="months">Months</option>
                    <option value="weeks">Weeks</option>
                  </select>
                </div>
              </div>

              {/* Weight */}
              <div>
                <label
                  htmlFor="weightValue"
                  className="block text-sm font-semibold text-muted-foreground mb-2"
                >
                  Current Weight
                </label>
                <div className="flex gap-3">
                  <input
                    id="weightValue"
                    type="number"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}
                    min="0"
                    step="0.1"
                    placeholder="e.g. 8.5"
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
                  />
                  <label htmlFor="weightUnit" className="sr-only">
                    Weight Unit
                  </label>
                  <select
                    id="weightUnit"
                    value={weightUnit}
                    onChange={(e) =>
                      setWeightUnit(e.target.value as "kg" | "lbs")
                    }
                    className="w-24 px-3 py-3 rounded-xl border border-border bg-muted text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand/40 appearance-none cursor-pointer"
                  >
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>

              {/* Sex */}
              <div>
                <div className="block text-sm font-semibold text-muted-foreground mb-2">
                  Sex (Optional)
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {(["Male", "Female"] as const).map((s) => (
                    <Button
                      type="button"
                      key={s}
                      onClick={() => setSex(s)}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${sex === s
                        ? "border-brand bg-brand-light text-brand"
                        : "border-border bg-card text-muted-foreground hover:border-brand/50"
                        }`}
                    >
                      {s === "Male" ? (
                        <Mars
                          className="w-3.5 h-4"
                          color={sex === "Male" ? "#3B82F6" : "#9CA3AF"}
                        />
                      ) : (
                        <Venus
                          className="w-3 h-4"
                          color={sex === "Female" ? "#EC4899" : "#9CA3AF"}
                        />
                      )}
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <Button
                type="button"
                onClick={handleCalculate}
                className="w-full py-4 rounded-xl bg-brand text-blue-900 dark:text-white font-extrabold text-base flex items-center 
                justify-center gap-3 hover:text-white active:scale-[0.98] transition-all shadow-[0_10px_20px_-5px_rgba(32,201,151,0.35)]"
              >
                Predict Adult Weight
                <ArrowRight className="w-4 h-4" color="#fff" />
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            {result ? (
              <>
                {/* Prediction Header */}
                <div className="bg-card border border-border rounded-3xl p-7 lg:p-8 shadow-sm">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-brand text-xs font-bold uppercase tracking-widest mb-1">
                        Prediction Results
                      </p>
                      <h3 className="text-2xl font-extrabold text-foreground">
                        Your {result.breedName} Puppy
                      </h3>
                    </div>
                    <Button
                      onClick={() => setResult(null)}
                      type="button"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="w-5 h-5 text-[#9CA3AF]" />
                    </Button>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-muted rounded-2xl p-4 text-center border border-border">
                      <p className="text-foreground/90 text-xs font-medium mb-1">
                        Estimated Adult Weight
                      </p>
                      <p className="text-foreground font-black">
                        <span className="text-3xl">
                          {weightUnit === "lbs"
                            ? `${(result.predictedMin * 2.205).toFixed(1)}–${(result.predictedMax * 2.205).toFixed(1)}`
                            : `${result.predictedMin}–${result.predictedMax}`}
                        </span>
                        <span className="text-base ml-1">{weightUnit}</span>
                      </p>
                    </div>
                    <div className="bg-muted rounded-2xl p-4 text-center border border-border">
                      <p className="text-muted-foreground text-xs font-medium mb-1">
                        Size Category
                      </p>
                      <p className="text-foreground text-lg font-black">
                        {result.sizeLabel}
                      </p>
                    </div>
                    <div className="bg-muted rounded-2xl p-4 text-center border border-border">
                      <p className="text-muted-foreground text-xs font-medium mb-1">
                        Growth Status
                      </p>
                      <p className={`text-lg font-black ${result.statusColor}`}>
                        {result.status}
                      </p>
                    </div>
                  </div>

                  {/* Infographic: % grown */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        Growth Progress
                      </span>
                      <span className="text-xs font-bold text-brand">
                        {result.percentGrown}% grown
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand transition-all duration-700"
                        style={{ width: `${result.percentGrown}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-[10px] text-muted-foreground">
                        Birth
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Full grown ({result.stopGrowing})
                      </span>
                    </div>
                  </div>

                  {/* Vet Insight */}
                  <div className="flex items-start gap-4 bg-brand-light rounded-2xl p-5 border border-brand/20">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                      <HeartPulse
                        className="w-5 h-6 text-brand"
                        color="#20C997"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">
                        Veterinarian Insight
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {result.vetInsight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground">
                      Growth Curve Comparison
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand" />
                        <span className="text-xs text-muted-foreground font-medium">
                          Standard Curve
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-xs text-muted-foreground font-medium">
                          Your Puppy
                        </span>
                      </div>
                    </div>
                  </div>
                  <GrowthChart
                    size={result.size}
                    currentAgeMonths={ageMonthsForChart}
                    currentWeightKg={weightKgForChart}
                    predictedAdultKg={result.predictedMid}
                  />
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="bg-card border border-border rounded-3xl p-10 shadow-sm flex flex-col items-center justify-center text-center min-h-100">
                <div className="w-20 h-20 rounded-3xl bg-brand-light flex items-center justify-center mb-5">
                  <Image
                    src="/logo.png"
                    alt="Pawteller logo"
                    className="h-5 w-5 rounded-full"
                    width={200}
                    height={40}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Ready to Predict
                </h3>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                  {` Fill in your puppy's details and click "Predict Adult Weight" to see their 
                  estimated growth chart and veterinarian insights.`}
                </p>
                {hasCalculated && (
                  <p className="mt-4 text-orange-500 text-sm font-medium">
                    Please enter valid age and weight values.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── When Will Puppies Stop Growing Infographic ── */}
      <section className="bg-muted/40 border-y border-border py-10">
        {infographicSection && (
          <div className="max-w-360 mx-auto px-5 md:px-10 lg:px-24">
            <h3 className="text-lg font-bold text-foreground mb-6 text-center">
              {infographicSection.title
                ? infographicSection.title
                : `When will your puppy stop growing?`}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {infographicSection.reasons?.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl border p-5 text-center ${item.color}`}
                >
                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">
                    {item.label}
                  </p>
                  <p className={`text-2xl font-black ${item.textColor}`}>
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── Growth Support Recommendations ── */}
      <section className="bg-muted/30 py-16 lg:py-24">
        {growthSupportRecommendation && (
          <div className="max-w-360 mx-auto px-5 md:px-10 lg:px-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {growthSupportRecommendation.title
                  ? growthSupportRecommendation.title
                  : `Growth Support Recommendations`}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                {growthSupportRecommendation.desc
                  ? growthSupportRecommendation.desc
                  : `Expert-backed advice tailored to your puppy's current developmental stage.`}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {growthSupportRecommendation.recommendations?.map((card) => (
                <div
                  key={card.title}
                  className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${card.iconBg}`}
                  >
                    {card.icon && (
                      <card.icon className="w-6 h-6" color={card.Color} />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <Link
                    href="#calculator"
                    className={`flex items-center gap-2 text-sm font-bold ${card.linkColor} hover:opacity-75 transition-opacity`}
                  >
                    {card.link}
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── How It Works + Breed Table ── */}
      {GROWTH_INSIGHTS_CONTENT && (
        <section className="max-w-360 mx-auto px-5 md:px-10 lg:px-24 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column: How it works & Development Info */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
                {howItWorksTitle}
              </h2>
              <div className="bg-muted/50 rounded-2xl p-7 flex flex-col gap-6 border border-border">
                {steps.map((step: PredictionStep) => (
                  <div key={step.n} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {step.n}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                      <span className="font-bold text-foreground">
                        {step.strong}
                      </span>
                      {step.rest}
                    </p>
                  </div>
                ))}
              </div>

              {/* Puppy growth stops sub-section */}
              <div className="mt-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {stopGrowingTitle}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-5">
                  {stopGrowingDesc}
                </p>
                <div className="flex items-start gap-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
                  <AlertTriangle className="w-5 h-5 text-[#CA8A04] shrink-0 mt-0.5" />
                  <p className="text-amber-800 dark:text-amber-200 text-sm font-medium italic leading-relaxed">
                    {alertNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Breed size reference table & Signup conversion box */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
                {tableTitle}
              </h2>
              <div className="border border-border rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b border-border">
                      <th className="text-left px-5 py-4 font-bold text-foreground">
                        {tableHeadings.cat}
                      </th>
                      <th className="text-left px-5 py-4 font-bold text-foreground">
                        {tableHeadings.weight}
                      </th>
                      <th className="text-left px-5 py-4 font-bold text-foreground hidden sm:table-cell">
                        {tableHeadings.height}
                      </th>
                      <th className="text-left px-5 py-4 font-bold text-foreground">
                        {tableHeadings.stops}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {growthRows.map((row: GrowthRow, i: number) => (
                      <tr
                        key={row.cat}
                        className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-muted/30"
                          }`}
                      >
                        <td className="px-5 py-4 text-muted-foreground">
                          {row.cat}
                        </td>
                        <td className="px-5 py-4 font-bold text-foreground">
                          {row.weight}
                        </td>
                        <td className="px-5 py-4 text-muted-foreground hidden sm:table-cell">
                          {row.height}
                        </td>
                        <td className="px-5 py-4 text-muted-foreground">
                          {row.stops}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Email signup box */}
              <div className="mt-8 bg-gray-900 dark:bg-gray-800 rounded-2xl p-7">
                <h3 className="text-white text-lg font-bold mb-2">
                  {newsletterTitle}
                </h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  {newsletterDesc}
                </p>
                {(currentState.success || currentState.error) && (
                  <div
                    className="mx-auto mt-6 flex w-full max-w-md items-center justify-center rounded-lg border border-border/60 bg-background/70 px-4 py-3"
                    aria-live="polite"
                  >
                    {currentState.success ? (
                      <span className="inline-flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle2 className="size-4.5" aria-hidden="true" />
                        <span>{currentState.message ?? ""}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle className="size-4.5" aria-hidden="true" />
                        <span>{currentState.error ?? ""}</span>
                      </span>
                    )}
                  </div>
                )}
                <form action={formAction} className="flex flex-col gap-3">
                  <Label htmlFor="email" className="sr-only">
                    {newsletterPlaceholder}
                  </Label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    required
                    disabled={isPending}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={newsletterPlaceholder}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-brand/60"
                  />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3.5 rounded-xl bg-brand text-white font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    {isPending
                      ? "Subscribing to Newsletter"
                      : newsletterBtnText}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Backlinks || Other Calculators and services */}
      {(() => {
        // Map only 2 random calculators (exclude Dog Age itself)
        const eligibleCards = backlinks.filter(
          (card) => card.cta.href !== "/calculators/puppy-weight",
        );

        const stableIndexSeed = result
          ? `${result.breedName}-${result.predictedMid}-${result.percentGrown}-${result.size}`
          : "fallback-4";
        let hash = 0;
        for (let i = 0; i < stableIndexSeed.length; i++) {
          hash = (hash * 31 + stableIndexSeed.charCodeAt(i)) >>> 0;
        }

        const start =
          eligibleCards.length === 0 ? 0 : hash % eligibleCards.length;
        const cards = [
          eligibleCards[start],
          eligibleCards[(start + 1) % eligibleCards.length],
        ].filter(Boolean);

        return <BacklinkCalculatorCard cards={cards} />
      })()}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(() => {
          const nutritionPosts = blogs.filter(
            (post) => post.category === "Nutrition",
          );
          if (nutritionPosts.length === 0) return null;

          // 2. Map over the array of matching blog posts
          return nutritionPosts.map((article) => (
            <BlogCard key={article.url} {...article} />
          ));
        })()}
      </div>

      {/* ── FAQ ── */}
      <section className="bg-muted/30 py-16 lg:py-24 border-y border-border">
        <div className="max-w-200 mx-auto px-5 md:px-10">
          {puppyWeightPageCms.faqSection && (
            <FaqSection items={faqItems ?? []} />
          )}
        </div>
      </section>

    </div>
  );
}
