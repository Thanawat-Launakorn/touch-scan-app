import React from "react";
import settings from "../../settings";
import { Typography } from "../typography";
import { Column, SizeBox } from "../../widgets";
import { KeyboardAvoidingComponent } from "../keyboard";
import { responsiveHeight } from "../../utils/responsive";
import { Pressable, TextInput, View, StyleSheet } from "react-native";

type Props = {
  max: number;
  tel?: string;
  count: number;
  resendOTP: () => void;
  confirmHandler: (v: otpProps) => void;
};

export type otpProps = {
  otp: string;
};

export const CFormOTP: React.FC<Props> = React.memo(
  ({ max, count, resendOTP, confirmHandler }) => {
    const codeDigitArray = new Array(6).fill(0);
    const inputRef = React.useRef<TextInput>(null);
    const [code, setCode] = React.useState<string>("");
    const [inputFocus, setInputFocus] = React.useState<boolean>(false);

    const handleOnPress = () => {
      setInputFocus(true);
      inputRef.current?.focus();
    };
    const handleOnBlur = () => {
      setInputFocus(false);
    };

    const onResendOTP = () => {
      resendOTP();
    };

    const toCodeDigitInput = (_value: string, idx: number) => {
      const emptyInputChar = " ";
      const digit = code[idx] || emptyInputChar;
      const currDigit = idx === code.length;
      const lastDigit = idx === max - 1;
      const isCodeFull = code.length === max;
      const isDigitFocused = currDigit || (lastDigit && isCodeFull);

      return (
        <View
          style={[
            styles.otpInput,
            inputFocus &&
              isDigitFocused && {
                borderColor: settings.theme.primary,
              },
          ]}
          key={idx}
        >
          <Typography
            style={styles.otpInputText}
            fontStyle={{
              fontFamily: "Kanit-Light",
            }}
          >
            {digit}
          </Typography>
        </View>
      );
    };

    React.useEffect(() => {
      setInputFocus(true);
      if (code.length === max) {
        confirmHandler({ otp: code });
      }
    }, [code]);

    return (
      <KeyboardAvoidingComponent>
        <Column
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Typography children="ยืนยันตัวตน" />
            <SizeBox
              vertical={{
                marginVertical: settings.space.padding / 4,
              }}
            />
            <Typography
              children="กรุณากรอกรหัสยืนยันที่เราได้ส่งให้คุณ"
              size="small"
              fontStyle={{
                fontFamily: "Kanit-Light",
              }}
            />
            <Typography
              children="082-XXX-8998"
              size="small"
              fontStyle={{
                fontFamily: "Kanit-Light",
              }}
            />
            <SizeBox
              vertical={{
                marginVertical: responsiveHeight(settings.space.padding / 2),
              }}
            />
            <Pressable style={styles.otpInputContainer} onPress={handleOnPress}>
              {codeDigitArray.map(toCodeDigitInput)}
            </Pressable>
            <TextInput
              keyboardType="number-pad"
              autoFocus
              style={styles.textInputHidden}
              value={code}
              onChangeText={(text) => setCode(text)}
              maxLength={max}
              ref={inputRef}
              onBlur={handleOnBlur}
            />
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Typography
              children="หากคุณไม่ได้รับรหัส?"
              size="small"
              color="#494949"
              fontStyle={{
                fontFamily: "Kanit-Light",
              }}
            />
            <SizeBox
              vertical={{
                marginVertical: 6,
              }}
            />
            <Typography
              children={`ส่งรหัสใหม่ (${count})`}
              size="small"
              color="#00664F"
              onPressed={onResendOTP}
            />
          </View>
          <SizeBox
            vertical={{
              marginVertical: settings.space.padding,
            }}
          />
        </Column>
      </KeyboardAvoidingComponent>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    flex: 2,
  },
  textInputHidden: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  otpInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    borderColor: "#ced4da",
    minWidth: "15%",
    borderBottomWidth: 1,
    paddingVertical: 24,
  },
  otpInputText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: settings.theme.primary,
  },
});
