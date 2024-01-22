import React from "react";
import settings from "../settings";
import { Column } from "../widgets";
import { Alert } from "react-native";
import toolCommon from "../utils/common";
import { CIcon } from "../components/icon";
import { RootStackParamsList } from "../App";
import { CModal } from "../components/modal";
import { CFormPin } from "../components/form";
import { AppPage } from "../components/layout";
import { CLoading } from "../components/loading";
import { delay, Navigation } from "../type/common";
import { Typography } from "../components/typography";
import { responsiveHeight } from "../utils/responsive";
import { RouteProp, useNavigation } from "@react-navigation/native";

type Props = {
  route?: RouteProp<RootStackParamsList, "Pin">;
};

export default function Pin({ route }: Props) {
  const navigation = useNavigation<Navigation>();
  const [loading, setLoading] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const { accept: isAccept, pin, touchId: isTouch } = route?.params || {};

  const confirmHandler = async (v: string[]) => {
    const v_pin = v.join("");

    try {
      setLoading(true);
      await toolCommon.sleep(delay);
      if (isAccept) {
        if (pin === v_pin) {
          navigation.navigate("Touch");
          return;
        } else {
          Alert.alert("Notification", "รหัสไม่ถูกต้อง");
          return;
        }
      }

      if (isTouch) {
        Alert.alert("Notification", settings.alert.no_service);
        return;
      }

      navigation.replace("Pin", { accept: !!v, pin: v_pin });
    } finally {
      setLoading(false);
    }
  };

  const onDismiss = React.useCallback(() => {
    setVisible(visible);
  }, []);

  React.useEffect(() => {
    if (isTouch) {
      setTimeout(() => setVisible(true), delay);
    }
  }, [isTouch]);
  return (
    <AppPage>
      {loading && <CLoading />}
      <CModal
        onCancel={onDismiss}
        onOk={onDismiss}
        backdropPress={onDismiss}
        visible={visible}
        paddingHorizontal={settings.space.padding * 2}
        animationType={"fade"}
        styledModal={{
          paddingHorizontal: settings.space.padding * 2,
        }}
      >
        <Column
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: responsiveHeight(24),
          }}
        >
          <CIcon
            name="finger-print"
            color={"red"}
            size={43}
            style={{
              padding: 4,
            }}
          />
          <Typography children={`Touch ID for `} />
          <Typography children={`"CGS Application"`} />
          <Typography
            children={`เข้าใช้งานด้วย Touch ID หรือ ยกเลิกเพื่อกลับไปใช้รหัส PIN"`}
            size="small"
          />
        </Column>
      </CModal>
      <CFormPin
        confirmHandler={confirmHandler}
        isAccept={isAccept}
        isTouch={isTouch}
      />
    </AppPage>
  );
}
