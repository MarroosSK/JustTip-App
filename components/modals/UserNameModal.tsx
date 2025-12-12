import AppText from "@/components/AppText";
import { useSettings } from "@/context/SettingsContext";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";

interface UsernameModalProps {
  visible: boolean;
  onClose: () => void;
}

const UsernameModal = ({ visible, onClose }: UsernameModalProps) => {
  const { t } = useTranslation();
  const { setSettings, themeMode } = useSettings();
  const [name, setName] = useState("");

  const handleConfirm = async () => {
    if (name.trim() !== "") {
      await setSettings({ username: name.trim() });
      onClose();
    }
  };

  const inputTextColor = themeMode === "dark" ? "#e4e4e4" : "#454545";
  const inputBorderColor = themeMode === "dark" ? "#3f3f46" : "#d1d5db";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <StatusBar
        style={themeMode === "dark" ? "light" : "dark"}
        backgroundColor="transparent"
        translucent
      />

      <View className="flex-1 justify-center items-center bg-black/30">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-11/12 bg-bg-cardLight dark:bg-bg-cardDark p-6 rounded-2xl"
        >
          <AppText className="text-lg font-bold mb-4 text-text-primaryLight dark:text-text-primaryDark text-center">
            {t("onboarding_prompt")}
          </AppText>

          <TextInput
            placeholder={t("your_name")}
            value={name}
            onChangeText={setName}
            style={{
              color: inputTextColor,
              borderColor: inputBorderColor,
            }}
            className="border rounded-lg w-full p-4 mb-6"
          />

          <Pressable
            onPress={handleConfirm}
            className="bg-bg-dark dark:bg-bg-light rounded-lg py-3"
          >
            <AppText className="text-center text-text-primaryDark dark:text-text-primaryLight font-bold">
              {t("confirm")}
            </AppText>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default UsernameModal;
