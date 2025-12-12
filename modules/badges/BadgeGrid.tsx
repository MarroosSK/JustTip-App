import AppText from "@/components/AppText";
import { useSettings } from "@/context/SettingsContext";
import { Lock } from "lucide-react-native";
import React from "react";
import { Image, Pressable, View } from "react-native";

type Badge = {
  id: string;
  name: string;
  description: string;
  icon: any;
  unlocked: boolean;
};

type Props = {
  badges: Badge[];
  t: (key: string) => string;
  openModal: (id: string) => void;
};

export default function BadgeGrid({ badges, t, openModal }: Props) {
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  return (
    <View className="flex-row flex-wrap -mx-2">
      {badges.map((badge) => {
        const locked = !badge.unlocked;

        return (
          <Pressable
            key={badge.id}
            onPress={() => openModal(badge.id)}
            className="w-1/3 p-2"
          >
            <View
              className={`
                rounded-xl justify-center items-center overflow-hidden 
                ${isDark ? "bg-bg-cardDark" : "bg-bg-cardLight"}
              `}
              style={{ height: 100 }}
            >
              <Image
                source={badge.icon}
                style={{
                  width: 50,
                  height: 50,
                  opacity: locked ? 0.45 : 1,
                }}
                resizeMode="contain"
              />
              <AppText
                className={`
                  text-center text-xs mt-2 
                  ${isDark ? "text-text-primaryDark" : "text-text-primaryLight"}
                  ${locked ? "opacity-40" : "opacity-100"}
                `}
              >
                {t(badge.name)}
              </AppText>

              {locked && (
                <View
                  className={`
                    absolute inset-0 justify-center items-center 
                    ${isDark ? "bg-black/40" : "bg-white/30"}
                  `}
                >
                  <Lock
                    size={30}
                    color={isDark ? "#FFFFFF" : "#000000"}
                    opacity={0.8}
                  />
                </View>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
