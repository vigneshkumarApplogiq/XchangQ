import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Currency } from '../data/currencies';
import { fonts } from '../theme/fonts';
import { radius, spacing } from '../theme/tokens';
import { useApp } from '../context/AppContext';
import { ChevronDownIcon } from './icons/Icons';

interface CurrencyCardProps {
  label: string;
  currency: Currency;
  amount: string;
  onAmountChange?: (value: string) => void;
  onCurrencyPress: () => void;
  isOutput?: boolean;
  editable?: boolean;
}

export function CurrencyCard({
  label,
  currency,
  amount,
  onAmountChange,
  onCurrencyPress,
  isOutput = false,
  editable = true,
}: CurrencyCardProps) {
  const { theme } = useApp();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
        theme.cardShadow,
      ]}>
      <Text style={[styles.label, { color: theme.textTertiary }]}>{label}</Text>

      <View style={styles.row}>
        <Pressable
          style={styles.currencySide}
          onPress={onCurrencyPress}
          hitSlop={8}>
          <Text style={styles.flag}>{currency.flag}</Text>
          <View style={styles.currencyText}>
            <View style={styles.codeRow}>
              <Text style={[styles.code, { color: theme.textPrimary }]}>
                {currency.code}
              </Text>
              <ChevronDownIcon color={theme.textTertiary} />
            </View>
            <Text
              style={[styles.name, { color: theme.textSecondary }]}
              numberOfLines={1}>
              {currency.name}
            </Text>
          </View>
        </Pressable>

        <View style={styles.amountSide}>
          {editable && !isOutput ? (
            <TextInput
              style={[styles.amountInput, { color: theme.textPrimary }]}
              value={amount}
              onChangeText={onAmountChange}
              keyboardType="decimal-pad"
              selectTextOnFocus
              placeholder="0"
              placeholderTextColor={theme.textTertiary}
              maxLength={16}
            />
          ) : (
            <Text
              style={[
                styles.amountDisplay,
                { color: isOutput ? theme.accent : theme.textPrimary },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.55}>
              {amount}
            </Text>
          )}
          <Text style={[styles.hint, { color: theme.textTertiary }]}>
            {isOutput
              ? `${currency.symbol} · converted`
              : `${currency.symbol} · tap to edit`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    gap: spacing.md,
    minHeight: 120,
  },
  label: {
    fontFamily: fonts.outfit.bold,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  currencySide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flexShrink: 0,
    maxWidth: '42%',
    paddingVertical: spacing.xs,
  },
  currencyText: {
    flex: 1,
  },
  flag: {
    fontSize: 36,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  code: {
    fontFamily: fonts.outfit.bold,
    fontSize: 18,
    lineHeight: 24,
  },
  name: {
    fontFamily: fonts.outfit.regular,
    fontSize: 12,
    marginTop: 2,
  },
  amountSide: {
    flex: 1,
    alignItems: 'flex-end',
    minWidth: 0,
    paddingTop: spacing.xs,
  },
  amountInput: {
    fontFamily: fonts.jetbrains.semiBold,
    fontSize: 34,
    lineHeight: 40,
    textAlign: 'right',
    padding: 0,
    width: '100%',
    minHeight: 44,
  },
  amountDisplay: {
    fontFamily: fonts.jetbrains.semiBold,
    fontSize: 34,
    lineHeight: 40,
    textAlign: 'right',
    width: '100%',
  },
  hint: {
    fontFamily: fonts.outfit.regular,
    fontSize: 11,
    marginTop: spacing.xs,
  },
});
