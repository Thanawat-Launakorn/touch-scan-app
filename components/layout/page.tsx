import React from "react";
import settings from "../../settings";
import { StatusBar } from "expo-status-bar";
import { StyleProp, View, ViewStyle } from "react-native";
type Props = {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  header?: boolean;
};
export const AppPage: React.FC<Props> = React.memo(
  ({ children, style, header }) => {
    return (
      <View
        style={[
          { flex: 1, backgroundColor: "#fff" },
          style,
          header && {
            paddingHorizontal: settings.space.padding,
            paddingTop: settings.header.height + settings.space.padding,
          },
        ]}
      >
        {children}
        <StatusBar style="auto" />
      </View>
    );
  }
);
