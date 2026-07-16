import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { REFRESH_INTERVALS } from '../../utils/currency';
import { spacing } from '../../theme/tokens';
import { CheckIcon } from '../../components/icons/Icons';
import { fonts } from '../../theme/fonts';

export function RefreshIntervalScreen() {
  const { theme, settings, setRefreshIntervalMinutes } = useApp();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.hint, { color: theme.textSecondary }]}>
        How often should exchange rates be refreshed when auto-refresh is on?
      </Text>
      {REFRESH_INTERVALS.map(option => {
        const selected = settings.refreshIntervalMinutes === option.minutes;
        return (
          <Text
            key={option.minutes}
            onPress={() => setRefreshIntervalMinutes(option.minutes)}
            style={[
              styles.row,
              {
                backgroundColor: selected ? theme.accentMuted : theme.surface,
                borderColor: theme.borderSubtle,
              },
            ]}>
            <Text style={[styles.label, { color: theme.textPrimary }]}>
              {option.label}
            </Text>
            {selected ? (
              <View style={[styles.check, { backgroundColor: theme.accent }]}>
                <CheckIcon color={theme.accentText} size={14} />
              </View>
            ) : null}
          </Text>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.sm },
  hint: {
    fontFamily: fonts.outfit.regular,
    fontSize: 14,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: 14,
    borderWidth: 1,
  },
  label: { fontFamily: fonts.outfit.semiBold, fontSize: 16 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
