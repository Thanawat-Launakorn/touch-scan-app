import { FC } from "react";
import { IContentStyle } from "../type/common";
import { FlexStyle, StyleProp, View } from "react-native";

type Props = {
  align?: boolean;
  reverse?: boolean;
  children: React.ReactNode;
  justifyContent?: IContentStyle;
  style?: StyleProp<Omit<FlexStyle, "flexDirection">>;
};

export const Row: FC<Props> = ({
  children,
  reverse,
  style,
  align = true,
  justifyContent = "flex-start",
}) => (
  <View
    style={[
      {
        justifyContent,
        flexDirection: !!reverse ? "row-reverse" : "row",
      },
      align && { alignItems: "center" },
      style,
    ]}
  >
    {children}
  </View>
);
