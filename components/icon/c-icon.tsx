import React from "react";
import { ColorValue } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  name: string;
  size: number;
  color?: ColorValue;
};

export const CIcon: React.FC<Props> = ({ name, size, color }) => {
  return <Icon name={name} size={size} color={color ?? "black"} />;
};
