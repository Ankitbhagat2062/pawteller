import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  isVerified: boolean;
  verificationToken: string;
  createdAt: Date;
}

const SubscriberSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);

export default Subscriber;
