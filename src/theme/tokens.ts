export const colors = {
  teal: '#00D4AA',
  tealDark: '#00A888',
  tealMuted: 'rgba(0, 212, 170, 0.15)',
  tealMutedLight: 'rgba(0, 212, 170, 0.12)',

  navy950: '#050A12',
  navy900: '#0D161B',
  navy800: '#161E2A',
  navy700: '#1E2235',

  gray50: '#F4F6FA',
  gray100: '#EDEEF2',
  gray200: '#D8DCE6',
  gray300: '#B0B8C8',
  gray400: '#7A8499',
  gray500: '#5A6478',
  gray600: '#3D4556',
  gray700: '#2A3040',
  gray800: '#1A1F2E',
  gray900: '#0F1219',

  white: '#FFFFFF',
  black: '#050A12',

  success: '#00C896',
  successMuted: 'rgba(0, 200, 150, 0.15)',
  successMutedLight: 'rgba(0, 200, 150, 0.1)',

  warning: '#F59E0B',
  warningMuted: 'rgba(245, 158, 11, 0.15)',
  warningMutedLight: 'rgba(245, 158, 11, 0.12)',

  error: '#EF4444',
  errorMuted: 'rgba(239, 68, 68, 0.15)',
  errorMutedLight: 'rgba(239, 68, 68, 0.1)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  chip: 8,
  button: 14,
  card: 20,
  sheet: 28,
  full: 999,
} as const;

import { fonts } from './fonts';

export const typography = {
  numericDisplay: { fontFamily: fonts.jetbrains.semiBold, fontSize: 28, lineHeight: 34 },
  numericLabel: { fontFamily: fonts.jetbrains.medium, fontSize: 13, lineHeight: 18 },
  screenTitle: { fontFamily: fonts.outfit.bold, fontSize: 30, lineHeight: 36 },
  cardHeading: { fontFamily: fonts.outfit.bold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fonts.outfit.regular, fontSize: 14, lineHeight: 20 },
  bodyMedium: { fontFamily: fonts.outfit.medium, fontSize: 14, lineHeight: 20 },
  bodySemiBold: { fontFamily: fonts.outfit.semiBold, fontSize: 14, lineHeight: 20 },
  micro: { fontFamily: fonts.outfit.bold, fontSize: 10, lineHeight: 14, letterSpacing: 1.2 },
  caption: { fontFamily: fonts.outfit.regular, fontSize: 12, lineHeight: 16 },
  monoSmall: { fontFamily: fonts.jetbrains.regular, fontSize: 12, lineHeight: 16 },
} as const;

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  background: string;
  backgroundDeep: string;
  surface: string;
  surfaceMuted: string;
  surfaceElevated: string;
  border: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  accent: string;
  accentText: string;
  accentMuted: string;
  success: string;
  successMuted: string;
  warning: string;
  warningMuted: string;
  error: string;
  errorMuted: string;
  shadow: string;
  tabBar: string;
  inputBg: string;
  cardShadow: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

export const lightTheme: Theme = {
  mode: 'light',
  background: colors.gray50,
  backgroundDeep: colors.white,
  surface: colors.white,
  surfaceMuted: colors.gray100,
  surfaceElevated: colors.white,
  border: colors.gray200,
  borderSubtle: colors.gray100,
  textPrimary: colors.navy950,
  textSecondary: colors.gray500,
  textTertiary: colors.gray400,
  textInverse: colors.white,
  accent: colors.teal,
  accentText: colors.black,
  accentMuted: colors.tealMutedLight,
  success: colors.success,
  successMuted: colors.successMutedLight,
  warning: colors.warning,
  warningMuted: colors.warningMutedLight,
  error: colors.error,
  errorMuted: colors.errorMutedLight,
  shadow: 'rgba(5, 10, 18, 0.08)',
  tabBar: colors.white,
  inputBg: colors.gray100,
  cardShadow: {
    shadowColor: '#050A12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
};

export const darkTheme: Theme = {
  mode: 'dark',
  background: colors.navy900,
  backgroundDeep: colors.navy950,
  surface: colors.navy800,
  surfaceMuted: colors.navy700,
  surfaceElevated: colors.navy800,
  border: 'rgba(255, 255, 255, 0.08)',
  borderSubtle: 'rgba(255, 255, 255, 0.04)',
  textPrimary: colors.white,
  textSecondary: colors.gray300,
  textTertiary: colors.gray400,
  textInverse: colors.black,
  accent: colors.teal,
  accentText: colors.black,
  accentMuted: colors.tealMuted,
  success: colors.success,
  successMuted: colors.successMuted,
  warning: colors.warning,
  warningMuted: colors.warningMuted,
  error: colors.error,
  errorMuted: colors.errorMuted,
  shadow: 'rgba(0, 0, 0, 0.4)',
  tabBar: colors.navy800,
  inputBg: colors.navy700,
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
};
