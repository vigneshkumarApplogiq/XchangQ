import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { fonts } from '../theme/fonts';
import { radius, spacing } from '../theme/tokens';
import { useApp } from '../context/AppContext';

interface QuickAmountsProps {
  amounts: { label: string; value: number }[];
  selected: number;
  onSelect: (value: number) => void;
}

export function QuickAmounts({ amounts, selected, onSelect }: QuickAmountsProps) {
  const { theme } = useApp();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textTertiary }]}>QUICK AMOUNTS</Text>
      <View style={styles.row}>
        {amounts.map(item => {
          const isActive = selected === item.value;
          return (
            <Pressable
              key={item.label}
              onPress={() => onSelect(item.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: isActive ? theme.accent : theme.surface,
                  borderColor: isActive ? theme.accent : theme.border,
                },
                !isActive && theme.cardShadow,
              ]}>
              <Text
                style={[
                  styles.chipText,
                  { color: isActive ? theme.accentText : theme.textSecondary },
                ]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

interface RateBarProps {
  fromCode: string;
  toCode: string;
  rate: number | null;
  live?: boolean;
  loading?: boolean;
}

export function RateBar({
  fromCode,
  toCode,
  rate,
  live = true,
  loading = false,
}: RateBarProps) {
  const { theme } = useApp();

  return (
    <View
      style={[
        styles.rateBar,
        { backgroundColor: theme.surfaceMuted, borderColor: theme.borderSubtle },
      ]}>
      <View style={styles.rateContent}>
        {loading ? (
          <ActivityIndicator size="small" color={theme.accent} />
        ) : rate != null ? (
          <Text style={[styles.rateText, { color: theme.textPrimary }]}>
            1 {fromCode} = {rate.toFixed(4)} {toCode}
          </Text>
        ) : (
          <Text style={[styles.rateText, { color: theme.warning }]}>
            Rate unavailable for this pair
          </Text>
        )}
        <Text style={[styles.rateSource, { color: theme.textTertiary }]}>
          Mid-market rate · via Frankfurter API
        </Text>
      </View>
      {live && rate != null && !loading && (
        <View style={[styles.liveBadge, { backgroundColor: theme.accentMuted }]}>
          <Text style={[styles.liveText, { color: theme.accent }]}>LIVE</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  label: {
    fontFamily: fonts.outfit.bold,
    fontSize: 10,
    letterSpacing: 1.2,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: radius.button,
    borderWidth: 1,
    minHeight: 44,
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: fonts.outfit.semiBold,
    fontSize: 14,
  },
  rateBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radius.card,
    borderWidth: 1,
    marginTop: spacing.lg,
    minHeight: 72,
  },
  rateContent: {
    flex: 1,
    gap: spacing.xs,
  },
  rateText: {
    fontFamily: fonts.jetbrains.medium,
    fontSize: 13,
    lineHeight: 18,
  },
  rateSource: {
    fontFamily: fonts.outfit.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  liveBadge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.chip,
  },
  liveText: {
    fontFamily: fonts.outfit.bold,
    fontSize: 9,
    letterSpacing: 1,
  },
});
