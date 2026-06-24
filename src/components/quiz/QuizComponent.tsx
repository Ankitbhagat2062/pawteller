"use client";

import axios, { type AxiosError } from "axios";
import { ArrowLeft, ArrowRight, Dog, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { DogBreedEmailProps } from "@/components/emails/DogBreed-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Breed, breedDatabase, quizFaqBase } from "@/lib/cms/quizpage";
import type { quizDataProps } from "@/lib/types";
import { FaqBlogBacklink } from "@/components/shared/FaqBlogBackLink";
import { cn } from "@/lib/utils";

type ContactPayload = {
  email: string;
  quizId: string;
  results?: DogBreedEmailProps;
};

type ContactSuccessResponse = {
  success: true;
  data: unknown;
};

type ContactErrorResponse = {
  success?: false;
  error?: string;
};

export function QuizComponent({ quizData }: { quizData: quizDataProps, token: string }) {
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
  const {
    register,
    handleSubmit,
  } = useForm<{ firstName: string; email: string }>({
    defaultValues: {
      firstName: "",
      email: "",
    },
  });
  const [topBreedName, setTopBreedName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [quizExist, setQuizExist] = useState<true | false>(false)
  useEffect(() => {
    (async () => {
      const quizId = new URLSearchParams(quizData.url.split("?")[1] ?? "").get("quiz") ?? quizData.url;
      const email = localStorage.getItem('adminEmail') ?? '';

      // Safety check: don't make an empty request if there is no email in localStorage
      if (!email) return;

      try {
        const payload = { email, quizId };

        const res = await axios.post<{ message?: string; success?: boolean }>(
          "/api/quiz",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(res.data)
        // Check if response is successful (status 200) and contains your custom message
        if (res.status === 200 && res.data?.message === "You have already given quiz") {
          setQuizExist(true);
        }
      } catch (error) {
        console.error("Error checking existing quiz status:", error);
      }
    })();
  }, [quizData.url]);
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
  const onSubmit = async (data: { firstName: string; email: string }) => {
    const { firstName, email } = data;
    const result = isComplete
      ? generateBreedResult(
        firstName,
        selectedAnswers as string[],
        breedDatabase,
      )
      : null;
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
      >("/api/quiz/get", payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.data && "success" in res.data && res.data.success === true) {
        setStatus("success");
        setTopBreedName(result?.topMatches[0].breed ?? "");
        setTimeout(() => {
          router.push("/");
        }, 500);
        if (res.status === 421) {
          setQuizExist(true)
        }
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <Input
                  type="text"
                  placeholder="Your first name"
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-gray-200/80 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#e0664d] focus:ring-1 focus:ring-[#e0664d] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-[#e0664d]"
                  {...register("firstName", { required: true })}
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-gray-200/80 bg-white px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:border-[#e0664d] focus:ring-1 focus:ring-[#e0664d] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-[#e0664d]"
                  {...register("email", { required: true })}
                />
              </div>

              <Button
                type="submit"
                disabled={status === "loading"}
                aria-disabled={status === "loading"}
                className="mt-2 w-full rounded-xl bg-[#e0664d] py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(224,102,77,0.65)] shadow-[#e0664d]/30 ring-1 ring-[#e0664d]/30 transition-all duration-200 hover:bg-[#cb553d] hover:shadow-[0_18px_55px_-22px_rgba(203,85,61,0.9)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0664d] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Submitting' : `Reveal my top 3 breeds`}
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
        <FaqBlogBacklink page="quiz" category="Lifestyle" faqSection={quizFaqBase} />
      </div>
    );
  }
  if (quizExist) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 text-center">
          <div className="mx-auto flex w-fit items-center justify-center gap-2 text-primary mb-4">
            <Dog className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide uppercase">
              {quizData.banner}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-3 text-balance">
            You’ve already taken this quiz
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-sm sm:text-base">
            Thanks! We already have your answers tied to your email. Sit tight—your personalized result is on the way.
          </p>
        </header>

        <main className="flex-1 px-4 sm:px-6 md:px-8 pb-8 sm:pb-10">
          <div className="mx-auto w-full max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#e0664d]/20 blur-3xl dark:bg-[#e0664d]/25" />
                <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-[#e0664d]/10 blur-3xl dark:bg-[#e0664d]/15" />
              </div>

              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground">
                        Check your inbox
                      </h2>
                      <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                        If you don’t see it, check your spam folder. We’ll send your full top-breed matches shortly.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <Button
                      type="button"
                      onClick={() => router.push("/")}
                      className="w-full sm:w-auto rounded-xl bg-[#e0664d] py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-18px_rgba(224,102,77,0.65)] shadow-[#e0664d]/30 ring-1 ring-[#e0664d]/30 transition-all duration-200 hover:bg-[#cb553d] hover:shadow-[0_18px_55px_-22px_rgba(203,85,61,0.9)] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0664d] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
                    >
                      Go to homepage
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        // Reloading keeps user on the same quiz route while re-checking existence
                        router.refresh();
                      }}
                      className="w-full sm:w-auto rounded-xl border-border bg-transparent px-4 py-3.5 text-sm font-semibold text-card-foreground transition-all duration-200 hover:-translate-y-px hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0664d] focus-visible:ring-offset-2 dark:hover:bg-primary/10"
                    >
                      Re-check status
                    </Button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-border/60 bg-background/30 p-4">
                    <p className="text-xs font-medium text-muted-foreground">What happens next?</p>
                    <p className="mt-1 text-sm font-semibold text-card-foreground">We email your results</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/30 p-4">
                    <p className="text-xs font-medium text-muted-foreground">Your quiz is saved</p>
                    <p className="mt-1 text-sm font-semibold text-card-foreground">No need to retake</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/30 p-4">
                    <p className="text-xs font-medium text-muted-foreground">Need help?</p>
                    <p className="mt-1 text-sm font-semibold text-card-foreground">Explore our FAQ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FaqBlogBacklink page="quiz" category="Lifestyle" faqSection={quizFaqBase} />
        </main>

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
