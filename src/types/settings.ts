import type { ThemeMode } from '../theme/tokens';

export interface AppSettings {
  themeMode: ThemeMode;
  defaultCurrency: string;
  autoRefresh: boolean;
  refreshIntervalMinutes: number;
}

export const DEFAULT_SETTINGS: AppSettings = {
  themeMode: 'dark',
  defaultCurrency: 'USD',
  autoRefresh: true,
  refreshIntervalMinutes: 60,
};
