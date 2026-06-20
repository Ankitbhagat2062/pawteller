import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const CtaSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    ariaLabel: { type: String, required: true },
  },
  { _id: false },
);

const IconCardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false },
);

const aboutCmsSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: "about",
    },
    heroSection: {
      right: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        buttons: { type: [CtaSchema], required: true },
      },
      left: {
        title: { type: String, required: true },
        speed: { type: String, required: true },
        Clarity: { type: String, required: true },
        footertext: { type: String, required: true },
        owner: { type: String, required: true },
      },
    },
    missionSection: {
      left: {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
      right: { type: [IconCardSchema], required: true },
    },
    trustPrincipleSection: {
      banner: { type: String, required: true },
      title: { type: String, required: true },
      content: { type: [IconCardSchema], required: true },
    },
    actionblockSection: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      cta: { type: [CtaSchema], required: true },
    },
    medicalWarningSection: { type: IconCardSchema, required: true },
    bottomCtaBand: {
      banner: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      cta: { type: CtaSchema, required: true },
    },
  },
  { timestamps: true },
);

type AboutCms = InferSchemaType<typeof aboutCmsSchema>;

const AboutCmsModel: Model<AboutCms> =
  mongoose.models.AboutCms ||
  mongoose.model<AboutCms>("AboutCms", aboutCmsSchema);

export default AboutCmsModel;
