import React from "react";
import { View } from "react-native";
import { CButton } from "../button";
import settings from "../../settings";
import { Typography } from "../typography";
import { Column, Row } from "../../widgets";
import toolCommon from "../../utils/common";
import { CCheckBox, CInput } from "../input";
import { Padding } from "../../widgets/Padding";
import { useNavigation } from "@react-navigation/native";
import { InputValues, Navigation } from "../../type/common";
import { responsiveHeight, responsiveWidth } from "../../utils/responsive";

type Props = {
  submitCallback: (v: formLogin) => void;
};

export type formLogin = {
  username: string;
  password: string;
};

export const CFormLogin: React.FC<Props> = ({ submitCallback }) => {
  const [bounce, setBounce] = React.useState(0);
  const navigation = useNavigation<Navigation>();
  const [inputValues, setInputValues] = React.useState<
    Partial<InputValues<keyof formLogin>>
  >({
    username: { value: "", isValid: true },
    password: { value: "", isValid: true },
  });

  const inputHandler = React.useCallback(
    (identifier: string, value: string) => {
      setInputValues({
        ...inputValues,
        [identifier]: { value, isValid: true },
      });
    },
    [inputValues]
  );

  const onSubmitHandler = () => {
    const v = {
      username: inputValues.username?.value,
      password: inputValues.password?.value,
    };
    const userIsInvalid = toolCommon.isEmpty(v.username);
    const passwordIsInvalid = toolCommon.isEmpty(v.password);

    if (userIsInvalid || passwordIsInvalid) {
      setInputValues({
        username: {
          value: inputValues.username?.value,
          isValid: !userIsInvalid,
        },
        password: {
          value: inputValues.password?.value,
          isValid: !passwordIsInvalid,
        },
      });
      setBounce(bounce + 1);
    } else {
      submitCallback(v);
    }
  };

  const onForgot = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <Column
      flex
      style={{
        justifyContent: "center",
      }}
    >
      <Padding
        horizontal={{
          paddingHorizontal: responsiveWidth(settings.space.padding),
        }}
      >
        <CInput
          isValid={inputValues.username?.isValid}
          bounce
          onSubmit={bounce}
          TextInputConfig={{
            placeholder: "ชื่อผู้้ใช้งาน",
            onChangeText: (v) => inputHandler("username", v),
          }}
          size="tiny"
        />

        <CInput
          isValid={inputValues.password?.isValid}
          bounce
          onSubmit={bounce}
          password
          TextInputConfig={{
            placeholder: "รหัสผ่าน",
            onChangeText: (v) => inputHandler("password", v),
          }}
          size="tiny"
        />

        <Row
          justifyContent="space-between"
          style={{
            marginTop: responsiveHeight(settings.space.padding / 4),
            marginBottom: responsiveHeight(settings.space.padding),
          }}
        >
          <CCheckBox onChangeValue={(v) => v} label="บันทึกการเข้าสู่ระบบ" />
          <Typography
            onPressed={onForgot}
            children="ลืมรหัสผ่าน?"
            size="tiny"
            color="#646465"
            fontStyle={{
              fontFamily: "Kanit-Light",
            }}
          />
        </Row>

        <CButton
          title="เข้าสู่ระบบ"
          onPress={onSubmitHandler}
          size="small"
          buttonStyle="semi-rounded"
        />

        <Row
          style={{
            marginVertical: responsiveHeight(settings.space.padding),
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#B7B7B7",
            }}
          />
          <Typography
            children="ไม่มีบัญชีผู้ใช้"
            size="small"
            color="#646465"
            fontStyle={{
              fontFamily: "Kanit-Light",
            }}
          />
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#B7B7B7",
            }}
          />
        </Row>

        <CButton
          opposite
          title="เปิดบัญชีเพื่อลงทะเบียนบัญชีผู้ใช้"
          onPress={() => {}}
          size="small"
          buttonStyle="semi-rounded"
        />
      </Padding>
    </Column>
  );
};
