import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../theme/fonts';
import { radius, spacing } from '../theme/tokens';
import { useApp } from '../context/AppContext';

interface StatusPillProps {
  online?: boolean;
  stale?: boolean;
  loading?: boolean;
  lastUpdated?: string;
  cachedDate?: string;
}

export function StatusPill({
  online = true,
  stale = false,
  loading = false,
  lastUpdated = '2h ago',
  cachedDate = 'Jul 10',
}: StatusPillProps) {
  const { theme } = useApp();

  const isOnline = online && !stale && !loading;
  const dotColor = loading
    ? theme.textTertiary
    : stale
      ? theme.warning
      : isOnline
        ? theme.success
        : theme.warning;
  const bgColor = loading
    ? theme.surfaceMuted
    : stale
      ? theme.warningMuted
      : isOnline
        ? theme.successMuted
        : theme.warningMuted;
  const textColor = loading
    ? theme.textSecondary
    : stale
      ? theme.warning
      : isOnline
        ? theme.success
        : theme.warning;

  const label = loading
    ? 'Loading rates…'
    : stale
      ? `Stale data · Rates from ${cachedDate}`
      : isOnline
        ? `Online · Rates updated ${lastUpdated}`
        : `Offline · Showing cached rates from ${cachedDate}`;

  return (
    <View style={[styles.pill, { backgroundColor: bgColor }]}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
}

export function WarningBanner({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { theme } = useApp();

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: theme.warningMuted,
          borderColor: theme.warning + '33',
        },
      ]}>
      <Text style={[styles.bannerIcon, { color: theme.warning }]}>⚠</Text>
      <View style={styles.bannerText}>
        <Text style={[styles.bannerTitle, { color: theme.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.bannerSubtitle, { color: theme.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  const { theme } = useApp();

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: theme.errorMuted,
          borderColor: theme.error + '33',
        },
      ]}>
      <Text style={[styles.bannerIcon, { color: theme.error }]}>✕</Text>
      <View style={styles.bannerText}>
        <Text style={[styles.bannerTitle, { color: theme.textPrimary }]}>
          Unable to load rates
        </Text>
        <Text style={[styles.bannerSubtitle, { color: theme.textSecondary }]}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    gap: spacing.sm,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  text: {
    fontFamily: fonts.outfit.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.card,
    borderWidth: 1,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  bannerIcon: {
    fontSize: 20,
  },
  bannerText: {
    flex: 1,
    gap: 2,
  },
  bannerTitle: {
    fontFamily: fonts.outfit.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },
  bannerSubtitle: {
    fontFamily: fonts.outfit.regular,
    fontSize: 12,
    lineHeight: 16,
  },
});
