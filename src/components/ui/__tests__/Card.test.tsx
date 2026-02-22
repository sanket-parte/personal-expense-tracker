import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Card, CardBody, CardHeader } from '../Card';

describe('Card', () => {
  it('renders correctly with default variant', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>
          <Text>Header Content</Text>
        </CardHeader>
        <CardBody>
          <Text>Body Content</Text>
        </CardBody>
      </Card>,
    );

    expect(getByText('Header Content')).toBeTruthy();
    expect(getByText('Body Content')).toBeTruthy();
  });

  it('renders correctly with outlined variant', () => {
    // Tests the outlined prop which branches style properties
    const { getByText } = render(
      <Card variant="outlined">
        <Text>Outlined Card</Text>
      </Card>,
    );

    expect(getByText('Outlined Card')).toBeTruthy();
  });
});
