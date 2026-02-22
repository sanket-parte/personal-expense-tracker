import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { scanReceiptFromCamera, scanReceiptFromGallery } from '../receiptScanner';

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('receiptScanner service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('scanReceiptFromCamera', () => {
    it('returns null if permissions denied', async () => {
      jest.spyOn(ImagePicker, 'requestCameraPermissionsAsync').mockResolvedValueOnce({
        status: 'denied' as unknown as ImagePicker.PermissionStatus,
        expires: 'never',
        granted: false,
        canAskAgain: true,
      });

      const result = await scanReceiptFromCamera();

      expect(result).toBeNull();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Permission Denied',
        'Camera permission is required to scan receipts.',
      );
    });

    it('returns null if camera capture is canceled', async () => {
      jest.spyOn(ImagePicker, 'requestCameraPermissionsAsync').mockResolvedValueOnce({
        status: 'granted' as unknown as ImagePicker.PermissionStatus,
        expires: 'never',
        granted: true,
        canAskAgain: true,
      });
      jest.spyOn(ImagePicker, 'launchCameraAsync').mockResolvedValueOnce({
        canceled: true,
        assets: null,
      });

      const result = await scanReceiptFromCamera();

      expect(result).toBeNull();
      expect(ImagePicker.launchCameraAsync).toHaveBeenCalled();
    });

    it('returns mocked parsed data on success', async () => {
      jest.spyOn(ImagePicker, 'requestCameraPermissionsAsync').mockResolvedValueOnce({
        status: 'granted' as unknown as ImagePicker.PermissionStatus,
        expires: 'never',
        granted: true,
        canAskAgain: true,
      });
      jest.spyOn(ImagePicker, 'launchCameraAsync').mockResolvedValueOnce({
        canceled: false,
        assets: [{ uri: 'file://mock-image.png', width: 100, height: 100 }],
      });

      const result = await scanReceiptFromCamera();

      expect(result).not.toBeNull();
      expect(result?.amount).toBe('42.50');
      expect(result?.title).toBe('Office Supplies (Scanned)');
    });

    it('handles unexpected exceptions safely', async () => {
      jest
        .spyOn(ImagePicker, 'requestCameraPermissionsAsync')
        .mockRejectedValueOnce(new Error('Crash'));

      const result = await scanReceiptFromCamera();

      expect(result).toBeNull();
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to scan receipt.');
    });
  });

  describe('scanReceiptFromGallery', () => {
    it('returns null if permissions denied', async () => {
      jest.spyOn(ImagePicker, 'requestMediaLibraryPermissionsAsync').mockResolvedValueOnce({
        status: 'denied' as unknown as ImagePicker.PermissionStatus,
        expires: 'never',
        granted: false,
        canAskAgain: true,
      });

      const result = await scanReceiptFromGallery();

      expect(result).toBeNull();
      expect(Alert.alert).toHaveBeenCalledWith(
        'Permission Denied',
        'Gallery permission is required to choose receipts.',
      );
    });

    it('returns mocked parsed data on success', async () => {
      jest.spyOn(ImagePicker, 'requestMediaLibraryPermissionsAsync').mockResolvedValueOnce({
        status: 'granted' as unknown as ImagePicker.PermissionStatus,
        expires: 'never',
        granted: true,
        canAskAgain: true,
      });
      jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockResolvedValueOnce({
        canceled: false,
        assets: [{ uri: 'file://mock-image.png', width: 100, height: 100 }],
      });

      const result = await scanReceiptFromGallery();

      expect(result).not.toBeNull();
      expect(result?.amount).toBe('42.50');
      expect(result?.title).toBe('Office Supplies (Scanned)');
    });

    it('handles unexpected exceptions safely', async () => {
      jest
        .spyOn(ImagePicker, 'requestMediaLibraryPermissionsAsync')
        .mockRejectedValueOnce(new Error('Crash'));

      const result = await scanReceiptFromGallery();

      expect(result).toBeNull();
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Failed to pick receipt.');
    });
  });
});
