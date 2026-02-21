/**
 * Button Component
 *
 * Reusable button with variant support (primary, secondary, destructive, ghost)
 * and loading state. Uses theme tokens exclusively.
 */

import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import type { ThemeColors } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

function getBackgroundColor(variant: ButtonVariant, colors: ThemeColors): string {
  switch (variant) {
    case 'primary':
      return colors.primary;
    case 'secondary':
      return colors.surface;
    case 'destructive':
      return colors.error;
    case 'ghost':
      return 'transparent';
  }
}

function getTextColor(variant: ButtonVariant, colors: ThemeColors): string {
  switch (variant) {
    case 'primary':
      return colors.onPrimary;
    case 'secondary':
      return colors.text;
    case 'destructive':
      return colors.onPrimary;
    case 'ghost':
      return colors.primary;
  }
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: ButtonProps): React.JSX.Element {
  const { colors } = useAppTheme();
  const isDisabled = disabled || isLoading;
  const bgColor = getBackgroundColor(variant, colors);
  const textColor = getTextColor(variant, colors);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: bgColor,
          opacity: isDisabled ? 0.6 : pressed ? 0.85 : 1,
        },
        variant === 'secondary' && { borderWidth: 1, borderColor: colors.border },
      ]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled }}
      testID={testID}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
  },
});
