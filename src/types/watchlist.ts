export interface WatchlistPair {
  id: string;
  from: string;
  to: string;
  amount: number;
  createdAt: string;
}

export function pairKey(from: string, to: string): string {
  return `${from}_${to}`;
}

export function isDuplicatePair(
  pairs: WatchlistPair[],
  from: string,
  to: string,
  excludeId?: string,
): boolean {
  const key = pairKey(from, to);
  return pairs.some(
    p => p.id !== excludeId && pairKey(p.from, p.to) === key,
  );
}

export function createPair(from: string, to: string, amount = 1000): WatchlistPair {
  return {
    id: `${Date.now()}_${from}_${to}`,
    from,
    to,
    amount,
    createdAt: new Date().toISOString(),
  };
}
