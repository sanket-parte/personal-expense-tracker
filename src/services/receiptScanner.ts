/**
 * Receipt Scanner Service (Mock)
 *
 * Provides functions to pick images or use the camera to scan a receipt.
 * Simulates OCR-style data extraction for Quick Adds.
 */

import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import type { ParsedExpenseData } from '@/types';

/**
 * Mocks the backend extraction of a receipt image.
 * Returns a semi-random fixed expense payload.
 */
async function mockExtractReceiptData(): Promise<ParsedExpenseData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        amount: '42.50',
        title: 'Office Supplies (Scanned)',
        date: new Date().toISOString(),
        // Just providing a random category ID (e.g. 1 for Food, 6 for Others)
        categoryId: null,
      });
    }, 1500); // Simulate network delay
  });
}

/**
 * Opens device camera to capture receipt and then parses it.
 */
export async function scanReceiptFromCamera(): Promise<ParsedExpenseData | null> {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required to scan receipts.');
      return null;
    }

    const captureResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
    });

    if (captureResult.canceled || !captureResult.assets[0]) {
      return null;
    }

    // Call our "AI OCR" parsing backend
    return await mockExtractReceiptData();
  } catch {
    Alert.alert('Error', 'Failed to scan receipt.');
    return null;
  }
}

/**
 * Opens photo library to pick receipt image and then parses it.
 */
export async function scanReceiptFromGallery(): Promise<ParsedExpenseData | null> {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery permission is required to choose receipts.');
      return null;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
    });

    if (pickerResult.canceled || !pickerResult.assets[0]) {
      return null;
    }

    // Call our "AI OCR" parsing backend
    return await mockExtractReceiptData();
  } catch {
    Alert.alert('Error', 'Failed to pick receipt.');
    return null;
  }
}
