export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  country: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', country: 'United States' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', country: 'European Union' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', country: 'United Kingdom' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', country: 'India' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', country: 'Japan' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', country: 'Australia' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', country: 'Canada' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭', country: 'Switzerland' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', country: 'China' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰', country: 'Hong Kong' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', country: 'Singapore' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', country: 'New Zealand' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', country: 'Sweden' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', country: 'Norway' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', country: 'Denmark' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', country: 'South Africa' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱', country: 'Israel' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', country: 'Turkey' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', country: 'Brazil' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', country: 'Mexico' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', country: 'South Korea' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', country: 'Indonesia' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', country: 'Malaysia' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', country: 'Thailand' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭', country: 'Philippines' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', country: 'Poland' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', country: 'Czech Republic' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', country: 'Hungary' },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴', country: 'Romania' },
  { code: 'ISK', name: 'Icelandic Króna', symbol: 'kr', flag: '🇮🇸', country: 'Iceland' },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬', country: 'Bulgaria' },
];

export const DEFAULT_RECENT = ['USD', 'EUR', 'GBP', 'JPY', 'INR'];

export function getCurrency(code: string): Currency {
  return CURRENCIES.find(c => c.code === code) ?? CURRENCIES[0];
}
