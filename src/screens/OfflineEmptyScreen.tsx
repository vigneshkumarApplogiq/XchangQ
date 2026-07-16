import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { WarningBanner } from '../components/StatusBanner';
import { WifiOffIcon } from '../components/icons/Icons';
import { useApp } from '../context/AppContext';
import { fonts } from '../theme/fonts';
import { spacing } from '../theme/tokens';

interface OfflineEmptyScreenProps {
  onRetry?: () => void;
}

export function OfflineEmptyScreen({ onRetry }: OfflineEmptyScreenProps) {
  const { theme } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: theme.background,
          paddingTop: insets.top + spacing.lg,
        },
      ]}>
      <View style={styles.content}>
        <WarningBanner
          title="No internet connection"
          subtitle="Connect to download exchange rates"
        />

        <View style={styles.center}>
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.warningMuted },
            ]}>
            <WifiOffIcon color={theme.warning} size={40} />
          </View>

          <Text style={[styles.headline, { color: theme.textPrimary }]}>
            You're offline
          </Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            No cached rates found. Connect to the internet — rates will be
            saved for offline use automatically.
          </Text>

          {onRetry ? (
            <Button label="Try Again" onPress={onRetry} style={styles.cta} />
          ) : null}
        </View>
      </View>
    </View>
  );
}

interface WatchlistEmptyProps {
  onAdd: () => void;
}

export function WatchlistEmptyScreen({ onAdd }: WatchlistEmptyProps) {
  const { theme } = useApp();

  return (
    <View style={styles.emptyCenter}>
      <View
        style={[styles.iconCircle, { backgroundColor: theme.accentMuted }]}>
        <Text style={styles.starEmoji}>⭐</Text>
      </View>
      <Text style={[styles.headline, { color: theme.textPrimary }]}>
        No pairs yet
      </Text>
      <Text style={[styles.description, { color: theme.textSecondary }]}>
        Pin currency pairs to track live rates and quick conversions.
      </Text>
      <Button label="Add Pair" onPress={onAdd} style={styles.cta} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xxl * 2,
  },
  emptyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    minHeight: 320,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  starEmoji: { fontSize: 40 },
  headline: {
    fontFamily: fonts.outfit.bold,
    fontSize: 26,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontFamily: fonts.outfit.regular,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  cta: {
    width: '100%',
    maxWidth: 280,
  },
});
