import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

type Props = {};

export const CLoading: React.FC<Props> = ({}) => {
  return (
    <View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(0,0,0,.5)",
          zIndex: 99,
        },
      ]}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};
