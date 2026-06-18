import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    adminEmail: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },

    // Stored per admin (provided at registration)
    resendApiKey: { type: String, required: true },
    mongodbUri: { type: String, required: true },

    passwordResetToken: { type: String, default: null, index: true },
    passwordResetExpiresAt: { type: Date, default: null, index: true },
  },
  {
    timestamps: true,
  },
);

type Admin = InferSchemaType<typeof adminSchema>;

const AdminModel: Model<Admin> =
  mongoose.models.Admin || mongoose.model<Admin>("Admin", adminSchema);

export default AdminModel;
