/**
 * Input Component
 *
 * Themed TextInput wrapper with label, error state, and helper text support.
 * Provides consistent styling and accessibility across all forms.
 */

import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import React, { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import type { TextInputProps } from 'react-native';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  testID?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, helperText, ...rest }, ref) => {
    const { colors } = useAppTheme();
    const borderColor = error ? colors.error : colors.border;

    return (
      <View style={styles.container}>
        {label ? (
          <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        ) : null}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor,
            },
          ]}
          placeholderTextColor={colors.textTertiary}
          accessibilityLabel={label}
          testID={rest.testID}
          {...rest}
        />
        {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
        {helperText && !error ? (
          <Text style={[styles.helperText, { color: colors.textTertiary }]}>{helperText}</Text>
        ) : null}
      </View>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.xl,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  input: {
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    fontSize: Typography.fontSize.md,
    borderWidth: 1,
  },
  errorText: {
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
  helperText: {
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
    marginLeft: Spacing.xs,
  },
});
