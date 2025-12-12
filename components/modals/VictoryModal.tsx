import LottieView from "lottie-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import AppText from "../AppText";
import LiteConfetti from "../LiteConfetti";

interface VictoryModalProps {
  visible: boolean;
  badges: { id: string; name: string; icon: ImageSourcePropType }[];
  onClose: () => void;
}

const VictoryModal = ({ visible, badges, onClose }: VictoryModalProps) => {
  const { t } = useTranslation();

  if (!badges || badges.length === 0) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
    >
      <View
        className="flex-1 items-center justify-center px-4 bg-bg-modalDark"
        style={{
          zIndex: 9999,
        }}
      >
        {visible && <LiteConfetti visible={visible} />}

        <View className="items-center w-full">
          <LottieView
            source={require("@/assets/Trophy.json")}
            autoPlay
            loop={true}
            style={{ width: 150, height: 150 }}
          />

          <Text
            className="text-center font-bold text-text-primaryDark mb-6"
            style={{ fontSize: 25 }}
          >
            {t("badge_unlocked_title")}
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingBottom: 20,
              gap: 16,
            }}
          >
            {badges.map((badge) => (
              <View
                key={badge.id}
                style={{
                  width: 100,
                  alignItems: "center",
                }}
              >
                <Image
                  source={badge.icon}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: "#f4f4f5",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: 8,
                    fontSize: 16,
                  }}
                >
                  {t(badge.name)}
                </Text>
              </View>
            ))}
          </ScrollView>
          {badges.length > 3 && (
            <AppText style={{ color: "#aaa", fontSize: 12, marginTop: -10 }}>
              {t("swipe_to_see_more")}
            </AppText>
          )}

          <Pressable
            onPress={onClose}
            style={{
              backgroundColor: "#fff",
              paddingVertical: 12,
              paddingHorizontal: 30,
              borderRadius: 30,
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#333" }}>
              {t("badge_unlocked_cancel")}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default VictoryModal;
