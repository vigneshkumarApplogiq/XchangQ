import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { radius, spacing, typography } from '../theme/tokens';
import { useApp } from '../context/AppContext';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'disabled' | 'ghost';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  icon,
  disabled,
}: ButtonProps) {
  const { theme } = useApp();
  const isDisabled = disabled || variant === 'disabled';

  const variantStyles: Record<ButtonVariant, { bg: string; text: string; border?: string }> = {
    primary: { bg: theme.accent, text: theme.accentText },
    secondary: {
      bg: theme.surfaceMuted,
      text: theme.textPrimary,
      border: theme.border,
    },
    danger: { bg: theme.errorMuted, text: theme.error },
    disabled: { bg: theme.surfaceMuted, text: theme.textTertiary },
    ghost: { bg: 'transparent', text: theme.accent },
  };

  const v = isDisabled ? variantStyles.disabled : variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border ?? 'transparent',
          borderWidth: v.border ? 1 : 0,
          opacity: pressed && !isDisabled ? 0.85 : 1,
        },
        style,
      ]}>
      {icon}
      <Text style={[styles.label, { color: v.text }, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.button,
  },
  label: {
    ...typography.bodySemiBold,
    fontSize: 15,
  },
});
