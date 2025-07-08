import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import cn from "clsx";
import React from "react";
import { CustomButtonProps } from "@/type";

const CustomButton = ({
  onPress,
  title = "Click me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} className={cn("custom-btn", style)}>
      {leftIcon}
      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
