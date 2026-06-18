import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const SeoPageSchema = new Schema(
  {
    pageKey: { type: String, required: true, unique: true, index: true },

    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
  },
  { timestamps: true },
);

type SeoPage = InferSchemaType<typeof SeoPageSchema>;

const SeoPageModel: Model<SeoPage> =
  mongoose.models.SeoPage || mongoose.model<SeoPage>("SeoPage", SeoPageSchema);

export default SeoPageModel;
