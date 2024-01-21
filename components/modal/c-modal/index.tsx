import React from "react";
import { Column, Row, SizeBox } from "../../../widgets";
import {
  Modal,
  Keyboard,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Typography } from "../../typography";
import { responsiveWidth } from "../../../utils/responsive";

type Props = {
  title?: string;
  backdropColor?: string;
  children: React.ReactNode;
  height?: number;
  maxHeight?: number;
  visible: boolean;
  animationType: "none" | "fade" | "slide";
  styledModal?: StyleProp<ViewStyle>;
  styleContent?: StyleProp<ViewStyle>;
  closeable?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  footer?: boolean;
  bgColor?: string;
  fullScreen?: boolean;
  discardBorderBottom?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  backdropPress?: () => void;
};

export const CModal: React.FC<Props> = React.memo(
  ({
    title,
    backdropColor = "rgba(0,0,0,.5)",
    children,
    styleContent,
    visible,
    height,
    maxHeight,
    animationType,
    styledModal,
    closeable = true,
    onOk,
    onCancel,
    footer = true,
    bgColor = "#fff",
    fullScreen,
    discardBorderBottom,
    paddingHorizontal = 0,
    paddingVertical = 0,
    backdropPress,
  }) => {
    const handleOverlayPress = (e: any) => {
      //กด backdrop
      if (e.target === e.currentTarget) {
        backdropPress && backdropPress();
      } else {
        //กด modal
        onPressModal();
      }
    };

    const onPressModal = React.useCallback(() => {
      Keyboard.dismiss();
    }, []);

    return (
      <Modal
        transparent
        visible={visible}
        statusBarTranslucent={true}
        animationType={animationType}
        onRequestClose={backdropPress}
      >
        {/* backdrop */}
        <TouchableWithoutFeedback onPress={(e) => handleOverlayPress(e)}>
          <View
            style={[
              styledModal,
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: backdropColor,
                flex: 1,
                justifyContent: "center",
              },
            ]}
          >
            {/* modal */}
            <TouchableWithoutFeedback>
              <View
                style={[
                  {
                    backgroundColor: bgColor,
                    borderRadius: 12,
                    minHeight: "auto",
                    maxHeight: !!maxHeight ? maxHeight : "auto",
                    height,

                    paddingHorizontal,
                    paddingVertical,

                    width: fullScreen ? "100%" : "auto",
                  },
                  !!discardBorderBottom && {
                    borderBottomStartRadius: 0,
                    borderBottomEndRadius: 0,
                  },
                  styleContent,
                ]}
              >
                {/* top tool item */}
                {!!title && !!closeable && (
                  <Row justifyContent="space-between">
                    <Typography
                      children={title}
                      size="tiny"
                      style={{
                        opacity: !!title ? 1 : 0,
                      }}
                    />
                  </Row>
                )}
                {/* content */}
                {children}

                {/* footer */}
                {footer && (
                  <Column>
                    <Typography
                      children="Enter Password"
                      color="#0076FF"
                      fontStyle={{
                        fontFamily: "Kanit-Light",
                        textAlign: "center",
                      }}
                      style={{
                        padding: 12,
                      }}
                      onPressed={onOk}
                    />
                    <SizeBox
                      horizontal={{
                        marginHorizontal: responsiveWidth(6),
                      }}
                    />
                    <Typography
                      children="ยกเลิก"
                      color="#0076FF"
                      fontStyle={{
                        fontFamily: "Kanit-Light",
                        textAlign: "center",
                      }}
                      style={{
                        padding: 12,
                      }}
                      onPressed={onCancel}
                    />
                  </Column>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);
