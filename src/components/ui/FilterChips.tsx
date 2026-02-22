/**
 * FilterChips Component
 *
 * A horizontally scrollable list of category filters.
 * Integrates directly with the CATEGORIES constant.
 */

import { CATEGORIES } from '@/constants/categories';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { AnimatedPressable } from './AnimatedPressable';

interface FilterChipsProps {
  activeCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
}

export function FilterChips({
  activeCategoryId,
  onSelectCategory,
}: FilterChipsProps): React.JSX.Element {
  const { colors } = useAppTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <AnimatedPressable
        scaleValue={0.93}
        style={[
          styles.chip,
          { backgroundColor: activeCategoryId === null ? colors.primary : colors.surface },
        ]}
        onPress={() => onSelectCategory(null)}
      >
        <Text
          style={[
            styles.chipText,
            { color: activeCategoryId === null ? colors.onPrimary : colors.text },
          ]}
        >
          All
        </Text>
      </AnimatedPressable>

      {CATEGORIES.map((cat) => {
        const isActive = activeCategoryId === cat.id;
        return (
          <AnimatedPressable
            key={cat.id}
            scaleValue={0.93}
            style={[styles.chip, { backgroundColor: isActive ? cat.color : colors.surface }]}
            onPress={() => onSelectCategory(cat.id)}
          >
            <Text style={[styles.chipText, { color: isActive ? colors.onPrimary : colors.text }]}>
              {cat.icon} {cat.name}
            </Text>
          </AnimatedPressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
});
