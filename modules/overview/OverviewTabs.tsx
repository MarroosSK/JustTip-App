import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";

type TabType = "chart" | "history";

type TabsProps = {
  selectedTab: TabType;
  setSelectedTab: (tab: TabType) => void;
  themeColor: string;
};

const OverviewTabs = ({
  selectedTab,
  setSelectedTab,
  themeColor,
}: TabsProps) => {
  const { t } = useTranslation();
  const tabs: { label: string; value: TabType }[] = [
    { label: t("tab_graph"), value: "chart" },
    { label: t("tab_history"), value: "history" },
  ];

  return (
    <View className="mb-2 px-2">
      <View className="flex-row justify-between">
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab.value;
          return (
            <Pressable
              key={tab.value}
              onPress={() => setSelectedTab(tab.value)}
              className="flex-1 items-center py-1.5"
            >
              <Text
                className={`text-xs font-semibold ${
                  isSelected
                    ? "text-text-primaryLight dark:text-text-primaryDark"
                    : "text-text-primaryLight/60 dark:text-text-primaryDark/60"
                }`}
              >
                {tab.label}
              </Text>
              <View
                className="mt-1 h-1 rounded-full w-full"
                style={{
                  backgroundColor: isSelected ? themeColor : "transparent",
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default OverviewTabs;
