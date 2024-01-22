import React from "react";
import settings from "../../../settings";
import { Pressable } from "react-native";
import { Typography } from "../../typography";
import { Row, SizeBox } from "../../../widgets";
import { responsiveWidth } from "../../../utils/responsive";

type Props = {
  onChangeValue: (v?: boolean) => void;
  label?: string;
};

export const CCheckBox: React.FC<Props> = React.memo(
  ({ onChangeValue, label }) => {
    const [toggle, setToggle] = React.useState(false);

    const onPressHandler = React.useCallback(() => {
      onChangeValue(toggle);
      setToggle((prev) => !prev);
    }, [toggle]);
    return (
      <Row>
        <Pressable
          onPress={onPressHandler}
          style={{
            height: 16,
            width: 16,
            backgroundColor: toggle ? settings.theme.primary : "#fff",
            borderWidth: 1,
            borderColor: "#ced4da",
            borderRadius: 5,
          }}
        />
        <SizeBox
          horizontal={{
            marginHorizontal: responsiveWidth(settings.space.padding / 8),
          }}
        />
        <Typography
          children={label}
          size="tiny"
          color="#646465"
          fontStyle={{
            fontFamily: "Kanit-Light",
          }}
        />
      </Row>
    );
  }
);
