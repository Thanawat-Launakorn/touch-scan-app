import React from "react";
import { CInput } from "../input";
import { CButton } from "../button";
import settings from "../../settings";
import { Typography } from "../typography";
import toolCommon from "../../utils/common";
import { Column, SizeBox } from "../../widgets";
import { InputValues } from "../../type/common";
import { KeyboardAvoidingComponent } from "../keyboard";

type Props = {
  submitCallback: (v: formForgotpassword) => void;
};

export type formForgotpassword = {
  email_password: string;
};

export const CFormForgotpassword: React.FC<Props> = React.memo(
  ({ submitCallback }) => {
    const [bounce, setBounce] = React.useState(0);
    const [inputValues, setInputValues] = React.useState<
      InputValues<keyof formForgotpassword>
    >({
      email_password: { value: "", isValid: true },
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
        email_password: inputValues.email_password.value,
      };

      const isInvalid = toolCommon.isEmpty(v.email_password);
      if (isInvalid) {
        setInputValues({
          email_password: { value: v.email_password, isValid: !isInvalid },
        });
        setBounce(bounce + 1);
      } else {
        submitCallback(v);
      }
    };
    return (
      <KeyboardAvoidingComponent>
        <Column>
          <Typography children="ลืมรหัสผ่าน?" />
          <SizeBox
            vertical={{
              marginVertical: settings.space.padding / 4,
            }}
          />
          <Typography
            children="กรุณากรอกอีเมลหรือเบอร์โทรศัพท์ที่"
            size="small"
            fontStyle={{
              fontFamily: "Kanit-Light",
            }}
          />
          <Typography
            children="ลงทะเบียน"
            size="small"
            fontStyle={{
              fontFamily: "Kanit-Light",
            }}
          />

          <CInput
            onSubmit={bounce}
            bounce
            isValid={inputValues.email_password.isValid}
            size="tiny"
            TextInputConfig={{
              autoFocus: true,
              placeholder: "อีเมล / เบอร์โทรศัพท์",
              onChangeText: (v) => inputHandler("email_password", v),
            }}
            style={{
              marginTop: settings.space.padding * 2,
              marginBottom: settings.space.padding,
            }}
          />

          <CButton
            title="ส่ง"
            onPress={onSubmitHandler}
            size="small"
            buttonStyle="semi-rounded"
          />
        </Column>
      </KeyboardAvoidingComponent>
    );
  }
);
