import BadgesScreen from "@/modules/badges/BadgeScreen";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

const Badges = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="pt-20">
      <BadgesScreen />
    </SafeAreaView>
  );
};

export default Badges;
