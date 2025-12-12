import i18n from "@/utils/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme } from "nativewind";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Settings, SettingsContextType, TippingStyle } from "./types";

const defaultSettings: Settings = {
  currency: "USD",
  themeMode: "light",
  username: "User",
  defaultPercentage: 10,
  tippingStyle: "none",
  language: "en",
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const loadSettings = async () => {
      const [
        currency,
        themeMode,
        username,
        defaultPercentage,
        tippingStyle,
        language,
      ] = await Promise.all([
        AsyncStorage.getItem("currency"),
        AsyncStorage.getItem("theme_mode"),
        AsyncStorage.getItem("username"),
        AsyncStorage.getItem("default_percentage"),
        AsyncStorage.getItem("tipping_style"),
        AsyncStorage.getItem("language"),
      ]);

      const loadedThemeMode =
        themeMode === "dark" || themeMode === "light"
          ? (themeMode as "light" | "dark")
          : defaultSettings.themeMode;

      const loadedTippingStyle: TippingStyle =
        tippingStyle === "mandatory" ? "mandatory" : "optional";

      const loadedLanguage = language ?? defaultSettings.language;

      i18n.changeLanguage(loadedLanguage);

      setSettingsState({
        currency: currency ?? defaultSettings.currency,
        themeMode: loadedThemeMode,
        username: username ?? defaultSettings.username,
        defaultPercentage: defaultPercentage
          ? Number(defaultPercentage)
          : defaultSettings.defaultPercentage,
        tippingStyle: loadedTippingStyle,
        language: loadedLanguage,
      });

      colorScheme.set(loadedThemeMode);
    };

    loadSettings();
  }, []);

  const setSettings = async (updated: Partial<Settings>) => {
    const newSettings = { ...settings, ...updated };
    setSettingsState(newSettings);

    if (updated.currency)
      await AsyncStorage.setItem("currency", updated.currency);
    if (updated.themeMode) {
      await AsyncStorage.setItem("theme_mode", updated.themeMode);
      colorScheme.set(updated.themeMode);
    }
    if (updated.username !== undefined)
      await AsyncStorage.setItem("username", updated.username);
    if (updated.defaultPercentage !== undefined)
      await AsyncStorage.setItem(
        "default_percentage",
        updated.defaultPercentage.toString()
      );
    if (updated.tippingStyle)
      await AsyncStorage.setItem("tipping_style", updated.tippingStyle);
    if (updated.language) {
      await AsyncStorage.setItem("language", updated.language);
      i18n.changeLanguage(updated.language);
    }
  };

  const resetSettings = async () => {
    await AsyncStorage.multiRemove([
      "currency",
      "theme_mode",
      "username",
      "default_percentage",
      "tipping_style",
      "language",
    ]);

    setSettingsState(defaultSettings);
    colorScheme.set(defaultSettings.themeMode);
    i18n.changeLanguage(defaultSettings.language);
  };

  const themeColor = settings.themeMode === "dark" ? "#161616" : "#F9FAFB";

  return (
    <SettingsContext.Provider
      value={{
        currency: settings.currency,
        themeMode: settings.themeMode,
        themeColor,
        username: settings.username,
        defaultPercentage: settings.defaultPercentage,
        tippingStyle: settings.tippingStyle,
        language: settings.language,
        setSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
