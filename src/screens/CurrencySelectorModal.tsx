import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { DEFAULT_RECENT } from '../data/currencies';
import { useApp } from '../context/AppContext';
import { getSupportedCurrencies } from '../utils/currency';
import { fonts } from '../theme/fonts';
import { radius, spacing } from '../theme/tokens';
import { getItem, setItem } from '../storage';
import { STORAGE_KEYS } from '../storage/keys';
import {
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  SearchIcon,
} from '../components/icons/Icons';
import { AppBottomSheet } from '../components/AppBottomSheet';
import type { Currency } from '../data/currencies';

interface CurrencySelectorModalProps {
  visible: boolean;
  selectedCode: string;
  subtitle?: string;
  onSelect: (currency: Currency) => void;
  onClose: () => void;
  supportedOnly?: boolean;
}

export function CurrencySelectorModal({
  visible,
  selectedCode,
  subtitle = 'Choose the currency to convert to',
  onSelect,
  onClose,
  supportedOnly = false,
}: CurrencySelectorModalProps) {
  const { theme } = useApp();
  const [query, setQuery] = useState('');
  const [recentCodes, setRecentCodes] = useState<string[]>(DEFAULT_RECENT);

  useEffect(() => {
    if (visible) {
      getItem<string[]>(STORAGE_KEYS.RECENT_CURRENCIES).then(stored => {
        if (stored?.length) setRecentCodes(stored);
      });
    } else {
      setQuery('');
    }
  }, [visible]);

  const pool = supportedOnly ? getSupportedCurrencies() : getSupportedCurrencies();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = supportedOnly ? getSupportedCurrencies() : getSupportedCurrencies();
    if (!q) return base;
    return base.filter(
      c =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q),
    );
  }, [query, supportedOnly]);

  const recentCurrencies = recentCodes
    .map(code => pool.find(c => c.code === code))
    .filter(Boolean) as Currency[];

  const handleSelect = useCallback(
    async (currency: Currency) => {
      const next = [
        currency.code,
        ...recentCodes.filter(c => c !== currency.code),
      ].slice(0, 5);
      setRecentCodes(next);
      await setItem(STORAGE_KEYS.RECENT_CURRENCIES, next);
      onSelect(currency);
    },
    [recentCodes, onSelect],
  );

  const renderItem = useCallback(
    ({ item: currency }: { item: Currency }) => {
      const isSelected = currency.code === selectedCode;
      return (
        <Pressable
          onPress={() => handleSelect(currency)}
          style={[
            styles.listItem,
            isSelected && { backgroundColor: theme.accentMuted },
          ]}>
          <Text style={styles.listFlag}>{currency.flag}</Text>
          <View style={styles.listText}>
            <Text style={[styles.listCode, { color: theme.textPrimary }]}>
              {currency.code}
            </Text>
            <Text style={[styles.listName, { color: theme.textSecondary }]}>
              {currency.name}
            </Text>
          </View>
          {isSelected ? (
            <View
              style={[styles.checkCircle, { backgroundColor: theme.accent }]}>
              <CheckIcon color={theme.accentText} size={14} />
            </View>
          ) : (
            <ChevronRightIcon color={theme.textTertiary} />
          )}
        </Pressable>
      );
    },
    [selectedCode, theme, handleSelect],
  );

  const ListHeader = useCallback(
    () => (
      <View>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Select Currency
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {subtitle}
            </Text>
          </View>
          <Pressable
            onPress={onClose}
            style={[styles.closeBtn, { backgroundColor: theme.surfaceMuted }]}>
            <CloseIcon color={theme.textSecondary} />
          </Pressable>
        </View>

        <View
          style={[
            styles.searchBar,
            { backgroundColor: theme.inputBg, borderColor: theme.border },
          ]}>
          <SearchIcon color={theme.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: theme.textPrimary }]}
            placeholder="Search currencies..."
            placeholderTextColor={theme.textTertiary}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {recentCurrencies.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, { color: theme.textTertiary }]}>
              RECENTLY USED
            </Text>
            <View style={styles.chipRow}>
              {recentCurrencies.map(currency => {
                const isActive = currency.code === selectedCode;
                return (
                  <Pressable
                    key={currency.code}
                    onPress={() => handleSelect(currency)}
                    style={[
                      styles.chip,
                      {
                        backgroundColor: isActive
                          ? theme.accent
                          : theme.surfaceMuted,
                      },
                    ]}>
                    <Text style={styles.chipFlag}>{currency.flag}</Text>
                    <Text
                      style={[
                        styles.chipCode,
                        {
                          color: isActive
                            ? theme.accentText
                            : theme.textPrimary,
                        },
                      ]}>
                      {currency.code}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        <Text style={[styles.sectionLabel, { color: theme.textTertiary }]}>
          ALL CURRENCIES
        </Text>
      </View>
    ),
    [
      theme,
      subtitle,
      onClose,
      query,
      recentCurrencies,
      selectedCode,
      handleSelect,
    ],
  );

  return (
    <AppBottomSheet visible={visible} onClose={onClose} snapPoints={['88%']}>
      <FlatList
        data={filtered}
        keyExtractor={item => item.code}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
  headerText: { flex: 1, paddingRight: spacing.md },
  title: {
    fontFamily: fonts.outfit.bold,
    fontSize: 22,
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: fonts.outfit.regular,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.button,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.outfit.regular,
    fontSize: 14,
    padding: 0,
  },
  sectionLabel: {
    fontFamily: fonts.outfit.bold,
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.chip,
  },
  chipFlag: { fontSize: 16 },
  chipCode: { fontFamily: fonts.outfit.semiBold, fontSize: 14 },
  list: { flex: 1 },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.chip + 4,
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  listFlag: { fontSize: 28 },
  listText: { flex: 1 },
  listCode: { fontFamily: fonts.outfit.semiBold, fontSize: 16 },
  listName: { fontFamily: fonts.outfit.regular, fontSize: 12, marginTop: 2 },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
