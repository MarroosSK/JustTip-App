import AppMenu from "@/components/navigation/AppMenu";
import AppTopBar from "@/components/navigation/AppTopBar";
import { Slot } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function AppLayout() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View className="flex-1 bg-bg-light dark:bg-bg-dark">
      <AppTopBar onMenuPress={() => setMenuVisible(true)} />
      <View className="flex-1 ">
        <Slot />
      </View>
      <AppMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}
