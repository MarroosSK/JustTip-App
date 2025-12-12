import AppText from "@/components/AppText";
import { useBadgeContext } from "@/context/BadgeContext";
import { useSettings } from "@/context/SettingsContext";
import { Lock } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  visible: boolean;
  onClose: () => void;
};

export default function BadgeModal({ badges, t, visible, onClose }: Props) {
  const { selectedBadgeId } = useBadgeContext();
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";
  const insets = useSafeAreaInsets();

  const selectedIndex = selectedBadgeId
    ? badges.findIndex((b) => b.id === selectedBadgeId)
    : 0;
  const badge = badges[selectedIndex];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.modalContainer,
            {
              paddingTop: 20,
              paddingBottom: insets.bottom,
              backgroundColor: isDark ? "#111" : "#fff",
            },
          ]}
        >
          <View style={{ marginBottom: 16, paddingHorizontal: 16 }}>
            <AppText style={{ fontSize: 20, color: isDark ? "#fff" : "#000" }}>
              {t(badge.name)}
            </AppText>
            <AppText style={{ fontSize: 14, color: isDark ? "#ccc" : "#555" }}>
              {t(badge.description)}
            </AppText>
          </View>

          <View style={{ alignItems: "center" }}>
            <View style={{ position: "relative" }}>
              <Image
                source={badge.icon}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
              {!badge.unlocked && (
                <View
                  style={{
                    position: "absolute",
                    inset: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.3)",
                    borderRadius: 8,
                  }}
                >
                  <Lock size={28} color="#fff" />
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: Dimensions.get("window").width,
  },
});
