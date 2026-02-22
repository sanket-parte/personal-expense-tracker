import { render } from '@testing-library/react-native';
import React from 'react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const indicator = getByTestId('loading-spinner');

    expect(indicator.props.size).toBe('large');
    // Using default theme primary color
    expect(indicator.props.color).toBe('#6366F1');
  });

  it('renders with custom props', () => {
    const { getByTestId } = render(<LoadingSpinner size="small" color="#FF0000" />);
    const indicator = getByTestId('loading-spinner');

    expect(indicator.props.size).toBe('small');
    expect(indicator.props.color).toBe('#FF0000');
  });
});
