export type SelectableCardLike = {
  title: string;
};

/**
 * Deterministically select up to two distinct cards based on a seed.
 *
 * - If eligibleCards.length === 0 => []
 * - If eligibleCards.length === 1 => [eligibleCards[0]]
 * - Otherwise => pick `start` and `(start + 1) % length` (ensuring distinct)
 */
export function selectBacklinkCards<T>(
  eligibleCards: T[],
  seed: string,
): T[] {
  if (eligibleCards.length === 0) return [];
  if (eligibleCards.length === 1) return [eligibleCards[0]];

  // Same hashing approach used inline in calculators:
  // hash = (hash * 31 + charCode) >>> 0
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  const length = eligibleCards.length;
  const start = hash % length;
  const nextIndex = (start + 1) % length;

  if (start === nextIndex) {
    // Defensive (should not happen for length > 1), but prevents duplicates.
    return [eligibleCards[start]];
  }

  return [eligibleCards[start], eligibleCards[nextIndex]];
}

