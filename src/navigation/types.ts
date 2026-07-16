import type { NavigatorScreenParams } from '@react-navigation/native';

export type SettingsStackParamList = {
  SettingsMain: undefined;
  DefaultCurrency: undefined;
  RefreshInterval: undefined;
  About: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
  Feedback: undefined;
  Support: undefined;
};

export type MainTabParamList = {
  Convert: undefined;
  Watchlist: undefined;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
