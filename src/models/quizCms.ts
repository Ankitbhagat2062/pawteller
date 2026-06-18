import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const QuizSeoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
  },
  { _id: false },
);

const QuizStepSchema = new Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
  },
  { _id: false },
);

const quizCmsSchema = new Schema(
  {
    quizId: { type: String, required: true, unique: true, index: true },

    seo: { type: QuizSeoSchema, required: true },

    banner: { type: String, required: true },
    category: { type: String },

    title: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    estimatedTime: { type: String, required: true },
    url: { type: String, required: true },

    header: { type: String, required: true },
    subheader: { type: String, required: true },
    button: { type: String, required: true },

    steps: { type: [QuizStepSchema], required: true },
    dogs: { type: [String], default: [] },
  },
  { timestamps: true },
);

type QuizCms = InferSchemaType<typeof quizCmsSchema>;

const QuizCmsModel: Model<QuizCms> =
  mongoose.models.QuizCms || mongoose.model<QuizCms>("QuizCms", quizCmsSchema);

export default QuizCmsModel;
