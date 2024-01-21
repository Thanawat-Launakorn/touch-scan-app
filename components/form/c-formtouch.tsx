import React from "react";
import { CIcon } from "../icon";
import { CButton } from "../button";
import settings from "../../settings";
import { Typography } from "../typography";
import { Column, SizeBox } from "../../widgets";
import { Alert, Pressable, View } from "react-native";
import { responsiveHeight } from "../../utils/responsive";

type Props = {
  onRequestCallback: () => void;
  onSkipCallback: () => void;
};

export const CFormTouch: React.FC<Props> = React.memo(
  ({ onRequestCallback, onSkipCallback }) => {
    const onRequestTouch = React.useCallback(() => {
      onRequestCallback();
    }, []);

    const onSkip = React.useCallback(() => {
      onSkipCallback();
    }, []);

    const onTouch = React.useCallback(() => {
      Alert.alert("Touch ID", settings.alert.no_service);
    }, []);

    return (
      <Column flex>
        <View
          style={{
            flex: 1,
          }}
        >
          <Typography children="Touch ID" />
          <SizeBox
            vertical={{
              marginVertical: settings.space.padding / 4,
            }}
          />
          <Typography
            children="ตั้งค่าล็อคอินด้วยลายนิ้วมือ"
            size="small"
            fontStyle={{
              fontFamily: "Kanit-Light",
            }}
          />
          <Typography
            children="เพื่อการเข้าถึงที่รวดเร็วขึ้น"
            size="small"
            fontStyle={{
              fontFamily: "Kanit-Light",
            }}
          />
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={onTouch}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              elevation: 2,
              shadowColor: "#111",
              shadowOffset: { width: 0.1, height: 0.1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CIcon
              name="finger-print"
              size={80}
              color={settings.theme.primary}
            />
          </Pressable>
        </View>

        <View
          style={{
            flex: 1,
          }}
        >
          <CButton
            size="small"
            title="ตั้งค่าลายนิ้วมือ"
            buttonStyle="semi-rounded"
            onPress={onRequestTouch}
          />
          <SizeBox
            vertical={{
              marginVertical: responsiveHeight(6),
            }}
          />
          <CButton
            title="ข้าม"
            size="small"
            opposite
            border={false}
            buttonStyle="semi-rounded"
            onPress={onSkip}
          />
        </View>
      </Column>
    );
  }
);
