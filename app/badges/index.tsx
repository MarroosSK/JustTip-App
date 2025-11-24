import BadgesScreen from "@/modules/badges/BadgeScreen";
import React from "react";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Badges = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} className="pt-20">
      <BadgesScreen />
    </SafeAreaView>
  );
};

export default Badges;
