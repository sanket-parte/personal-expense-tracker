import { fireEvent, render } from '@testing-library/react-native';
import React, { createRef } from 'react';
import type { TextInput } from 'react-native';
import { Input } from '../Input';

describe('Input', () => {
  it('renders correctly with default props', () => {
    const { getByPlaceholderText, queryByText } = render(<Input placeholder="Enter value" />);

    expect(getByPlaceholderText('Enter value')).toBeTruthy();
    // Label, error, and helperText should not be rendered
    expect(queryByText(/label/i)).toBeNull();
  });

  it('renders label when provided', () => {
    const { getByText, getByLabelText } = render(
      <Input label="Email Address" placeholder="test@example.com" />,
    );

    expect(getByText('Email Address')).toBeTruthy();
    expect(getByLabelText('Email Address')).toBeTruthy();
  });

  it('renders error message and overrides helper text', () => {
    const { getByText, queryByText } = render(
      <Input error="Invalid email" helperText="Enter a valid email address" />,
    );

    expect(getByText('Invalid email')).toBeTruthy();
    // Helper text shouldn't show if there's an error
    expect(queryByText('Enter a valid email address')).toBeNull();
  });

  it('renders helper text when no error is present', () => {
    const { getByText } = render(<Input helperText="Enter your preferred email" />);

    expect(getByText('Enter your preferred email')).toBeTruthy();
  });

  it('forwards ref to TextInput', () => {
    const ref = createRef<TextInput>();
    const { getByPlaceholderText } = render(<Input ref={ref} placeholder="Forward Ref Test" />);

    expect(ref.current).toBeTruthy();

    // Test that the ref is indeed attached to the input and can be interacted with
    fireEvent.changeText(getByPlaceholderText('Forward Ref Test'), 'testing');
    expect(ref.current?.props.value).toBeUndefined(); // value is an uncontrolled prop here but ref is working
  });
});
