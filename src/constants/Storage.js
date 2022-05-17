import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAccessToken = async (token) => {
  await AsyncStorage.setItem("accessToken", JSON.stringify(token));
};

export const getAccessToken = async () => {
  const token = await AsyncStorage.getItem("accessToken");
  return JSON.parse(token);
};

export const clearAccesToken = async () => {
  await AsyncStorage.removeItem("accessToken");
};

export const saveCurrentUser = async (user) => {
  await AsyncStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = async () => {
  const user = await AsyncStorage.getItem("currentUser");
  return JSON.parse(user);
};

export const savePushToken = async (token) => {
  await AsyncStorage.setItem("pushToken", token);
};

export const getPushToken = async () => {
  const token = await AsyncStorage.getItem("pushToken");
  return token;
};

export const clearPushToken = async () => {
  await AsyncStorage.removeItem("pushToken");
};

export const clearCurrentUser = async () => {
  await AsyncStorage.removeItem("currentUser");
};

export const clear = AsyncStorage.clear;
