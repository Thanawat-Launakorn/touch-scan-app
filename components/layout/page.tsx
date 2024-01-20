import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleProp, View, ViewStyle } from "react-native";
type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};
export const AppPage: React.FC<Props> = ({ children, style }) => {
  return (
    <View style={[{ flex: 1, backgroundColor: "#fff" }, style]}>
      {children}
      <StatusBar style="auto" />
    </View>
  );
};
