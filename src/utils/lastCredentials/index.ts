import { getSecureItem, saveSecureItem } from "@/utils/secureStore";

const LAST_EMAIL_KEY = "lastLoginEmail";

export const saveLastEmail = async (email: string) => {
  await saveSecureItem(LAST_EMAIL_KEY, email);
};

export const getLastEmail = async (): Promise<string | null> => {
  return await getSecureItem(LAST_EMAIL_KEY);
};

export const clearLastEmail = async () => {
  await saveSecureItem(LAST_EMAIL_KEY, "");
};
