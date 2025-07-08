import { Button, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const SignIn = () => {
  return (
    <View>
      <Button title="Sign in" onPress={() => router.push("/(auth)/sign-up")} />
    </View>
  );
};

export default SignIn;
