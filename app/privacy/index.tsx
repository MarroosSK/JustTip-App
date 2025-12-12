import PrivacyScreen from "@/modules/privacy/PrivacyScreen";

import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

const Privacy = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="mt-20">
      <PrivacyScreen />
    </SafeAreaView>
  );
};

export default Privacy;
