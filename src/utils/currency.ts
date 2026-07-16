import { CURRENCIES, getCurrency } from '../data/currencies';
import { isApiSupported } from '../api/exchangeRates';

export function formatAmount(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '0.00';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatRelativeTime(isoDate: string | null): string {
  if (!isoDate) return 'Never';
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatSyncedTime(isoDate: string | null): string {
  if (!isoDate) return 'Not synced yet';
  const date = new Date(isoDate);
  const isToday = date.toDateString() === new Date().toDateString();
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return isToday
    ? `Today at ${time}`
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function isCacheStale(fetchedAt: string | null, maxDays = 7): boolean {
  if (!fetchedAt) return true;
  const age = Date.now() - new Date(fetchedAt).getTime();
  return age > maxDays * 24 * 60 * 60 * 1000;
}

/** Sanitize decimal input — allows digits and one decimal point */
export function sanitizeAmountInput(text: string): string {
  const cleaned = text.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length <= 1) return cleaned;
  return `${parts[0]}.${parts.slice(1).join('')}`;
}

export function parseAmount(text: string): number {
  const cleaned = text.replace(/,/g, '').trim();
  if (!cleaned || cleaned === '.') return 0;
  const value = parseFloat(cleaned);
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

export function convertWithRates(
  amount: number,
  fromCode: string,
  toCode: string,
  rates: Record<string, number>,
): number | null {
  const fromRate = rates[fromCode];
  const toRate = rates[toCode];
  if (fromRate == null || toRate == null || fromRate === 0) return null;
  return (amount / fromRate) * toRate;
}

export function getRateFromRates(
  fromCode: string,
  toCode: string,
  rates: Record<string, number>,
): number | null {
  const fromRate = rates[fromCode];
  const toRate = rates[toCode];
  if (fromRate == null || toRate == null || fromRate === 0) return null;
  return toRate / fromRate;
}

export function searchCurrencies(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return CURRENCIES;
  return CURRENCIES.filter(
    c =>
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q),
  );
}

export function getSupportedCurrencies() {
  return CURRENCIES.filter(c => isApiSupported(c.code));
}

export function getCurrencyMeta(code: string) {
  return getCurrency(code);
}

export type RefreshIntervalOption = {
  label: string;
  minutes: number;
};

export const REFRESH_INTERVALS: RefreshIntervalOption[] = [
  { label: 'Every 15 minutes', minutes: 15 },
  { label: 'Every 30 minutes', minutes: 30 },
  { label: 'Every hour', minutes: 60 },
  { label: 'Every 6 hours', minutes: 360 },
  { label: 'Every 24 hours', minutes: 1440 },
];

export function getIntervalLabel(minutes: number): string {
  return REFRESH_INTERVALS.find(i => i.minutes === minutes)?.label ?? 'Every hour';
}
