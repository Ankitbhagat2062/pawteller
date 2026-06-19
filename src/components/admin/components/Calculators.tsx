"use client";

import {
  BadgeCheck,
  BookOpen,
  ImageIcon,
  Link2,
  ListPlus,
  Save,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type CalculatorCmsIconName,
  CalculatorCmsSchema,
  calculatorCmsIconNames,
  defaultSerializedCalculatorPageCms,
  type SerializedCalculatorPageCms,
} from "@/hooks/calculatorCms";

function getTokenFromStorage() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminAuth.token");
}

function emptyCta() {
  return { label: "", href: "", ariaLabel: "" };
}

function emptyCalculator() {
  return {
    title: "",
    description: "",
    link: "",
    badge: { bg: "#d1fae5", fg: "#065f46", icon: "PawPrint" as const },
  };
}

function emptyReason() {
  return {
    title: "",
    description: "",
    icon: "Sparkles" as const,
    className: "text-emerald-300",
  };
}

function emptyFaqItem() {
  return { id: "", question: "", answer: "" };
}

function emptyService() {
  return { title: "" };
}

function iconSelectLabel(icon: CalculatorCmsIconName) {
  return icon.replace(/([a-z])([A-Z])/g, "$1 $2");
}

type IconSelectProps = {
  value: CalculatorCmsIconName;
  onValueChange: (value: CalculatorCmsIconName) => void;
};

