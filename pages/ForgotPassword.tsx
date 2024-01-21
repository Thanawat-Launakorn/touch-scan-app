import React from "react";
import settings from "../settings";
import toolCommon from "../utils/common";
import { CIcon } from "../components/icon";
import { Column, SizeBox } from "../widgets";
import { CButton } from "../components/button";
import { AppPage } from "../components/layout";
import { CLoading } from "../components/loading";
import { delay, Navigation } from "../type/common";
import { Typography } from "../components/typography";
import { useNavigation } from "@react-navigation/native";
import { CFormForgotpassword } from "../components/form";
import { CBottomSheetModal } from "../components/bottomSheet";
import { formForgotpassword } from "../components/form/c-formforgot";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {};

export default function ForgotPassword({}: Props) {
  const [loading, setLoading] = React.useState(false);
  const bottomSheetRef = React.useRef<BottomSheetModalMethods>(null);
  const snapPoints = React.useMemo(() => ["100%"], []);
  const navigation = useNavigation<Navigation>();
  const confirmHandler = async (v: formForgotpassword) => {
    try {
      setLoading(true);
      await toolCommon.sleep(delay);
      if (v) {
        bottomSheetRef.current?.present();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onDismiss = async () => {
    try {
      setLoading(true);
      await toolCommon.sleep(delay);
      bottomSheetRef.current?.close();
    } finally {
      setLoading(false);
    }
  };

  const onSuccess = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => navigation.replace("Login"), delay);
  };

  return (
    <AppPage header>
      {loading && <CLoading />}
      <CFormForgotpassword submitCallback={(v) => confirmHandler(v)} />
      <CBottomSheetModal
        BottomSheetModalConfig={{
          onDismiss,
          snapPoints,
          ref: bottomSheetRef,
        }}
      >
        <Column
          style={{
            flex: 1,
            justifyContent: "space-evenly",
          }}
        >
          <Column
            style={{
              alignItems: "center",
            }}
          >
            <CIcon
              name="checkmark-circle-outline"
              size={200}
              color={settings.theme.primary}
            />
            <SizeBox
              vertical={{
                marginBottom: settings.space.padding,
              }}
            />
            <Typography children="สำเร็จ" />
            <Typography
              children="รีเซ็ตรหัสผ่านของคุณสำเร็จแล้ว"
              size="small"
            />
          </Column>

          <CButton
            title="ตกลง"
            buttonStyle="semi-rounded"
            size="small"
            onPress={onSuccess}
          />
        </Column>
      </CBottomSheetModal>
    </AppPage>
  );
}
