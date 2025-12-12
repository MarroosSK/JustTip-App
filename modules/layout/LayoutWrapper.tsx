import ConsentModal from "@/components/modals/ConsentModal";
import { BadgeProvider } from "@/context/BadgeContext";
import { SettingsProvider, useSettings } from "@/context/SettingsContext";
import { TipStatsProvider } from "@/context/TipsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import AppLayout from "./AppLayout";

SplashScreen.preventAutoHideAsync();

const NavigationBarController = () => {
  const { themeMode } = useSettings();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    const setNavBar = async () => {
      await NavigationBar.setBackgroundColorAsync("transparent");
      await NavigationBar.setButtonStyleAsync(
        themeMode === "dark" ? "light" : "dark"
      );
      await NavigationBar.setVisibilityAsync("visible");
    };
    setNavBar();

    setColorScheme(themeMode === "dark" ? "dark" : "light");
  }, [themeMode]);

  return null;
};

export default function LayoutWrapper() {
  const [appReady, setAppReady] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const consent = await AsyncStorage.getItem("userConsent");
        setConsentGiven(consent === "true");

        // simulácia načítania (napr. fetch configov, init stores...)
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (err) {
        console.warn("App loading error:", err);
      } finally {
        setAppReady(true);
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    const hideSplash = async () => {
      if (appReady) {
        await new Promise((r) => setTimeout(r, 500));
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [appReady]);

  const acceptConsent = async () => {
    await AsyncStorage.setItem("userConsent", "true");
    setConsentGiven(true);
  };

  if (!appReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TipStatsProvider>
        <SettingsProvider>
          <NavigationBarController />
          <BadgeProvider>
            <SafeAreaProvider>
              {!consentGiven ? (
                <ConsentModal onAccept={acceptConsent} />
              ) : (
                <>
                  <StatusBar style="auto" translucent />
                  <AppLayout />
                  <ToastManager useModal />
                </>
              )}
            </SafeAreaProvider>
          </BadgeProvider>
        </SettingsProvider>
      </TipStatsProvider>
    </GestureHandlerRootView>
  );
}
