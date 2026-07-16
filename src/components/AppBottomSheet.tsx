import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { radius } from '../theme/tokens';

type AppBottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
};

function parseSnapHeight(snapPoints: string[], screenHeight: number): number {
  const snap = snapPoints[0] ?? '85%';
  if (snap.endsWith('%')) {
    return screenHeight * (parseFloat(snap) / 100);
  }
  return parseFloat(snap);
}

export function AppBottomSheet({
  visible,
  onClose,
  children,
  snapPoints = ['85%'],
  enablePanDownToClose = true,
}: AppBottomSheetProps) {
  const { theme } = useApp();
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;
  const sheetHeight = useMemo(
    () => parseSnapHeight(snapPoints, screenHeight),
    [snapPoints, screenHeight],
  );

  const [mounted, setMounted] = useState(visible);
  const translateY = useRef(new Animated.Value(sheetHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const openSheet = () => {
    translateY.setValue(sheetHeight);
    backdropOpacity.setValue(0);
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        damping: 28,
        stiffness: 320,
        mass: 0.9,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.55,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = (onComplete?: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: sheetHeight,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => onComplete?.());
  };

  useEffect(() => {
    if (visible) {
      setMounted(true);
      requestAnimationFrame(openSheet);
      return;
    }

    if (mounted) {
      closeSheet(() => setMounted(false));
    }
  }, [visible, sheetHeight, mounted]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        enablePanDownToClose && gesture.dy > 4,
      onPanResponderMove: (_, gesture) => {
        if (!enablePanDownToClose) return;
        const nextY = Math.max(0, gesture.dy);
        translateY.setValue(nextY);
        const progress = Math.min(1, nextY / (sheetHeight * 0.45));
        backdropOpacity.setValue(0.55 * (1 - progress));
      },
      onPanResponderRelease: (_, gesture) => {
        if (!enablePanDownToClose) return;
        const shouldClose =
          gesture.dy > sheetHeight * 0.2 || gesture.vy > 1.2;
        if (shouldClose) {
          onClose();
          return;
        }
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            damping: 24,
            stiffness: 320,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0.55,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      },
    }),
  ).current;

  if (!mounted) return null;

  return (
    <Modal
      transparent
      visible={mounted}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              height: sheetHeight,
              paddingBottom: Math.max(insets.bottom, 16),
              backgroundColor: theme.surface,
              transform: [{ translateY }],
            },
          ]}>
          <View
            style={styles.handleArea}
            {...(enablePanDownToClose ? panResponder.panHandlers : undefined)}>
            <View
              style={[styles.handle, { backgroundColor: theme.textTertiary }]}
            />
          </View>
          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000',
  },
  sheet: {
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    overflow: 'hidden',
  },
  handleArea: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
