import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import { AutoRefreshManager } from './src/context/AutoRefreshManager';
import { RatesProvider } from './src/context/RatesContext';
import { WatchlistProvider } from './src/context/WatchlistContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AnimatedSplashScreen } from './src/screens/AnimatedSplashScreen';

function AppContent() {
  const { theme } = useApp();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    RNBootSplash.hide({ fade: false });
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <RootNavigator />
      <AutoRefreshManager />
      {showSplash && (
        <AnimatedSplashScreen onFinish={() => setShowSplash(false)} />
      )}
    </GestureHandlerRootView>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <RatesProvider>
          <WatchlistProvider>
            <AppContent />
          </WatchlistProvider>
        </RatesProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
