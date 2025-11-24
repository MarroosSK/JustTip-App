import AppText from "@/components/AppText";
import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PrivacyScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: insets.bottom + 20,
        paddingHorizontal: 16,
      }}
    >
      <View className="flex-1">
        <AppText className="text-2xl  mt-2 mb-3 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.title")}
        </AppText>

        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.intro")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle1")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle2")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph2_1")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph2_2")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle3")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph3")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle4")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph4")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle5")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph5_1")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph5_2")}
        </AppText>

        <AppText
          className="text-blue-500 underline mb-2"
          onPress={() => openUrl(t("privacy.thirdPartyLink1_url"))}
        >
          • {t("privacy.thirdPartyLink1_name")} (
          {t("privacy.thirdPartyLink1_url")})
        </AppText>
        <AppText
          className="text-blue-500 underline mb-2"
          onPress={() => openUrl(t("privacy.thirdPartyLink2_url"))}
        >
          • {t("privacy.thirdPartyLink2_name")} (
          {t("privacy.thirdPartyLink2_url")})
        </AppText>

        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.disclosureList_1")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.disclosureList_2")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.disclosureList_3")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle6")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph6")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle7")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph7")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle8")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph8_1")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph8_2")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle9")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph9")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle10")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph10")}
        </AppText>

        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.effectiveDate")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle11")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph11")}
        </AppText>

        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("privacy.subtitle12")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("privacy.paragraph12")}
        </AppText>
      </View>
    </ScrollView>
  );
};

export default PrivacyScreen;
