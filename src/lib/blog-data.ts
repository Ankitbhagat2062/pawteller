import { blogPosts } from "./constant";
import { BlogPost } from "./types";

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.url === `/blog/${slug}`);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((post) => post.url.replace("/blog/", ""));
}