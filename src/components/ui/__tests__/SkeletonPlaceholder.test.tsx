import { render } from '@testing-library/react-native';
import React from 'react';
import { SkeletonPlaceholder } from '../SkeletonPlaceholder';

describe('SkeletonPlaceholder', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(<SkeletonPlaceholder />);
    const animatedView = getByTestId('skeleton-placeholder');

    expect(animatedView).toBeTruthy();
    expect(animatedView.props.style).toEqual(
      expect.objectContaining({
        width: '100%',
        height: 20,
      }),
    );
  });

  it('renders with custom props and style', () => {
    const { getByTestId } = render(
      <SkeletonPlaceholder width={50} height={10} borderRadius={16} style={{ marginTop: 10 }} />,
    );
    const animatedView = getByTestId('skeleton-placeholder');

    expect(animatedView).toBeTruthy();
    expect(animatedView.props.style).toEqual(
      expect.objectContaining({
        width: 50,
        height: 10,
        borderRadius: 16,
        marginTop: 10,
      }),
    );
  });
});
