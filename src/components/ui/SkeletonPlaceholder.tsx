/**
 * SkeletonPlaceholder Component
 *
 * Animated pulse placeholder for loading states. Uses the built-in
 * Animated API with native driver for 60fps performance.
 */

import { APP_CONFIG } from '@/constants/config';
import { BorderRadius } from '@/constants/theme';
import { useAppTheme } from '@/hooks';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

interface SkeletonPlaceholderProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function SkeletonPlaceholder({
  width = '100%',
  height = 20,
  borderRadius = BorderRadius.sm,
  style,
}: SkeletonPlaceholderProps): React.JSX.Element {
  const { colors } = useAppTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: APP_CONFIG.animation.slow,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: APP_CONFIG.animation.slow,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.surfaceVariant,
          opacity,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    marginBottom: 12,
  },
});
