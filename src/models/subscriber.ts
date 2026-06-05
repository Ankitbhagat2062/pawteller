import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const subscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    verificationToken: {
      type: String,
      required: true,
      default: null,
      index: true,
    },
    isVerified: { type: Boolean, required: true, default: false },
    contact: [{ type: mongoose.Types.ObjectId, ref: "Contact" },],
  },
  {
    timestamps: true,
  },
);

type Subscriber = InferSchemaType<typeof subscriberSchema>;

const SubscriberModel: Model<Subscriber> =
  mongoose.models.Subscriber || mongoose.model<Subscriber>("Subscriber", subscriberSchema);

export default SubscriberModel;

