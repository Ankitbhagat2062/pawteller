import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaCard() {
  return (
    <aside
      className="mt-10 md:mt-12 rounded-xl bg-stone-800 dark:bg-stone-900 p-6 md:p-8 text-white"
      aria-label="Breed quiz promotion"
    >
      <p className="text-xs uppercase tracking-wider text-orange-400 mb-2">
        Try it now
      </p>
      <h3 className="text-xl md:text-2xl font-semibold mb-2 text-balance">
        Find your perfect breed in 2 minutes
      </h3>
      <p className="text-stone-300 text-sm md:text-base mb-4">
        Personalized to your lifestyle, home and energy.
      </p>
      <Button
        asChild
        className="bg-orange-600 hover:bg-orange-700 text-white"
      >
        <Link href="/quiz" aria-label="Take a quiz to find your perfect dog's breed">
          Take the quiz 
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </aside>
  );
}
