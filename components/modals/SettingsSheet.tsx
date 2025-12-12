import { useSettings } from "@/context/SettingsContext";
import { StatusBar } from "expo-status-bar";
import * as LucideIcons from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";

export const SettingsButton = ({ onPress }: { onPress: () => void }) => {
  const { themeMode } = useSettings();

  return (
    <TouchableOpacity onPress={onPress} className="p-2">
      <LucideIcons.Settings
        size={28}
        color={themeMode === "dark" ? "#F9FAFB" : "#161616"}
      />
    </TouchableOpacity>
  );
};

export const SettingsSheet = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { language, setSettings, themeMode } = useSettings();
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <StatusBar
        style={themeMode === "dark" ? "light" : "dark"}
        backgroundColor="transparent"
        translucent
      />

      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 bg-black/20"
      >
        <View className="flex-1" />
        <TouchableOpacity activeOpacity={1}>
          <View className="rounded-t-2xl p-6 bg-bg-cardLight dark:bg-bg-cardDark">
            <AppText className="text-lg font-bold mb-4 text-text-primaryLight dark:text-text-primaryDark">
              {t("settings_title")}
            </AppText>

            <AppText className="mb-2 text-text-secondaryLight dark:text-text-secondaryDark">
              {t("language_label")}
            </AppText>
            <View className="flex-row mb-4 space-x-3">
              {["en", "sk"].map((lang) => (
                <TouchableOpacity
                  key={lang}
                  onPress={() => setSettings({ language: lang })}
                  className={`px-4 py-4 rounded-lg ${
                    language === lang
                      ? themeMode === "dark"
                        ? "bg-bg-light"
                        : "bg-bg-dark"
                      : themeMode === "dark"
                      ? ""
                      : "bg-gray-200"
                  }`}
                >
                  <AppText
                    className={`${
                      language === lang
                        ? themeMode === "dark"
                          ? "text-bg-dark"
                          : "text-bg-light"
                        : themeMode === "dark"
                        ? "text-white"
                        : "text-black"
                    } font-bold text-center`}
                  >
                    {lang.toUpperCase()}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>

            <AppText className="mb-2 text-text-secondaryLight dark:text-text-secondaryDark">
              {t("theme_label")}
            </AppText>
            <View className="flex-row mb-4 space-x-3">
              {["light", "dark"].map((mode) => (
                <TouchableOpacity
                  key={mode}
                  onPress={() =>
                    setSettings({ themeMode: mode as "light" | "dark" })
                  }
                  className={`px-4 py-4 rounded-lg ${
                    themeMode === mode
                      ? themeMode === "dark"
                        ? "bg-bg-light"
                        : "bg-bg-dark"
                      : themeMode === "dark"
                      ? ""
                      : "bg-gray-200"
                  }`}
                >
                  <AppText
                    className={`${
                      themeMode === mode
                        ? themeMode === "dark"
                          ? "text-bg-dark"
                          : "text-bg-light"
                        : themeMode === "dark"
                        ? "text-white"
                        : "text-black"
                    } font-bold text-center`}
                  >
                    {mode === "light" ? t("light_mode") : t("dark_mode")}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={onClose}
              className="w-full py-4 rounded-lg items-center bg-bg-dark dark:bg-bg-light"
            >
              <AppText className="text-text-primaryDark dark:text-text-primaryLight font-bold text-center">
                {t("close")}
              </AppText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
