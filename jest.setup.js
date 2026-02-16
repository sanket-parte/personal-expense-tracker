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
    })),
}));
