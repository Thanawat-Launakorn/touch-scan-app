import React from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import settings from "../../../settings";
import { Padding } from "../../../widgets/Padding";
import { responsiveWidth } from "../../../utils/responsive";
import { BottomSheetModal, BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {
  backdropPress?: () => void;
  children: React.ReactNode;
  bg?: string;
  indicator?: boolean;
  style?: StyleProp<ViewStyle>;
  isActive?: boolean;
  BottomSheetModalConfig: Omit<
    BottomSheetModalProps & React.RefAttributes<BottomSheetModalMethods>,
    "children"
  >;
};

export const CBottomSheetModal: React.FC<Props> = React.memo(
  ({
    bg,
    children,
    indicator,
    backdropPress,
    style,
    isActive,
    BottomSheetModalConfig,
  }) => {
    const { height } = Dimensions.get("screen");
    const rBackdropStyle = useAnimatedStyle(() => {
      return {
        opacity: withTiming(isActive ? 1 : 0),
      };
    }, [isActive]);
    const rBackdropProps = useAnimatedProps(() => {
      return {
        pointerEvents: isActive ? "auto" : "none",
      };
    }, [isActive]) as any;

    return (
      <TouchableWithoutFeedback onPress={backdropPress}>
        <Animated.View
          animatedProps={rBackdropProps}
          style={[
            {
              height,
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(0,0,0,.5)",
              zIndex: 100,
            },
            rBackdropStyle,
          ]}
        >
          <BottomSheetModal
            {...{ ...BottomSheetModalConfig }}
            style={[style]}
            backgroundStyle={
              !!bg && {
                backgroundColor: bg,
              }
            }
            handleIndicatorStyle={{
              backgroundColor: "#D9D9D9",
              width: 32,
              display: indicator ? "flex" : "none",
            }}
          >
            <Padding
              flex
              horizontal={{
                paddingHorizontal: responsiveWidth(settings.space.padding),
              }}
            >
              {children}
            </Padding>
          </BottomSheetModal>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
);
