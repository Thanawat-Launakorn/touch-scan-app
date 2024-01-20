import React from "react";
import OTP from "./pages/OTP";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useFonts } from "expo-font";
import storage from "./utils/storage";
import Welcome from "./pages/Welcome";
import Disclaimer from "./pages/Disclaimer";
import { ImageBackground } from "react-native";
import { AppHeader } from "./components/layout";
import { delay, Navigation } from "./type/common";
import { AppPage } from "./components/layout/page";
import ForgotPassword from "./pages/ForgotPassword";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
export type RootStackParamsList = {
  Home: undefined;
  Login: undefined;
  Welcome: undefined;
  Loading: undefined;
  Disclaimer: undefined;
  ForgotPassword: undefined;
  OTP: undefined;
};

const Loading = () => {
  const navigation = useNavigation<Navigation>();
  const initApp = async () => {
    await checkUserData();
  };

  const checkUserData = async () => {
    const user = await storage.getItem("user");
    try {
      if (user) {
        navigation.replace("Home");
      }
      navigation.replace("Welcome");
    } catch (err) {
      if (err instanceof Error) {
        console.error("❌ Error", err.message);
      }
    }
  };

  React.useEffect(() => {
    setTimeout(() => initApp(), delay);
  }, []);

  return (
    <AppPage>
      <ImageBackground
        style={{
          flex: 1,
        }}
        resizeMode="cover"
        source={require("./assets/png/splash-app.png")}
      ></ImageBackground>
    </AppPage>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Kanit-Black": require("./assets/font/Kanit/Kanit-Black.ttf"),
    "Kanit-BlackItalic": require("./assets/font/Kanit/Kanit-BlackItalic.ttf"),
    "Kanit-BoldItalic": require("./assets/font/Kanit/Kanit-BoldItalic.ttf"),
    "Kanit-Bold": require("./assets/font/Kanit/Kanit-Bold.ttf"),
    "Kanit-ExtraBoldItalic": require("./assets/font/Kanit/Kanit-ExtraBoldItalic.ttf"),
    "Kanit-ExtraBold": require("./assets/font/Kanit/Kanit-ExtraBold.ttf"),
    "Kanit-Italic": require("./assets/font/Kanit/Kanit-Italic.ttf"),
    "Kanit-LightItalic": require("./assets/font/Kanit/Kanit-LightItalic.ttf"),
    "Kanit-Light": require("./assets/font/Kanit/Kanit-Light.ttf"),
    "Kanit-MediumItalic": require("./assets/font/Kanit/Kanit-MediumItalic.ttf"),
    "Kanit-Medium": require("./assets/font/Kanit/Kanit-Medium.ttf"),
    "Kanit-Regular": require("./assets/font/Kanit/Kanit-Regular.ttf"),
    "Kanit-SemiBoldItalic": require("./assets/font/Kanit/Kanit-SemiBoldItalic.ttf"),
    "Kanit-SemiBold": require("./assets/font/Kanit/Kanit-SemiBold.ttf"),
    "Kanit-ThinItalic": require("./assets/font/Kanit/Kanit-ThinItalic.ttf"),
    "Kanit-Thin": require("./assets/font/Kanit/Kanit-Thin.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      //font is loading
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack.Navigator initialRouteName="Loading">
              <Stack.Group
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Loading" component={Loading} />
              </Stack.Group>
              <Stack.Group
                screenOptions={{
                  header: () => <AppHeader headerLeft />,
                }}
              >
                <Stack.Screen name="Disclaimer" component={Disclaimer} />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen name="OTP" component={OTP} />
              </Stack.Group>
            </Stack.Navigator>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
