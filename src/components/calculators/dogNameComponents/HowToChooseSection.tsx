import {
  DOG_NAME_GUIDE_CONTENT,
  type DogNameGuideTip,
} from "@/lib/cms/dognamepage";

export default function HowToChooseSection() {
  const { sectionTitle, tips } = DOG_NAME_GUIDE_CONTENT;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-lg p-8 md:p-12 dark:bg-slate-900 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          {sectionTitle}
        </h2>

        <div className="space-y-6">
          {tips.map((tip: DogNameGuideTip) => (
            <div key={tip.id}>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tip.title}
              </h3>
              <p className="text-foreground/70">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
