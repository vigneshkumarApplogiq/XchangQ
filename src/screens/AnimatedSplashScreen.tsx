import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appIcons } from '../assets/icons';
import { fonts } from '../theme/fonts';
import { colors, darkTheme, lightTheme, radius, spacing } from '../theme/tokens';

const SPLASH_DURATION_MS = 2200;
const FADE_OUT_MS = 450;

interface AnimatedSplashScreenProps {
  onFinish: () => void;
}

export function AnimatedSplashScreen({ onFinish }: AnimatedSplashScreenProps) {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const theme = scheme === 'light' ? lightTheme : darkTheme;

  const containerOpacity = useRef(new Animated.Value(1)).current;
  const logoScale = useRef(new Animated.Value(0.72)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0.6)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(14)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const versionOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const glowPulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.08,
            duration: 1400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: theme.mode === 'dark' ? 0.55 : 0.35,
            duration: 1400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 0.92,
            duration: 1400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: theme.mode === 'dark' ? 0.28 : 0.18,
            duration: 1400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );

    const entrance = Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 7,
          tension: 90,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: theme.mode === 'dark' ? 0.35 : 0.22,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 420,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.timing(progressWidth, {
        toValue: 1,
        duration: SPLASH_DURATION_MS - 900,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(versionOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]);

    glowPulse.start();
    entrance.start(({ finished }) => {
      if (!finished) return;

      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: FADE_OUT_MS,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished: fadeDone }) => {
        if (fadeDone) onFinish();
      });
    });

    return () => {
      glowPulse.stop();
      entrance.stop();
    };
  }, [
    containerOpacity,
    glowOpacity,
    glowScale,
    logoOpacity,
    logoScale,
    onFinish,
    progressWidth,
    taglineOpacity,
    theme.mode,
    titleOpacity,
    titleTranslateY,
    versionOpacity,
  ]);

  const progressInterpolated = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '72%'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          opacity: containerOpacity,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={styles.center}>
        <View style={styles.logoWrap}>
          <Animated.View
            style={[
              styles.glow,
              {
                backgroundColor: colors.teal,
                opacity: glowOpacity,
                transform: [{ scale: glowScale }],
              },
            ]}
          />
          <Animated.View
            style={{
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }}>
            <Image source={appIcons.xl} style={styles.logo} resizeMode="contain" />
          </Animated.View>
        </View>

        <Animated.View
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          }}>
          <Text style={styles.title}>
            <Text style={[styles.titleBase, { color: theme.textPrimary }]}>
              Xchange
            </Text>
            <Text style={[styles.titleAccent, { color: theme.accent }]}>Q</Text>
          </Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.tagline,
            { color: theme.textSecondary, opacity: taglineOpacity },
          ]}>
          Offline-first · Always accurate
        </Animated.Text>
      </View>

      <View style={[styles.footer, { paddingBottom: spacing.xl + insets.bottom }]}>
        <View
          style={[
            styles.progressTrack,
            { backgroundColor: theme.surfaceMuted },
          ]}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.accent,
                width: progressInterpolated,
              },
            ]}
          />
        </View>
        <Animated.Text
          style={[
            styles.version,
            { color: theme.textTertiary, opacity: versionOpacity },
          ]}>
          v1.2.0
        </Animated.Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoWrap: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: radius.card,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  titleBase: {
    fontFamily: fonts.outfit.bold,
    fontSize: 34,
    letterSpacing: -0.5,
  },
  titleAccent: {
    fontFamily: fonts.outfit.bold,
    fontSize: 34,
    letterSpacing: -0.5,
  },
  tagline: {
    fontFamily: fonts.outfit.regular,
    fontSize: 14,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: spacing.xxl,
    gap: spacing.md,
    alignItems: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: radius.full,
  },
  version: {
    fontFamily: fonts.jetbrains.regular,
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
