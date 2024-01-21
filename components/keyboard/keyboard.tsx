import React from "react";

import {
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Platform,
} from "react-native";
type Props = {
  children: React.ReactNode;
};

export const KeyboardAvoidingComponent = React.memo(({ children }: Props) => {
  const onKeyboardDismiss = React.useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="always"
      >
        <TouchableWithoutFeedback
          onPress={onKeyboardDismiss}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            {children}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});
