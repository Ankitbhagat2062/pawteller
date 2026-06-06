import type { Metadata } from "next";
import { QuizComponent } from "@/components/quiz/QuizComponent";
import { quizData as allQuizData } from "@/lib/constant";
import type { quizDataProps } from "@/lib/types";


// 🚀 100/100 LIGHTHOUSE SEO METADATA FOR THE QUIZ
export const metadata: Metadata = {
  title: "Interactive Dog Breed & Health Quiz | pawteller",
  description:
    "Take our fast, interactive pet quiz to test your dog care knowledge, discover ideal breeds, and unlock customized health insights.",

  // Prevents duplicate URL content indexing penalties
  alternates: {
    canonical: "https://pawteller.com/quiz",
  },

  // Rich visual configuration for social media platforms (Facebook, LinkedIn, Discord)
  openGraph: {
    title: "Interactive Dog Breed & Health Quiz | pawteller",
    description:
      "Test your pet care knowledge and unlock customized health insights for your dog.",
    url: "https://pawteller.com/quiz",
    siteName: "pawteller",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pawteller.com/og-quiz.png", // Create a clean 1200x630 image and put it in your public folder
        width: 1200,
        height: 630,
        alt: "pawteller Interactive Pet Quiz",
      },
    ],
  },

  // High-performance rich link card previews on X (formerly Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Interactive Dog Breed & Health Quiz | pawteller",
    description:
      "Test your pet care knowledge and unlock customized health insights for your dog.",
    images: ["https://pawteller.com/og-quiz.png"],
  },

  // Explicit crawler instruction directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function QuizPage({
  searchParams,
}: {
  searchParams?: { quiz?: string };
}) {
  const quizParam = (await searchParams)?.quiz;
  console.log("Received quiz param:", quizParam);
  const selectedQuiz: quizDataProps | undefined = allQuizData.find((q) =>
    q.url.includes(`quiz=${quizParam}`),
  );

  // Fallback: if quiz is missing/invalid, show the first quiz.
  const quizToRender = selectedQuiz ?? allQuizData[0];

  return (
    <main>
      <QuizComponent quizData={quizToRender} />
    </main>
  );
}
