import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const CtaSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    ariaLabel: { type: String },
  },
  { _id: false },
);

const StrictCtaSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    ariaLabel: { type: String, required: true },
  },
  { _id: false },
);

const ImageSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false },
);

const HomepageContentSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      default: "home",
    },
    hero: {
      id: { type: String, required: true },
      badgeText: { type: String, required: true },
      h1: { type: String, required: true },
      descriptionLines: { type: String, required: true },
      primaryCta: { type: StrictCtaSchema, required: true },
      secondaryCta: { type: StrictCtaSchema, required: true },
      ratingLabelPrefix: { type: String, required: true },
      ratingCountText: { type: String, required: true },
      ratingLabelSuffix: { type: String, required: true },
      image: { type: ImageSchema, required: true },
      overlayLeft: {
        eyebrow: { type: String, required: true },
        value: { type: String, required: true },
        footer: { type: String, required: true },
      },
      overlayRight: {
        eyebrow: { type: String, required: true },
        value: { type: String, required: true },
        footer: { type: String, required: true },
      },
    },
    featuredCalculatorCards: {
      type: [
        new Schema(
          {
            title: { type: String, required: true },
            displayTitle: { type: String, required: true },
            description: { type: String, required: true },
            bg: { type: String, required: true },
            darkBg: { type: String, required: true },
            className: { type: String, default: "" },
            imageSrc: { type: String },
            imageAlt: { type: String },
            badge: { type: String },
          },
          { _id: false },
        ),
      ],
      required: true,
    },
    dogLifes: {
      left: {
        eyebrow: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        cta: { type: CtaSchema, required: true },
      },
      right: {
        dogLifeStages: {
          type: [
            new Schema(
              {
                icon: { type: String, required: true },
                age: { type: String, required: true },
                stage: { type: String, required: true },
                weight: { type: String, required: true },
                className: { type: String, default: "" },
              },
              { _id: false },
            ),
          ],
          required: true,
        },
      },
    },
    breedQuizCtas: {
      feature: {
        eyebrow: { type: String, required: true },
        title: { type: String, required: true },
        titleEmphasis: { type: String, required: true },
        description: { type: String, required: true },
        cta: { type: CtaSchema, required: true },
        image: { type: ImageSchema, required: true },
      },
    },
    knowledgeBase: {
      eyebrow: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      viewAllHref: { type: String, required: true },
      viewAllLabel: { type: String, required: true },
    },
  },
  { timestamps: true },
);

type HomepageCms = InferSchemaType<typeof HomepageContentSchema>;

const HomepageCmsModel: Model<HomepageCms> =
  mongoose.models.HomepageCms ||
  mongoose.model<HomepageCms>("HomepageCms", HomepageContentSchema);

export default HomepageCmsModel;
