import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { appIcons } from '../../assets/icons';
import { useApp } from '../../context/AppContext';
import { fonts } from '../../theme/fonts';
import { spacing } from '../../theme/tokens';

export function AboutScreen() {
  const { theme } = useApp();

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}>
      <Image source={appIcons.xl} style={styles.logo} />
      <Text style={[styles.name, { color: theme.textPrimary }]}>
        Xchange<Text style={{ color: theme.accent }}>Q</Text>
      </Text>
      <Text style={[styles.version, { color: theme.textTertiary }]}>v1.2.0</Text>
      <Text style={[styles.body, { color: theme.textSecondary }]}>
        XchangeQ is an offline-first currency converter that fetches live
        mid-market exchange rates from the Frankfurter API and caches them
        locally so you can convert currencies even without a connection.
      </Text>
      <Text style={[styles.body, { color: theme.textSecondary }]}>
        Rates are provided for informational purposes only and may differ from
        rates offered by banks or payment providers.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  logo: { width: 88, height: 88, borderRadius: 20, marginBottom: spacing.lg },
  name: {
    fontFamily: fonts.outfit.bold,
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  version: {
    fontFamily: fonts.jetbrains.regular,
    fontSize: 13,
    marginBottom: spacing.xl,
  },
  body: {
    fontFamily: fonts.outfit.regular,
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
