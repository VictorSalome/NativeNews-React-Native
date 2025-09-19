import * as SecureStore from "expo-secure-store";

export const saveSecureItem = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureItem = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);

  return value;
};

export const deleteSecureItem = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

const secureStoreUtils = {
  saveSecureItem,
  getSecureItem,
  deleteSecureItem,
};

export default secureStoreUtils;
