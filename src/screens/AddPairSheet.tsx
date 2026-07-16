import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { getCurrency } from '../data/currencies';
import { fonts } from '../theme/fonts';
import { radius, spacing } from '../theme/tokens';
import { Button } from '../components/Button';
import { AppBottomSheet } from '../components/AppBottomSheet';
import { CloseIcon } from '../components/icons/Icons';
import { CurrencySelectorModal } from './CurrencySelectorModal';

interface AddPairSheetProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (from: string, to: string, amount: number) => boolean;
}

export function AddPairSheet({ visible, onClose, onAdd }: AddPairSheetProps) {
  const { theme } = useApp();
  const [fromCode, setFromCode] = useState('USD');
  const [toCode, setToCode] = useState('EUR');
  const [amountText, setAmountText] = useState('1000');
  const [picker, setPicker] = useState<'from' | 'to' | null>(null);

  useEffect(() => {
    if (visible) {
      setFromCode('USD');
      setToCode('EUR');
      setAmountText('1000');
      setPicker(null);
    }
  }, [visible]);

  const handleAdd = () => {
    const amount = parseFloat(amountText) || 0;
    if (amount <= 0) {
      Alert.alert('Invalid amount', 'Enter a positive amount.');
      return;
    }
    if (onAdd(fromCode, toCode, amount)) onClose();
  };

  return (
    <>
      <AppBottomSheet visible={visible} onClose={onClose} snapPoints={['58%']}>
        <View style={styles.sheetContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Add Currency Pair
            </Text>
            <Pressable
              onPress={onClose}
              style={[styles.closeBtn, { backgroundColor: theme.surfaceMuted }]}>
              <CloseIcon color={theme.textSecondary} />
            </Pressable>
          </View>

          <SelectorRow
            label="From"
            code={fromCode}
            onPress={() => setPicker('from')}
          />
          <SelectorRow
            label="To"
            code={toCode}
            onPress={() => setPicker('to')}
          />

          <Text style={[styles.fieldLabel, { color: theme.textTertiary }]}>
            BASE AMOUNT
          </Text>
          <TextInput
            style={[
              styles.amountField,
              {
                backgroundColor: theme.inputBg,
                color: theme.textPrimary,
                borderColor: theme.border,
              },
            ]}
            value={amountText}
            onChangeText={setAmountText}
            keyboardType="decimal-pad"
            placeholder="1000"
            placeholderTextColor={theme.textTertiary}
          />

          <Button label="Add to Watchlist" onPress={handleAdd} />
        </View>
      </AppBottomSheet>

      <CurrencySelectorModal
        visible={picker !== null}
        selectedCode={picker === 'from' ? fromCode : toCode}
        subtitle="Select currency"
        supportedOnly
        onSelect={c => {
          if (picker === 'from') setFromCode(c.code);
          else setToCode(c.code);
          setPicker(null);
        }}
        onClose={() => setPicker(null)}
      />
    </>
  );
}

function SelectorRow({
  label,
  code,
  onPress,
}: {
  label: string;
  code: string;
  onPress: () => void;
}) {
  const { theme } = useApp();
  const currency = getCurrency(code);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.selectorRow,
        { backgroundColor: theme.surfaceMuted, borderColor: theme.borderSubtle },
      ]}>
      <Text style={[styles.selectorLabel, { color: theme.textTertiary }]}>
        {label}
      </Text>
      <Text style={[styles.selectorValue, { color: theme.textPrimary }]}>
        {currency.flag} {code} — {currency.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    gap: spacing.md,
    paddingBottom: spacing.xl,
    paddingTop: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.outfit.bold,
    fontSize: 20,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldLabel: {
    fontFamily: fonts.outfit.bold,
    fontSize: 10,
    letterSpacing: 1.2,
  },
  amountField: {
    fontFamily: fonts.jetbrains.semiBold,
    fontSize: 24,
    padding: spacing.lg,
    borderRadius: radius.button,
    borderWidth: 1,
  },
  selectorRow: {
    padding: spacing.lg,
    borderRadius: radius.button,
    borderWidth: 1,
    gap: spacing.xs,
  },
  selectorLabel: {
    fontFamily: fonts.outfit.bold,
    fontSize: 10,
    letterSpacing: 1,
  },
  selectorValue: {
    fontFamily: fonts.outfit.semiBold,
    fontSize: 15,
  },
});
