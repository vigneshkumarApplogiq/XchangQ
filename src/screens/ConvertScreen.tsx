import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QuickAmounts, RateBar } from '../components/ConvertExtras';
import { CurrencyCard } from '../components/CurrencyCard';
import { RefreshIcon } from '../components/icons/Icons';
import {
  ErrorBanner,
  StatusPill,
  WarningBanner,
} from '../components/StatusBanner';
import { SwapButton } from '../components/SwapButton';
import { ScreenHeader } from '../components/ScreenLayout';
import { useApp } from '../context/AppContext';
import { useRates } from '../context/RatesContext';
import { getCurrency } from '../data/currencies';
import {
  formatAmount,
  parseAmount,
  sanitizeAmountInput,
} from '../utils/currency';
import { spacing } from '../theme/tokens';
import { CurrencySelectorModal } from './CurrencySelectorModal';
import { OfflineEmptyScreen } from './OfflineEmptyScreen';

const QUICK_AMOUNTS = [
  { label: '100', value: 100 },
  { label: '500', value: 500 },
  { label: '1K', value: 1000 },
  { label: '5K', value: 5000 },
];

export function ConvertScreen() {
  const { theme, settings } = useApp();
  const {
    isLoading,
    isRefreshing,
    isOnline,
    hasCache,
    isStale,
    error,
    lastUpdatedLabel,
    cachedDateLabel,
    refresh,
    convertAmount,
    getExchangeRate,
    isSupported,
  } = useRates();
  const insets = useSafeAreaInsets();

  const [fromCode, setFromCode] = useState(settings.defaultCurrency);
  const [toCode, setToCode] = useState('INR');
  const [amountText, setAmountText] = useState('1000');
  const [selectorTarget, setSelectorTarget] = useState<'from' | 'to' | null>(
    null,
  );

  useEffect(() => {
    setFromCode(settings.defaultCurrency);
  }, [settings.defaultCurrency]);

  const amount = parseAmount(amountText);
  const showOfflineEmpty = !isOnline && !hasCache && !isLoading;

  if (showOfflineEmpty) {
    return <OfflineEmptyScreen onRetry={refresh} />;
  }

  const fromCurrency = getCurrency(fromCode);
  const toCurrency = getCurrency(toCode);
  const converted = convertAmount(amount, fromCode, toCode);
  const rate = getExchangeRate(fromCode, toCode);
  const pairSupported = isSupported(fromCode) && isSupported(toCode);

  const handleAmountChange = useCallback((text: string) => {
    setAmountText(sanitizeAmountInput(text));
  }, []);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const displayConverted =
    converted != null ? formatAmount(converted) : '—';

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.lg, paddingBottom: spacing.xxl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <StatusPill
          online={isOnline}
          stale={isStale && hasCache}
          loading={isLoading}
          lastUpdated={lastUpdatedLabel}
          cachedDate={cachedDateLabel}
        />

        <ScreenHeader
          title="Convert"
          right={
            <Pressable
              onPress={refresh}
              disabled={isRefreshing}
              style={[
                styles.refreshBtn,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                  opacity: isRefreshing ? 0.5 : 1,
                },
                theme.cardShadow,
              ]}>
              {isRefreshing ? (
                <ActivityIndicator size="small" color={theme.accent} />
              ) : (
                <RefreshIcon color={theme.textSecondary} />
              )}
            </Pressable>
          }
        />

        {error && hasCache ? <ErrorBanner message={error} /> : null}

        {isStale && hasCache && (
          <WarningBanner
            title="Rates may be outdated"
            subtitle="Exchange data is older than 7 days. Connect to refresh."
          />
        )}

        {!pairSupported && (
          <WarningBanner
            title="Limited rate support"
            subtitle="One or both currencies are not supported by the live API."
          />
        )}

        <View style={styles.cards}>
          <CurrencyCard
            label="YOU SEND"
            currency={fromCurrency}
            amount={amountText || '0'}
            onAmountChange={handleAmountChange}
            onCurrencyPress={() => setSelectorTarget('from')}
          />

          <View style={styles.swapContainer}>
            <SwapButton onPress={handleSwap} />
          </View>

          <CurrencyCard
            label="THEY RECEIVE"
            currency={toCurrency}
            amount={isLoading ? '…' : displayConverted}
            onCurrencyPress={() => setSelectorTarget('to')}
            isOutput
            editable={false}
          />
        </View>

        <RateBar
          fromCode={fromCode}
          toCode={toCode}
          rate={rate}
          live={isOnline && !isStale && pairSupported}
          loading={isLoading}
        />

        <QuickAmounts
          amounts={QUICK_AMOUNTS}
          selected={amount}
          onSelect={v => setAmountText(String(v))}
        />
      </ScrollView>

      <CurrencySelectorModal
        visible={selectorTarget !== null}
        selectedCode={selectorTarget === 'from' ? fromCode : toCode}
        subtitle={
          selectorTarget === 'from'
            ? 'Choose the currency to convert from'
            : 'Choose the currency to convert to'
        }
        onSelect={currency => {
          if (selectorTarget === 'from') {
            if (currency.code !== toCode) setFromCode(currency.code);
          } else if (currency.code !== fromCode) {
            setToCode(currency.code);
          }
          setSelectorTarget(null);
        }}
        onClose={() => setSelectorTarget(null)}
        supportedOnly
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: spacing.lg },
  refreshBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cards: { gap: 0 },
  swapContainer: {
    alignItems: 'center',
    marginVertical: -spacing.lg,
    zIndex: 10,
  },
});
