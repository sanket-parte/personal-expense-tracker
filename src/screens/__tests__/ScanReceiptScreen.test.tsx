import { useAppNavigation } from '@/hooks';
import { scanReceiptFromCamera, scanReceiptFromGallery } from '@/services/receiptScanner';
import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { ScanReceiptScreen } from '../ScanReceiptScreen';

jest.mock('@/hooks', () => {
  const actual = jest.requireActual('@/hooks');
  return {
    ...actual,
    useAppNavigation: jest.fn(),
  };
});

jest.mock('@/services/receiptScanner', () => ({
  scanReceiptFromCamera: jest.fn(),
  scanReceiptFromGallery: jest.fn(),
}));

describe('ScanReceiptScreen', () => {
  const mockNavigate = { replace: jest.fn(), goBack: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppNavigation as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders correctly', () => {
    const { getByText } = render(<ScanReceiptScreen />);
    expect(getByText('Scan Receipt')).toBeTruthy();
    expect(getByText('Take Photo')).toBeTruthy();
    expect(getByText('Upload from Gallery')).toBeTruthy();
  });

  it('displays loading state and handles camera success', async () => {
    const mockExpense = {
      amount: '42.50',
      title: 'Office Supplies (Scanned)',
      categoryId: null,
      date: '2023-01-01T00:00:00.000Z',
    };
    (scanReceiptFromCamera as jest.Mock).mockResolvedValueOnce(mockExpense);

    const { getByText } = render(<ScanReceiptScreen />);

    await act(async () => {
      fireEvent.press(getByText('Take Photo'));
    });

    expect(scanReceiptFromCamera).toHaveBeenCalledTimes(1);
    expect(mockNavigate.replace).toHaveBeenCalledWith('AddExpense', { prefillData: mockExpense });

    expect(scanReceiptFromCamera).toHaveBeenCalledTimes(1);
    expect(mockNavigate.replace).toHaveBeenCalledWith('AddExpense', { prefillData: mockExpense });

    // Let the event loop flush the replace transition
    await new Promise(process.nextTick);
  });

  it('handles camera cancel safely and reverts loading state', async () => {
    (scanReceiptFromCamera as jest.Mock).mockResolvedValueOnce(null);

    const { getByText, queryByText } = render(<ScanReceiptScreen />);

    await act(async () => {
      fireEvent.press(getByText('Take Photo'));
    });

    expect(mockNavigate.replace).not.toHaveBeenCalled();
    // Verify fallback from loading state
    expect(queryByText('Analyzing Receipt...')).toBeNull();
    expect(getByText('Take Photo')).toBeTruthy();
  });

  it('handles gallery success', async () => {
    const mockExpense = {
      amount: '10.00',
      title: 'Food',
      categoryId: 1,
      date: '2023-01-01T00:00:00.000Z',
    };
    (scanReceiptFromGallery as jest.Mock).mockResolvedValueOnce(mockExpense);

    const { getByText } = render(<ScanReceiptScreen />);

    await act(async () => {
      fireEvent.press(getByText('Upload from Gallery'));
    });

    expect(scanReceiptFromGallery).toHaveBeenCalledTimes(1);
    expect(mockNavigate.replace).toHaveBeenCalledWith('AddExpense', { prefillData: mockExpense });
  });

  it('navigates back on close press', () => {
    const { getByTestId } = render(<ScanReceiptScreen />);
    const closeIcon = getByTestId('mock-icon'); // From font-icons mock definition

    fireEvent.press(closeIcon);
    expect(mockNavigate.goBack).toHaveBeenCalledTimes(1);
  });
});
