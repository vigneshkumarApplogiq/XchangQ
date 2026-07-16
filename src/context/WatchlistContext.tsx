import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getItem, setItem } from '../storage';
import { STORAGE_KEYS } from '../storage/keys';
import {
  createPair,
  isDuplicatePair,
  WatchlistPair,
} from '../types/watchlist';

interface WatchlistContextValue {
  pairs: WatchlistPair[];
  isLoading: boolean;
  addPair: (from: string, to: string, amount?: number) => string | null;
  removePair: (id: string) => void;
  updatePairAmount: (id: string, amount: number) => void;
  isDuplicate: (from: string, to: string, excludeId?: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextValue | null>(null);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [pairs, setPairs] = useState<WatchlistPair[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getItem<WatchlistPair[]>(STORAGE_KEYS.WATCHLIST).then(stored => {
      if (stored) setPairs(stored);
      setIsLoading(false);
    });
  }, []);

  const persist = useCallback(async (next: WatchlistPair[]) => {
    setPairs(next);
    await setItem(STORAGE_KEYS.WATCHLIST, next);
  }, []);

  const addPair = useCallback(
    (from: string, to: string, amount = 1000): string | null => {
      if (from === to) return 'From and To currencies must be different.';
      if (isDuplicatePair(pairs, from, to)) {
        return 'This currency pair is already in your watchlist.';
      }
      const next = [...pairs, createPair(from, to, amount)];
      persist(next);
      return null;
    },
    [pairs, persist],
  );

  const removePair = useCallback(
    (id: string) => {
      persist(pairs.filter(p => p.id !== id));
    },
    [pairs, persist],
  );

  const updatePairAmount = useCallback(
    (id: string, amount: number) => {
      persist(
        pairs.map(p => (p.id === id ? { ...p, amount: Math.max(0, amount) } : p)),
      );
    },
    [pairs, persist],
  );

  const value = useMemo<WatchlistContextValue>(
    () => ({
      pairs,
      isLoading,
      addPair,
      removePair,
      updatePairAmount,
      isDuplicate: (from, to, excludeId) =>
        isDuplicatePair(pairs, from, to, excludeId),
    }),
    [pairs, isLoading, addPair, removePair, updatePairAmount],
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
}
