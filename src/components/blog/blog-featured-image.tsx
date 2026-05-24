import { BlogFeaturedImageProps } from "@/lib/types";
import Image from "next/image";

export function BlogFeaturedImage({ src, alt }: BlogFeaturedImageProps) {
  return (
    <figure className="my-6 md:my-8 -mx-4 sm:mx-0">
      <div className="relative aspect-16/10 sm:aspect-video overflow-hidden sm:rounded-xl">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 640px, 720px"
        />
      </div>
    </figure>
  );
}
