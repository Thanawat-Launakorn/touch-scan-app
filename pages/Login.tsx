import React from "react";
import toolCommon from "../utils/common";
import { AppPage } from "../components/layout";
import { CFormLogin } from "../components/form";
import { CLoading } from "../components/loading";
import { delay, Navigation } from "../type/common";
import { useNavigation } from "@react-navigation/native";
import { formLogin } from "../components/form/c-formlogin";

type Props = {};

export default function Login({}: Props) {
  const navigation = useNavigation<Navigation>();
  const [loading, setLoading] = React.useState(false);

  const confirmHandler = async (v: formLogin) => {
    try {
      setLoading(true);
      await toolCommon.sleep(delay);
      if (v) {
        navigation.navigate("OTP");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppPage>
      {loading && <CLoading />}
      <CFormLogin submitCallback={confirmHandler} />
    </AppPage>
  );
}
