"use client";

import axios, { type AxiosError } from "axios";
import { ArrowLeft, ArrowRight, Dog, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { DogBreedEmailProps } from "@/components/emails/DogBreed-template";
import { QuizFaqSection } from "@/components/quiz/QuizFaqSection";
import BlogCard from "@/components/shared/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/lib/cms/blogpage";
import { type Breed, breedDatabase } from "@/lib/cms/quizpage";
import type { quizDataProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function QuizComponent({ quizData }: { quizData: quizDataProps }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    Array(quizData.totalQuestions).fill(null),
  );
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const progress = Math.round((currentStep / quizData.totalQuestions) * 100);
  const currentQuestion = quizData.steps[currentStep];
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [topBreedName, setTopBreedName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const handleOptionSelect = (option: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = option;
    setSelectedAnswers(newAnswers);

    // Auto advance after a short delay
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    advanceTimeoutRef.current = setTimeout(() => {
      setCurrentStep((prev) => {
        if (prev < quizData.totalQuestions - 1) return prev + 1;
        setIsComplete(true);
        return prev;
      });
    }, 300);
  };
  function calculateBreedScore(breed: Breed, answers: string[]) {
    const [home, activity, kids, experience, shedding, size] = answers;

    const breakdown = {
      apartmentLiving: 0,
      lifestyleMatch: 0,
      kidFriendly: 0,
      beginnerFriendly: 0,
      lowShedding: 0,
      sizePreference: 0,
    };

    if (breed.home.includes(home as (typeof breed.home)[number])) {
      breakdown.apartmentLiving = 25;
    }

    if (breed.energy === activity) {
      breakdown.lifestyleMatch = 25;
    }

    if (kids === "Yes, little ones" && breed.goodWithKids) {
      breakdown.kidFriendly = 15;
    }

    if (experience === "First-timer" && breed.beginnerFriendly) {
      breakdown.beginnerFriendly = 15;
    }

    if (breed.shedding === shedding) {
      breakdown.lowShedding = 10;
    }

    if (breed.size === size) {
      breakdown.sizePreference = 10;
    }

    const total =
      breakdown.apartmentLiving +
      breakdown.lifestyleMatch +
      breakdown.kidFriendly +
      breakdown.beginnerFriendly +
      breakdown.lowShedding +
      breakdown.sizePreference;

    return {
      total,
      breakdown,
    };
  }
  function getTopBreedMatches(answers: string[], breeds: Breed[]) {
    return breeds
      .map((breed) => {
        const result = calculateBreedScore(breed, answers);

        return {
          breed,
          score: result.total,
          breakdown: result.breakdown,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }
  function generateBreedResult(
    userName: string,
    answers: string[],
    breeds: Breed[],
  ) {
    const matches = getTopBreedMatches(answers, breeds);

    return {
      userName,

      topMatches: matches.map(({ breed, score, breakdown }, index) => ({
        rank: index + 1,

        breed: breed.name,

        compatibility: score,

        description: breed.description,

        temperament: breed.temperament,

        lifespan: breed.lifespan,

        reasons: generateReasons({
          breed,
          answers,
        }),

        scoreBreakdown: {
          apartmentLiving: `${breakdown.apartmentLiving}/25`,
          lifestyleMatch: `${breakdown.lifestyleMatch}/25`,
          kidFriendly: `${breakdown.kidFriendly}/15`,
          beginnerFriendly: `${breakdown.beginnerFriendly}/15`,
          lowShedding: `${breakdown.lowShedding}/10`,
          sizePreference: `${breakdown.sizePreference}/10`,
          total: `${score}/100`,
        },
      })),
    };
  }
  function generateReasons({
    breed,
    answers,
  }: {
    breed: Breed;
    answers: string[];
  }) {
    const reasons = [];

    if (answers[0] === "Apartment" && breed.goodFor.includes("Apartments")) {
      reasons.push("Well suited to apartment living.");
    }

    if (
      answers[2] === "Yes, little ones" &&
      breed.goodFor.includes("Children")
    ) {
      reasons.push("Known for being gentle with children.");
    }

    if (
      answers[3] === "First-timer" &&
      breed.goodFor.includes("First-time owners")
    ) {
      reasons.push("Recommended for first-time dog owners.");
    }

    if (
      answers[4] === "Low shed please" &&
      breed.shedding === "Low shed please"
    ) {
      reasons.push("Matches your preference for minimal shedding.");
    }

    return reasons;
  }
  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, []);
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers(Array(quizData.totalQuestions).fill(null));
    setIsComplete(false);
    setTopBreedName("");
  };
  const handleSubmitResults = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = isComplete
      ? generateBreedResult(
          firstName,
          selectedAnswers as string[],
          breedDatabase,
        )
      : null;
      
      type ContactPayload = {
        email: string;
      quizId: string;
      results: DogBreedEmailProps;
    };

    type ContactSuccessResponse = {
      success: true;
      data: unknown;
    };
    
    type ContactErrorResponse = {
      success?: false;
      error?: string;
    };
    
    if (!result) {
      setStatus("error");
      return;
    }
    
    try {
      const quizId =
      new URLSearchParams(quizData.url.split("?")[1] ?? "").get("quiz") ??
      quizData.url;
      
      const payload: ContactPayload = { email, quizId, results: result };
      if (status === "loading") return;
      setStatus("loading");
      const res = await axios.post<
      ContactSuccessResponse | ContactErrorResponse
      >("/api/quiz", payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data && "success" in res.data && res.data.success === true) {
        setStatus("success");
        setFirstName("");
        setEmail("");
        setTopBreedName(result?.topMatches[0].breed ?? "");
        setTimeout(() => {
          router.push("/");
        }, 500);
        return;
      }
      setStatus("error");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ContactErrorResponse>;

      console.error("Quiz submit failed", {
        message: axiosError.message,
        data: axiosError.response?.data,
      });

      setStatus("error");
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 transition-colors duration-300 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-xl text-center">
          <div className="mb-4 flex items-center justify-center text-4xl animate-bounce sm:text-5xl">
            🎉
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-800 dark:text-gray-100 sm:text-4xl">
            We found your match!
          </h2>
          <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300 sm:text-base">
            Your top breed is a{" "}
           <span className="font-bold text-[`#e0664d`]">{topBreedName}</span>{" "}
            ... plus 2 other strong matches.
          </p>

          <div className="mt-6 rounded-2xl border border-orange-100/50 bg-[#fdf7f2] p-5 shadow-sm dark:border-gray-800 dark:bg-gray-800 sm:p-8">
            <div className="mb-5 flex items-center justify-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 sm:text-sm">
              <Mail className="h-4 w-4" />
              <span>Get your full personalized result</span>
            </div>

            {status === "success" && (
              <p className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                Success! Check your inbox soon.
              </p>
            )}
            {status === "error" && (
              <p className="mb-4 text-sm font-medium text-red-600 dark:text-red-400">
                Oops! Something went wrong. Please try again.
              </p>
            )}

            <form onSubmit={handleSubmitResults} className="space-y-3">
              <div>
                <Input
                  type="text"
                  value={firstName}
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  required
                  className="w-full rounded-xl border border-gray-200/80 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#e0664d] focus:ring-1 focus:ring-[#e0664d] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-[#e0664d]"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-gray-200/80 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#e0664d] focus:ring-1 focus:ring-[#e0664d] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-[#e0664d]"
                />
              </div>

              <Button
                type="submit"
                className="mt-2 w-full rounded-xl bg-[#e0664d] py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(224,102,77,0.65)] shadow-[#e0664d]/30 ring-1 ring-[#e0664d]/30 transition-all duration-200 hover:bg-[#cb553d] hover:shadow-[0_18px_55px_-22px_rgba(203,85,61,0.9)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0664d] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
              >
                Reveal my top 3 breeds
              </Button>
            </form>

            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              No spam. Unsubscribe anytime.
            </p>

            <Button
              type="button"
              onClick={handleRestart}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-border bg-transparent px-4 py-2.5 text-xs font-semibold text-gray-800 transition-all duration-200 hover:-translate-y-px hover:border-primary/60 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0664d] focus-visible:ring-offset-2 dark:text-gray-100 dark:hover:bg-primary/10 sm:w-auto"
            >
              Restart quiz
            </Button>
          </div>
        </div>
        <QuizFaqSection quizSlug={quizData.url} />
        <div className="mt-8 grid items-center justify-center grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(() => {
            const quizblogPosts = blogPosts.filter(
              (post) => post.category === quizData.category,
            );
            if (quizblogPosts.length === 0) return null;
            return quizblogPosts.map((article) => (
              <BlogCard key={article.url} {...article} />
            ));
          })()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <Dog className="h-5 w-5" />
          <span className="text-sm font-medium tracking-wide uppercase">
            {quizData.banner}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-3 text-balance">
          {quizData.title}
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base">
          {quizData.totalQuestions} questions · about {quizData.estimatedTime}
        </p>
      </header>

      <div className="px-4 sm:px-6 md:px-8 max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <span>
            Step {currentStep + 1} of {quizData.totalQuestions}
          </span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Quiz */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-border">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-card-foreground mb-6 sm:mb-8">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentStep] === option;
                const isHovered = hoveredOption === option;

                return (
                  <Button
                    type="button"
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={cn(
                      "relative flex items-center justify-between gap-4 px-4 sm:px-5 py-4 sm:py-5 rounded-xl border-2 text-left transition-all duration-200",
                      "text-card-foreground font-semibold text-xs sm:text-base",
                      "bg-[linear-gradient(180deg,rgba(224,102,77,0.07),rgba(224,102,77,0.02))] dark:bg-[linear-gradient(180deg,rgba(224,102,77,0.16),rgba(224,102,77,0.06))]",
                      isSelected
                        ? "border-primary bg-primary/10 shadow-[0_10px_30px_-20px_rgba(224,102,77,0.9)]"
                        : isHovered
                          ? "border-primary/70 bg-primary/5 shadow-[0_8px_24px_-18px_rgba(224,102,77,0.75)]"
                          : "border-border hover:border-primary/50 bg-transparent",
                    )}
                  >
                    <span>{option}</span>
                    {(isSelected || isHovered) && (
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200",
                          isSelected ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                    )}
                  </Button>
                );
              })}
            </div>

            {currentStep > 0 && (
              <Button
                type="button"
                onClick={handleBack}
                className="mt-6 sm:mt-8 flex items-center gap-2 rounded-xl text-sm font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-px hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0664d] focus-visible:ring-offset-2 dark:hover:text-gray-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
