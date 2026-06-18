import Link from "next/link";
import type { BlogContentProps } from "@/lib/cms/blogpage";

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      {content.map((section) => (
        <section key={section.title} className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2 md:mb-3">
            {section.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {section.description
              .split(
                /(Dog Food Calculator|Puppy Weight Calculator|Dog Age Calculator)/,
              )
              .map((part, i) => {
                const sectionId = section.title;
                const sanitizedPart = part
                  ?.toString()
                  .trim()
                  .replace(/\s+/g, "-");
                const compositeKey = `${sectionId}-${sanitizedPart}-${i}`;

                if (part === "Dog Food Calculator") {
                  return (
                    <Link
                      key={compositeKey}
                      href="/calculator/dog-food"
                      aria-label="Calculate your dog's food"
                      className="text-orange-600 dark:text-orange-400 hover:underline"
                    >
                      {part}
                    </Link>
                  );
                }
                if (part === "Puppy Weight Calculator") {
                  return (
                    <Link
                      key={compositeKey}
                      href="/calculators/puppy-weight"
                      aria-label="Calculate how much your dog's weight is equivalent to human weight"
                      className="text-orange-600 dark:text-orange-400 hover:underline"
                    >
                      {part}
                    </Link>
                  );
                }
                if (part === "Dog Age Calculator") {
                  return (
                    <Link
                      key={compositeKey}
                      href="/calculators/dog-age"
                      aria-label="Calculate how much your dog's age is equivalent to human age"
                      className="text-orange-600 dark:text-orange-400 hover:underline"
                    >
                      {part}
                    </Link>
                  );
                }
                return part;
              })}
          </p>
        </section>
      ))}
    </article>
  );
}
