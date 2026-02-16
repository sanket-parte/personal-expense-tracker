/**
 * Application Root
 *
 * Main App component that wraps the entire application with
 * necessary providers and top-level configuration.
 */

import { RootNavigator } from '@/navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