function IconSelect({ value, onValueChange }: IconSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(next) => onValueChange(next as CalculatorCmsIconName)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose icon" />
      </SelectTrigger>
      <SelectContent>
        {calculatorCmsIconNames.map((icon) => (
          <SelectItem key={icon} value={icon}>
            {iconSelectLabel(icon)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function Calculators() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const rowKeysRef = useRef<Record<string, string[]>>({});

  const form = useForm<SerializedCalculatorPageCms>({
    defaultValues: defaultSerializedCalculatorPageCms,
    mode: "onChange",
  });

  const {
    formState,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = form;

  const values = watch();

  function createRowKey() {
    return globalThis.crypto?.randomUUID() ?? `${Date.now()}-${Math.random()}`;
  }

  function getRowKey(listName: string, index: number) {
    rowKeysRef.current[listName] ??= [];
    rowKeysRef.current[listName][index] ??= createRowKey();
    return rowKeysRef.current[listName][index];
  }

  function appendRowKey(listName: string) {
    rowKeysRef.current[listName] ??= [];
    rowKeysRef.current[listName].push(createRowKey());
  }

  function removeRowKey(listName: string, index: number) {
    rowKeysRef.current[listName]?.splice(index, 1);
  }

  useEffect(() => {
    async function loadCalculatorsCms() {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const token = getTokenFromStorage();
        if (!token) throw new Error("Missing admin token. Login again.");

        const response = await fetch("/api/admin/calculators/get", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(data?.error ?? "Failed to load calculators CMS");
        }

        const data = (await response.json()) as SerializedCalculatorPageCms;
        const parsed = CalculatorCmsSchema.safeParse(data);
        reset(
          parsed.success ? parsed.data : defaultSerializedCalculatorPageCms,
        );
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Failed to load calculators CMS";
        setError(message);
        reset(defaultSerializedCalculatorPageCms);
      } finally {
        setLoading(false);
      }
    }

    void loadCalculatorsCms();
  }, [reset]);

  async function onSubmit(nextValues: SerializedCalculatorPageCms) {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = getTokenFromStorage();
      if (!token) throw new Error("Missing admin token. Login again.");

      const parsed = CalculatorCmsSchema.safeParse(nextValues);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      }

      const response = await fetch("/api/admin/calculators/update", {
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
        throw new Error(data?.error ?? "Failed to save calculators CMS");
      }

      toast.success("Calculators CMS saved successfully.");
      setSuccess("Calculators CMS saved successfully.");
      reset(parsed.data);
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Failed to save calculators CMS";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  function updateHeroButtonIcon(index: number, icon: CalculatorCmsIconName) {
    setValue(`heroSection.buttons.${index}.icon`, icon, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function updateCalculatorIcon(index: number, icon: CalculatorCmsIconName) {
    setValue(`calculatorSection.calculators.${index}.badge.icon`, icon, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function updateReasonIcon(index: number, icon: CalculatorCmsIconName) {
    setValue(`whyUsecalculatorSection.reasons.${index}.icon`, icon, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function addHeroCta() {
    appendRowKey("heroCta");
    setValue("heroSection.cta", [...getValues("heroSection.cta"), emptyCta()], {
      shouldDirty: true,
    });
  }

  function removeHeroCta(index: number) {
    removeRowKey("heroCta", index);
    const next = getValues("heroSection.cta").filter((_, i) => i !== index);
    setValue("heroSection.cta", next.length ? next : [emptyCta()], {
      shouldDirty: true,
    });
  }

  function addCalculator() {
    appendRowKey("calculators");
    setValue(
      "calculatorSection.calculators",
      [...getValues("calculatorSection.calculators"), emptyCalculator()],
      { shouldDirty: true },
    );
  }

  function removeCalculator(index: number) {
    removeRowKey("calculators", index);
    const next = getValues("calculatorSection.calculators").filter(
      (_, i) => i !== index,
    );
    setValue(
      "calculatorSection.calculators",
      next.length ? next : [emptyCalculator()],
      { shouldDirty: true },
    );
  }

  function addReason() {
    appendRowKey("reasons");
    setValue(
      "whyUsecalculatorSection.reasons",
      [...getValues("whyUsecalculatorSection.reasons"), emptyReason()],
      { shouldDirty: true },
    );
  }

  function removeReason(index: number) {
    removeRowKey("reasons", index);
    const next = getValues("whyUsecalculatorSection.reasons").filter(
      (_, i) => i !== index,
    );
    setValue(
      "whyUsecalculatorSection.reasons",
      next.length ? next : [emptyReason()],
      { shouldDirty: true },
    );
  }

  function addFeatureCta() {
    appendRowKey("featureCta");
    setValue(
      "whyUsecalculatorSection.feature.cta",
      [...getValues("whyUsecalculatorSection.feature.cta"), emptyCta()],
      { shouldDirty: true },
    );
  }

  function removeFeatureCta(index: number) {
    removeRowKey("featureCta", index);
    const next = getValues("whyUsecalculatorSection.feature.cta").filter(
      (_, i) => i !== index,
    );
    setValue(
      "whyUsecalculatorSection.feature.cta",
      next.length ? next : [emptyCta()],
      {
        shouldDirty: true,
      },
    );
  }

  function addFaq() {
    appendRowKey("faqItems");
    setValue(
      "faqSection.faqItems",
      [...getValues("faqSection.faqItems"), emptyFaqItem()],
      {
        shouldDirty: true,
      },
    );
  }

  function removeFaq(index: number) {
    removeRowKey("faqItems", index);
    const next = getValues("faqSection.faqItems").filter((_, i) => i !== index);
    setValue("faqSection.faqItems", next.length ? next : [emptyFaqItem()], {
      shouldDirty: true,
    });
  }

  function addBacklinkCta() {
    appendRowKey("backlinkCta");
    setValue(
      "backlinkblogSection.cta",
      [...getValues("backlinkblogSection.cta"), emptyCta()],
      {
        shouldDirty: true,
      },
    );
  }

  function removeBacklinkCta(index: number) {
    removeRowKey("backlinkCta", index);
    const next = getValues("backlinkblogSection.cta").filter(
      (_, i) => i !== index,
    );
    setValue("backlinkblogSection.cta", next.length ? next : [emptyCta()], {
      shouldDirty: true,
    });
  }

  function addService() {
    appendRowKey("services");
    setValue(
      "seoblockSection.services",
      [...getValues("seoblockSection.services"), emptyService()],
      { shouldDirty: true },
    );
  }

  function removeService(index: number) {
    removeRowKey("services", index);
    const next = getValues("seoblockSection.services").filter(
      (_, i) => i !== index,
    );
    setValue(
      "seoblockSection.services",
      next.length ? next : [emptyService()],
      {
        shouldDirty: true,
      },
    );
  }

  function addSeoFooterCta() {
    appendRowKey("seoFooterCta");
    setValue(
      "seoblockSection.footer.cta",
      [...getValues("seoblockSection.footer.cta"), emptyCta()],
      { shouldDirty: true },
    );
  }

  function removeSeoFooterCta(index: number) {
    removeRowKey("seoFooterCta", index);
    const next = getValues("seoblockSection.footer.cta").filter(
      (_, i) => i !== index,
    );
    setValue("seoblockSection.footer.cta", next.length ? next : [emptyCta()], {
      shouldDirty: true,
    });
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="size-5" />
                Calculators CMS
              </CardTitle>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Manage the public calculators hub content, SEO, links, icons,
                FAQ, and supporting blocks stored in MongoDB.
              </p>
            </div>
            <Button
              type="submit"
              form="calculators-cms-form"
              disabled={saving || loading || !formState.isDirty}
              className="w-full gap-2 sm:w-auto"
            >
              <Save className="size-4" />
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>

          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {success ? (
            <Alert>
              <AlertTitle>Saved</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          ) : null}
        </CardHeader>

        <CardContent>
          <form
            id="calculators-cms-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <input type="hidden" {...register("slug")} />

            <Accordion type="multiple" defaultValue={["seo", "hero", "tools"]}>
              <AccordionItem value="seo">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <Search className="size-4" />
                    SEO
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>SEO title</Label>
                      <Input {...register("seo.title")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Keywords</Label>
                      <Input
                        value={values.seo.keywords.join(", ")}
                        onChange={(event) =>
                          setValue(
                            "seo.keywords",
                            event.target.value
                              .split(",")
                              .map((keyword) => keyword.trim())
                              .filter(Boolean),
                            { shouldDirty: true, shouldValidate: true },
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>SEO description</Label>
                      <Textarea
                        {...register("seo.description")}
                        className="min-h-24"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="hero">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <ImageIcon className="size-4" />
                    Hero
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Logo label</Label>
                      <Input {...register("heroSection.logo.title")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Hero title</Label>
                      <Input {...register("heroSection.title")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register("heroSection.description")}
                        className="min-h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input {...register("heroSection.image.src")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Image alt</Label>
                      <Input {...register("heroSection.image.alt")} />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Hero CTAs</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addHeroCta}
                      >
                        <ListPlus className="size-4" />
                        Add CTA
                      </Button>
                    </div>
                    {values.heroSection.cta.map((_cta, index) => (
                      <div
                        key={getRowKey("heroCta", index)}
                        className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                      >
                        <Input
                          {...register(`heroSection.cta.${index}.label`)}
                          placeholder="Label"
                        />
                        <Input
                          {...register(`heroSection.cta.${index}.href`)}
                          placeholder="/blog"
                        />
                        <Input
                          {...register(`heroSection.cta.${index}.ariaLabel`)}
                          placeholder="Accessible label"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeHeroCta(index)}
                          aria-label="Remove hero CTA"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {values.heroSection.buttons.map((button, index) => (
                      <div
                        key={getRowKey("heroButtons", index)}
                        className="space-y-3 rounded-md border p-3"
                      >
                        <Label>Trust button {index + 1}</Label>
                        <Input
                          {...register(`heroSection.buttons.${index}.label`)}
                          placeholder="Label"
                        />
                        <IconSelect
                          value={button.icon}
                          onValueChange={(icon) =>
                            updateHeroButtonIcon(index, icon)
                          }
                        />
                        <Input
                          {...register(
                            `heroSection.buttons.${index}.className`,
                          )}
                          placeholder="text-emerald-600 dark:text-emerald-300"
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tools">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck className="size-4" />
                    Calculator Grid
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Eyebrow</Label>
                      <Input {...register("calculatorSection.p")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input {...register("calculatorSection.title")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register("calculatorSection.description")}
                        className="min-h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Section CTA label</Label>
                      <Input {...register("calculatorSection.cta.label")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Section CTA href</Label>
                      <Input {...register("calculatorSection.cta.href")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Section CTA aria label</Label>
                      <Input {...register("calculatorSection.cta.ariaLabel")} />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Calculators</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addCalculator}
                      >
                        <ListPlus className="size-4" />
                        Add calculator
                      </Button>
                    </div>
                    {values.calculatorSection.calculators.map(
                      (calculator, index) => (
                        <div
                          key={getRowKey("calculators", index)}
                          className="space-y-3 rounded-md border p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <Label>Calculator {index + 1}</Label>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeCalculator(index)}
                            >
                              <Trash2 className="size-4" />
                              Remove
                            </Button>
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <Input
                              {...register(
                                `calculatorSection.calculators.${index}.title`,
                              )}
                              placeholder="Title"
                            />
                            <Input
                              {...register(
                                `calculatorSection.calculators.${index}.link`,
                              )}
                              placeholder="/calculators/dog-age"
                            />
                            <Textarea
                              {...register(
                                `calculatorSection.calculators.${index}.description`,
                              )}
                              className="min-h-20 md:col-span-2"
                              placeholder="Description"
                            />
                            <Input
                              {...register(
                                `calculatorSection.calculators.${index}.badge.bg`,
                              )}
                              placeholder="#d1fae5"
                            />
                            <Input
                              {...register(
                                `calculatorSection.calculators.${index}.badge.fg`,
                              )}
                              placeholder="#065f46"
                            />
                            <div className="md:col-span-2">
                              <IconSelect
                                value={calculator.badge.icon}
                                onValueChange={(icon) =>
                                  updateCalculatorIcon(index, icon)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="why">
                <AccordionTrigger>Why Use Calculators</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input {...register("whyUsecalculatorSection.title")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Feature banner</Label>
                      <Input
                        {...register("whyUsecalculatorSection.feature.banner")}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register("whyUsecalculatorSection.description")}
                        className="min-h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Feature title</Label>
                      <Input
                        {...register("whyUsecalculatorSection.feature.title")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Feature description</Label>
                      <Input
                        {...register(
                          "whyUsecalculatorSection.feature.description",
                        )}
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Reasons</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addReason}
                      >
                        <ListPlus className="size-4" />
                        Add reason
                      </Button>
                    </div>
                    {values.whyUsecalculatorSection.reasons.map(
                      (reason, index) => (
                        <div
                          key={getRowKey("reasons", index)}
                          className="grid gap-3 rounded-md border p-3 md:grid-cols-2"
                        >
                          <Input
                            {...register(
                              `whyUsecalculatorSection.reasons.${index}.title`,
                            )}
                            placeholder="Title"
                          />
                          <IconSelect
                            value={reason.icon}
                            onValueChange={(icon) =>
                              updateReasonIcon(index, icon)
                            }
                          />
                          <Textarea
                            {...register(
                              `whyUsecalculatorSection.reasons.${index}.description`,
                            )}
                            className="min-h-20"
                            placeholder="Description"
                          />
                          <div className="space-y-3">
                            <Input
                              {...register(
                                `whyUsecalculatorSection.reasons.${index}.className`,
                              )}
                              placeholder="text-emerald-300"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeReason(index)}
                            >
                              <Trash2 className="size-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Feature CTAs</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addFeatureCta}
                      >
                        <ListPlus className="size-4" />
                        Add CTA
                      </Button>
                    </div>
                    {values.whyUsecalculatorSection.feature.cta.map(
                      (_cta, index) => (
                        <div
                          key={getRowKey("featureCta", index)}
                          className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                        >
                          <Input
                            {...register(
                              `whyUsecalculatorSection.feature.cta.${index}.label`,
                            )}
                            placeholder="Label"
                          />
                          <Input
                            {...register(
                              `whyUsecalculatorSection.feature.cta.${index}.href`,
                            )}
                            placeholder="/blog"
                          />
                          <Input
                            {...register(
                              `whyUsecalculatorSection.feature.cta.${index}.ariaLabel`,
                            )}
                            placeholder="Accessible label"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeFeatureCta(index)}
                            aria-label="Remove feature CTA"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq">
                <AccordionTrigger>FAQ</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Eyebrow</Label>
                      <Input {...register("faqSection.id")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input {...register("faqSection.title")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register("faqSection.description")}
                        className="min-h-20"
                      />
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Questions</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addFaq}
                      >
                        <ListPlus className="size-4" />
                        Add FAQ
                      </Button>
                    </div>
                    {values.faqSection.faqItems.map((_faq, index) => (
                      <div
                        key={getRowKey("faqItems", index)}
                        className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_auto]"
                      >
                        <div className="space-y-3">
                          <Input
                            {...register(`faqSection.faqItems.${index}.id`)}
                            placeholder="Optional ID"
                          />
                          <Input
                            {...register(
                              `faqSection.faqItems.${index}.question`,
                            )}
                            placeholder="Question"
                          />
                          <Textarea
                            {...register(`faqSection.faqItems.${index}.answer`)}
                            className="min-h-24"
                            placeholder="Answer"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeFaq(index)}
                          aria-label="Remove FAQ"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="links">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <Link2 className="size-4" />
                    Backlinks
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input {...register("backlinkblogSection.title")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input {...register("backlinkblogSection.description")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Footer title</Label>
                      <Input
                        {...register("backlinkblogSection.footer.title")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Footer CTA label</Label>
                      <Input
                        {...register("backlinkblogSection.footer.cta.label")}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Footer description</Label>
                      <Textarea
                        {...register("backlinkblogSection.footer.description")}
                        className="min-h-20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Footer CTA href</Label>
                      <Input
                        {...register("backlinkblogSection.footer.cta.href")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Footer CTA aria label</Label>
                      <Input
                        {...register(
                          "backlinkblogSection.footer.cta.ariaLabel",
                        )}
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Internal links</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addBacklinkCta}
                      >
                        <ListPlus className="size-4" />
                        Add link
                      </Button>
                    </div>
                    {values.backlinkblogSection.cta.map((_cta, index) => (
                      <div
                        key={getRowKey("backlinkCta", index)}
                        className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                      >
                        <Input
                          {...register(
                            `backlinkblogSection.cta.${index}.label`,
                          )}
                          placeholder="Label"
                        />
                        <Input
                          {...register(`backlinkblogSection.cta.${index}.href`)}
                          placeholder="/calculators/dog-age"
                        />
                        <Input
                          {...register(
                            `backlinkblogSection.cta.${index}.ariaLabel`,
                          )}
                          placeholder="Accessible label"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeBacklinkCta(index)}
                          aria-label="Remove backlink"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="seo-block">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="size-4" />
                    SEO Block
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input {...register("seoblockSection.title")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Footer eyebrow</Label>
                      <Input {...register("seoblockSection.footer.p")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register("seoblockSection.description")}
                        className="min-h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Footer title</Label>
                      <Input {...register("seoblockSection.footer.title")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Footer description</Label>
                      <Input
                        {...register("seoblockSection.footer.description")}
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Services</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addService}
                      >
                        <ListPlus className="size-4" />
                        Add service
                      </Button>
                    </div>
                    {values.seoblockSection.services.map((_service, index) => (
                      <div
                        key={getRowKey("services", index)}
                        className="flex gap-3 rounded-md border p-3"
                      >
                        <Input
                          {...register(
                            `seoblockSection.services.${index}.title`,
                          )}
                          placeholder="Service title"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeService(index)}
                          aria-label="Remove service"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Footer CTAs</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={addSeoFooterCta}
                      >
                        <ListPlus className="size-4" />
                        Add CTA
                      </Button>
                    </div>
                    {values.seoblockSection.footer.cta.map((_cta, index) => (
                      <div
                        key={getRowKey("seoFooterCta", index)}
                        className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                      >
                        <Input
                          {...register(
                            `seoblockSection.footer.cta.${index}.label`,
                          )}
                          placeholder="Label"
                        />
                        <Input
                          {...register(
                            `seoblockSection.footer.cta.${index}.href`,
                          )}
                          placeholder="/blog"
                        />
                        <Input
                          {...register(
                            `seoblockSection.footer.cta.${index}.ariaLabel`,
                          )}
                          placeholder="Accessible label"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeSeoFooterCta(index)}
                          aria-label="Remove footer CTA"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                {loading
                  ? "Loading calculators CMS..."
                  : formState.isDirty
                    ? "Unsaved changes"
                    : "All changes saved"}
              </p>
              <Button
                type="submit"
                disabled={saving || loading || !formState.isDirty}
                className="gap-2"
              >
                <Save className="size-4" />
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
