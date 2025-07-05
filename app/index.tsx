import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { offers } from "@/constants";

import "./globals.css";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => <Text>{item.title}</Text>}
      />
    </SafeAreaView>
  );
}
