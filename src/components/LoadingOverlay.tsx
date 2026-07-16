import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useApp } from '../context/AppContext';

export function LoadingOverlay({ visible }: { visible: boolean }) {
  const { theme } = useApp();
  if (!visible) return null;

  return (
    <View style={[styles.overlay, { backgroundColor: theme.background + 'CC' }]}>
      <ActivityIndicator size="large" color={theme.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
});
