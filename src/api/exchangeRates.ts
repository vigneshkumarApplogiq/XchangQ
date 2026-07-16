const BASE_URL = 'https://api.frankfurter.app';

export interface FrankfurterResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface RatesCache {
  base: string;
  rates: Record<string, number>;
  fetchedAt: string;
  apiDate: string;
}

export async function fetchLatestRates(
  base = 'USD',
): Promise<RatesCache> {
  const response = await fetch(`${BASE_URL}/latest?from=${base}`, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch rates (${response.status})`);
  }

  const data = (await response.json()) as FrankfurterResponse;
  const rates: Record<string, number> = { [base]: 1, ...data.rates };

  return {
    base,
    rates,
    fetchedAt: new Date().toISOString(),
    apiDate: data.date,
  };
}

/** Currencies supported by Frankfurter API */
export const API_SUPPORTED_CODES = new Set([
  'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP',
  'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'ISK', 'JPY', 'KRW', 'MXN', 'MYR',
  'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR',
]);

export function isApiSupported(code: string): boolean {
  return API_SUPPORTED_CODES.has(code);
}
