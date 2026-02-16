import { renderHook } from '@testing-library/react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/theme';
import { useAppTheme } from '../useAppTheme';

// Mock react-native useColorScheme
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  default: jest.fn(),
}));

describe('useAppTheme', () => {
  it('should return light theme by default or when system is light', () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const { result } = renderHook(() => useAppTheme());

    expect(result.current.isDark).toBe(false);
    expect(result.current.colorScheme).toBe('light');
    expect(result.current.colors).toEqual(Colors.light);
  });

  it('should return dark theme when system is dark', () => {
    (useColorScheme as jest.Mock).mockReturnValue('dark');
    const { result } = renderHook(() => useAppTheme());

    expect(result.current.isDark).toBe(true);
    expect(result.current.colorScheme).toBe('dark');
    expect(result.current.colors).toEqual(Colors.dark);
  });
});
