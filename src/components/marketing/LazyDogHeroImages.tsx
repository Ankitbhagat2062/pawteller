"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LazyDogHeroImages() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-8">
      {shouldRender ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DogImage src="/dog-1.jpg" alt="Happy dog" />
          <DogImage src="/dog-2.jpg" alt="Cute puppy" />
          <DogImage src="/dog-3.jpg" alt="Dog outdoors" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] w-full rounded-3xl bg-zinc-200/60 dark:bg-zinc-800/60"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DogImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-3xl">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 33vw"
        className="aspect-[4/3] w-full object-cover"
        loading="lazy"
        placeholder="empty"
      />
    </div>
  );
}

