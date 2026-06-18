import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

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
    quizId: { type: String, required: true },
    results: {
      userName: { type: String, required: true },
      topMatches: { type: [quizResultSchema], required: true },
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Enforce dedupe at DB level: one quiz submission per (email, quizId)
quizSchema.index({ email: 1, quizId: 1 }, { unique: true });

type Quiz = InferSchemaType<typeof quizSchema>;

const QuizModel: Model<Quiz> =
  mongoose.models.Quiz || mongoose.model<Quiz>("Quiz", quizSchema);

export default QuizModel;
