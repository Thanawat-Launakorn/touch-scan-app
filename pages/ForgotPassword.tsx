import React from "react";
import settings from "../settings";
import { Keyboard } from "react-native";
import { CIcon } from "../components/icon";
import { Column, SizeBox } from "../widgets";
import { CButton } from "../components/button";
import { AppPage } from "../components/layout";
import { delay, Navigation } from "../type/common";
import { Typography } from "../components/typography";
import { useNavigation } from "@react-navigation/native";
import { CFormForgotpassword } from "../components/form";
import { CBottomSheetModal } from "../components/bottomSheet";
import { formForgotpassword } from "../components/form/c-formforgot";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {};

export default function ForgotPassword({}: Props) {
  const bottomSheetRef = React.useRef<BottomSheetModalMethods>(null);
  const snapPoints = React.useMemo(() => ["100%"], []);
  const navigation = useNavigation<Navigation>();
  const confirmHandler = async (v: formForgotpassword) => {
    try {
      if (v) {
        bottomSheetRef.current?.present();
        Keyboard.dismiss();
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  const onDismiss = () => {
    bottomSheetRef.current?.close();
  };

  const onSuccess = () => {
    bottomSheetRef.current?.close();
    setTimeout(() => navigation.replace("Login"), delay);
  };

  return (
    <AppPage
      style={{
        paddingTop: settings.header.height + settings.space.padding,
        paddingHorizontal: settings.space.padding,
      }}
    >
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
