import * as SecureStore from "expo-secure-store";

export const saveSecureItem = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getSecureItem = async (key: string) => {
  const value = await SecureStore.getItemAsync(key);
  console.log(
    `[SecureStore] Obtendo item: ${key}, valor: ${value ? (key.includes("Token") ? "Token presente" : value) : "null"}`,
  );
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
