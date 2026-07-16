import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  fetchLatestRates,
  isApiSupported,
  RatesCache,
} from '../api/exchangeRates';
import { getItem, removeItem, setItem } from '../storage';
import { STORAGE_KEYS } from '../storage/keys';
import {
  convertWithRates,
  formatRelativeTime,
  formatSyncedTime,
  getRateFromRates,
  isCacheStale,
} from '../utils/currency';

interface RatesContextValue {
  rates: Record<string, number>;
  fetchedAt: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  isOnline: boolean;
  hasCache: boolean;
  isStale: boolean;
  lastSyncedLabel: string;
  lastUpdatedLabel: string;
  cachedDateLabel: string;
  refresh: () => Promise<void>;
  convertAmount: (amount: number, from: string, to: string) => number | null;
  getExchangeRate: (from: string, to: string) => number | null;
  clearCache: () => Promise<void>;
  isSupported: (code: string) => boolean;
}

const RatesContext = createContext<RatesContextValue | null>(null);

export function RatesProvider({ children }: { children: React.ReactNode }) {
  const [cache, setCache] = useState<RatesCache | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const cacheRef = useRef<RatesCache | null>(null);
  const refreshLock = useRef(false);

  cacheRef.current = cache;

  const persistCache = useCallback(async (data: RatesCache) => {
    setCache(data);
    cacheRef.current = data;
    await setItem(STORAGE_KEYS.RATES_CACHE, data);
  }, []);

  const refresh = useCallback(async () => {
    if (refreshLock.current) return;
    refreshLock.current = true;
    setIsRefreshing(true);
    setError(null);

    try {
      const net = await NetInfo.fetch();
      const online = net.isConnected ?? false;
      setIsOnline(online);

      if (!online) {
        if (!cacheRef.current) {
          const stored = await getItem<RatesCache>(STORAGE_KEYS.RATES_CACHE);
          if (stored) {
            setCache(stored);
            cacheRef.current = stored;
          } else {
            setError('No internet connection and no cached rates available.');
          }
        }
        return;
      }

      const data = await fetchLatestRates('USD');
      await persistCache(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch exchange rates';
      if (!cacheRef.current) {
        const stored = await getItem<RatesCache>(STORAGE_KEYS.RATES_CACHE);
        if (stored) {
          setCache(stored);
          cacheRef.current = stored;
          setError(`${message}. Showing cached rates.`);
        } else {
          setError(message);
        }
      } else {
        setError(`${message}. Showing cached rates.`);
      }
    } finally {
      setIsRefreshing(false);
      setIsLoading(false);
      refreshLock.current = false;
    }
  }, [persistCache]);

  const clearCache = useCallback(async () => {
    setCache(null);
    cacheRef.current = null;
    setError(null);
    await removeItem(STORAGE_KEYS.RATES_CACHE);
  }, []);

  useEffect(() => {
    (async () => {
      const stored = await getItem<RatesCache>(STORAGE_KEYS.RATES_CACHE);
      if (stored) {
        setCache(stored);
        cacheRef.current = stored;
      }
      await refresh();
    })();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });
    return unsubscribe;
  }, [refresh]);

  const rates = cache?.rates ?? {};
  const fetchedAt = cache?.fetchedAt ?? null;
  const hasCache = fetchedAt != null && Object.keys(rates).length > 0;
  const isStale = isCacheStale(fetchedAt);

  const value = useMemo<RatesContextValue>(
    () => ({
      rates,
      fetchedAt,
      isLoading,
      isRefreshing,
      error,
      isOnline,
      hasCache,
      isStale,
      lastSyncedLabel: formatSyncedTime(fetchedAt),
      lastUpdatedLabel: formatRelativeTime(fetchedAt),
      cachedDateLabel: fetchedAt
        ? new Date(fetchedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        : 'Unknown',
      refresh,
      convertAmount: (amount, from, to) =>
        convertWithRates(amount, from, to, rates),
      getExchangeRate: (from, to) => getRateFromRates(from, to, rates),
      clearCache,
      isSupported: isApiSupported,
    }),
    [
      rates,
      fetchedAt,
      isLoading,
      isRefreshing,
      error,
      isOnline,
      hasCache,
      isStale,
      refresh,
      clearCache,
    ],
  );

  return (
    <RatesContext.Provider value={value}>{children}</RatesContext.Provider>
  );
}

export function useRates() {
  const ctx = useContext(RatesContext);
  if (!ctx) throw new Error('useRates must be used within RatesProvider');
  return ctx;
}
