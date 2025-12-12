import { useSettings } from "@/context/SettingsContext";
import { usePathname, useRouter } from "expo-router";
import {
  Calculator,
  ChartNoAxesColumnIncreasing,
  Handshake,
  MessageSquareText,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
} from "lucide-react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "../AppText";
import AppMenuItem from "./AppMenuItem";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type AppPath =
  | "/"
  | "/badges"
  | "/feedback"
  | "/overview"
  | "/settings"
  | "/terms"
  | "/privacy";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function AppMenu({ visible, onClose }: Props) {
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const { t } = useTranslation();
  const { themeMode } = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isDark = themeMode === "dark";

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : SCREEN_HEIGHT, {
      duration: 300,
    });
  }, [visible]);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd((e) => {
      if (e.translationY > 100 || e.velocityY > 1000) {
        translateY.value = withTiming(SCREEN_HEIGHT, {}, () =>
          runOnJS(onClose)()
        );
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const closeMenuAndNavigate = (path?: AppPath, external?: boolean) => {
    onClose();
    if (!path) return;
    if (external) {
      import("react-native").then(({ Linking }) => Linking.openURL(path));
    } else {
      router.push(path);
    }
  };

  if (!visible) return null;

  return (
    <Pressable className="absolute inset-0 bg-black/50 z-50" onPress={onClose}>
      <GestureDetector gesture={pan}>
        <Animated.View
          className={`absolute bottom-0 left-0 right-0 max-h-[90%] rounded-t-2xl px-6 pt-4`}
          style={[
            animatedStyle,
            {
              backgroundColor: isDark ? "#111" : "#fff",
              paddingBottom: 16 + insets.bottom,
            },
          ]}
        >
          {/* Grabber */}
          <View className="w-full items-center mb-3">
            <View className="w-20 h-1.5 rounded-full bg-bg-dark dark:bg-bg-light opacity-60" />
          </View>

          <AppText
            className={`text-center text-xl mb-4 ${
              isDark ? "text-text-primaryDark" : "text-text-primaryLight"
            }`}
          >
            {t("menu_title")}
          </AppText>

          {/* Main Menu Items */}
          <View className="gap-2">
            {[
              { label: t("menu_calculator"), path: "/", Icon: Calculator },
              { label: t("menu_badges"), path: "/badges", Icon: Trophy },
              {
                label: t("menu_overview"),
                path: "/overview",
                Icon: ChartNoAxesColumnIncreasing,
              },
              { label: t("menu_settings"), path: "/settings", Icon: Settings },
            ].map(({ label, path, Icon }) => (
              <AppMenuItem
                key={path}
                label={label}
                path={path as AppPath}
                Icon={Icon}
                active={pathname === path}
                onPress={() => closeMenuAndNavigate(path as AppPath)}
                iconColor={isDark ? "#e4e4e4" : "#454545"}
              />
            ))}
          </View>

          {/* Feedback + Rate + Terms + Privacy */}
          <View className="gap-2 mt-6">
            {[
              {
                label: t("menu_rate_us"),
                Icon: Star,
                external: true,
                path: "#",
              },
              {
                label: t("menu_feedback"),
                Icon: MessageSquareText,
                path: "/feedback",
              },
              { label: t("menu_terms"), Icon: Handshake, path: "/terms" },
              { label: t("menu_privacy"), Icon: ShieldCheck, path: "/privacy" },
            ].map(({ label, Icon, path, external }) => (
              <AppMenuItem
                key={label}
                label={label}
                path={path as AppPath}
                Icon={Icon}
                onPress={() => closeMenuAndNavigate(path as AppPath, external)}
                iconColor={isDark ? "#e4e4e4" : "#454545"}
              />
            ))}
          </View>

          {/* Footer */}
          <View className="mt-6">
            <AppText
              className={`text-xs text-center ${
                isDark ? "text-text-secondaryDark" : "text-text-secondaryLight"
              }`}
            >
              v1.0.0
            </AppText>
          </View>
        </Animated.View>
      </GestureDetector>
    </Pressable>
  );
}
