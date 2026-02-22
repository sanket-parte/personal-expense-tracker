/**
 * SearchBar Component
 *
 * A themed text input with a magnifying glass icon and clear button,
 * specifically built for filtering lists of data locally.
 */

import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search...',
}: SearchBarProps): React.JSX.Element {
  const { colors } = useAppTheme();
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceVariant }]}>
      <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        ref={inputRef}
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        accessibilityLabel="Search input"
      />
      {value.length > 0 ? (
        <Pressable
          style={styles.clearButton}
          onPress={() => {
            onChangeText('');
            inputRef.current?.blur();
          }}
          accessibilityLabel="Clear search"
        >
          <Ionicons name="close-circle" size={20} color={colors.textTertiary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    height: 44,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    height: '100%',
  },
  clearButton: {
    padding: Spacing.xs,
  },
});
