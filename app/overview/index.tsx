import OverviewScreen from "@/modules/overview/OverviewScreen";
import React from "react";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Overview = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} className="mt-20">
      <OverviewScreen />
    </SafeAreaView>
  );
};

export default Overview;
