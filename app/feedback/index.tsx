import FeedbackScreen from "@/modules/feedback/FeedbackScreen";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

const Feedback = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="pt-20">
      <FeedbackScreen />
    </SafeAreaView>
  );
};

export default Feedback;
