import { FlatList, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import CustomHeader from "@/components/CustomHeader";
import { images } from "@/constants";
import { Label } from "@react-navigation/elements";
import useAuthStore from "@/store/auth.store";
import CustomButton from "@/components/CustomButton";

const data = [
  {
    id: "1",
    label: "Full Name",
    icon: images.person,
  },
  {
    id: "2",
    label: "Email",
    icon: images.envelope,
  },
  {
    id: "3",
    label: "Phone number",
    icon: images.phone,
  },
  {
    id: "4",
    Label: "Address 1 - (Home)",
    icon: images.location,
  },
  {
    id: "5",
    Label: "Address 2 - (Work)",
    icon: images.location,
  },
];

const Profile = () => {
  const { logoutUser, isLoading } = useAuthStore();

  return (
    <SafeAreaView>
      <FlatList
        contentContainerClassName="pb-28 px-5 pt-5"
        ListHeaderComponent={() => <CustomHeader title="Profile" />}
        ListFooterComponent={() => (
          <View className="gap-6">
            <CustomButton title="Edit Profile" />
            <CustomButton
              title="Logout"
              onPress={logoutUser}
              isLoading={isLoading}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
