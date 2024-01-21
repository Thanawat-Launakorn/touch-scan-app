import React from "react";
import { CIcon } from "../icon";
import { Row } from "../../widgets";
import settings from "../../settings";
import { Pressable, View } from "react-native";
import { Navigation } from "../../type/common";
import { Padding } from "../../widgets/Padding";
import { useNavigation } from "@react-navigation/native";

type Props = {
  headerLeft?: boolean;
};
export const AppHeader: React.FC<Props> = React.memo(({ headerLeft }) => {
  const navigation = useNavigation<Navigation>();
  const headerLeftHandler = React.useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        height: settings.header.height,
        zIndex: -1,
      }}
    >
      <Padding
        flex
        style={{
          justifyContent: "flex-end",
        }}
        horizontal={{
          paddingHorizontal: settings.space.padding,
        }}
      >
        <Row>
          {!!headerLeft && (
            <Pressable onPress={headerLeftHandler}>
              <CIcon name="arrow-back" size={24} />
            </Pressable>
          )}
        </Row>
      </Padding>
    </View>
  );
});
