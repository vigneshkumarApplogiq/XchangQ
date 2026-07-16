import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { fonts } from '../theme/fonts';
import { radius, spacing } from '../theme/tokens';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, right }: ScreenHeaderProps) {
  const { theme } = useApp();

  return (
    <View style={styles.row}>
      <View style={styles.textCol}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

interface InfoScreenProps {
  title: string;
  children: React.ReactNode;
}

export function InfoScreenLayout({ title, children }: InfoScreenProps) {
  const { theme } = useApp();

  return (
    <View style={[styles.infoScreen, { backgroundColor: theme.background }]}>
      <Text style={[styles.infoTitle, { color: theme.textPrimary }]}>{title}</Text>
      {children}
    </View>
  );
}

export function InfoParagraph({ children }: { children: string }) {
  const { theme } = useApp();
  return (
    <Text style={[styles.paragraph, { color: theme.textSecondary }]}>
      {children}
    </Text>
  );
}

export function InfoLastUpdated({ children }: { children: string }) {
  const { theme } = useApp();
  return (
    <Text style={[styles.lastUpdated, { color: theme.textTertiary }]}>
      {children}
    </Text>
  );
}

export function InfoSectionHeading({ children }: { children: string }) {
  const { theme } = useApp();
  return (
    <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
      {children}
    </Text>
  );
}

export function InfoHighlightBox({ children }: { children: string }) {
  const { theme } = useApp();
  return (
    <View
      style={[
        styles.highlightBox,
        {
          backgroundColor: theme.accentMuted,
          borderColor: theme.accent,
        },
      ]}>
      <Text style={[styles.highlightText, { color: theme.textSecondary }]}>
        {children}
      </Text>
    </View>
  );
}

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  const { theme } = useApp();
  return (
    <View style={styles.centered}>
      <Text style={[styles.stateText, { color: theme.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  const { theme } = useApp();
  return (
    <View style={styles.centered}>
      <Text style={[styles.stateTitle, { color: theme.textPrimary }]}>
        Something went wrong
      </Text>
      <Text style={[styles.stateText, { color: theme.textSecondary }]}>
        {message}
      </Text>
      {onRetry ? (
        <Text
          onPress={onRetry}
          style={[styles.retry, { color: theme.accent }]}>
          Try again
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  textCol: { flex: 1 },
  title: {
    fontFamily: fonts.outfit.bold,
    fontSize: 30,
    lineHeight: 36,
  },
  subtitle: {
    fontFamily: fonts.outfit.regular,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  infoScreen: {
    flex: 1,
    padding: spacing.lg,
  },
  infoTitle: {
    fontFamily: fonts.outfit.bold,
    fontSize: 28,
    marginBottom: spacing.lg,
  },
  paragraph: {
    fontFamily: fonts.outfit.regular,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  lastUpdated: {
    fontFamily: fonts.jetbrains.regular,
    fontSize: 13,
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    fontFamily: fonts.outfit.semiBold,
    fontSize: 17,
    lineHeight: 24,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  highlightBox: {
    borderLeftWidth: 3,
    borderRadius: radius.chip,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  highlightText: {
    fontFamily: fonts.outfit.regular,
    fontSize: 14,
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  stateTitle: {
    fontFamily: fonts.outfit.semiBold,
    fontSize: 18,
  },
  stateText: {
    fontFamily: fonts.outfit.regular,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  retry: {
    fontFamily: fonts.outfit.semiBold,
    fontSize: 15,
    marginTop: spacing.sm,
    padding: spacing.md,
  },
});
