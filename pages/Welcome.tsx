import React from "react";
import settings from "../settings";
import { View, Alert } from "react-native";
import { Column, SizeBox } from "../widgets";
import { Padding } from "../widgets/Padding";
import { CButton } from "../components/button";
import { langs, Navigation } from "../type/common";
import { AppPage } from "../components/layout/page";
import { Typography } from "../components/typography";
import { useNavigation } from "@react-navigation/native";
type Props = {};

export default function Welcome({}: Props) {
  const navigation = useNavigation<Navigation>();
  const languageHandler = React.useCallback((lang: langs) => {
    if (lang === "thai") {
      navigation.navigate("Disclaimer");
      return;
    }
    Alert.alert("Notification", "ยังไม่พร้อมให้บริการ");
  }, []);
  return (
    <AppPage>
      <Column
        flex
        style={{
          justifyContent: "space-evenly",
        }}
      >
        <Padding
          flex
          style={{
            justifyContent: "space-evenly",
          }}
          horizontal={{
            paddingHorizontal: settings.space.padding,
          }}
        >
          <View>
            <Typography children="ยินดีต้อนรับ" />
            <Typography
              children="กรุณาเลือกภาษา"
              size="small"
              color="#494949"
            />
          </View>
          <View>
            <CButton
              title="English"
              size="small"
              buttonStyle="semi-rounded"
              onPress={() => languageHandler("english")}
            />
            <SizeBox
              vertical={{
                marginVertical: settings.space.padding / 2,
              }}
            />
            <CButton
              title="ไทย"
              size="small"
              buttonStyle="semi-rounded"
              onPress={() => languageHandler("thai")}
            />
          </View>
        </Padding>
      </Column>
    </AppPage>
  );
}
