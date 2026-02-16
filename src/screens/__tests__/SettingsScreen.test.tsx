/**
 * SettingsScreen Tests
 *
 * Covers rendering, clear-data flow (success + error),
 * Pressable style branches, and theme switch.
 */

import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import { SettingsScreen } from '../SettingsScreen';

/** Shape of an Alert action button */
interface AlertButton {
  text: string;
  style?: string;
  onPress?: () => void | Promise<void>;
}

// Mock dependencies
const mockClearExpenses = jest.fn();
const mockIsLoading = false;
jest.mock('@/store/useExpenseStore', () => ({
  useExpenseStore: jest.fn(
    (selector: (state: { clearExpenses: jest.Mock; isLoading: boolean }) => unknown) =>
      selector({ clearExpenses: mockClearExpenses, isLoading: mockIsLoading }),
  ),
}));

jest.spyOn(Alert, 'alert');

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Dark Mode')).toBeTruthy();
  });

  it('handles clear data confirmation', () => {
    const { getByText } = render(<SettingsScreen />);
    fireEvent.press(getByText('Clear All Data'));
    expect(Alert.alert).toHaveBeenCalledWith(
      'Clear All Data',
      expect.any(String),
      expect.any(Array),
    );
  });

  it('executes delete on confirm', async () => {
    mockClearExpenses.mockResolvedValue(undefined);
    const { getByText } = render(<SettingsScreen />);
    fireEvent.press(getByText('Clear All Data'));

    // Simulate pressing "Delete" in Alert
    const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
    const deleteButton = alertCall[2].find((btn: AlertButton) => btn.text === 'Delete');

    await waitFor(async () => {
      await deleteButton.onPress?.();
    });

    expect(mockClearExpenses).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('Success', expect.any(String));
  });

  it('handles delete error', async () => {
    mockClearExpenses.mockRejectedValueOnce(new Error('Fail'));
    const { getByText } = render(<SettingsScreen />);
    fireEvent.press(getByText('Clear All Data'));

    const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
    const deleteButton = alertCall[2].find((btn: AlertButton) => btn.text === 'Delete');

    await waitFor(async () => {
      await deleteButton.onPress?.();
    });

    expect(Alert.alert).toHaveBeenCalledWith('Error', expect.any(String));
  });

  it('exercises Pressable style function for both pressed states', () => {
    const { getByTestId } = render(<SettingsScreen />);
    const button = getByTestId('clear-data-button');

    const styleProp = button.props.style;
    if (typeof styleProp === 'function') {
      // Cover both branches of the pressed ternary
      const pressed = styleProp({ pressed: true });
      const unpressed = styleProp({ pressed: false });
      expect(pressed).toBeDefined();
      expect(unpressed).toBeDefined();
    }
  });

  it('toggles theme switch', () => {
    const { getByRole } = render(<SettingsScreen />);
    const switchElement = getByRole('switch');
    fireEvent(switchElement, 'valueChange', true);
    expect(Alert.alert).toHaveBeenCalledWith('Info', expect.any(String));
  });
});
