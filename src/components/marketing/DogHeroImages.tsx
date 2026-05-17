import Image from "next/image";
import { Suspense } from "react";

export default function DogHeroImages() {
  return (
    <div className="relative mt-8">
      <Suspense fallback={null}>
        <DogImages />
      </Suspense>
    </div>
  );
}

function DogImages() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <DogImage
        src="/dog-1.png"
        alt="Happy dog"
        className="aspect-4/3 w-full rounded-3xl object-cover"
      />
      <DogImage
        src="/dog-2.png"
        alt="Cute puppy"
        className="aspect-4/3 w-full rounded-3xl object-cover"
      />
      <DogImage
        src="/dog-3.png"
        alt="Dog outdoors"
        className="aspect-4/3 w-full rounded-3xl object-cover"
      />
    </div>
  );
}

function DogImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 33vw"
        className={className}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjZWVlZWVlIi8+PC9zdmc+"
      />
    </div>
  );
}

