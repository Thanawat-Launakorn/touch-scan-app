import React from "react";
import settings from "../settings";
import { Alert } from "react-native";
import { Navigation } from "../type/common";
import { AppPage } from "../components/layout";
import { CFormTouch } from "../components/form";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export default function Touch({}: Props) {
  const navigation = useNavigation<Navigation>();
  const onRequest = () => {
    Alert.alert("Touch ID", settings.alert.no_service);
  };

  const onSkip = () => {
    navigation.replace("Pin", { touchId: true });
  };

  return (
    <AppPage header>
      <CFormTouch onRequestCallback={onRequest} onSkipCallback={onSkip} />
    </AppPage>
  );
}
