"use client";

import { useEffect, useRef, useState } from "react";
import { quizData } from "@/lib/constant";
import { ArrowLeft, ArrowRight, Dog, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuizComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    Array(quizData.totalQuestions).fill(null),
  );
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const progress = Math.round((currentStep / quizData.totalQuestions) * 100);
  const currentQuestion = quizData.steps[currentStep];
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleOptionSelect = (option: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = option;
    setSelectedAnswers(newAnswers);

    // Auto advance after a short delay
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    advanceTimeoutRef.current = setTimeout(() => {
      setCurrentStep((prev) => {
        if (prev < quizData.totalQuestions - 1)
          return prev + 1;
        setIsComplete(true);
        return prev;
      });
    }, 300);
  };
  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, []);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers(Array(quizData.totalQuestions).fill(null));
    setIsComplete(false);
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Dog className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide uppercase">
              {quizData.banner}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-6 text-balance">
            Quiz Complete!
          </h1>

          <p className="text-muted-foreground mb-8">
            Based on your answers, we&apos;d recommend breeds that match your
            lifestyle.
          </p>

          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border mb-8">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              Your Answers:
            </h2>
            <div className="space-y-3 text-left">
              {quizData.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 py-2 border-b border-border last:border-0"
                >
                  <span className="text-muted-foreground text-sm">
                    {step.question}
                  </span>
                  <span className="font-medium text-card-foreground">
                    {selectedAnswers[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-4 h-4" />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-primary mb-4">
          <Dog className="w-5 h-5" />
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

      {/* Progress */}
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

      {/* Question Card */}
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8">
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
                  <button
                    type="button"
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                    className={cn(
                      "relative flex items-center justify-between px-4 sm:px-5 py-4 sm:py-5 rounded-xl border-2 text-left transition-all duration-200",
                      "text-card-foreground font-medium text-sm sm:text-base",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-transparent",
                    )}
                  >
                    <span>{option}</span>
                    {(isSelected || isHovered) && (
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200",
                          isSelected ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Back Button */}
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="mt-6 sm:mt-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
