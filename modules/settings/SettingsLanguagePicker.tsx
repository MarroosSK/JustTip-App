import AppText from "@/components/AppText";
import { useSettings } from "@/context/SettingsContext";
import { ChevronDown } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const LANGUAGES = [
  { label: "English (EN)", value: "en" },
  { label: "Slovak (SK)", value: "sk" },
];

export default function SettingsLanguagePicker() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [open, setOpen] = useState(false);
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const handleChange = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <View className="mb-4">
      {/* Trigger */}
      <Pressable
        className="flex-row items-center justify-between rounded-xl px-4 py-3 bg-bg-cardLight dark:bg-bg-cardDark"
        onPress={() => setOpen(true)}
      >
        <AppText className="text-base text-text-primaryLight dark:text-text-primaryDark">
          {LANGUAGES.find((l) => l.value === selectedLanguage)?.label}
        </AppText>
        <ChevronDown size={20} color={isDark ? "#e4e4e4" : "#454545"} />
      </Pressable>

      {/* Modal dropdown */}
      <Modal
        transparent
        visible={open}
        animationType="fade"
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View className="flex-1 bg-black/40 justify-center items-center">
            <View className="bg-bg-cardLight dark:bg-bg-cardDark rounded-2xl w-72 p-2">
              <FlatList
                data={LANGUAGES}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <Pressable
                    className={`
                      px-4 py-3 rounded-xl
                      ${
                        item.value === selectedLanguage
                          ? "bg-bg-cardLight/60 dark:bg-bg-cardDark/60"
                          : "bg-transparent"
                      }
                    `}
                    onPress={() => handleChange(item.value)}
                  >
                    <AppText
                      className={`text-base ${
                        item.value === selectedLanguage
                          ? "text-text-primaryLight dark:text-text-primaryDark"
                          : "text-text-secondaryLight dark:text-text-secondaryDark"
                      }`}
                    >
                      {item.label}
                    </AppText>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
