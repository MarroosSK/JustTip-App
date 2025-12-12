import { useSettings } from "@/context/SettingsContext";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "../AppText";
import { SettingsButton, SettingsSheet } from "./SettingsSheet";

type ConsentPageProps = {
  onAccept: () => void;
};

const ConsentPage = ({ onAccept }: ConsentPageProps) => {
  const { themeMode } = useSettings();
  const { t } = useTranslation();
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <View className="flex-1 bg-bg-light dark:bg-bg-dark">
      <StatusBar
        style={themeMode === "dark" ? "light" : "dark"}
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView
        className="flex-1"
        edges={["top", "bottom", "left", "right"]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-center items-center px-5"
        >
          <View className="absolute top-5 right-5 z-50">
            <SettingsButton onPress={() => setSheetVisible(true)} />
          </View>

          <View className="flex-1 justify-center items-center px-5 gap-7">
            <AppText className="text-center text-text-primaryLight dark:text-text-primaryDark text-5xl font-bold mb-3">
              {t("welcome_title")}
            </AppText>

            <AppText className="text-center text-text-secondaryLight dark:text-text-secondaryDark text-base mb-10">
              {t("welcome_explainer")}
            </AppText>
          </View>

          <TouchableOpacity
            className="w-full py-4 rounded-lg items-center bg-bg-dark dark:bg-bg-light"
            onPress={onAccept}
          >
            <AppText className="text-text-primaryDark dark:text-text-primaryLight font-bold text-center">
              {t("consent_continue")}
            </AppText>
          </TouchableOpacity>

          <AppText
            className="mt-2 mb-14 text-text-secondaryLight dark:text-text-secondaryDark text-xs text-center"
            onPress={() => Linking.openURL("#")}
          >
            {t("consent_link")}
          </AppText>
          <SettingsSheet
            visible={sheetVisible}
            onClose={() => setSheetVisible(false)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ConsentPage;
