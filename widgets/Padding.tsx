import { FC } from "react";
import { View, ViewStyle } from "react-native";
import type { FlexStyle, StyleProp } from "react-native/types";

type Prop = {
  flex?: boolean;
  style?: StyleProp<ViewStyle>;
  horizontal?: StyleProp<
    Pick<
      FlexStyle,
      | "paddingHorizontal"
      | "paddingLeft"
      | "paddingRight"
      | "marginHorizontal"
      | "marginLeft"
      | "marginRight"
    >
  >;
  vertical?: StyleProp<
    Pick<
      FlexStyle,
      | "paddingVertical"
      | "paddingBottom"
      | "paddingTop"
      | "marginVertical"
      | "marginBottom"
      | "marginTop"
    >
  >;
  all?: StyleProp<Pick<FlexStyle, "padding">>;
  children: React.ReactNode;
};
export const Padding: FC<Prop> = ({
  vertical,
  horizontal,
  children,
  all,
  flex,
  style,
}) => (
  <View style={[style, vertical, horizontal, all, { flex: flex ? 1 : 0 }]}>
    {children}
  </View>
);
