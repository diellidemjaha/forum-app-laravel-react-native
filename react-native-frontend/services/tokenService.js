import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Set token based on platform (localStorage for web, SecureStore for mobile)
export const setToken = async (newToken) => {
  if (Platform.OS === 'web') {
    localStorage.setItem("token", newToken);
  } else {
    await SecureStore.setItemAsync("token", newToken);
  }
};

// Get token based on platform (localStorage for web, SecureStore for mobile)
export const getToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem("token");
  } else {
    return await SecureStore.getItemAsync("token");
  }
};

// Delete token based on platform (localStorage for web, SecureStore for mobile)
export const deleteToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem("token");
  } else {
    await SecureStore.deleteItemAsync("token");
  }
};