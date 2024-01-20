import React from "react";
import { Navigation } from "../type/common";
import { AppPage } from "../components/layout";
import { CFormLogin } from "../components/form";
import { useNavigation } from "@react-navigation/native";
import { formLogin } from "../components/form/c-formlogin";

type Props = {};

export default function Login({}: Props) {
  const navigation = useNavigation<Navigation>();
  const confirmHandler = async (v: formLogin) => {
    try {
      if (v) {
        navigation.navigate("OTP");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };
  return (
    <AppPage>
      <CFormLogin submitCallback={confirmHandler} />
    </AppPage>
  );
}
