import type { Metadata } from "next";
import DogAge from "@/components/calculators/DogAge";
import DogFood from "@/components/calculators/DogFood";
import DogGrowth from "@/components/calculators/DogGrowth";
import DogName from "@/components/calculators/DogName";
import DogPregnancy from "@/components/calculators/DogPregnancy";
import PuppyWeight from "@/components/calculators/PuppyWeight";

const SLUG_TO_COMPONENT = {
  "dog-age": DogAge,
  "dog-growth": DogGrowth,
  "dog-food": DogFood,
  "dog-pregnancy": DogPregnancy,
  "puppy-weight": PuppyWeight,
  "dog-name": DogName,
} as const;

type CalculatorSlug = keyof typeof SLUG_TO_COMPONENT;

type PageProps = {
  params: {
    calculator?: string;
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.calculator;
  const title = slug
    ? `${slug.replace(/-/g, " ")} calculator | pawteller`
    : "Calculator | pawteller";

  return {
    title,
    description:
      "Use pawteller calculators to estimate growth and nutrition details for your dog.",
  };
}

export default function CalculatorPage({ params }: PageProps) {
  const slug = params.calculator;
  const normalizedSlug = slug?.toLowerCase() as CalculatorSlug | undefined;

  const Component = normalizedSlug
    ? SLUG_TO_COMPONENT[normalizedSlug]
    : undefined;

  const headingText = slug
    ? `${slug.replace(/-/g, " ")} calculator`
    : "Calculator";

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
        {headingText}
      </h1>

      {Component ? (
        <section className="mt-6">
          <Component />
        </section>
      ) : (
        <section className="mt-6">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Calculator not found for this link. Please choose one of the
            supported tools.
          </p>
        </section>
      )}
    </main>
  );
}
