"use client";

import {
  BookOpen,
  CircleHelp,
  Home,
  ImageIcon,
  ListPlus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { type UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { calculatorSectionProps } from "@/lib/cms/calculators/calculatorpage";
import {
  defaultHomepageContent,
  type HomepageContent,
  HomepageContentSchema,
} from "@/lib/cms/homepage";
import type { FAQItem, seoProps } from "@/lib/types";

type HomepageAdminResponse = HomepageContent & {
  seo: seoProps;
  faqItems: FAQItem[];
  calculatorSection: calculatorSectionProps;
};

function emptyCalculatorCard() {
  return {
    title: "",
    displayTitle: "",
    description: "",
    bg: "bg-[#f5c5a3]",
    darkBg: "dark:bg-[#3c261d]",
    className: "",
    imageSrc: "",
    imageAlt: "",
    badge: "",
  };
}

function emptyDogLifeStage() {
  return {
    icon: "*",
    age: "",
    stage: "",
    weight: "",
    className: "",
  };
}

export default function Dashboard({token}: {token?: string}) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seo, setSeo] = useState<seoProps | null>(null);
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [calculatorSection, setCalculatorSection] =
    useState<calculatorSectionProps | null>(null);

  const { control, formState, handleSubmit, register, reset, watch } =
    useForm<HomepageContent>({
      defaultValues: defaultHomepageContent,
      mode: "onChange",
    });

  const calculatorCards = useFieldArray({
    control,
    name: "featuredCalculatorCards",
  });

  const lifeStages = useFieldArray({
    control,
    name: "dogLifes.right.dogLifeStages",
  });

  const values = watch();

  useEffect(() => {
    async function loadHomepageCms() {
      setLoading(true);
      setError(null);

      try {
        if (!token) throw new Error("Missing admin token. Login again.");

        const response = await fetch("/api/admin/homepage/get", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(data?.error ?? "Failed to load homepage CMS");
        }

        const data = (await response.json()) as HomepageAdminResponse;
        const parsed = HomepageContentSchema.safeParse(data);

        reset(parsed.success ? parsed.data : defaultHomepageContent);
        setSeo(data.seo ?? null);
        setFaqItems(data.faqItems ?? []);
        setCalculatorSection(data.calculatorSection ?? null);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Failed to load homepage CMS";
        setError(message);
        reset(defaultHomepageContent);
      } finally {
        setLoading(false);
      }
    }

    void loadHomepageCms();
  }, [reset,token]);

  async function onSubmit(nextValues: HomepageContent) {
    setSaving(true);
    setError(null);

    try {
      if (!token) throw new Error("Missing admin token. Login again.");

      const parsed = HomepageContentSchema.safeParse(nextValues);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      }

      const response = await fetch("/api/admin/homepage/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Failed to save homepage CMS");
      }

      reset(parsed.data);
      toast.success("Homepage CMS saved.");
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Failed to save homepage CMS";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full max-w-6xl px-4 py-20 md:px-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Home className="h-4 w-4" />
            Home CMS
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Edit homepage sections saved in MongoDB. SEO and FAQ are fetched
            from their existing CMS collections, and calculators come from the
            calculator-page CMS.
          </p>
        </div>

        <Button
          form="homepage-cms-form"
          type="submit"
          disabled={loading || saving || !formState.isDirty}
          className="w-full gap-2 sm:w-auto"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save homepage"}
        </Button>
      </div>

      {error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4" />
              SEO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              {seo?.title ?? "Home"}
            </p>
            <p className="line-clamp-3">
              {seo?.description ?? "No SEO found."}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CircleHelp className="h-4 w-4" />
              FAQ
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {faqItems.length} home FAQ item{faqItems.length === 1 ? "" : "s"}{" "}
            loaded from MongoDB.
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Calculators
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {calculatorSection?.calculators.length ?? 0} calculator item
            {calculatorSection?.calculators.length === 1 ? "" : "s"} loaded.
          </CardContent>
        </Card>
      </div>

      <form
        id="homepage-cms-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Accordion
          type="multiple"
          defaultValue={["hero", "cards", "dog-life"]}
          className="rounded-lg border bg-card px-4"
        >
          <AccordionItem value="hero">
            <AccordionTrigger>Hero section</AccordionTrigger>
            <AccordionContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Section ID">
                  <Input {...register("hero.id")} />
                </Field>
                <Field label="Badge text">
                  <Input {...register("hero.badgeText")} />
                </Field>
                <Field label="Headline">
                  <Input {...register("hero.h1")} />
                </Field>
                <Field label="Rating count">
                  <Input {...register("hero.ratingCountText")} />
                </Field>
              </div>

              <Field label="Description">
                <Textarea rows={4} {...register("hero.descriptionLines")} />
              </Field>

              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Rating prefix">
                  <Input {...register("hero.ratingLabelPrefix")} />
                </Field>
                <Field label="Rating suffix">
                  <Input {...register("hero.ratingLabelSuffix")} />
                </Field>
                <Field label="Hero image alt">
                  <Input {...register("hero.image.alt")} />
                </Field>
              </div>

              <Field label="Hero image URL">
                <Input {...register("hero.image.src")} />
              </Field>

              <div className="grid gap-4 lg:grid-cols-2">
                <CtaFields
                  title="Primary CTA"
                  labelPath="hero.primaryCta.label"
                  hrefPath="hero.primaryCta.href"
                  ariaPath="hero.primaryCta.ariaLabel"
                  register={register}
                />
                <CtaFields
                  title="Secondary CTA"
                  labelPath="hero.secondaryCta.label"
                  hrefPath="hero.secondaryCta.href"
                  ariaPath="hero.secondaryCta.ariaLabel"
                  register={register}
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <OverlayFields
                  title="Left overlay"
                  eyebrowPath="hero.overlayLeft.eyebrow"
                  valuePath="hero.overlayLeft.value"
                  footerPath="hero.overlayLeft.footer"
                  register={register}
                />
                <OverlayFields
                  title="Right overlay"
                  eyebrowPath="hero.overlayRight.eyebrow"
                  valuePath="hero.overlayRight.value"
                  footerPath="hero.overlayRight.footer"
                  register={register}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cards">
            <AccordionTrigger>Featured calculator cards</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => calculatorCards.append(emptyCalculatorCard())}
                  className="gap-2"
                >
                  <ListPlus className="h-4 w-4" />
                  Add card
                </Button>
              </div>

              {calculatorCards.fields.map((field, index) => (
                <div key={field.id} className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="font-medium">Card {index + 1}</p>
                    {calculatorCards.fields.length > 1 ? (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => calculatorCards.remove(index)}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    ) : null}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Calculator title match">
                      <Input
                        {...register(`featuredCalculatorCards.${index}.title`)}
                      />
                    </Field>
                    <Field label="Display title">
                      <Input
                        {...register(
                          `featuredCalculatorCards.${index}.displayTitle`,
                        )}
                      />
                    </Field>
                    <Field label="Description">
                      <Input
                        {...register(
                          `featuredCalculatorCards.${index}.description`,
                        )}
                      />
                    </Field>
                    <Field label="Badge">
                      <Input
                        {...register(`featuredCalculatorCards.${index}.badge`)}
                      />
                    </Field>
                    <Field label="Light class">
                      <Input
                        {...register(`featuredCalculatorCards.${index}.bg`)}
                      />
                    </Field>
                    <Field label="Dark class">
                      <Input
                        {...register(`featuredCalculatorCards.${index}.darkBg`)}
                      />
                    </Field>
                    <Field label="Layout class">
                      <Input
                        {...register(
                          `featuredCalculatorCards.${index}.className`,
                        )}
                      />
                    </Field>
                    <Field label="Image alt">
                      <Input
                        {...register(
                          `featuredCalculatorCards.${index}.imageAlt`,
                        )}
                      />
                    </Field>
                  </div>

                  <Field label="Image URL" className="mt-4">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      <Input
                        {...register(
                          `featuredCalculatorCards.${index}.imageSrc`,
                        )}
                      />
                    </div>
                  </Field>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dog-life">
            <AccordionTrigger>Dog life section</AccordionTrigger>
            <AccordionContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow">
                  <Input {...register("dogLifes.left.eyebrow")} />
                </Field>
                <Field label="Title">
                  <Input {...register("dogLifes.left.title")} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea rows={4} {...register("dogLifes.left.description")} />
              </Field>
              <CtaFields
                title="Section CTA"
                labelPath="dogLifes.left.cta.label"
                hrefPath="dogLifes.left.cta.href"
                ariaPath="dogLifes.left.cta.ariaLabel"
                register={register}
              />

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => lifeStages.append(emptyDogLifeStage())}
                  className="gap-2"
                >
                  <ListPlus className="h-4 w-4" />
                  Add life stage
                </Button>
              </div>

              {lifeStages.fields.map((field, index) => (
                <div key={field.id} className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="font-medium">Life stage {index + 1}</p>
                    {lifeStages.fields.length > 1 ? (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => lifeStages.remove(index)}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  <div className="grid gap-4 md:grid-cols-5">
                    <Field label="Icon">
                      <Input
                        {...register(
                          `dogLifes.right.dogLifeStages.${index}.icon`,
                        )}
                      />
                    </Field>
                    <Field label="Age">
                      <Input
                        {...register(
                          `dogLifes.right.dogLifeStages.${index}.age`,
                        )}
                      />
                    </Field>
                    <Field label="Stage">
                      <Input
                        {...register(
                          `dogLifes.right.dogLifeStages.${index}.stage`,
                        )}
                      />
                    </Field>
                    <Field label="Weight">
                      <Input
                        {...register(
                          `dogLifes.right.dogLifeStages.${index}.weight`,
                        )}
                      />
                    </Field>
                    <Field label="Class">
                      <Input
                        {...register(
                          `dogLifes.right.dogLifeStages.${index}.className`,
                        )}
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="quiz">
            <AccordionTrigger>Breed quiz CTA</AccordionTrigger>
            <AccordionContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Eyebrow">
                  <Input {...register("breedQuizCtas.feature.eyebrow")} />
                </Field>
                <Field label="Title">
                  <Input {...register("breedQuizCtas.feature.title")} />
                </Field>
                <Field label="Emphasis">
                  <Input {...register("breedQuizCtas.feature.titleEmphasis")} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea
                  rows={4}
                  {...register("breedQuizCtas.feature.description")}
                />
              </Field>
              <CtaFields
                title="Quiz CTA"
                labelPath="breedQuizCtas.feature.cta.label"
                hrefPath="breedQuizCtas.feature.cta.href"
                ariaPath="breedQuizCtas.feature.cta.ariaLabel"
                register={register}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Image URL">
                  <Input {...register("breedQuizCtas.feature.image.src")} />
                </Field>
                <Field label="Image alt">
                  <Input {...register("breedQuizCtas.feature.image.alt")} />
                </Field>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="knowledge">
            <AccordionTrigger>Knowledge base</AccordionTrigger>
            <AccordionContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Eyebrow">
                  <Input {...register("knowledgeBase.eyebrow")} />
                </Field>
                <Field label="Title">
                  <Input {...register("knowledgeBase.title")} />
                </Field>
              </div>
              <Field label="Description">
                <Textarea rows={4} {...register("knowledgeBase.description")} />
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="View all href">
                  <Input {...register("knowledgeBase.viewAllHref")} />
                </Field>
                <Field label="View all label">
                  <Input {...register("knowledgeBase.viewAllLabel")} />
                </Field>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Server response preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="max-h-80 overflow-auto rounded-md bg-muted p-4 text-xs text-muted-foreground">
              {JSON.stringify(
                {
                  ...values,
                  seo,
                  faqItems,
                  calculatorSection,
                },
                null,
                2,
              )}
            </pre>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

type FieldProps = {
  children: ReactNode;
  className?: string;
  label: string;
};

function Field({ children, className, label }: FieldProps) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-sm">{label}</Label>
      {children}
    </div>
  );
}

type Register = UseFormRegister<HomepageContent>;

type CtaFieldsProps = {
  ariaPath:
  | "hero.primaryCta.ariaLabel"
  | "hero.secondaryCta.ariaLabel"
  | "dogLifes.left.cta.ariaLabel"
  | "breedQuizCtas.feature.cta.ariaLabel";
  hrefPath:
  | "hero.primaryCta.href"
  | "hero.secondaryCta.href"
  | "dogLifes.left.cta.href"
  | "breedQuizCtas.feature.cta.href";
  labelPath:
  | "hero.primaryCta.label"
  | "hero.secondaryCta.label"
  | "dogLifes.left.cta.label"
  | "breedQuizCtas.feature.cta.label";
  register: Register;
  title: string;
};

function CtaFields({
  ariaPath,
  hrefPath,
  labelPath,
  register,
  title,
}: CtaFieldsProps) {
  return (
    <div className="rounded-lg border p-4">
      <p className="mb-4 font-medium">{title}</p>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Label">
          <Input {...register(labelPath)} />
        </Field>
        <Field label="Href">
          <Input {...register(hrefPath)} />
        </Field>
        <Field label="Aria label">
          <Input {...register(ariaPath)} />
        </Field>
      </div>
    </div>
  );
}

type OverlayFieldsProps = {
  eyebrowPath: "hero.overlayLeft.eyebrow" | "hero.overlayRight.eyebrow";
  footerPath: "hero.overlayLeft.footer" | "hero.overlayRight.footer";
  register: Register;
  title: string;
  valuePath: "hero.overlayLeft.value" | "hero.overlayRight.value";
};

function OverlayFields({
  eyebrowPath,
  footerPath,
  register,
  title,
  valuePath,
}: OverlayFieldsProps) {
  return (
    <div className="rounded-lg border p-4">
      <p className="mb-4 font-medium">{title}</p>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Eyebrow">
          <Input {...register(eyebrowPath)} />
        </Field>
        <Field label="Value">
          <Input {...register(valuePath)} />
        </Field>
        <Field label="Footer">
          <Input {...register(footerPath)} />
        </Field>
      </div>
    </div>
  );
}
