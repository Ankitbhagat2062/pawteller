import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    topic: { type: String, required: true },
    message: { type: String, required: true },
    subscriber: [{ type: mongoose.Types.ObjectId, ref: "Subscriber" },],
  },
  {
    timestamps: true,
  },
);

type Contact = InferSchemaType<typeof contactSchema>;

const ContactModel: Model<Contact> =
  mongoose.models.Contact || mongoose.model<Contact>("Contact", contactSchema);

export default ContactModel;

