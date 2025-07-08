import { Button, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const SignUp = () => {
  return (
    <View>
      <Button title="Sign up" onPress={() => router.push("/(auth)/sign-in")} />
    </View>
  );
};

export default SignUp;
