import React, { memo } from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";
import { TextProps } from "react-native";
import { TypographyType, TypographyTheme as typograph } from "./style";

type Props = {
  TextConfig?: TextProps;
  lower?: boolean;
  upper?: boolean;
  size?: TypographyType;
  children?: string;
  style?: StyleProp<ViewStyle>;
  color?: string;
  fontStyle?: StyleProp<TextStyle>;
  onPressed?: () => void;
};

export const Typography = memo(
  ({
    TextConfig,
    size = "base",
    color = "black",
    children,
    style,
    fontStyle,
    onPressed,
    lower,
    upper,
  }: Props) => {
    return (
      <React.Fragment>
        {!!onPressed && (
          <Pressable
            onPress={onPressed}
            style={({ pressed }) => pressed && { opacity: 0.5 }}
          >
            <View style={style}>
              <Text
                adjustsFontSizeToFit
                style={[
                  typograph[size],
                  { color },
                  fontStyle,
                  !!lower && { textTransform: "lowercase" },
                  !!upper && { textTransform: "uppercase" },
                ]}
              >
                {children}
              </Text>
            </View>
          </Pressable>
        )}
        {!onPressed && (
          <View style={style}>
            <Text
              {...{ ...TextConfig }}
              adjustsFontSizeToFit
              style={[
                { flexWrap: "nowrap" },
                typograph[size],
                { color },
                fontStyle,
                !!lower && { textTransform: "lowercase" },
                !!upper && { textTransform: "uppercase" },
              ]}
            >
              {children}
            </Text>
          </View>
        )}
      </React.Fragment>
    );
  }
);
