import type { AppTabParamList, RootStackParamList } from '@/types/navigation';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { type CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * Global navigation type combining both Root Stack and App Tabs.
 * This ensures strict typing across our entire navigation matrix.
 */
export type AppNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

/**
 * Strictly typed hook for accessing navigation throughout the application.
 * Replaces `useNavigation<any>()` to prevent TS warnings.
 */
export function useAppNavigation() {
  return useNavigation<AppNavigationProp>();
}
