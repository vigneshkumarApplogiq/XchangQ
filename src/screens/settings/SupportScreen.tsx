import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/Button';
import { fonts } from '../../theme/fonts';
import { spacing } from '../../theme/tokens';

export function SupportScreen() {
  const { theme } = useApp();

  const openEmail = () => {
    Linking.openURL(
      'mailto:gowtham.r.applogiq@gmail.com?subject=XchangeQ%20Support%20Request',
    );
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        Need help?
      </Text>
      <Text style={[styles.body, { color: theme.textSecondary }]}>
        If you are experiencing issues with exchange rates, offline mode, or
        watchlist pairs, try refreshing rates from Settings → Refresh Now.
      </Text>
      <Text style={[styles.body, { color: theme.textSecondary }]}>
        For further assistance, contact our support team by email.
      </Text>
      <Button label="Email Support" onPress={openEmail} />
      <View
        style={[
          styles.faq,
          { backgroundColor: theme.surfaceMuted, borderColor: theme.borderSubtle },
        ]}>
        <Text style={[styles.faqTitle, { color: theme.textPrimary }]}>
          Common questions
        </Text>
        <Text style={[styles.faqItem, { color: theme.textSecondary }]}>
          • Rates not updating? Check your internet connection and tap Sync.
        </Text>
        <Text style={[styles.faqItem, { color: theme.textSecondary }]}>
          • Offline mode uses the last cached rates automatically.
        </Text>
        <Text style={[styles.faqItem, { color: theme.textSecondary }]}>
          • Only Frankfurter-supported currencies have live rates.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md },
  title: {
    fontFamily: fonts.outfit.bold,
    fontSize: 22,
    marginBottom: spacing.sm,
  },
  body: {
    fontFamily: fonts.outfit.regular,
    fontSize: 15,
    lineHeight: 24,
  },
  faq: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    borderWidth: 1,
    gap: spacing.sm,
  },
  faqTitle: {
    fontFamily: fonts.outfit.semiBold,
    fontSize: 15,
    marginBottom: spacing.xs,
  },
  faqItem: {
    fontFamily: fonts.outfit.regular,
    fontSize: 14,
    lineHeight: 22,
  },
});
