import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { ConvertScreen } from '../screens/ConvertScreen';
import { WatchlistScreen } from '../screens/WatchlistScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { DefaultCurrencyScreen } from '../screens/settings/DefaultCurrencyScreen';
import { RefreshIntervalScreen } from '../screens/settings/RefreshIntervalScreen';
import { AboutScreen } from '../screens/settings/AboutScreen';
import { PrivacyPolicyScreen } from '../screens/settings/PrivacyPolicyScreen';
import { TermsScreen } from '../screens/settings/TermsScreen';
import { FeedbackScreen } from '../screens/settings/FeedbackScreen';
import { SupportScreen } from '../screens/settings/SupportScreen';
import {
  ConvertTabIcon,
  SettingsIcon,
  StarIcon,
} from '../components/icons/Icons';
import type { MainTabParamList, SettingsStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function SettingsNavigator() {
  const { theme } = useApp();

  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.textPrimary,
        headerTitleStyle: { fontWeight: '700' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}>
      <SettingsStack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="DefaultCurrency"
        component={DefaultCurrencyScreen}
        options={{ title: 'Default Currency' }}
      />
      <SettingsStack.Screen
        name="RefreshInterval"
        component={RefreshIntervalScreen}
        options={{ title: 'Refresh Interval' }}
      />
      <SettingsStack.Screen
        name="About"
        component={AboutScreen}
        options={{ title: 'About' }}
      />
      <SettingsStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: 'Privacy Policy' }}
      />
      <SettingsStack.Screen
        name="Terms"
        component={TermsScreen}
        options={{ title: 'Terms & Conditions' }}
      />
      <SettingsStack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{ title: 'Feedback' }}
      />
      <SettingsStack.Screen
        name="Support"
        component={SupportScreen}
        options={{ title: 'Support' }}
      />
    </SettingsStack.Navigator>
  );
}

function MainTabs() {
  const { theme } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.borderSubtle,
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="Convert"
        component={ConvertScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ConvertTabIcon size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <StarIcon size={22} color={color} filled={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <SettingsIcon size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { theme } = useApp();

  const navTheme = theme.mode === 'dark'
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: theme.background,
          card: theme.surface,
          text: theme.textPrimary,
          border: theme.border,
          primary: theme.accent,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.background,
          card: theme.surface,
          text: theme.textPrimary,
          border: theme.border,
          primary: theme.accent,
        },
      };

  return (
    <NavigationContainer theme={navTheme}>
      <MainTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});
