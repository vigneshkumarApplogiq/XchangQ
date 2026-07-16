import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { radius, spacing, typography } from '../theme/tokens';
import { useApp } from '../context/AppContext';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Toggle({ value, onValueChange }: ToggleProps) {
  const { theme } = useApp();
  const translateX = React.useRef(new Animated.Value(value ? 20 : 2)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 20 : 2,
      useNativeDriver: true,
      friction: 8,
    }).start();
  }, [value, translateX]);

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <View
        style={[
          styles.track,
          { backgroundColor: value ? theme.accent : theme.surfaceMuted },
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              backgroundColor:
                theme.mode === 'dark' ? theme.textPrimary : '#FFFFFF',
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </Pressable>
  );
}

interface SettingsRowProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
  showBorder?: boolean;
}

export function SettingsRow({
  title,
  subtitle,
  right,
  onPress,
  danger,
  showBorder = true,
}: SettingsRowProps) {
  const { theme } = useApp();

  const content = (
    <View
      style={[
        styles.row,
        showBorder && {
          borderBottomColor: theme.borderSubtle,
          borderBottomWidth: 1,
        },
      ]}>
      <View style={styles.textCol}>
        <Text
          style={[
            styles.title,
            { color: danger ? theme.error : theme.textPrimary },
          ]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {right}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
        {content}
      </Pressable>
    );
  }

  return content;
}

export function SettingsCard({ children }: { children: React.ReactNode }) {
  const { theme } = useApp();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.borderSubtle },
        theme.cardShadow,
      ]}>
      {children}
    </View>
  );
}

export function SectionLabel({ label }: { label: string }) {
  const { theme } = useApp();

  return (
    <Text style={[sectionStyles.label, { color: theme.textTertiary }]}>
      {label}
    </Text>
  );
}

const sectionStyles = StyleSheet.create({
  label: {
    ...typography.micro,
    marginBottom: spacing.sm,
    marginTop: spacing.xl,
    marginLeft: spacing.xs,
  },
});

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: radius.full,
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  textCol: {
    flex: 1,
    gap: 3,
    marginRight: spacing.md,
  },
  title: {
    ...typography.bodySemiBold,
  },
  subtitle: {
    ...typography.caption,
  },
  card: {
    borderRadius: radius.card,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
