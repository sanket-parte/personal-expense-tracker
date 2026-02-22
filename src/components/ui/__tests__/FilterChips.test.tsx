import { CATEGORIES } from '@/constants/categories';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { FilterChips } from '../FilterChips';

describe('FilterChips', () => {
  it('renders correctly with "All" selected by default', () => {
    const { getByText } = render(
      <FilterChips activeCategoryId={null} onSelectCategory={jest.fn()} />,
    );
    expect(getByText('All')).toBeTruthy();
    expect(getByText(`${CATEGORIES[0].icon} ${CATEGORIES[0].name}`)).toBeTruthy();
  });

  it('calls onSelectCategory when a category is pressed', () => {
    const mockOnSelect = jest.fn();
    const { getByText } = render(
      <FilterChips activeCategoryId={null} onSelectCategory={mockOnSelect} />,
    );

    const firstCategory = CATEGORIES[0];
    fireEvent.press(getByText(`${firstCategory.icon} ${firstCategory.name}`));

    expect(mockOnSelect).toHaveBeenCalledWith(firstCategory.id);
  });

  it('calls onSelectCategory with null when "All" is pressed', () => {
    const mockOnSelect = jest.fn();
    const { getByText } = render(
      <FilterChips activeCategoryId={CATEGORIES[0].id} onSelectCategory={mockOnSelect} />,
    );

    fireEvent.press(getByText('All'));
    expect(mockOnSelect).toHaveBeenCalledWith(null);
  });
});
