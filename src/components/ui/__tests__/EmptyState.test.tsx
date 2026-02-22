import { render } from '@testing-library/react-native';
import React from 'react';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders correctly with only title', () => {
    const { getByText, queryByText } = render(<EmptyState title="No Expenses" />);

    expect(getByText('No Expenses')).toBeTruthy();
    expect(queryByText('🔍')).toBeNull(); // No icon by default when not passed
  });

  it('renders correctly with all props', () => {
    const { getByText } = render(
      <EmptyState title="No Expenses" subtitle="Add some to get started" icon="🔍" />,
    );

    expect(getByText('No Expenses')).toBeTruthy();
    expect(getByText('Add some to get started')).toBeTruthy();
    expect(getByText('🔍')).toBeTruthy();
  });
});
