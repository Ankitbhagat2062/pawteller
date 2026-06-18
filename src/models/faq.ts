import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const faqItemSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const faqPageSchema = new Schema(
  {
    pageKey: { type: String, required: true, unique: true, index: true },
    items: { type: [faqItemSchema], required: true, default: [] },
  },
  { timestamps: true },
);

type FaqPage = InferSchemaType<typeof faqPageSchema>;

const FaqPageModel: Model<FaqPage> =
  mongoose.models.FaqPage || mongoose.model<FaqPage>("FaqPage", faqPageSchema);

export default FaqPageModel;
