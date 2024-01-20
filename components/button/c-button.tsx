import React from "react";
import {
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  DimensionValue,
  TextStyle,
} from "react-native";
import settings from "../../settings";
import { Size } from "../../type/common";
import { Typography } from "../typography";
import { Row, SizeBox } from "../../widgets";
import { responsiveHeight, responsiveWidth } from "../../utils/responsive";

export const CButton = React.memo(
  ({
    disable = false,
    shadow = true,
    height = "auto",
    onLongPress,
    onPress,
    title = "Button",
    size = "base",
    textColor = "white",
    bgColor = settings.theme.primary,
    buttonStyle = "flat",
    style,
    opposite,
    suffix,
    prefix,
    fontStyle,
  }: {
    disable?: boolean;
    shadow?: boolean;
    height?: DimensionValue;
    opposite?: boolean;
    onLongPress?: (v?: any) => void;
    onPress?: (v?: any) => void;
    image?: string;
    title: string;
    fontStyle?: StyleProp<TextStyle>;
    bgColor?: string;
    size?: Size;
    textColor?: string;
    color?: string;
    colorPressed?: string;
    buttonStyle?: "none" | "flat" | "semi-rounded" | "rounded";
    style?: StyleProp<ViewStyle>;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
  }) => {
    const styles = StyleSheet.create({
      button: {
        height,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical:
          size === "tiny"
            ? 8
            : size === "small"
            ? 12
            : size === "base"
            ? 20
            : size === "large"
            ? 16
            : 0,
        paddingHorizontal:
          size === "tiny"
            ? 14
            : size === "small"
            ? 16
            : size === "base"
            ? 20
            : size === "large"
            ? 36
            : 0,
        borderRadius:
          buttonStyle === "flat" || buttonStyle === "none"
            ? 0
            : buttonStyle === "rounded"
            ? 30
            : buttonStyle === "semi-rounded"
            ? 5
            : 0,
        elevation: !!shadow ? (buttonStyle === "flat" ? 0 : 3) : 0,
        marginVertical: responsiveHeight(5),
      },
      text: {
        fontSize:
          size === "tiny"
            ? 9
            : size === "small"
            ? 12
            : size === "large"
            ? 20
            : 16,
        lineHeight: 21,
        letterSpacing: 0.25,
      },
    });

    let bgPressedColor = settings.theme.secondary;

    return (
      <Pressable
        onLongPress={onLongPress}
        disabled={disable}
        style={({ pressed }) => [
          !opposite && {
            backgroundColor:
              pressed && bgColor === "red" ? bgPressedColor : bgColor,
            opacity: pressed ? 0.75 : 1,
            borderWidth: 1,
            borderColor: settings.theme.primary,
          },
          !!opposite && {
            backgroundColor: pressed ? settings.theme.primary : "white",
            borderWidth: 1,
            borderColor: settings.theme.primary,
          },

          styles.button,
          style,
        ]}
        onPress={onPress}
      >
        {({ pressed }) => (
          <Row>
            {!!prefix && (
              <React.Fragment>
                <SizeBox
                  horizontal={{
                    marginHorizontal: responsiveWidth(2),
                  }}
                />
                {prefix}
              </React.Fragment>
            )}
            <Typography
              children={title}
              fontStyle={[
                {
                  fontFamily: pressed ? "Kanit-Medium" : "Kanit-Regular",
                  color: textColor,
                  marginLeft: prefix ? responsiveWidth(12) : 0,
                },
                !!opposite && {
                  color: pressed ? "white" : settings.theme.primary,
                },
                fontStyle,
              ]}
              size={size}
            />

            {!!suffix && (
              <React.Fragment>
                <SizeBox
                  horizontal={{
                    marginHorizontal: responsiveWidth(6),
                  }}
                />
                {suffix}
              </React.Fragment>
            )}
          </Row>
        )}
      </Pressable>
    );
  }
);
