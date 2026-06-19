import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const CtaSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    ariaLabel: { type: String, required: true },
  },
  { _id: false },
);

const SeoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
  },
  { _id: false },
);

const IconLabelSchema = new Schema(
  {
    label: { type: String, required: true },
    icon: { type: String, required: true },
    className: { type: String, default: "" },
  },
  { _id: false },
);

const CalculatorSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    badge: {
      bg: { type: String, required: true },
      fg: { type: String, required: true },
      icon: { type: String, required: true },
    },
  },
  { _id: false },
);

const ReasonSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    className: { type: String, default: "" },
  },
  { _id: false },
);

const FaqItemSchema = new Schema(
  {
    id: { type: String },
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const calculatorCmsSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: "calculators-home",
    },
    seo: { type: SeoSchema, required: true },
    heroSection: {
      logo: {
        title: { type: String, required: true },
      },
      title: { type: String, required: true },
      description: { type: String, required: true },
      cta: { type: [CtaSchema], required: true },
      buttons: { type: [IconLabelSchema], required: true },
      image: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
      },
    },
    calculatorSection: {
      p: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      cta: { type: CtaSchema, required: true },
      calculators: { type: [CalculatorSchema], required: true },
    },
    whyUsecalculatorSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      reasons: { type: [ReasonSchema], required: true },
      feature: {
        banner: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        cta: { type: [CtaSchema], required: true },
      },
    },
    faqSection: {
      id: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      faqItems: { type: [FaqItemSchema], required: true },
    },
    backlinkblogSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      cta: { type: [CtaSchema], required: true },
      footer: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        cta: { type: CtaSchema, required: true },
      },
    },
    seoblockSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      services: {
        type: [
          new Schema(
            {
              title: { type: String, required: true },
            },
            { _id: false },
          ),
        ],
        required: true,
      },
      footer: {
        p: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        cta: { type: [CtaSchema], required: true },
      },
    },
  },
  { timestamps: true },
);

type CalculatorCms = InferSchemaType<typeof calculatorCmsSchema>;

const CalculatorCmsModel: Model<CalculatorCms> =
  mongoose.models.CalculatorCms ||
  mongoose.model<CalculatorCms>("CalculatorCms", calculatorCmsSchema);

export default CalculatorCmsModel;
