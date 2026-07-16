import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { useWatchlist } from '../context/WatchlistContext';
import { useRates } from '../context/RatesContext';
import { getCurrency } from '../data/currencies';
import { formatAmount } from '../utils/currency';
import { fonts } from '../theme/fonts';
import { radius, spacing } from '../theme/tokens';
import { ScreenHeader } from '../components/ScreenLayout';
import { PlusIcon } from '../components/icons/Icons';
import { AddPairSheet } from './AddPairSheet';
import { WatchlistEmptyScreen } from './OfflineEmptyScreen';

export function WatchlistScreen() {
  const { theme } = useApp();
  const { pairs, isLoading, removePair, addPair } = useWatchlist();
  const { convertAmount, getExchangeRate, lastUpdatedLabel } = useRates();
  const insets = useSafeAreaInsets();
  const [addVisible, setAddVisible] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + spacing.lg,
            paddingBottom: spacing.xxl,
            flexGrow: 1,
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Watchlist"
          subtitle={
            isLoading
              ? 'Loading…'
              : `${pairs.length} pair${pairs.length === 1 ? '' : 's'} · updated ${lastUpdatedLabel}`
          }
          right={
            <Pressable
              onPress={() => setAddVisible(true)}
              style={[styles.addBtn, { backgroundColor: theme.accent }]}>
              <PlusIcon color={theme.accentText} />
            </Pressable>
          }
        />

        {isLoading ? (
          <Text style={[styles.loading, { color: theme.textSecondary }]}>
            Loading watchlist…
          </Text>
        ) : pairs.length === 0 ? (
          <WatchlistEmptyScreen onAdd={() => setAddVisible(true)} />
        ) : (
          <View style={styles.list}>
            {pairs.map(pair => (
              <WatchlistCard
                key={pair.id}
                pair={pair}
                onRemove={() =>
                  Alert.alert(
                    'Remove pair',
                    `Remove ${pair.from} → ${pair.to}?`,
                    [
                      { text: 'Cancel', style: 'cancel' },
                      {
                        text: 'Remove',
                        style: 'destructive',
                        onPress: () => removePair(pair.id),
                      },
                    ],
                  )
                }
                converted={convertAmount(pair.amount, pair.from, pair.to)}
                rate={getExchangeRate(pair.from, pair.to)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <AddPairSheet
        visible={addVisible}
        onClose={() => setAddVisible(false)}
        onAdd={(from, to, amount) => {
          const err = addPair(from, to, amount);
          if (err) {
            Alert.alert('Cannot add pair', err);
            return false;
          }
          return true;
        }}
      />
    </View>
  );
}

function WatchlistCard({
  pair,
  converted,
  rate,
  onRemove,
}: {
  pair: { id: string; from: string; to: string; amount: number };
  converted: number | null;
  rate: number | null;
  onRemove: () => void;
}) {
  const { theme } = useApp();
  const from = getCurrency(pair.from);
  const to = getCurrency(pair.to);

  return (
    <Pressable
      onLongPress={onRemove}
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
        theme.cardShadow,
      ]}>
      <View style={styles.cardTop}>
        <View style={styles.pairInfo}>
          <View style={styles.flagStack}>
            <Text style={[styles.flag, styles.flagBack]}>{to.flag}</Text>
            <Text style={[styles.flag, styles.flagFront]}>{from.flag}</Text>
          </View>
          <View style={styles.pairText}>
            <Text style={[styles.pairCode, { color: theme.textPrimary }]}>
              {pair.from} → {pair.to}
            </Text>
            <Text style={[styles.rateLine, { color: theme.textTertiary }]}>
              {rate != null
                ? `1 ${pair.from} = ${rate.toFixed(4)} ${pair.to}`
                : 'Rate unavailable'}
            </Text>
          </View>
        </View>

        <View style={styles.amountCol}>
          <Text
            style={[styles.baseAmount, { color: theme.textPrimary }]}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {formatAmount(pair.amount)}
          </Text>
          <Text
            style={[styles.convertedAmount, { color: theme.accent }]}
            numberOfLines={1}
            adjustsFontSizeToFit>
            ≈ {converted != null ? formatAmount(converted) : '—'}
          </Text>
        </View>
      </View>
      <Text style={[styles.hint, { color: theme.textTertiary }]}>
        Long press to remove
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: spacing.lg },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontFamily: fonts.outfit.regular,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
  list: { gap: spacing.md },
  card: {
    borderRadius: radius.card,
    padding: spacing.lg,
    borderWidth: 1,
    gap: spacing.sm,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  pairInfo: {
    flexDirection: 'row',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  pairText: { flex: 1, minWidth: 0 },
  flagStack: { width: 44, height: 32, position: 'relative' },
  flag: { fontSize: 22, position: 'absolute' },
  flagBack: { left: 14, top: 4, opacity: 0.85 },
  flagFront: { left: 0, top: 0 },
  pairCode: {
    fontFamily: fonts.outfit.semiBold,
    fontSize: 16,
  },
  rateLine: {
    fontFamily: fonts.outfit.regular,
    fontSize: 12,
    marginTop: 2,
  },
  amountCol: { alignItems: 'flex-end', maxWidth: '45%', minWidth: 0 },
  baseAmount: {
    fontFamily: fonts.jetbrains.medium,
    fontSize: 16,
  },
  convertedAmount: {
    fontFamily: fonts.jetbrains.medium,
    fontSize: 15,
    marginTop: 2,
  },
  hint: {
    fontFamily: fonts.outfit.regular,
    fontSize: 11,
  },
});
