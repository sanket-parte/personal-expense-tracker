import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { HistoryScreen } from '../HistoryScreen';

// Rather than try to reconstruct FlashList rendering behavior and fight with Babel
// we simply mock it directly to the React Native built-in FlatList for tests
jest.mock('@shopify/flash-list', () => {
  const React = require('react');
  const { FlatList } = require('react-native');
  return {
    FlashList: (props: any) => {
      // Trigger getItemType for coverage if it exists
      if (props.getItemType && props.data) {
        props.data.forEach((item: any) => props.getItemType(item));
      }
      return <FlatList testID="flash-list" {...props} />;
    },
  };
});

const mockRefreshExpenses = jest.fn();

// Let's create an observable variable so we can change mock data across tests
const mockStoreState: any = {
  items: [
    { id: 1, amount: 50, title: 'Gym', date: new Date(), categoryId: 5 }, // Health
    { id: 2, amount: 15, title: 'Coffee', date: new Date(), categoryId: 1 }, // Food
  ],
  refreshExpenses: mockRefreshExpenses,
};

jest.mock('@/store/useExpenseStore', () => ({
  useExpenseStore: jest.fn((selector) => {
    // Re-hydrate dates since jest environment boundary might strip prototype methods
    // when accessing the simulated store state variables
    const hydratedState = {
      ...mockStoreState,
      items: mockStoreState.items.map((item: any) => ({
        ...item,
        date: new Date(item.date),
      })),
    };

    if (typeof selector === 'function') {
      return selector(hydratedState);
    }
    return hydratedState;
  }),
}));

describe('HistoryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStoreState.items = [
      { id: 1, amount: 50, title: 'Gym', date: new Date(), categoryId: 5 }, // Health
      { id: 2, amount: 15, title: 'Coffee', date: new Date(), categoryId: 1 }, // Food
    ];
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<HistoryScreen />);

    expect(getByText('History')).toBeTruthy();
    expect(getByPlaceholderText('Search...')).toBeTruthy();
    // 'Today' section header since items are mocked today
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('Gym')).toBeTruthy();
    expect(getByText('Coffee')).toBeTruthy();
  });

  it('filters by search text', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<HistoryScreen />);

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'Gym');

    expect(getByText('Gym')).toBeTruthy();
    expect(queryByText('Coffee')).toBeNull(); // Should be filtered out
  });

  it('filters by category chip', () => {
    const { getByText, queryByText } = render(<HistoryScreen />);

    // Press Food chip
    fireEvent.press(getByText(/Food/i));

    expect(getByText('Coffee')).toBeTruthy();
    expect(queryByText('Gym')).toBeNull(); // Health is filtered out

    // Press All to reset
    fireEvent.press(getByText('All'));
    expect(getByText('Coffee')).toBeTruthy();
    expect(getByText('Gym')).toBeTruthy();
  });

  it('renders empty state when no items match filters', () => {
    const { getByPlaceholderText, getByText } = render(<HistoryScreen />);

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'NonExistentItem123');

    expect(getByText('No matching results')).toBeTruthy();
    expect(getByText('Try adjusting your filters')).toBeTruthy();
  });

  it('handles pull to refresh', async () => {
    const { getByTestId } = render(<HistoryScreen />);
    const list = getByTestId('flash-list');

    // Simulate pull to refresh
    await act(async () => {
      list.props.refreshControl.props.onRefresh();
    });

    expect(mockRefreshExpenses).toHaveBeenCalled();
  });
});
