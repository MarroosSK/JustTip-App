import { useSettings } from "@/context/SettingsContext";
import React from "react";
import { Pressable, View } from "react-native";
import AppText from "../AppText";

type Props = {
  label: string;
  path?: string;
  onPress: () => void;
  active?: boolean;
  Icon?: React.FC<{ color?: string; size?: number }>;
  iconColor?: string;
};

export default function AppMenuItem({
  label,
  onPress,
  active,
  Icon,
  iconColor,
}: Props) {
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const bgClass = active
    ? isDark
      ? "bg-[#27272a]"
      : "bg-[#F2F2F2]"
    : "bg-transparent";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center w-full py-3 px-4 rounded-xl ${bgClass}`}
    >
      {Icon && (
        <View className="mr-3">
          <Icon
            color={iconColor || (isDark ? "#e4e4e4" : "#454545")}
            size={20}
          />
        </View>
      )}
      <AppText
        className={isDark ? "text-text-primaryDark" : "text-text-primaryLight"}
      >
        {label}
      </AppText>
    </Pressable>
  );
}
