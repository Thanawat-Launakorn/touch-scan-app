import React from "react";
import {
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextInput,
  Animated,
  Pressable,
  TextStyle,
  View,
} from "react-native";
import { CIcon } from "../../icon";
import settings from "../../../settings";
import { responsiveHeight, responsiveWidth } from "../../../utils/responsive";

type Props = {
  isValid?: boolean;
  value?: boolean;
  disable?: boolean;
  bounce?: boolean;
  onSubmit?: number;
  borderColor?: string;
  borderStyle?: "flat" | "semi-rounded" | "rounded" | "none";
  size?: "tiny" | "search" | "small" | "base" | "large";
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  TextInputConfig: Omit<TextInputProps, "placeholderTextColor">;
  password?: boolean;
};

export const CInput = React.memo(
  ({
    isValid,
    disable = false,
    bounce = false,
    password = false,
    onSubmit,
    borderColor = "#BFBFBF",
    style,
    fontStyle,
    inputStyle,
    size = "base",
    TextInputConfig,
    borderStyle = "none",
  }: Props) => {
    const inputRef = React.useRef<TextInput>(null);
    const [focus, setFocus] = React.useState<boolean>(false);
    const [secure, setSecure] = React.useState<boolean>(true);
    const anim = React.useRef(new Animated.Value(0)).current;
    const translateXAnim = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 8],
    });

    const getAnimationStyle = () => ({
      transform: [
        {
          translateX: translateXAnim,
        },
      ],
    });
    const runningAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: -0.5,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.5,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 2 }
      ).start();
    };

    React.useEffect(() => {
      if (bounce && !isValid) runningAnimation();
    }, [onSubmit]);

    return (
      <Animated.View style={[getAnimationStyle()]}>
        <View
          style={[
            borderStyle === "none"
              ? [
                  styles.container,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: focus
                      ? settings.theme.primary
                      : borderColor,
                  },
                ]
              : {},
            style,
            !!disable && { backgroundColor: "#F2F2F2" },
            borderStyle === "flat"
              ? {
                  borderWidth: 1,
                  borderColor: focus ? settings.theme.primary : borderColor,
                }
              : borderStyle === "rounded"
              ? {
                  borderWidth: 1.5,
                  borderRadius: 50,
                  borderColor: focus ? settings.theme.primary : borderColor,
                }
              : borderStyle === "semi-rounded"
              ? {
                  borderWidth: 1.5,
                  borderRadius: 12,
                  borderColor: focus ? settings.theme.primary : borderColor,
                }
              : borderStyle === "none" && { borderWidth: 0 },
            {
              overflow: "hidden",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: responsiveHeight(8),
            },
          ]}
        >
          <TextInput
            ref={inputRef}
            style={[
              fontStyle,
              inputStyle,
              styles.input,
              { fontFamily: "Kanit-Light" },
              size === "tiny"
                ? {
                    fontSize: 12,
                  }
                : size === "search"
                ? {
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    fontSize: 14,
                  }
                : size === "small"
                ? {
                    paddingVertical: responsiveHeight(12),
                    paddingHorizontal: responsiveWidth(16),
                    fontSize: 16,
                  }
                : size === "base"
                ? {
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    fontSize: 20,
                  }
                : size === "large"
                ? {
                    paddingVertical: 16,
                    paddingHorizontal: 36,
                    fontSize: 36,
                  }
                : {
                    paddingVertical: 12,
                    paddingHorizontal: 32,
                    fontSize: 16,
                  },
            ]}
            {...{
              placeholderTextColor: "#B2B2B2",
              secureTextEntry: secure && password ? true : false,
              selectTextOnFocus: !!disable ? false : true,
              ...TextInputConfig,
            }}
            onFocus={() => setFocus(true)}
            onBlur={() => {
              setFocus(false);
            }}
          />
          {/* only password!! */}
          {!!password && (
            <View
              style={{
                position: "absolute",
                right: 0,
                paddingVertical: 12,
                paddingHorizontal: 12,
              }}
            >
              <Pressable onPress={() => setSecure((prev) => !prev)}>
                <CIcon
                  color={focus ? settings.theme.primary : "#B1B1B1"}
                  name={
                    focus && secure
                      ? "eye-off-sharp"
                      : focus && !secure
                      ? "eye-sharp"
                      : secure
                      ? "eye-off-outline"
                      : "eye-sharp"
                  }
                  size={20}
                />
              </Pressable>
            </View>
          )}
        </View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  input: {
    width: "100%",
  },
});
