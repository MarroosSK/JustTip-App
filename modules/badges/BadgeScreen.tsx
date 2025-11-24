import { useSettings } from "@/context/settings-context";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

import { useTipStats } from "@/context/tips-context";

import AppText from "@/components/AppText";
import { useBadgeContext } from "@/context/BadgeContext";
import BadgeFilter from "./BadgeFilter";
import BadgeGrid from "./BadgeGrid";

import BadgeModal from "./BadgeModal";

export default function BadgesScreen() {
  const { t } = useTranslation();
  const { badges } = useTipStats();
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const { filter, setFilter, selectedBadgeId, setSelectedBadgeId } =
    useBadgeContext();

  const [modalVisible, setModalVisible] = useState(false);

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalCount = badges.length;

  const filteredBadges = badges.filter((b) => {
    if (filter === "unlocked") return b.unlocked;
    if (filter === "locked") return !b.unlocked;
    return true;
  });

  useEffect(() => {
    if (!selectedBadgeId) setModalVisible(false);
  }, [selectedBadgeId]);

  const openModal = (id: string) => {
    setSelectedBadgeId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBadgeId("");
  };

  return (
    <View className="flex-1  bg-bg-light dark:bg-bg-dark">
      {/* Header */}
      <View className="rounded-xl px-4">
        <AppText
          className={`text-3xl mt-2 mb-1 ${
            isDark ? "text-text-primaryDark" : "text-text-primaryLight"
          }`}
        >
          {t("badges_title")}
        </AppText>
        <AppText
          className={`text-base font-semibold mb-4 ${
            isDark ? "text-text-secondaryDark" : "text-text-secondaryLight"
          }`}
        >
          {`${unlockedCount} / ${totalCount} ${t("badges_unlocked")}`}
        </AppText>
      </View>

      {/* Filter */}
      <View className="mb-4">
        <BadgeFilter filter={filter} setFilter={setFilter} />
      </View>

      {/* Grid */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="px-4"
        showsVerticalScrollIndicator={false}
      >
        {filteredBadges.length > 0 ? (
          <BadgeGrid badges={filteredBadges} t={t} openModal={openModal} />
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <AppText
              className={`text-base ${
                isDark ? "text-text-secondaryDark" : "text-text-secondaryLight"
              }`}
            >
              {filter === "unlocked" && t("no_badges_unlocked")}
            </AppText>
          </View>
        )}
      </ScrollView>

      {/* Badge modal */}
      {modalVisible && (
        <BadgeModal
          badges={filteredBadges}
          t={t}
          visible={modalVisible} // <-- pridáme túto prop
          onClose={closeModal}
        />
      )}
    </View>
  );
}
