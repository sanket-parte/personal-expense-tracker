/**
 * FadeInView Component
 *
 * Reusable wrapper that fades in and slides up its children on mount.
 * Uses built-in Animated API with native driver for smooth performance.
 */

import { APP_CONFIG } from '@/constants/config';
import { Spacing } from '@/constants/theme';
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import type { StyleProp, ViewStyle } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  slideDistance?: number;
  style?: StyleProp<ViewStyle>;
}

export function FadeInView({
  children,
  delay = 0,
  duration = APP_CONFIG.animation.normal,
  slideDistance = Spacing.lg,
  style,
}: FadeInViewProps): React.JSX.Element {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(slideDistance)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => animation.stop();
  }, [opacity, translateY, duration, delay]);

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
