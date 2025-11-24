import FeedbackScreen from "@/modules/feedback/FeedbackScreen";
import React from "react";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Feedback = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} className="pt-20">
      <FeedbackScreen />
    </SafeAreaView>
  );
};

export default Feedback;
