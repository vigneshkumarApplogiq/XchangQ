import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useApp } from '../../context/AppContext';
import { useRates } from '../../context/RatesContext';
import { ChevronRightIcon, SyncIcon } from '../../components/icons/Icons';
import {
  SectionLabel,
  SettingsCard,
  SettingsRow,
  Toggle,
} from '../../components/SettingsComponents';
import { ScreenHeader } from '../../components/ScreenLayout';
import { Button } from '../../components/Button';
import { spacing } from '../../theme/tokens';
import type { SettingsStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<SettingsStackParamList, 'SettingsMain'>;

export function SettingsScreen() {
  const navigation = useNavigation<Nav>();
  const { theme, settings, toggleTheme, setAutoRefresh, refreshIntervalLabel } =
    useApp();
  const { lastSyncedLabel, refresh, isRefreshing, clearCache } = useRates();
  const isDark = settings.themeMode === 'dark';

  const handleClearCache = async () => {
    await clearCache();
    await refresh();
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Settings" />

      <SectionLabel label="APPEARANCE" />
      <SettingsCard>
        <SettingsRow
          title="Dark Mode"
          subtitle={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          right={<Toggle value={isDark} onValueChange={() => toggleTheme()} />}
        />
        <SettingsRow
          title="Default Currency"
          subtitle="Used as base for new conversions"
          onPress={() => navigation.navigate('DefaultCurrency')}
          right={
            <View style={styles.rightRow}>
              <Text style={[styles.rightValue, { color: theme.textSecondary }]}>
                {settings.defaultCurrency}
              </Text>
              <ChevronRightIcon color={theme.textTertiary} />
            </View>
          }
          showBorder={false}
        />
      </SettingsCard>

      <SectionLabel label="DATA & SYNC" />
      <SettingsCard>
        <SettingsRow
          title="Auto-refresh Rates"
          subtitle="Fetch latest rates automatically"
          right={
            <Toggle
              value={settings.autoRefresh}
              onValueChange={setAutoRefresh}
            />
          }
        />
        <SettingsRow
          title="Refresh Interval"
          subtitle="How often to sync exchange rates"
          onPress={() => navigation.navigate('RefreshInterval')}
          right={
            <View style={styles.rightRow}>
              <Text style={[styles.rightValue, { color: theme.textSecondary }]}>
                {refreshIntervalLabel}
              </Text>
              <ChevronRightIcon color={theme.textTertiary} />
            </View>
          }
        />
        <SettingsRow
          title="Refresh Now"
          subtitle={`Last synced: ${lastSyncedLabel}`}
          right={
            <Button
              label={isRefreshing ? 'Syncing…' : 'Sync'}
              variant="ghost"
              disabled={isRefreshing}
              icon={<SyncIcon color={theme.accent} />}
              onPress={refresh}
              style={styles.syncBtn}
              textStyle={{ color: theme.accent, fontSize: 13 }}
            />
          }
        />
        <Pressable onPress={handleClearCache}>
          <SettingsRow
            title="Clear Cache"
            subtitle="Delete all locally stored rate data"
            danger
            showBorder={false}
          />
        </Pressable>
      </SettingsCard>

      <SectionLabel label="SUPPORT" />
      <SettingsCard>
        <SettingsRow
          title="About"
          subtitle="App version and information"
          onPress={() => navigation.navigate('About')}
          right={<ChevronRightIcon color={theme.textTertiary} />}
        />
        <SettingsRow
          title="Privacy Policy"
          subtitle="How we handle your data"
          onPress={() => navigation.navigate('PrivacyPolicy')}
          right={<ChevronRightIcon color={theme.textTertiary} />}
        />
        <SettingsRow
          title="Terms & Conditions"
          subtitle="Terms of use for XchangeQ"
          onPress={() => navigation.navigate('Terms')}
          right={<ChevronRightIcon color={theme.textTertiary} />}
        />
        <SettingsRow
          title="Feedback"
          subtitle="Share your thoughts with us"
          onPress={() => navigation.navigate('Feedback')}
          right={<ChevronRightIcon color={theme.textTertiary} />}
        />
        <SettingsRow
          title="Support"
          subtitle="Get help with the app"
          onPress={() => navigation.navigate('Support')}
          showBorder={false}
          right={<ChevronRightIcon color={theme.textTertiary} />}
        />
      </SettingsCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rightValue: { fontSize: 14 },
  syncBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.4)',
    borderRadius: 10,
  },
});
