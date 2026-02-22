/* eslint-env jest */

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => 'StatusBar',
}));

// Mock window.dispatchEvent (Fixes React Native Web / Jest issue)
if (typeof window !== 'undefined' && !window.dispatchEvent) {
  window.dispatchEvent = jest.fn();
}

// Mock safe-area-context
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// Mock react-native-screens
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

// Mock @expo/vector-icons to prevent FontLoader issues
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View } = require('react-native');
  const MockIcon = (props) => {
    return <View {...props} testID="mock-icon" />;
  };
  return {
    Ionicons: MockIcon,
    MaterialCommunityIcons: MockIcon,
    AntDesign: MockIcon,
    FontAwesome: MockIcon,
  };
});

// Mock @shopify/flash-list
jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const { FlatList } = require('react-native');
  return {
    FlashList: React.forwardRef((props, ref) => <FlatList {...props} ref={ref} />),
  };
});

// Mock expo-image-picker
jest.mock('expo-image-picker', () => ({
  requestCameraPermissionsAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: {
    Images: 'images',
    Videos: 'videos',
    All: 'all',
  },
}));

/**
 * MOCK: expo-sqlite
 * We mock this to avoid native code execution.
 */
jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(() => ({
    execSync: jest.fn(),
    execAsync: jest.fn(),
  })),
}));

/**
 * MOCK: drizzle-orm
 * We need to mock 'drizzle-orm/expo-sqlite' and 'drizzle-orm'.
 */
jest.mock('drizzle-orm/expo-sqlite', () => ({
  drizzle: jest.fn(() => ({
    // Mock db.query.expenses.findMany
    query: {
      expenses: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
      },
    },
    // Mock db.insert(expenses).values()
    insert: jest.fn(() => ({
      values: jest.fn(() => ({
        returning: jest.fn(),
        // Add run/execute if needed
      })),
    })),
    // Mock db.update().set().where()
    update: jest.fn(() => ({
      set: jest.fn(() => ({
        where: jest.fn(),
      })),
    })),
    // Mock db.delete().where()
    delete: jest.fn(() => ({
      where: jest.fn(),
    })),
  })),
}));

// Mock Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      replace: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Mock Native Stack
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: ({ children }) => <>{children}</>,
    Screen: ({ children }) => <>{children}</>,
    Group: ({ children }) => <>{children}</>,
  })),
}));
