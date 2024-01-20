import { FC } from "react";
import { FlexStyle, StyleProp, View } from "react-native";

type Props = {
  flex?: boolean;
  reverse?: boolean;
  children: React.ReactNode;
  style?: StyleProp<Omit<FlexStyle, "flexDirection">>;
};
export const Column: FC<Props> = ({ flex, reverse, style, children }) => (
  <View
    style={[
      flex && { flex: 1 },
      style,
      { flexDirection: !!reverse ? "column-reverse" : "column" },
    ]}
  >
    {children}
  </View>
);
