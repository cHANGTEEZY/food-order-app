import { Image, Text, View } from "react-native";
import React from "react";
import { images } from "@/constants";

interface EmptyProps {
  title: string;
}

const Empty = ({ title }: EmptyProps) => {
  return (
    <View className="flex-1 flex justify-center  items-center relative top-[30%]  ">
      <Text className="text-4xl">{title}</Text>
      <Image
        source={images.emptyCart}
        resizeMode="contain"
        className="size-36"
      />
    </View>
  );
};

export default Empty;
