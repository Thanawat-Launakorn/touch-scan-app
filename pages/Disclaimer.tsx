import React from "react";
import settings from "../settings";
import { View } from "react-native";
import {} from "../components/layout";
import { CIcon } from "../components/icon";
import { CButton } from "../components/button";
import { Column, Row, SizeBox } from "../widgets";
import { delay, Navigation } from "../type/common";
import { AppPage } from "../components/layout/page";
import { Typography } from "../components/typography";
import { useNavigation } from "@react-navigation/native";
import { CBottomSheetModal } from "../components/bottomSheet";
import { responsiveHeight, responsiveWidth } from "../utils/responsive";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type Props = {};

export default function Disclaimer({}: Props) {
  const navigation = useNavigation<Navigation>();
  const snapPoints = React.useMemo(() => ["70%"], []);
  const [opacity, setOpacity] = React.useState(false);
  const active = React.useMemo(() => opacity, [opacity]);
  const bottomRef = React.useRef<BottomSheetModalMethods>(null);

  const handleBottomSheet = React.useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        setOpacity(isOpen);
        bottomRef.current?.present();
        return;
      }
    },
    [opacity]
  );

  const onDismiss = React.useCallback(async () => {
    setOpacity(false);
    bottomRef.current?.close();
  }, []);

  const onAccept = React.useCallback(() => {
    bottomRef.current?.close();
    setTimeout(() => navigation.navigate("Login"), delay);
  }, []);

  React.useEffect(() => {
    setTimeout(() => handleBottomSheet(true), delay);
  }, []);

  return (
    <AppPage>
      <CBottomSheetModal
        backdropPress={onDismiss}
        isActive={active}
        BottomSheetModalConfig={{
          onDismiss,
          snapPoints,
          ref: bottomRef,
        }}
      >
        <Column
          flex
          style={{
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              borderBottomColor: "#DADEE2",
              borderBottomWidth: 1,
              paddingVertical: responsiveHeight(17.5),
            }}
          >
            <Column>
              <Row>
                <CIcon
                  name="newspaper-outline"
                  color={settings.theme.primary}
                  size={24}
                />
                <SizeBox
                  horizontal={{
                    marginHorizontal: responsiveWidth(8),
                  }}
                />
                <Typography children="เงื่อนไขการใช้บริการ" />
              </Row>
            </Column>
          </View>

          <Row
            style={{
              marginBottom: responsiveHeight(settings.space.padding),
            }}
          >
            <CButton
              onPress={onDismiss}
              title="ปฏิเสธ"
              size="small"
              opposite
              buttonStyle="semi-rounded"
              style={{ flex: 1 }}
            />
            <SizeBox
              horizontal={{
                marginHorizontal: responsiveWidth(settings.space.padding / 3),
              }}
            />
            <CButton
              onPress={onAccept}
              title="ยอมรับ"
              size="small"
              buttonStyle="semi-rounded"
              style={{ flex: 1 }}
            />
          </Row>
        </Column>
      </CBottomSheetModal>
    </AppPage>
  );
}
