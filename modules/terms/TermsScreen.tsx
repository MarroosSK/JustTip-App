import AppText from "@/components/AppText";
import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TermsScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: insets.bottom + 20,
        paddingHorizontal: 16,
      }}
    >
      <View className="flex-1">
        {/* Title */}
        <AppText className="text-2xl  mt-2 mb-3 text-text-primaryLight dark:text-text-primaryDark">
          {t("terms.title")}
        </AppText>

        {/* Paragraphs with secondary text color */}
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph1")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph2")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph3")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph4")}
        </AppText>

        {/* Third party title as paragraph (secondary text color) */}
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.thirdPartyTitle")}
        </AppText>

        {/* List */}
        <AppText className="ml-4 mb-3">
          <AppText
            className="text-blue-500 underline mb-2"
            onPress={() => openLink("https://www.google.com/analytics/terms/")}
          >
            • {t("terms.googleAnalytics")}
          </AppText>
          <AppText
            className="text-blue-500 underline mb-2"
            onPress={() => openLink("https://expo.io/terms")}
          >
            • {t("terms.expo")}
          </AppText>
        </AppText>

        {/* More paragraphs */}
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph5")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph6")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph7")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph8")}
        </AppText>
        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph9")}
        </AppText>

        {/* Subtitle */}
        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("terms.changesTitle")}
        </AppText>

        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.paragraph11")}
        </AppText>

        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.effectiveDate")}
        </AppText>

        {/* Subtitle */}
        <AppText className="text-xl font-semibold mt-4 mb-2 text-text-primaryLight dark:text-text-primaryDark">
          {t("terms.contactTitle")}
        </AppText>

        <AppText className="text-sm leading-6 mb-3 text-text-secondaryLight dark:text-text-secondaryDark">
          {t("terms.contactEmail")}
        </AppText>
      </View>
    </ScrollView>
  );
};

export default TermsScreen;
