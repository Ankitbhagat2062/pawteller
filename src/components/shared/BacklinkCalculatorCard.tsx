import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { BacklinkItem } from "@/lib/cms/calculators/calculatorpage";

const BacklinkCalculatorCard = ({ cards }: { cards: BacklinkItem[] }) => {
  return (
    <section className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Other calculators you may need
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Continue exploring Pawteller’s tools to support your dog’s
          nutrition and growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Card
            key={card.title}
            className={`p-6 bg-linear-to-br ${card.className ??
              "from-orange-500/10 to-amber-500/10 border-orange-200/50 dark:border-orange-800/40"
              }`}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full"
            >
              <Link
                href={card.cta.href}
                aria-label={card.cta.ariaLabel || card.cta.label}
              >
                {card.cta.label}
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BacklinkCalculatorCard;
