import { Dimensions } from "react-native";

export const heightMobileUI = 896;
export const widthMobileUI = 375;
export const responsiveWidth = (width: number) => {
  return (Dimensions.get("window").width * width) / widthMobileUI;
};

export const responsiveHeight = (height: number) => {
  return (Dimensions.get("window").height * height) / heightMobileUI;
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export const RPW = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

export const RPH = (percentage: number) => {
  return (percentage / 100) * screenHeight;
};
