import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders default primary accurately', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Primary" onPress={onPress} />);

    expect(getByText('Primary')).toBeTruthy();
    fireEvent.press(getByText('Primary'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders secondary variant', () => {
    const { getByText } = render(
      <Button title="Secondary" variant="secondary" onPress={() => {}} />,
    );
    expect(getByText('Secondary')).toBeTruthy();
  });

  it('renders destructive variant', () => {
    const { getByText } = render(
      <Button title="Destructive" variant="destructive" onPress={() => {}} />,
    );
    expect(getByText('Destructive')).toBeTruthy();
  });

  it('renders ghost variant', () => {
    const { getByText } = render(<Button title="Ghost" variant="ghost" onPress={() => {}} />);
    expect(getByText('Ghost')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button title="Disabled" disabled onPress={onPress} />);
    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('handles loading state', () => {
    const onPress = jest.fn();
    const { getByRole, queryByText } = render(
      <Button title="Loading" isLoading onPress={onPress} />,
    );

    // Text is hidden when loading
    expect(queryByText('Loading')).toBeNull();

    // Loading indicator is shown and button is disabled
    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies custom accessibility labels', () => {
    const { getByLabelText } = render(
      <Button
        title="Settings"
        accessibilityLabel="Go to Settings"
        accessibilityHint="Navigates to the settings screen"
        onPress={() => {}}
      />,
    );

    expect(getByLabelText('Go to Settings')).toBeTruthy();
  });
});
