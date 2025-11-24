import AppMenu from "@/components/navigation/AppMenu";
import AppTopBar from "@/components/navigation/AppTopBar";
import { Slot } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function AppLayout() {
  const { t } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View className="flex-1 bg-bg-light dark:bg-bg-dark">
      {/* Top bar */}
      <AppTopBar onMenuPress={() => setMenuVisible(true)} />

      {/* Slot – pridáme paddingTop pre medzeru pod top bar */}
      <View className="flex-1 ">
        <Slot />
      </View>

      {/* Menu a feedback modál */}
      <AppMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </View>
  );
}
