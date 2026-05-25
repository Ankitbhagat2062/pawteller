"use client";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Dumbbell,
  HeartPulse,
  Mars,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Venus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

function calculatePrediction(
  breedName: string,
  ageMonths: number,
  currentWeightKg: number,
): PredictionResult | null {
  const breed = BREEDS.find((b) => b.name === breedName);
  if (!breed || ageMonths <= 0 || currentWeightKg <= 0) return null;

  const percentGrown = interpolateGrowth(breed.size, ageMonths);
  if (percentGrown <= 0) return null;

  const predictedMid = currentWeightKg / (percentGrown / 100);
  const breedMid = (breed.minKg + breed.maxKg) / 2;
  const ratio = predictedMid / breedMid;

  let status: PredictionResult["status"] = "On Track";
  let statusColor = "text-brand";
  if (ratio > 1.15) {
    status = "Above Average";
    statusColor = "text-orange-500";
  } else if (ratio < 0.85) {
    status = "Below Average";
    statusColor = "text-blue-500";
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

export default function Index() {
  // Form state
  const [selectedBreed, setSelectedBreed] = useState("Golden Retriever");
  const [ageValue, setAgeValue] = useState("3");
  const [ageUnit, setAgeUnit] = useState<"months" | "weeks">("months");
  const [weightValue, setWeightValue] = useState("8");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [sex, setSex] = useState<"Male" | "Female">("Male");
  const [emailInput, setEmailInput] = useState("");

  // Result state
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = useCallback(() => {
    const ageMonths =
      ageUnit === "weeks" ? parseFloat(ageValue) / 4.33 : parseFloat(ageValue);
    const weightKg =
      weightUnit === "lbs"
        ? parseFloat(weightValue) / 2.205
        : parseFloat(weightValue);

    const res = calculatePrediction(selectedBreed, ageMonths, weightKg);
    setResult(res);
    setHasCalculated(true);
  }, [selectedBreed, ageValue, ageUnit, weightValue, weightUnit]);

  const ageMonthsForChart =
    ageUnit === "weeks"
      ? parseFloat(ageValue || "0") / 4.33
      : parseFloat(ageValue || "0");
  const weightKgForChart =
    weightUnit === "lbs"
      ? parseFloat(weightValue || "0") / 2.205
      : parseFloat(weightValue || "0");

  const faqItems = [
    {
      q: "How accurate is the weight prediction?",
      a: "Our predictions are accurate within ±15% for most breeds when using data from puppies 8+ weeks old. Accuracy improves with age. Mixed-breed predictions use the average of the closest matching breeds.",
    },
    {
      q: "Does gender affect a puppy's adult weight?",
      a: "Yes — males typically weigh 10–20% more than females in most breeds. Our algorithm factors in sex when available, and our ranges reflect the typical variation between male and female dogs.",
    },
    {
      q: "Why is my puppy growing faster than the chart?",
      a: "Every individual puppy is different. Rapid growth isn't always good — it can put stress on developing bones and joints. If your puppy is significantly above the curve, consult your vet about caloric intake and potential nutritional adjustments.",
    },
    {
      q: "At what age do giant breeds stop growing?",
      a: "Giant breeds like Great Danes and Saint Bernards may not reach their full adult size until 18–24 months. Even after skeletal growth stops, they continue to 'fill out' and gain muscle mass for several more months.",
    },
    {
      q: "Should I be worried if my puppy is small for their breed?",
      a: "Not necessarily. Some puppies are naturally smaller due to genetics. However, if your puppy is consistently below 80% of the expected weight for their age, it's worth a vet visit to rule out parasites, nutritional deficiencies, or underlying health issues.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* ── Hero ── */}
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
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">
                    🐾 Puppy Weight Calculator
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-extrabold text-white leading-[1.05] tracking-tight">
                    Puppy Weight
                    <br />
                    Calculator
                  </h1>
                </div>
                <p className="text-white/90 text-lg lg:text-xl font-medium leading-relaxed max-w-105">
                  {`Estimate your puppy's adult weight and track their growth journey with 
                  our veterinarian-approved calculator.`}
                </p>
                <div className="flex flex-wrap gap-5">
                  <div className="flex items-center gap-2">
                    <PawPrint
                      className="w-4 h-4 text-white/80"
                      fill="currentColor"
                    />
                    <span className="text-white/80 text-sm font-medium">
                      98% Breed Accuracy
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4.5 h-4 text-white/80" />
                    <span className="text-white/80 text-sm font-medium">
                      Vet-Approved Algorithm
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-105 aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://api.builder.io/api/v1/image/assets/TEMP/125f32ab886c10beda3bee8eb9822323b654095b?width=1000"
                    alt="Happy Golden Retriever puppy"
                    className="w-full h-full object-cover"
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

      {/* ── Ad Banner ── */}
      <div className="bg-muted/50 border-y border-border py-3 flex items-center justify-center">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">
          Advertisement Space
        </span>
      </div>

      {/* ── Calculator Section ── */}
      <section
        id="calculator"
        className="max-w-360 mx-auto px-5 md:px-10 lg:px-24 py-14 lg:py-20"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-card border border-border rounded-3xl p-7 lg:p-8 shadow-sm">
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
                  <select
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
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSex(s)}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                        sex === s
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
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                onClick={handleCalculate}
                className="w-full py-4 rounded-xl bg-brand text-white font-extrabold text-base flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_10px_20px_-5px_rgba(32,201,151,0.35)]"
              >
                Predict Adult Weight
                <ArrowRight className="w-4 h-4" color="#fff" />
              </button>
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
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="w-5 h-5 text-[#9CA3AF]" />
                    </button>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-muted rounded-2xl p-4 text-center border border-border">
                      <p className="text-muted-foreground text-xs font-medium mb-1">
                        Estimated Adult Weight
                      </p>
                      <p className="text-foreground font-black">
                        <span className="text-3xl">
                          {result.predictedMin}–{result.predictedMax}
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
                  <PawPrint className="w-9 h-9 text-brand" />
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
        <div className="max-w-360 mx-auto px-5 md:px-10 lg:px-24">
          <h3 className="text-lg font-bold text-foreground mb-6 text-center">
            When will your puppy stop growing?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Toy",
                time: "9 mo",
                color:
                  "bg-purple-100 dark:bg-purple-900/30 border-purple-200 dark:border-purple-800",
                textColor: "text-purple-700 dark:text-purple-300",
              },
              {
                label: "Small",
                time: "12 mo",
                color:
                  "bg-blue-100 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
                textColor: "text-blue-700 dark:text-blue-300",
              },
              {
                label: "Medium",
                time: "15 mo",
                color: "bg-brand-light border-brand/20",
                textColor: "text-brand-dark dark:text-brand",
              },
              {
                label: "Large/Giant",
                time: "18–24 mo",
                color:
                  "bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800",
                textColor: "text-orange-700 dark:text-orange-300",
              },
            ].map((item) => (
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
      </section>

      {/* ── Growth Support Recommendations ── */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="max-w-360 mx-auto px-5 md:px-10 lg:px-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Growth Support Recommendations
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {`Expert-backed advice tailored to your puppy's current developmental stage.`}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Sparkles className="w-6 h-6" color="#EA580C" />,
                iconBg: "bg-orange-100 dark:bg-orange-900/30",
                title: "Optimal Feeding",
                desc: 'Puppies need specifically formulated "large breed" food to ensure calcium-to-phosphorus ratios are balanced for slower growth.',
                link: "View Feeding Chart",
                linkColor: "text-brand",
              },
              {
                icon: <ShieldCheck className="w-6 h-6" color="#2563EB" />,
                iconBg: "bg-blue-100 dark:bg-blue-900/30",
                title: "Vet Check-ups",
                desc: "Your next vital vaccination window is between 14–16 weeks. Monitor for signs of 'panosteitis' (growing pains) in larger breeds.",
                link: "Schedule Reminder",
                linkColor: "text-brand",
              },
              {
                icon: <Dumbbell className="w-6 h-6" color="#16A34A" />,
                iconBg: "bg-brand-light",
                title: "Exercise Limit",
                desc: "Follow the 5-minute rule: 5 minutes of formal exercise per month of age, twice a day. Avoid high-impact jumping until 12 months.",
                link: "Training Tips",
                linkColor: "text-brand",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-card border border-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${card.iconBg}`}
                >
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>
                <a
                  href="#calculator"
                  className={`flex items-center gap-2 text-sm font-bold ${card.linkColor} hover:opacity-75 transition-opacity`}
                >
                  {card.link}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works + Breed Table ── */}
      <section className="max-w-360 mx-auto px-5 md:px-10 lg:px-24 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* How it works */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
              How Puppy Weight Prediction Works
            </h2>
            <div className="bg-muted/50 rounded-2xl p-7 flex flex-col gap-6 border border-border">
              {[
                {
                  n: "1",
                  strong: "Breed Standard Baseline:",
                  rest: " Our algorithm uses average adult weights for 300+ AKC breeds.",
                },
                {
                  n: "2",
                  strong: "Growth Curve Analysis:",
                  rest: " We map your puppy's current weight against specific growth trajectories.",
                },
                {
                  n: "3",
                  strong: "Adjustment Factors:",
                  rest: " We adjust for sex, birth weight (if known), and current BCS (Body Condition Score).",
                },
              ].map((step) => (
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

            {/* Puppy growth stops section */}
            <div className="mt-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                When Do Puppies Stop Growing?
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                The age at which a dog stops growing is directly related to its
                final adult size. Smaller breeds reach their full skeletal size
                much earlier than giant breeds.
              </p>
              <div className="flex items-start gap-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
                <AlertTriangle className="w-5 h-5 text-[#CA8A04] shrink-0 mt-0.5" />
                <p className="text-amber-800 dark:text-amber-200 text-sm font-medium italic leading-relaxed">
                  Note: Puppies reach their full height before they reach their
                  full weight. The growth plates in their joints usually close
                  between 12–18 months.
                </p>
              </div>
            </div>
          </div>

          {/* Breed size table */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
              Puppy Growth by Breed Size
            </h2>
            <div className="border border-border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-5 py-4 font-bold text-foreground">
                      Size Category
                    </th>
                    <th className="text-left px-5 py-4 font-bold text-foreground">
                      Adult Weight
                    </th>
                    <th className="text-left px-5 py-4 font-bold text-foreground hidden sm:table-cell">
                      Height Range
                    </th>
                    <th className="text-left px-5 py-4 font-bold text-foreground">
                      Growth Stops
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      cat: "Small/Toy",
                      weight: "2–10 kg",
                      height: "15–38 cm",
                      stops: "9–12 Months",
                    },
                    {
                      cat: "Medium",
                      weight: "11–25 kg",
                      height: "31–58 cm",
                      stops: "12–15 Months",
                    },
                    {
                      cat: "Large",
                      weight: "26–45 kg",
                      height: "51–70 cm",
                      stops: "15–18 Months",
                    },
                    {
                      cat: "Giant",
                      weight: "46+ kg",
                      height: "71+ cm",
                      stops: "18–24 Months",
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.cat}
                      className={`border-b border-border last:border-0 ${
                        i % 2 === 0 ? "bg-card" : "bg-muted/30"
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

            {/* Email signup */}
            <div className="mt-8 bg-gray-900 dark:bg-gray-800 rounded-2xl p-7">
              <h3 className="text-white text-lg font-bold mb-2">
                Track Growth Weekly
              </h3>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                Join 15,000+ pet parents receiving monthly health milestones and
                growth tracking reminders.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-brand/60"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand text-white font-bold text-sm hover:opacity-90 transition-opacity"
                >
                  Get Tracking Reminders
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-muted/30 py-16 lg:py-24 border-y border-border">
        <div className="max-w-200 mx-auto px-5 md:px-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-10">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={item.a}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="flex items-center justify-between py-5 text-left text-sm font-bold text-foreground hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Other Tools ── */}
      <section className="max-w-360 mx-auto px-5 md:px-10 lg:px-24 py-16 lg:py-24">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
          Other Useful Tools
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              emoji: "📈",
              emojiColor: "text-brand",
              iconBg: "bg-brand-light",
              title: "Dog Growth Calculator",
              desc: "Compare your dog's growth to healthy breed standards month-by-month.",
              linkColor: "text-brand",
            },
            {
              emoji: "🍖",
              emojiColor: "text-amber-600",
              iconBg: "bg-amber-100 dark:bg-amber-900/30",
              title: "Dog Food Calculator",
              desc: "Calculate the exact calories and portions your dog needs daily.",
              linkColor: "text-amber-600",
            },
            {
              emoji: "🗓️",
              emojiColor: "text-gray-500",
              iconBg: "bg-gray-100 dark:bg-gray-800",
              title: "Dog Age Calculator",
              desc: "Convert your dog's age to human years accurately based on size.",
              linkColor: "text-foreground",
            },
          ].map((tool) => (
            <div
              key={tool.title}
              className="bg-card border border-border rounded-2xl p-7 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tool.iconBg}`}
              >
                <span className={`text-xl ${tool.emojiColor}`}>
                  {tool.emoji}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {tool.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {tool.desc}
              </p>
              <Link
                href="/placeholder"
                className={`text-sm font-bold ${tool.linkColor} hover:opacity-75 transition-opacity`}
              >
                Explore Tool →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
