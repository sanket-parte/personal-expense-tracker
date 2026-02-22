import { useNavigation } from '@react-navigation/native';
import { renderHook } from '@testing-library/react-native';
import { useAppNavigation } from '../useAppNavigation';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('useAppNavigation', () => {
  it('returns exactly what useNavigation returns', () => {
    const mockNavigateObj = { navigate: jest.fn(), goBack: jest.fn() };
    (useNavigation as jest.Mock).mockReturnValue(mockNavigateObj);

    const { result } = renderHook(() => useAppNavigation());

    expect(result.current).toBe(mockNavigateObj);
    expect(useNavigation).toHaveBeenCalledTimes(1);
  });
});
