import React from "react";
import { ColorValue } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  name: string;
  size: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
};

export const CIcon: React.FC<Props> = React.memo(
  ({ name, size, color, style }) => {
    return (
      <Icon name={name} size={size} color={color ?? "black"} style={[style]} />
    );
  }
);
