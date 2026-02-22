import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={jest.fn()} placeholder="Test search..." />,
    );
    expect(getByPlaceholderText('Test search...')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(<SearchBar value="" onChangeText={mockOnChange} />);

    fireEvent.changeText(getByLabelText('Search input'), 'Netflix');
    expect(mockOnChange).toHaveBeenCalledWith('Netflix');
  });

  it('shows clear button when there is text and calls onChangeText with empty string', () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(<SearchBar value="Netflix" onChangeText={mockOnChange} />);

    const clearButton = getByLabelText('Clear search');
    expect(clearButton).toBeTruthy();

    fireEvent.press(clearButton);
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('hides clear button when input is empty', () => {
    const { queryByLabelText } = render(<SearchBar value="" onChangeText={jest.fn()} />);
    expect(queryByLabelText('Clear search')).toBeNull();
  });
});
