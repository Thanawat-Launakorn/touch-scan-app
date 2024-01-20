import { FC } from "react";
import { View } from "react-native";
import type { FlexStyle, StyleProp } from "react-native";
type Prop = {
  horizontal?: StyleProp<
    Pick<FlexStyle, "marginHorizontal" | "marginLeft" | "marginRight">
  >;

  vertical?: StyleProp<
    Pick<FlexStyle, "marginVertical" | "marginBottom" | "marginTop">
  >;
};
export const SizeBox: FC<Prop> = ({ horizontal, vertical }) => (
  <View style={[horizontal, vertical]} />
);
