import React from "react";
import settings from "../settings";
import { View } from "react-native";
import { CIcon } from "../components/icon";
import { Navigation } from "../type/common";
import { Column, SizeBox } from "../widgets";
import { Padding } from "../widgets/Padding";
import { AppPage } from "../components/layout";
import { CButton } from "../components/button";
import { Typography } from "../components/typography";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export default function OTP({}: Props) {
  const navigation = useNavigation<Navigation>();
  const onRequestOTP = React.useCallback(() => {
    navigation.navigate("RequestOTP");
  }, []);

  return (
    <AppPage header>
      <Column flex>
        <Padding
          style={{
            justifyContent: "center",
          }}
          flex
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <CIcon
              name="mail-open-sharp"
              size={100}
              color={settings.theme.primary}
            />
            <Typography
              children="OTP จะถูกส่งไปที่เบอร์โทรศัพท์"
              style={{
                marginTop: settings.space.padding,
              }}
            />
            <Typography
              children="082-XXX-8998"
              color={settings.theme.primary}
            />
          </View>
          <SizeBox
            vertical={{
              marginVertical: settings.space.padding,
            }}
          />
          <CButton
            title="ขอรหัส OTP"
            size="small"
            buttonStyle="semi-rounded"
            onPress={onRequestOTP}
          />
          <SizeBox
            vertical={{
              marginVertical: settings.space.padding / 4,
            }}
          />
          <Typography
            children="กรณีเบอร์โทรศัพท์ไม่ถูกต้องกรุณาติดต่อเบอร์ 02-XXX-XXXX"
            size="tiny"
            color="#7A7A7A"
            fontStyle={{
              fontFamily: "Kanit-Light",
              textAlign: "center",
            }}
          />
        </Padding>
      </Column>
    </AppPage>
  );
}
