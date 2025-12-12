import AppText from "@/components/AppText";
import { useSettings } from "@/context/SettingsContext";
import { currencies } from "@/data/data";
import { formatNumber } from "@/utils/format-number";
import { Coins } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export type TipItem = {
  bill: number;
  amount: number;
  splitCount?: number;
  timestamp: number;
  percent: number;
};

type TipListItemProps = {
  item: TipItem;
  currency: string;
};

const TipListItemComponent = ({ item, currency }: TipListItemProps) => {
  const { themeMode } = useSettings();
  const isDark = themeMode === "dark";

  const dateStr = new Date(item.timestamp).toLocaleDateString("sk-SK");
  const selectedCurrency = currencies.find((c) => c.code === currency);
  const currencySymbol = selectedCurrency?.symbol || "$";

  return (
    <View className="flex-row items-center justify-between rounded-xl p-3 bg-bg-cardLight dark:bg-bg-cardDark">
      <View className="rounded-lg p-2 mr-3 ">
        <Coins size={18} color={isDark ? "#e4e4e4" : "#333"} />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center gap-1">
          <AppText className="text-sm text-text-secondaryLight dark:text-text-secondaryDark">
            {currencySymbol}
            {formatNumber(item.amount)}
          </AppText>
        </View>
      </View>

      <View>
        <AppText className="text-text-secondaryLight dark:text-text-secondaryDark text-sm">
          {dateStr}
        </AppText>
      </View>
    </View>
  );
};

export const TipListItem = React.memo(TipListItemComponent);
TipListItem.displayName = "TipListItem";
