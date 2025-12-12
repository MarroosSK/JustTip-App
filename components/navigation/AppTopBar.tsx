import { useSettings } from "@/context/SettingsContext";
import { Menu, Moon, Sun } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../AppText";

export default function AppTopBar({
  onMenuPress,
}: {
  onMenuPress: () => void;
}) {
  const { top } = useSafeAreaInsets();
  const { themeMode, setSettings, username } = useSettings();
  const isDark = themeMode === "dark";

  const bgColor = isDark ? "#161616" : "#F9FAFB";
  const iconColor = isDark ? "#e4e4e4" : "#454545";

  return (
    <View
      className="absolute z-[10] flex-row justify-between items-center px-4 py-2 w-full"
      style={{ top: top + 10 }}
    >
      <View className="flex-row items-center">
        <Pressable onPress={onMenuPress} hitSlop={10} className="mr-3">
          <Menu size={32} color={iconColor} />
        </Pressable>

        <AppText className="text-text-primaryLight dark:text-text-primaryDark">
          Ahoj, {username}
        </AppText>
      </View>

      <Pressable
        onPress={() => setSettings({ themeMode: isDark ? "light" : "dark" })}
        className="p-2 rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        {isDark ? (
          <Sun size={24} color={iconColor} />
        ) : (
          <Moon size={24} color={iconColor} />
        )}
      </Pressable>
    </View>
  );
}
