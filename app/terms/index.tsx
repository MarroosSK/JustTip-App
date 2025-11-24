import TermsScreen from "@/modules/terms/TermsScreen";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Terms = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} className="mt-20">
      <TermsScreen />
    </SafeAreaView>
  );
};

export default Terms;
