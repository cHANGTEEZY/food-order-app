import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot } from "expo-router";

const AuthLayout = () => {
  return (
    <SafeAreaView className="items-center justify-center flex-1">
      <Text>Welcome to Auth Layout</Text>
      <Slot />
    </SafeAreaView>
  );
};

export default AuthLayout;
