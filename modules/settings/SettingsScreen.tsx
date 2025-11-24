import React from "react";
import { ScrollView, View } from "react-native";

import AppText from "@/components/AppText";
import { useTranslation } from "react-i18next";
import SettingsPersonal from "./SettingsPersonal";

export default function SettingsScreen() {
  const { t } = useTranslation();
  return (
    <View className="flex-1">
      <View className="flex-1">
        {/* Úvodný blok */}
        <View className="rounded-xl px-4 mb-6">
          <AppText className="text-3xl text-text-primaryLight dark:text-text-primaryDark mt-2 mb-1">
            {t("settings.title")}
          </AppText>
          {/* <AppText className="text-base text-text-secondaryLight dark:text-text-secondaryDark font-semibold">
            {t("settings.subtitle")}
          </AppText> */}
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,

            paddingBottom: 40, // spodná medzera
          }}
        >
          {/* Sekcie nastavení */}
          <SettingsPersonal />
        </ScrollView>
      </View>
    </View>
  );
}
