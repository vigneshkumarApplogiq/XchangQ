import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { getSupportedCurrencies } from '../../utils/currency';
import { spacing } from '../../theme/tokens';
import { CheckIcon } from '../../components/icons/Icons';
import { fonts } from '../../theme/fonts';

export function DefaultCurrencyScreen() {
  const { theme, settings, setDefaultCurrency } = useApp();
  const currencies = getSupportedCurrencies();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.hint, { color: theme.textSecondary }]}>
        Choose the default currency for new conversions.
      </Text>
      {currencies.map(currency => {
        const selected = settings.defaultCurrency === currency.code;
        return (
          <Row
            key={currency.code}
            selected={selected}
            onPress={() => setDefaultCurrency(currency.code)}
            label={`${currency.flag}  ${currency.code}`}
            sub={currency.name}
          />
        );
      })}
    </ScrollView>
  );
}

function Row({
  selected,
  onPress,
  label,
  sub,
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
  sub: string;
}) {
  const { theme } = useApp();
  return (
    <Text
      onPress={onPress}
      style={[
        styles.row,
        {
          backgroundColor: selected ? theme.accentMuted : theme.surface,
          borderColor: theme.borderSubtle,
        },
      ]}>
      <View>
        <Text style={[styles.code, { color: theme.textPrimary }]}>{label}</Text>
        <Text style={[styles.sub, { color: theme.textSecondary }]}>{sub}</Text>
      </View>
      {selected ? (
        <View style={[styles.check, { backgroundColor: theme.accent }]}>
          <CheckIcon color={theme.accentText} size={14} />
        </View>
      ) : null}
    </Text>
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
  code: { fontFamily: fonts.outfit.semiBold, fontSize: 16 },
  sub: { fontFamily: fonts.outfit.regular, fontSize: 13, marginTop: 2 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
