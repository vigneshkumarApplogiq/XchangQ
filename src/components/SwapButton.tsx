import React from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { radius, spacing } from '../theme/tokens';
import { useApp } from '../context/AppContext';
import { SwapIcon } from './icons/Icons';

interface SwapButtonProps {
  onPress: () => void;
}

export function SwapButton({ onPress }: SwapButtonProps) {
  const { theme } = useApp();
  const rotation = React.useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(rotation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={handlePress}>
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: theme.accent,
              shadowColor: theme.accent,
              transform: [{ rotate }],
            },
          ]}>
          <SwapIcon size={22} color={theme.accentText} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginVertical: -spacing.lg,
    zIndex: 10,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
});
