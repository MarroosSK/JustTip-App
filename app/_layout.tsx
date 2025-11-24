import LayoutWrapper from "@/modules/layout/LayoutWrapper";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import React from "react";
import "../utils/i18n";
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Môžeš pridať vlastný načítavací komponent, ako AppLoading
  }

  return <LayoutWrapper />;
}
