import AppText from "@/components/AppText";
import { useSettings } from "@/context/SettingsContext";
import * as Haptics from "expo-haptics";
import { X } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";

type Props = {
  value: string;
  onChange: (val: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
};

const keys = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "⌫"],
];

export default function NumericKeyboard({
  value,
  onChange,
  onCancel,
  onConfirm,
}: Props) {
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const handlePress = (key: string) => {
    Haptics.selectionAsync();
    if (key === "⌫") {
      onChange(value.slice(0, -1));
      return;
    }
    if (key === "." && value.includes(".")) return;

    const [intPart, decPart] = (value + key).split(".");
    if (intPart.length > 5) return;
    if (decPart && decPart.length > 2) return;

    onChange(value + key);
  };

  return (
    <View className="w-full items-center">
      {/* Input row */}
      <View className="flex-row items-center justify-center mb-2 relative w-full px-0">
        <AppText
          className={`text-2xl font-bold text-center flex-1 ${
            isDark ? "text-text-primaryDark" : "text-text-primaryLight"
          }`}
        >
          {value || ""}
        </AppText>

        {value.length > 0 && (
          <Pressable className="absolute right-2" onPress={onCancel}>
            <X size={24} color={isDark ? "#e4e4e4" : "#454545"} />
          </Pressable>
        )}
      </View>

      {/* Keys grid */}
      {keys.map((row) => (
        <View key={row.join("-")} className="flex-row w-full mb-2 px-0">
          {row.map((key, idx) => (
            <Pressable
              key={key}
              onPress={() => handlePress(key)}
              className={`flex-1 h-16 rounded-lg justify-center items-center ${
                isDark ? "bg-bg-cardDark" : "bg-bg-cardLight"
              } ${idx === 1 ? "mx-1" : "mx-0"}`}
            >
              <AppText
                className={`${
                  isDark ? "text-text-primaryDark" : "text-text-primaryLight"
                } text-lg font-medium`}
              >
                {key}
              </AppText>
            </Pressable>
          ))}
        </View>
      ))}

      {/* OK button */}
      <Pressable
        onPress={onConfirm}
        className={`w-full mt-2 py-3 rounded-lg justify-center items-center ${
          isDark ? "bg-bg-cardDark" : "bg-bg-cardLight"
        }`}
      >
        <AppText
          className={`${
            isDark ? "text-text-primaryDark" : "text-text-primaryLight"
          } text-base font-semibold`}
        >
          OK
        </AppText>
      </Pressable>
    </View>
  );
}
