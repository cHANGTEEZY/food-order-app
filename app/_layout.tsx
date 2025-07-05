import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { useEffect } from "react";
import "./globals.css";

export default function RootLayout() {
  const [fontsLoaded, errors] = useFonts({
    "QuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (errors) {
      throw errors;
    }

    if (!fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [errors, fontsLoaded]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
