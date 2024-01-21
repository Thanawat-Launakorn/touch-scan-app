import React from "react";
import { Keyboard } from "react-native";
import toolCommon from "../utils/common";
import { CFormOTP } from "../components/form";
import { AppPage } from "../components/layout";
import { CLoading } from "../components/loading";
import { delay, Navigation } from "../type/common";
import { otpProps } from "../components/form/c-formopt";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export default function RequestOTP({}: Props) {
  const [count, setCount] = React.useState(60);
  const navigation = useNavigation<Navigation>();
  const [loading, setLoading] = React.useState(false);
  const intervalIdRef = React.useRef<NodeJS.Timeout | null>(null);
  const [startCountdown, setStartCountdown] = React.useState(false);
  const onResendOTP = async () => {
    try {
      //request service
      setStartCountdown(true);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  const onConfirmHandler = async (v: otpProps) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      await toolCommon.sleep(delay);
      if (v) {
        navigation.navigate("Pin", {});
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (startCountdown) {
      if (count < 1) {
        setCount(60);
        setStartCountdown(false);
      }
      intervalIdRef.current = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      clearInterval(intervalIdRef.current!);
    }

    return () => clearInterval(intervalIdRef.current!);
  }, [startCountdown, count]);

  return (
    <AppPage header>
      {loading && <CLoading />}
      <CFormOTP
        max={6}
        count={count}
        resendOTP={onResendOTP}
        confirmHandler={onConfirmHandler}
      />
    </AppPage>
  );
}
