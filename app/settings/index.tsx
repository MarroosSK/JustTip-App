import SettingsScreen from "@/modules/settings/SettingsScreen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="mt-20">
      <SettingsScreen />
    </SafeAreaView>
  );
};

export default Settings;
