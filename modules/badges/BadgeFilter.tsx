import AppText from "@/components/AppText";
import { useSettings } from "@/context/SettingsContext";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type BadgeFilterProps = {
  filter: "all" | "unlocked" | "locked";
  setFilter: (val: "all" | "unlocked" | "locked") => void;
};

export default function BadgeFilter({ filter, setFilter }: BadgeFilterProps) {
  const { t } = useTranslation();
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const screenWidth = Dimensions.get("window").width;
  const tabs = ["all", "unlocked", "locked"];
  const tabWidth = screenWidth / tabs.length;

  const indicatorX = useSharedValue(0);

  useEffect(() => {
    const index = tabs.indexOf(filter);
    indicatorX.value = withTiming(tabWidth * index, { duration: 250 });
  }, [filter]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorX.value }],
    };
  });
  const indicatorColor = isDark ? "#fff" : "#000";

  return (
    <View style={{ width: "100%", position: "relative" }}>
      <View className="flex-row">
        {tabs.map((type) => {
          const isActive = filter === type;
          return (
            <Pressable
              key={type}
              onPress={() => setFilter(type as any)}
              className="flex-1 items-center justify-center py-3"
            >
              <AppText
                className={`${
                  isActive
                    ? `font-bold ${
                        isDark
                          ? "text-text-primaryDark"
                          : "text-text-primaryLight"
                      }`
                    : `font-medium ${
                        isDark
                          ? "text-text-secondaryDark"
                          : "text-text-secondaryLight"
                      }`
                }`}
              >
                {t(type)}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <Animated.View
        style={[
          {
            position: "absolute",
            bottom: 0,
            width: tabWidth,
            height: 3,
            backgroundColor: indicatorColor,
            borderRadius: 2,
          },
          animatedIndicatorStyle,
        ]}
      />
    </View>
  );
}
