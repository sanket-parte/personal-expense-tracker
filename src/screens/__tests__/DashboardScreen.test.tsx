import { render } from '@testing-library/react-native';
import React from 'react';
import { DashboardScreen } from '../DashboardScreen';

describe('DashboardScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<DashboardScreen />);
    expect(getByText('Dashboard Screen')).toBeTruthy();
  });
});
