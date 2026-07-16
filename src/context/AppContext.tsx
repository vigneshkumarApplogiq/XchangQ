import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { darkTheme, lightTheme, Theme, ThemeMode } from '../theme/tokens';
import { DEFAULT_SETTINGS, AppSettings } from '../types/settings';
import { getItem, setItem } from '../storage';
import { STORAGE_KEYS } from '../storage/keys';
import { getIntervalLabel } from '../utils/currency';

interface AppContextValue {
  theme: Theme;
  settings: AppSettings;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setDefaultCurrency: (code: string) => void;
  setAutoRefresh: (value: boolean) => void;
  setRefreshIntervalMinutes: (minutes: number) => void;
  refreshIntervalLabel: string;
  updateSettings: (patch: Partial<AppSettings>) => Promise<void>;
  isReady: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getItem<AppSettings>(STORAGE_KEYS.SETTINGS).then(stored => {
      if (stored) setSettings({ ...DEFAULT_SETTINGS, ...stored });
      setIsReady(true);
    });
  }, []);

  const persist = useCallback(async (next: AppSettings) => {
    setSettings(next);
    await setItem(STORAGE_KEYS.SETTINGS, next);
  }, []);

  const updateSettings = useCallback(
    async (patch: Partial<AppSettings>) => {
      const next = { ...settings, ...patch };
      await persist(next);
    },
    [persist, settings],
  );

  const theme = settings.themeMode === 'dark' ? darkTheme : lightTheme;

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      settings,
      themeMode: settings.themeMode,
      setThemeMode: mode => updateSettings({ themeMode: mode }),
      toggleTheme: () =>
        updateSettings({
          themeMode: settings.themeMode === 'dark' ? 'light' : 'dark',
        }),
      setDefaultCurrency: code => updateSettings({ defaultCurrency: code }),
      setAutoRefresh: v => updateSettings({ autoRefresh: v }),
      setRefreshIntervalMinutes: minutes =>
        updateSettings({ refreshIntervalMinutes: minutes }),
      refreshIntervalLabel: getIntervalLabel(settings.refreshIntervalMinutes),
      updateSettings,
      isReady,
    }),
    [theme, settings, updateSettings, isReady],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
