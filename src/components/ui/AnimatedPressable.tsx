/**
 * AnimatedPressable Component
 *
 * Pressable with spring scale-down feedback on press.
 * Provides tactile micro-interaction for interactive elements.
 */

import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';

import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

interface AnimatedPressableProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  scaleValue?: number;
  style?: StyleProp<ViewStyle>;
}

export function AnimatedPressable({
  children,
  scaleValue = 0.95,
  style,
  onPressIn,
  onPressOut,
  ...rest
}: AnimatedPressableProps): React.JSX.Element {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (event: Parameters<NonNullable<PressableProps['onPressIn']>>[0]) => {
    Animated.spring(scale, {
      toValue: scaleValue,
      useNativeDriver: true,
    }).start();
    onPressIn?.(event);
  };

  const handlePressOut = (event: Parameters<NonNullable<PressableProps['onPressOut']>>[0]) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPressOut?.(event);
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...rest}>
        {children}
      </Pressable>
    </Animated.View>
  );
}
