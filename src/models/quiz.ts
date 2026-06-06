import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const quizResultSchema = new Schema(
  {
    rank: { type: Number, required: true },
    breed: { type: String, required: true },
    compatibility: { type: Number, required: true },
    description: { type: String },
    temperament: [{ type: String }],
    lifespan: { type: String },
    reasons: [{ type: String }],
  },
  { _id: false },
);

const quizSchema = new Schema(
  {
    email: { type: String, required: true },
    results: {
      userName: { type: String, required: true },
      topMatches: { type: [quizResultSchema], required: true },
    }
  },
  {
    timestamps: true,
  },
);

type Quiz = InferSchemaType<typeof quizSchema>;

const QuizModel: Model<Quiz> =
  mongoose.models.Quiz || mongoose.model<Quiz>("Quiz", quizSchema);

export default QuizModel;

