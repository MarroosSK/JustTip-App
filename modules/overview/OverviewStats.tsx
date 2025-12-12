import AppText from "@/components/AppText";
import { useSettings } from "@/context/SettingsContext";
import { formatNumber } from "@/utils/format-number";
import { Banknote, Trophy, Wallet } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

type StatsProps = {
  tipCount: number;
  totalTips: number;
  bestTip: number;
  t: (key: string) => string;
};

const OverviewStats = ({ tipCount, totalTips, bestTip, t }: StatsProps) => {
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const stats = [
    { label: t("tip_count"), value: tipCount, Icon: Wallet },
    { label: t("total_tips"), value: formatNumber(totalTips), Icon: Banknote },
    { label: t("best_tip"), value: formatNumber(bestTip), Icon: Trophy },
  ];

  return (
    <View className="rounded-xl">
      <AppText className="text-3xl text-text-primaryLight dark:text-text-primaryDark mt-2 mb-1">
        {t("overview_title") ?? "Overview"}
      </AppText>
      <View className="flex-row justify-between gap-3 mt-4">
        {stats.map(({ label, value, Icon }, idx) => (
          <View
            key={idx}
            className="flex-1 p-2 rounded-xl bg-bg-cardLight dark:bg-bg-cardDark"
          >
            <Icon
              size={20}
              color={isDark ? "#e4e4e4" : "#454545"}
              className="mb-1"
            />
            <AppText className="text-xs text-text-primaryLight dark:text-text-primaryDark">
              {label}
            </AppText>
            <AppText className="text-base font-semibold text-text-primaryLight dark:text-text-primaryDark mb-1">
              {value}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OverviewStats;
