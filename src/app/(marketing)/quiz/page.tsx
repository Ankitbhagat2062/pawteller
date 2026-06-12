import type { Metadata } from "next";
import { QuizComponent } from "@/components/quiz/QuizComponent";
import { quizData as allQuizData } from "@/lib/cms/quizpage";
import type { quizDataProps } from "@/lib/types";

// Used as a fallback when `quiz` query param is missing/invalid.
const fallbackSeo = allQuizData[0]?.seo;

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { quiz?: string };
}): Promise<Metadata> {
  const quizParam = (await searchParams)?.quiz;

  const selectedQuiz: quizDataProps | undefined = allQuizData.find((q) =>
    q.url.includes(`quiz=${quizParam}`),
  );

  const seo = selectedQuiz?.seo ?? fallbackSeo;

  return {
    title:
      seo?.title || "Interactive Dog Breed & Health Quiz | pawteller",
    description:
      seo?.description ||
      "Take our fast, interactive pet quiz to test your dog care knowledge, discover ideal breeds, and unlock customized health insights.",
    keywords: seo?.keywords || [],

    alternates: {
      canonical: "https://pawteller.com/quiz",
    },

    openGraph: {
      title:
        seo?.title || "Interactive Dog Breed & Health Quiz | pawteller",
      description:
        seo?.description ||
        "Test your pet care knowledge and unlock customized health insights for your dog.",
      url: "https://pawteller.com/quiz",
      siteName: "pawteller",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://pawteller.com/og-quiz.png",
          width: 1200,
          height: 630,
          alt: "pawteller Interactive Pet Quiz",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title:
        seo?.title || "Interactive Dog Breed & Health Quiz | pawteller",
      description:
        seo?.description ||
        "Test your pet care knowledge and unlock customized health insights for your dog.",
      images: ["https://pawteller.com/og-quiz.png"],
    },

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
}

export default async function QuizPage({
  searchParams,
}: {
  searchParams?: { quiz?: string };
}) {
  const quizParam = (await searchParams)?.quiz;

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

