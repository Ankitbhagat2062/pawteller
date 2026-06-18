import mongoose, { type InferSchemaType, type Model, Schema } from "mongoose";

const BlogContentItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, default: "" },
  },
  { _id: false },
);

const BlogPostSchema = new Schema(
  {
    imageSrc: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true, unique: true, index: true },
    totalTime: { type: String, required: true },

    content: { type: [BlogContentItemSchema], required: true },

    category: { type: String, required: true },
    date: { type: String, default: "" },
    bgColor: { type: String, default: "" },
  },
  { _id: false },
);

const blogCmsSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },

    // Homepage list + per-article listing data lives here.
    // (Per-post routing is already done by `url` in the UI.)
    posts: { type: [BlogPostSchema], required: true },
  },
  { timestamps: true },
);

type BlogCms = InferSchemaType<typeof blogCmsSchema>;

const BlogCmsModel: Model<BlogCms> =
  mongoose.models.BlogCms || mongoose.model<BlogCms>("BlogCms", blogCmsSchema);

export default BlogCmsModel;
