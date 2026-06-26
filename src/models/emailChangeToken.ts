import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const emailChangeTokenSchema = new Schema(
  {
    adminEmail: { type: String, required: true, index: true },
    newEmail: { type: String, required: true, index: true },

    // One-way hash of the raw bearer token; single-use when verified.
    token: { type: String, required: true, unique: true, index: true },

    expiresAt: { type: Date, required: true, index: true },

    usedAt: { type: Date, default: null, index: true },
  },
  {
    timestamps: true,
  },
);

type EmailChangeToken = InferSchemaType<typeof emailChangeTokenSchema>;

const EmailChangeTokenModel: Model<EmailChangeToken> =
  mongoose.models.EmailChangeToken ||
  mongoose.model<EmailChangeToken>(
    "EmailChangeToken",
    emailChangeTokenSchema,
  );

export default EmailChangeTokenModel;

