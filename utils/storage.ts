import AsyncStorage from "@react-native-async-storage/async-storage";

const getItem = async (key: string) => {
  const value: any = await AsyncStorage.getItem(key);
  return value;
};

const setItem = async (key: string, itemvalue: any) => {
  try {
    await AsyncStorage.setItem(key, itemvalue);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

const storage = {
  getItem,
  setItem,
  removeItem,
};

export default storage;
