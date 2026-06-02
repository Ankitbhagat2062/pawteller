import type { DogGender, DogName, DogSize } from "@/lib/types";

/**
 * Stable, data-derived identifier for a DogName.
 * Used for React list keys where dogIndex is unstable.
 */
export function getDogNameStableId(dog: Pick<DogName, "name" | "gender" | "size"> & { description?: string }): string {
  const desc = dog.description ?? "";
  return `${dog.name}::${dog.gender}::${dog.size}::${desc}`;
}

export function makeDogNameStableId(
  name: string,
  gender: DogGender,
  size: DogSize,
  description?: string,
): string {
  const desc = description ?? "";
  return `${name}::${gender}::${size}::${desc}`;
}

