import { Link, router } from "expo-router";
import { Alert, Text, View } from "react-native";
import React, { useState } from "react";
import * as Sentry from "@sentry/react-native";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";

const SignIn = () => {
  const { fetchAuthenticatedUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    const { email, password } = form;

    if (!email || !password) {
      return Alert.alert(
        "Error",
        "Please enter valid email address and password",
      );
    }

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      await fetchAuthenticatedUser();
      Alert.alert("Success", "User signed in successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) =>
          setForm((prev) => ({
            ...prev,
            email: text,
          }))
        }
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({
            ...prev,
            password: text,
          }))
        }
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton title="Sign in" onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don`&apos;t have an account?{" "}
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          {isSubmitting ? "Submitting" : "Sign up"}
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
