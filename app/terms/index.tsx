import TermsScreen from "@/modules/terms/TermsScreen";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Terms = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="mt-20">
      <TermsScreen />
    </SafeAreaView>
  );
};

export default Terms;
