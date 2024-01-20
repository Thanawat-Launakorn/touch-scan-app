import { RootStackParamsList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";

export type Navigation = StackNavigationProp<RootStackParamsList>;

export type langs = "thai" | "english";

export const delay = 500;

export type Size = "tiny" | "small" | "base" | "large";

interface MyValueType {
  value?: any;
  isValid?: boolean;
}

export type InputValues<K extends keyof any> = Record<K, MyValueType>;

export type FontFamily =
  | "Kanit-BlackItalic"
  | "Kanit-Black"
  | "Kanit-BoldItalic"
  | "Kanit-Bold"
  | "Kanit-ExtraBoldItalic"
  | "Kanit-ExtraBold"
  | "Kanit-Italic"
  | "Kanit-LightItalic"
  | "Kanit-Light"
  | "Kanit-MediumItalic"
  | "Kanit-Medium"
  | "Kanit-Regular"
  | "Kanit-SemiBoldItalic"
  | "Kanit-SemiBold"
  | "Kanit-ThinItalic"
  | "Kanit-Thin";

export type FontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | undefined;

export type IContentStyle =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-around"
  | "space-evenly"
  | "space-between";
