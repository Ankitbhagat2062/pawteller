"use client";

import {
  Calculator,
  HelpCircle,
  ListPlus,
  PawPrint,
  Save,
  Search,
  ShieldAlert,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
  type AboutAdminCms,
  AboutAdminCmsSchema,
  type AboutCmsIconName,
  aboutCmsIconNames,
  defaultAboutAdminCms,
} from "@/hooks/aboutCms";

type AboutAdminResponse = AboutAdminCms & {
  calculatorOptions?: Array<{
    title: string;
    href: string;
    description: string;
  }>;
};

function getTokenFromStorage() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("adminAuth.token") ??
    localStorage.getItem("adminAuthToken")
  );
}

function emptyCta() {
  return { label: "", href: "", ariaLabel: "" };
}

function emptyIconCard(): {
  title: string;
  description: string;
  icon: AboutCmsIconName;
} {
  return { title: "", description: "", icon: "PawPrint" };
}

function emptyFaq() {
  return { question: "", answer: "" };
}

function iconLabel(icon: AboutCmsIconName) {
  return icon.replace(/([a-z])([A-Z])/g, "$1 $2");
}

type IconSelectProps = {
  value: AboutCmsIconName;
  onValueChange: (value: AboutCmsIconName) => void;
};

function IconSelect({ value, onValueChange }: IconSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(next) => onValueChange(next as AboutCmsIconName)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose icon" />
      </SelectTrigger>
      <SelectContent>
        {aboutCmsIconNames.map((icon) => (
          <SelectItem key={icon} value={icon}>
            {iconLabel(icon)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function About() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [calculatorOptions, setCalculatorOptions] = useState<
    NonNullable<AboutAdminResponse["calculatorOptions"]>
  >([]);

  const form = useForm<AboutAdminCms>({
    defaultValues: defaultAboutAdminCms,
    mode: "onChange",
  });

  const { control, formState, handleSubmit, register, reset, setValue, watch } =
    form;
  const values = watch();

  const heroButtons = useFieldArray({
    control,
    name: "heroSection.right.buttons",
  });
  const missionCards = useFieldArray({ control, name: "missionSection.right" });
  const trustCards = useFieldArray({
    control,
    name: "trustPrincipleSection.content",
  });
  const actionCtas = useFieldArray({ control, name: "actionblockSection.cta" });
  const faqItems = useFieldArray({ control, name: "faqItems" });

  useEffect(() => {
    async function loadAboutCms() {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const token = getTokenFromStorage();
        if (!token) throw new Error("Missing admin token. Login again.");

        const response = await fetch("/api/admin/about/get", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(data?.error ?? "Failed to load about CMS");
        }

        const data = (await response.json()) as AboutAdminResponse;
        const parsed = AboutAdminCmsSchema.safeParse(data);

        reset(parsed.success ? parsed.data : defaultAboutAdminCms);
        setCalculatorOptions(data.calculatorOptions ?? []);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Failed to load about CMS";
        setError(message);
        reset(defaultAboutAdminCms);
      } finally {
        setLoading(false);
      }
    }

    void loadAboutCms();
  }, [reset]);

  async function onSubmit(nextValues: AboutAdminCms) {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = getTokenFromStorage();
      if (!token) throw new Error("Missing admin token. Login again.");

      const parsed = AboutAdminCmsSchema.safeParse(nextValues);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Invalid input");
      }

      const response = await fetch("/api/admin/about/update", {
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
        throw new Error(data?.error ?? "Failed to save about CMS");
      }

      toast.success("About CMS saved successfully.");
      setSuccess("About CMS saved successfully.");
      reset(parsed.data);
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Failed to save about CMS";
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  function setIcon(
    path: Parameters<typeof setValue>[0],
    icon: AboutCmsIconName,
  ) {
    setValue(path, icon, { shouldDirty: true, shouldValidate: true });
  }

  function applyCalculatorToBottomCta(title: string, href: string) {
    setValue(
      "bottomCtaBand.cta",
      {
        label: title,
        href,
        ariaLabel: `Open ${title}`,
      },
      { shouldDirty: true, shouldValidate: true },
    );
  }

  function appendActionCalculator(title: string, href: string) {
    actionCtas.append({
      label: title,
      href,
      ariaLabel: `Open ${title}`,
    });
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <PawPrint className="size-5" />
                About CMS
              </CardTitle>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Manage the public About page content, SEO, FAQ, CTAs, icons, and
                calculator links stored in MongoDB.
              </p>
            </div>
            <Button
              type="submit"
              form="about-cms-form"
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
            id="about-cms-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <input type="hidden" {...register("slug")} />

            <Accordion
              type="multiple"
              defaultValue={["seo", "hero", "mission", "trust"]}
            >
              <AccordionItem value="seo">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <Search className="size-4" />
                    SEO from MongoDB
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
                    <Sparkles className="size-4" />
                    Hero
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Badge title</Label>
                      <Input {...register("heroSection.right.title")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Optimization card title</Label>
                      <Input {...register("heroSection.left.title")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Hero description</Label>
                      <Textarea
                        {...register("heroSection.right.description")}
                        className="min-h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Speed line</Label>
                      <Input {...register("heroSection.left.speed")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Clarity line</Label>
                      <Input {...register("heroSection.left.Clarity")} />
                    </div>
                    <div className="space-y-2">
                      <Label>SEO line</Label>
                      <Input {...register("heroSection.left.footertext")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Owner line</Label>
                      <Input {...register("heroSection.left.owner")} />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Hero buttons</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => heroButtons.append(emptyCta())}
                      >
                        <ListPlus className="size-4" />
                        Add button
                      </Button>
                    </div>
                    {heroButtons.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                      >
                        <Input
                          {...register(
                            `heroSection.right.buttons.${index}.label`,
                          )}
                          placeholder="Label"
                        />
                        <Input
                          {...register(
                            `heroSection.right.buttons.${index}.href`,
                          )}
                          placeholder="/calculators/dog-age"
                        />
                        <Input
                          {...register(
                            `heroSection.right.buttons.${index}.ariaLabel`,
                          )}
                          placeholder="Accessible label"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => heroButtons.remove(index)}
                          aria-label="Remove hero button"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="mission">
                <AccordionTrigger>Mission</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Mission title</Label>
                      <Input {...register("missionSection.left.title")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Mission description</Label>
                      <Textarea
                        {...register("missionSection.left.description")}
                        className="min-h-28"
                      />
                    </div>
                  </div>

                  <IconCardArray
                    fields={missionCards.fields}
                    title="Mission cards"
                    onAdd={() => missionCards.append(emptyIconCard())}
                    onRemove={missionCards.remove}
                    register={register}
                    values={values.missionSection.right}
                    baseName="missionSection.right"
                    onIconChange={(index, icon) =>
                      setIcon(`missionSection.right.${index}.icon`, icon)
                    }
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="trust">
                <AccordionTrigger>Trust Principles</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Banner</Label>
                      <Input {...register("trustPrincipleSection.banner")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input {...register("trustPrincipleSection.title")} />
                    </div>
                  </div>

                  <IconCardArray
                    fields={trustCards.fields}
                    title="Trust cards"
                    onAdd={() => trustCards.append(emptyIconCard())}
                    onRemove={trustCards.remove}
                    register={register}
                    values={values.trustPrincipleSection.content}
                    baseName="trustPrincipleSection.content"
                    onIconChange={(index, icon) =>
                      setIcon(
                        `trustPrincipleSection.content.${index}.icon`,
                        icon,
                      )
                    }
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="actions">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <Calculator className="size-4" />
                    Action CTAs and Calculator Source
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Action title</Label>
                      <Input {...register("actionblockSection.title")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Action description</Label>
                      <Textarea
                        {...register("actionblockSection.description")}
                        className="min-h-24"
                      />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Action links</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => actionCtas.append(emptyCta())}
                      >
                        <ListPlus className="size-4" />
                        Add link
                      </Button>
                    </div>
                    {actionCtas.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_1fr_auto]"
                      >
                        <Input
                          {...register(`actionblockSection.cta.${index}.label`)}
                          placeholder="Label"
                        />
                        <Input
                          {...register(`actionblockSection.cta.${index}.href`)}
                          placeholder="/blog"
                        />
                        <Input
                          {...register(
                            `actionblockSection.cta.${index}.ariaLabel`,
                          )}
                          placeholder="Accessible label"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => actionCtas.remove(index)}
                          aria-label="Remove action link"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-3 lg:grid-cols-2">
                    {calculatorOptions.map((calculator) => (
                      <div
                        key={calculator.href}
                        className="rounded-md border bg-muted/30 p-3"
                      >
                        <p className="text-sm font-semibold">
                          {calculator.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {calculator.href}
                        </p>
                        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                          {calculator.description}
                        </p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              appendActionCalculator(
                                calculator.title,
                                calculator.href,
                              )
                            }
                          >
                            Add action link
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              applyCalculatorToBottomCta(
                                calculator.title,
                                calculator.href,
                              )
                            }
                          >
                            Use bottom CTA
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="warning">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <ShieldAlert className="size-4" />
                    Medical Warning
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input {...register("medicalWarningSection.title")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <IconSelect
                        value={values.medicalWarningSection.icon}
                        onValueChange={(icon) =>
                          setIcon("medicalWarningSection.icon", icon)
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register("medicalWarningSection.description")}
                        className="min-h-24"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bottom">
                <AccordionTrigger>Bottom CTA Band</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Banner</Label>
                      <Input {...register("bottomCtaBand.banner")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input {...register("bottomCtaBand.title")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        {...register("bottomCtaBand.description")}
                        className="min-h-24"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CTA label</Label>
                      <Input {...register("bottomCtaBand.cta.label")} />
                    </div>
                    <div className="space-y-2">
                      <Label>CTA href</Label>
                      <Input {...register("bottomCtaBand.cta.href")} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>CTA aria label</Label>
                      <Input {...register("bottomCtaBand.cta.ariaLabel")} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq">
                <AccordionTrigger>
                  <span className="inline-flex items-center gap-2">
                    <HelpCircle className="size-4" />
                    FAQ from MongoDB
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label>About FAQ</Label>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => faqItems.append(emptyFaq())}
                      >
                        <ListPlus className="size-4" />
                        Add FAQ
                      </Button>
                    </div>
                    {faqItems.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_auto]"
                      >
                        <div className="space-y-3">
                          <Input
                            {...register(`faqItems.${index}.question`)}
                            placeholder="Question"
                          />
                          <Textarea
                            {...register(`faqItems.${index}.answer`)}
                            className="min-h-24"
                            placeholder="Answer"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => faqItems.remove(index)}
                          aria-label="Remove FAQ"
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
                  ? "Loading about CMS..."
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

type IconCardArrayProps = {
  fields: Array<{ id: string }>;
  title: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  register: ReturnType<typeof useForm<AboutAdminCms>>["register"];
  values: Array<{
    title: string;
    description: string;
    icon: AboutCmsIconName;
  }>;
  baseName: "missionSection.right" | "trustPrincipleSection.content";
  onIconChange: (index: number, icon: AboutCmsIconName) => void;
};

function IconCardArray({
  fields,
  title,
  onAdd,
  onRemove,
  register,
  values,
  baseName,
  onIconChange,
}: IconCardArrayProps) {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Label>{title}</Label>
        <Button type="button" variant="secondary" size="sm" onClick={onAdd}>
          <ListPlus className="size-4" />
          Add card
        </Button>
      </div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid gap-3 rounded-md border p-3 md:grid-cols-[1fr_1fr_auto]"
        >
          <Input
            {...register(`${baseName}.${index}.title`)}
            placeholder="Title"
          />
          <IconSelect
            value={values[index]?.icon ?? "PawPrint"}
            onValueChange={(icon) => onIconChange(index, icon)}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => onRemove(index)}
            aria-label="Remove card"
          >
            <Trash2 className="size-4" />
          </Button>
          <Textarea
            {...register(`${baseName}.${index}.description`)}
            className="min-h-24 md:col-span-3"
            placeholder="Description"
          />
        </div>
      ))}
    </div>
  );
}
